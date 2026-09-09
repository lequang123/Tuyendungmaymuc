import { NextRequest, NextResponse } from 'next/server';
import { getStudents } from '@/lib/storage';
import { sendMessage } from '@/lib/telegram';
import type { Student } from '@/lib/storage';

// ============================================================
// ⚠️ TEST MODE — Cron Job chạy mỗi 5 phút, gửi toàn bộ DS
// TODO: Đổi lại production mode sau khi test xong
// ============================================================

export async function GET(request: NextRequest) {
  // Bỏ auth check tạm thời để test dễ hơn
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // TEST MODE: Lấy toàn bộ học viên thay vì chỉ ngày mai
    const students = await getStudents();

    if (students.length === 0) {
      await sendMessage('🔔 <b>TEST REMINDER</b>\n\n📭 Chưa có học viên nào trong danh sách.');
      return NextResponse.json({
        success: true,
        message: 'No students in list',
        count: 0,
      });
    }

    // Format và gửi
    const message = formatTestReminder(students);
    await sendMessage(message);

    console.log(`Cron TEST: Sent reminder for ${students.length} students.`);

    return NextResponse.json({
      success: true,
      message: `TEST reminded ${students.length} students`,
      count: students.length,
      mode: 'TEST',
    });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json(
      { error: 'Internal server error', detail: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

function formatTestReminder(students: Student[]): string {
  const lines = students.map((s) => {
    const typeLabel = s.type === 'chungchi' ? '📜 Chứng chỉ' : '🎓 Đào tạo';
    const dateParts = s.registrationDate.split('-');
    const dateFormatted = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return [
      `👤 <b>${s.name}</b>`,
      `📞 ${s.phone}`,
      `${typeLabel} — Xe ${s.vehicle}`,
      `📅 ${dateFormatted}`,
    ].join('\n');
  });

  return [
    `🧪 <b>TEST REMINDER — Danh sách toàn bộ học viên</b>`,
    ``,
    ...lines.map((l) => l + '\n'),
    `📊 Tổng: <b>${students.length}</b> học viên`,
    ``,
    `<i>⚠️ Đây là chế độ test. Production sẽ chỉ gửi học viên ngày mai.</i>`,
  ].join('\n');
}
