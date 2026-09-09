import { NextRequest, NextResponse } from 'next/server';
import {
  addStudent,
  getStudents,
  getStudentsByType,
  getStudentsNextDays,
  getStudentsTomorrow,
  deleteStudent,
} from '@/lib/storage';
import {
  sendMessage,
  sendMessageWithInlineKeyboard,
  sendMessageWithReplyKeyboard,
  answerCallbackQuery,
  formatStudentList,
  formatStudentAdded,
  formatHelp,
  formatMainMenu,
  parseAddCommand,
  MAIN_MENU_KEYBOARD,
  REPLY_KEYBOARD,
  REPLY_TEXT_TO_COMMAND,
} from '@/lib/telegram';

// ============================================================
// Telegram Webhook Handler
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Webhook received:', JSON.stringify(body).substring(0, 500));

    // Handle inline button callbacks
    if (body?.callback_query) {
      await handleCallbackQuery(body.callback_query);
      return NextResponse.json({ ok: true });
    }

    // Handle regular messages
    const message = body?.message;
    if (!message?.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id.toString();
    let text: string = message.text.trim();

    // Map reply keyboard button text → command
    if (REPLY_TEXT_TO_COMMAND[text]) {
      text = REPLY_TEXT_TO_COMMAND[text];
    }

    // Strip @botname from commands (e.g. /add@MyBot → /add)
    const cleanText = text.replace(/^(\/\w+)@\w+/, '$1');

    // Route commands
    if (cleanText.startsWith('/add')) {
      await handleAdd(chatId, cleanText);
    } else if (cleanText === '/list') {
      await handleList(chatId);
    } else if (cleanText === '/listcc') {
      await handleListByType(chatId, 'chungchi');
    } else if (cleanText === '/listdt') {
      await handleListByType(chatId, 'daotao');
    } else if (cleanText === '/week') {
      await handleWeek(chatId);
    } else if (cleanText === '/tomorrow') {
      await handleTomorrow(chatId);
    } else if (cleanText.startsWith('/delete')) {
      await handleDelete(chatId, cleanText);
    } else if (cleanText === '/menu') {
      await handleMenu(chatId);
    } else if (cleanText === '/help' || cleanText === '/start') {
      await handleStart(chatId);
    } else {
      // Don't reply to non-command messages in group chats
      if (message.chat.type === 'private') {
        await sendMessage(
          '❓ Lệnh không hợp lệ. Gõ /help hoặc /menu để xem các chức năng.',
          chatId,
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    try {
      const body = await request.clone().json();
      const chatId = body?.message?.chat?.id?.toString();
      if (chatId) {
        await sendMessage(
          '⚠️ Có lỗi xảy ra khi xử lý lệnh. Vui lòng thử lại.',
          chatId,
        );
      }
    } catch {
      // ignore
    }
    return NextResponse.json({ ok: true });
  }
}

// ============================================================
// Callback Query Handler (inline buttons)
// ============================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCallbackQuery(callbackQuery: any) {
  const chatId = callbackQuery.message.chat.id.toString();
  const data = callbackQuery.data;

  // Acknowledge the button press immediately
  await answerCallbackQuery(callbackQuery.id);

  // Route callback commands
  switch (data) {
    case 'cmd_add':
      await handleAdd(chatId, '/add');
      break;
    case 'cmd_list':
      await handleList(chatId);
      break;
    case 'cmd_listcc':
      await handleListByType(chatId, 'chungchi');
      break;
    case 'cmd_listdt':
      await handleListByType(chatId, 'daotao');
      break;
    case 'cmd_week':
      await handleWeek(chatId);
      break;
    case 'cmd_tomorrow':
      await handleTomorrow(chatId);
      break;
    case 'cmd_help':
      await sendMessage(formatHelp(), chatId);
      break;
    case 'cmd_menu':
      await handleMenu(chatId);
      break;
    default:
      break;
  }
}

// ============================================================
// Command Handlers
// ============================================================

async function handleStart(chatId: string) {
  // Send help text + show persistent reply keyboard
  const helpText = formatHelp();
  await sendMessageWithReplyKeyboard(helpText, REPLY_KEYBOARD, chatId);
}

async function handleMenu(chatId: string) {
  await sendMessageWithInlineKeyboard(
    formatMainMenu(),
    MAIN_MENU_KEYBOARD,
    chatId,
  );
}

async function handleAdd(chatId: string, text: string) {
  try {
    const parsed = parseAddCommand(text);

    if (typeof parsed === 'string') {
      await sendMessage(parsed, chatId);
      return;
    }

    const student = await addStudent(parsed);
    await sendMessage(formatStudentAdded(student), chatId);
  } catch (error) {
    console.error('handleAdd error:', error);
    await sendMessage(
      '⚠️ Lỗi khi thêm học viên. Vui lòng thử lại.\n\nChi tiết: ' +
        (error instanceof Error ? error.message : String(error)),
      chatId,
    );
  }
}

async function handleList(chatId: string) {
  try {
    const students = await getStudents();
    await sendMessage(
      formatStudentList(students, '📋 <b>DANH SÁCH TOÀN BỘ HỌC VIÊN</b>'),
      chatId,
    );
  } catch (error) {
    console.error('handleList error:', error);
    await sendMessage('⚠️ Lỗi khi đọc danh sách: ' + (error instanceof Error ? error.message : String(error)), chatId);
  }
}

async function handleListByType(
  chatId: string,
  type: 'chungchi' | 'daotao',
) {
  try {
    const students = await getStudentsByType(type);
    const title =
      type === 'chungchi'
        ? '📜 <b>DANH SÁCH HỌC CHỨNG CHỈ</b>'
        : '🎓 <b>DANH SÁCH HỌC ĐÀO TẠO</b>';
    await sendMessage(formatStudentList(students, title), chatId);
  } catch (error) {
    console.error('handleListByType error:', error);
    await sendMessage('⚠️ Lỗi khi đọc danh sách: ' + (error instanceof Error ? error.message : String(error)), chatId);
  }
}

async function handleWeek(chatId: string) {
  try {
    const students = await getStudentsNextDays(7);
    await sendMessage(
      formatStudentList(students, '📅 <b>HỌC VIÊN 7 NGÀY TỚI</b>'),
      chatId,
    );
  } catch (error) {
    console.error('handleWeek error:', error);
    await sendMessage('⚠️ Lỗi: ' + (error instanceof Error ? error.message : String(error)), chatId);
  }
}

async function handleTomorrow(chatId: string) {
  try {
    const students = await getStudentsTomorrow();
    await sendMessage(
      formatStudentList(students, '📅 <b>HỌC VIÊN NGÀY MAI</b>'),
      chatId,
    );
  } catch (error) {
    console.error('handleTomorrow error:', error);
    await sendMessage('⚠️ Lỗi: ' + (error instanceof Error ? error.message : String(error)), chatId);
  }
}

async function handleDelete(chatId: string, text: string) {
  const idPrefix = text.replace(/^\/delete\s*/i, '').trim();

  if (!idPrefix) {
    await sendMessage(
      '❌ Cần nhập mã ID!\n\nVí dụ: <code>/delete abc123</code>\n\nDùng /list để xem mã ID của từng học viên.',
      chatId,
    );
    return;
  }

  try {
    const removed = await deleteStudent(idPrefix);

    if (!removed) {
      await sendMessage(
        `❌ Không tìm thấy học viên với mã <code>${idPrefix}</code>.\n\nDùng /list để xem danh sách.`,
        chatId,
      );
      return;
    }

    await sendMessage(
      `🗑 Đã xóa học viên: <b>${removed.name}</b> (${removed.phone})`,
      chatId,
    );
  } catch (error) {
    console.error('handleDelete error:', error);
    await sendMessage('⚠️ Lỗi khi xóa: ' + (error instanceof Error ? error.message : String(error)), chatId);
  }
}
