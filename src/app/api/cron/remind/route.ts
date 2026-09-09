import { NextRequest, NextResponse } from 'next/server';
import { getStudentsTomorrow, markReminded } from '@/lib/storage';
import { sendMessage, formatReminder } from '@/lib/telegram';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Lấy danh sách học viên có lịch đăng ký vào ngày mai
    const students = await getStudentsTomorrow();

    if (students.length === 0) {
      console.log('Cron: No students scheduled for tomorrow.');
      return NextResponse.json({
        success: true,
        message: 'No students scheduled for tomorrow',
        count: 0,
      });
    }

    // Format và gửi thông báo nhắc nhở qua Telegram
    const message = formatReminder(students);
    if (message) {
      await sendMessage(message);
      await markReminded(students.map((s) => s.id));
    }

    console.log(`Cron: Sent reminder for ${students.length} students.`);

    return NextResponse.json({
      success: true,
      message: `Reminded ${students.length} students`,
      count: students.length,
    });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json(
      { error: 'Internal server error', detail: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

