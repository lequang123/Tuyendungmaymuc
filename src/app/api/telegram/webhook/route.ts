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

    // Extract message info
    const message = body?.message;
    if (!message?.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id.toString();
    const text: string = message.text.trim();

    // Route commands
    if (text.startsWith('/add')) {
      await handleAdd(chatId, text);
    } else if (text === '/list') {
      await handleList(chatId);
    } else if (text === '/listcc') {
      await handleListByType(chatId, 'chungchi');
    } else if (text === '/listdt') {
      await handleListByType(chatId, 'daotao');
    } else if (text === '/week') {
      await handleWeek(chatId);
    } else if (text === '/tomorrow') {
      await handleTomorrow(chatId);
    } else if (text.startsWith('/delete')) {
      await handleDelete(chatId, text);
    } else if (text === '/help' || text === '/start') {
      await sendMessage(formatHelp(), chatId);
    } else {
      await sendMessage(
        '❓ Lệnh không hợp lệ. Gõ /help để xem hướng dẫn.',
        chatId,
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}

// ============================================================
// Command Handlers
// ============================================================

async function handleAdd(chatId: string, text: string) {
  const parsed = parseAddCommand(text);

  // If string returned, it's an error/help message
  if (typeof parsed === 'string') {
    await sendMessage(parsed, chatId);
    return;
  }

  const student = await addStudent(parsed);
  await sendMessage(formatStudentAdded(student), chatId);
}

async function handleList(chatId: string) {
  const students = await getStudents();
  await sendMessage(
    formatStudentList(students, '📋 <b>DANH SÁCH TOÀN BỘ HỌC VIÊN</b>'),
    chatId,
  );
}

async function handleListByType(
  chatId: string,
  type: 'chungchi' | 'daotao',
) {
  const students = await getStudentsByType(type);
  const title =
    type === 'chungchi'
      ? '📜 <b>DANH SÁCH HỌC CHỨNG CHỈ</b>'
      : '🎓 <b>DANH SÁCH HỌC ĐÀO TẠO</b>';
  await sendMessage(formatStudentList(students, title), chatId);
}

async function handleWeek(chatId: string) {
  const students = await getStudentsNextDays(7);
  await sendMessage(
    formatStudentList(students, '📅 <b>HỌC VIÊN 7 NGÀY TỚI</b>'),
    chatId,
  );
}

async function handleTomorrow(chatId: string) {
  const students = await getStudentsTomorrow();
  await sendMessage(
    formatStudentList(students, '📅 <b>HỌC VIÊN NGÀY MAI</b>'),
    chatId,
  );
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
}
