import { NextRequest, NextResponse } from 'next/server';
import { getStudentsTomorrow, markReminded } from '@/lib/storage';
import { sendMessage, formatReminder } from '@/lib/telegram';

// ============================================================
// Cron Job: Daily Reminder (8:00 AM Vietnam = 01:00 UTC)
// ============================================================

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sends this automatically)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get students with registration date = tomorrow
    const students = await getStudentsTomorrow();

    if (students.length === 0) {
      console.log('Cron: No students tomorrow. Skipping reminder.');
      return NextResponse.json({
        success: true,
        message: 'No students tomorrow',
        count: 0,
      });
    }

    // Send reminder to Telegram
    const message = formatReminder(students);
    await sendMessage(message);

    // Mark as reminded
    await markReminded(students.map((s) => s.id));

    console.log(`Cron: Sent reminder for ${students.length} students.`);

    return NextResponse.json({
      success: true,
      message: `Reminded ${students.length} students`,
      count: students.length,
    });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
