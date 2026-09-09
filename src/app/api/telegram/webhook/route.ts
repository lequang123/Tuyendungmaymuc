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
  formatStudentList,
  formatStudentAdded,
  formatHelp,
  parseAddCommand,
} from '@/lib/telegram';

// ============================================================
// Telegram Webhook Handler
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Webhook received:', JSON.stringify(body));

    // Extract message info
    const message = body?.message;
    if (!message?.text) {
      console.log('No text in message, skipping');
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id.toString();
    const text: string = message.text.trim();

    console.log(`Chat ID: ${chatId}, Command: ${text}`);

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
    } else if (cleanText === '/help' || cleanText === '/start') {
      await sendMessage(formatHelp(), chatId);
    } else {
      // Don't reply to non-command messages in group chats
      if (message.chat.type === 'private') {
        await sendMessage(
          '❓ Lệnh không hợp lệ. Gõ /help để xem hướng dẫn.',
          chatId,
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    // Try to notify user about the error
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
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}

// ============================================================
// Command Handlers
// ============================================================

async function handleAdd(chatId: string, text: string) {
  try {
    const parsed = parseAddCommand(text);

    // If string returned, it's an error/help message
    if (typeof parsed === 'string') {
      await sendMessage(parsed, chatId);
      return;
    }

    console.log('Adding student:', JSON.stringify(parsed));
    const student = await addStudent(parsed);
    console.log('Student added:', student.id);
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
