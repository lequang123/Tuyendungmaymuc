import type { Student } from './storage';

// ============================================================
// Config
// ============================================================

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ============================================================
// Send message
// ============================================================

export async function sendMessage(
  text: string,
  chatId: string = CHAT_ID,
): Promise<void> {
  await fetch(`${API_BASE}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });
}

// ============================================================
// Format helpers
// ============================================================

export function formatStudentList(
  students: Student[],
  title: string,
): string {
  if (students.length === 0) {
    return `${title}\n\n📭 Không có học viên nào.`;
  }

  const lines = students.map((s, i) => {
    const typeLabel = s.type === 'chungchi' ? '📜 Chứng chỉ' : '🎓 Đào tạo';
    const dateParts = s.registrationDate.split('-');
    const dateFormatted = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return [
      `<b>${i + 1}. ${s.name}</b>`,
      `   📞 ${s.phone}`,
      `   ${typeLabel} — Xe ${s.vehicle}`,
      `   📅 ${dateFormatted}`,
      `   🔑 ID: <code>${s.id.substring(0, 6)}</code>`,
    ].join('\n');
  });

  return `${title}\n\n${lines.join('\n\n')}\n\n📊 Tổng: <b>${students.length}</b> học viên`;
}

export function formatStudentAdded(student: Student): string {
  const typeLabel =
    student.type === 'chungchi' ? '📜 Chứng chỉ' : '🎓 Đào tạo';
  const dateParts = student.registrationDate.split('-');
  const dateFormatted = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  return [
    `✅ <b>Đã thêm học viên thành công!</b>`,
    ``,
    `👤 <b>${student.name}</b>`,
    `📞 ${student.phone}`,
    `${typeLabel} — Xe ${student.vehicle}`,
    `📅 Ngày đến: ${dateFormatted}`,
    `🔑 ID: <code>${student.id.substring(0, 6)}</code>`,
  ].join('\n');
}

export function formatReminder(students: Student[]): string {
  if (students.length === 0) return '';

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
    `🔔 <b>NHẮC NHỞ — Ngày mai có học viên đến đăng ký!</b>`,
    ``,
    ...lines.map((l) => l + '\n'),
    `📊 Tổng: <b>${students.length}</b> học viên`,
  ].join('\n');
}

export function formatHelp(): string {
  return [
    `🤖 <b>BOT QUẢN LÝ HỌC VIÊN</b>`,
    ``,
    `📝 <b>Thêm học viên:</b>`,
    `<code>/add Tên, SĐT, loại, ngày, xe</code>`,
    ``,
    `Trong đó:`,
    `• <b>loại</b>: <code>chungchi</code> hoặc <code>daotao</code>`,
    `• <b>ngày</b>: <code>YYYY-MM-DD</code> (VD: 2026-09-15)`,
    `• <b>xe</b>: B1, B2, C, D, E...`,
    ``,
    `<b>Ví dụ:</b>`,
    `<code>/add Nguyễn Văn A, 0901234567, chungchi, 2026-09-15, B2</code>`,
    ``,
    `📋 <b>Xem danh sách:</b>`,
    `/list — Toàn bộ học viên`,
    `/listcc — Học chứng chỉ`,
    `/listdt — Học đào tạo`,
    `/week — 7 ngày tới`,
    `/tomorrow — Ngày mai`,
    ``,
    `🗑 <b>Xóa học viên:</b>`,
    `<code>/delete mã_id</code>`,
    ``,
    `⏰ <b>Tự động nhắc nhở:</b>`,
    `Bot sẽ gửi tin nhắn lúc 8h sáng mỗi ngày nếu ngày mai có học viên đến đăng ký.`,
  ].join('\n');
}

// ============================================================
// Parse /add command
// ============================================================

export interface ParsedStudent {
  name: string;
  phone: string;
  type: 'chungchi' | 'daotao';
  registrationDate: string;
  vehicle: string;
}

export function parseAddCommand(text: string): ParsedStudent | string {
  // Remove the /add prefix
  const content = text.replace(/^\/add\s*/i, '').trim();

  if (!content) {
    return [
      `📝 <b>Cách thêm học viên:</b>`,
      ``,
      `<code>/add Tên, SĐT, loại, ngày, xe</code>`,
      ``,
      `<b>Ví dụ:</b>`,
      `<code>/add Nguyễn Văn A, 0901234567, chungchi, 2026-09-15, B2</code>`,
      ``,
      `• <b>loại</b>: <code>chungchi</code> hoặc <code>daotao</code>`,
      `• <b>ngày</b>: định dạng <code>YYYY-MM-DD</code>`,
      `• <b>xe</b>: B1, B2, C, D, E...`,
    ].join('\n');
  }

  const parts = content.split(',').map((p) => p.trim());

  if (parts.length < 5) {
    return '❌ Thiếu thông tin! Cần đủ: Tên, SĐT, loại, ngày, xe\n\nVí dụ:\n<code>/add Nguyễn Văn A, 0901234567, chungchi, 2026-09-15, B2</code>';
  }

  const [name, phone, typeRaw, date, vehicle] = parts;

  // Validate type
  const typeLower = typeRaw.toLowerCase();
  if (typeLower !== 'chungchi' && typeLower !== 'daotao') {
    return '❌ Loại học không hợp lệ! Chỉ chấp nhận: <code>chungchi</code> hoặc <code>daotao</code>';
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return '❌ Ngày không đúng định dạng! Dùng: <code>YYYY-MM-DD</code>\nVí dụ: <code>2026-09-15</code>';
  }

  // Validate date is a real date
  const dateObj = new Date(date + 'T00:00:00+07:00');
  if (isNaN(dateObj.getTime())) {
    return '❌ Ngày không hợp lệ!';
  }

  // Validate phone (basic)
  if (!/^[0-9]{8,15}$/.test(phone.replace(/[\s\-\.]/g, ''))) {
    return '❌ Số điện thoại không hợp lệ! Chỉ nhập số (8-15 chữ số).';
  }

  return {
    name,
    phone: phone.replace(/[\s\-\.]/g, ''),
    type: typeLower as 'chungchi' | 'daotao',
    registrationDate: date,
    vehicle: vehicle.toUpperCase(),
  };
}
