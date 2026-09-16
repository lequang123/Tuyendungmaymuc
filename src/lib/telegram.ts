import type { Student } from './storage';

// ============================================================
// Config
// ============================================================

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ============================================================
// Keyboard types
// ============================================================

interface InlineButton {
  text: string;
  callback_data: string;
}

type InlineKeyboard = InlineButton[][];

interface ReplyButton {
  text: string;
}

type ReplyKeyboard = ReplyButton[][];

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

/**
 * Send message with inline keyboard buttons.
 */
export async function sendMessageWithInlineKeyboard(
  text: string,
  keyboard: InlineKeyboard,
  chatId: string = CHAT_ID,
): Promise<void> {
  await fetch(`${API_BASE}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: keyboard,
      },
    }),
  });
}

/**
 * Send message with persistent reply keyboard at the bottom.
 */
export async function sendMessageWithReplyKeyboard(
  text: string,
  keyboard: ReplyKeyboard,
  chatId: string = CHAT_ID,
): Promise<void> {
  await fetch(`${API_BASE}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: {
        keyboard,
        resize_keyboard: true,
        is_persistent: true,
      },
    }),
  });
}

/**
 * Answer a callback query (dismiss the "loading" state on inline button).
 */
export async function answerCallbackQuery(
  callbackQueryId: string,
  text?: string,
): Promise<void> {
  await fetch(`${API_BASE}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text,
    }),
  });
}

/**
 * Set bot commands menu (appears in the "/" menu).
 */
export async function setBotCommands(): Promise<void> {
  await fetch(`${API_BASE}/setMyCommands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      commands: [
        { command: 'add', description: '📝 Thêm học viên mới' },
        { command: 'list', description: '📋 Xem toàn bộ danh sách' },
        { command: 'listcc', description: '📜 Danh sách học chứng chỉ' },
        { command: 'listdt', description: '🎓 Danh sách học đào tạo' },
        { command: 'week', description: '📅 Danh sách 7 ngày tới' },
        { command: 'tomorrow', description: '⏰ Danh sách ngày mai' },
        { command: 'menu', description: '🏠 Hiện menu chính' },
        { command: 'help', description: '❓ Hướng dẫn sử dụng' },
      ],
    }),
  });
}

// ============================================================
// Pre-built keyboards
// ============================================================

/** Main menu inline keyboard */
export const MAIN_MENU_KEYBOARD: InlineKeyboard = [
  [
    { text: '📝 Thêm học viên', callback_data: 'cmd_add' },
    { text: '📋 Danh sách', callback_data: 'cmd_list' },
  ],
  [
    { text: '📜 Chứng chỉ', callback_data: 'cmd_listcc' },
    { text: '🎓 Đào tạo', callback_data: 'cmd_listdt' },
  ],
  [
    { text: '📅 7 ngày tới', callback_data: 'cmd_week' },
    { text: '⏰ Ngày mai', callback_data: 'cmd_tomorrow' },
  ],
  [
    { text: '❓ Hướng dẫn', callback_data: 'cmd_help' },
  ],
];

/** Persistent reply keyboard at the bottom */
export const REPLY_KEYBOARD: ReplyKeyboard = [
  [{ text: '📋 Danh sách' }, { text: '📝 Thêm HV' }],
  [{ text: '📜 Chứng chỉ' }, { text: '🎓 Đào tạo' }],
  [{ text: '📅 7 ngày tới' }, { text: '⏰ Ngày mai' }],
];

/** Map reply keyboard text → command */
export const REPLY_TEXT_TO_COMMAND: Record<string, string> = {
  '📋 Danh sách': '/list',
  '📝 Thêm HV': '/add',
  '📜 Chứng chỉ': '/listcc',
  '🎓 Đào tạo': '/listdt',
  '📅 7 ngày tới': '/week',
  '⏰ Ngày mai': '/tomorrow',
};

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
    `• <b>loại</b>: <code>1</code> = Chứng chỉ, <code>2</code> = Đào tạo`,
    `• <b>ngày</b>: <code>DD-MM</code> (VD: 15-09)`,
    `• <b>xe</b>: B1, B2, C, D, E...`,
    ``,
    `<b>Ví dụ:</b>`,
    `<code>/add Nguyễn Văn A, 0901234567, 1, 15-09, B2</code>`,
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
    `🏠 <b>Menu nhanh:</b>`,
    `/menu — Hiện menu chọn nhanh`,
    ``,
    `⏰ <b>Tự động nhắc nhở:</b>`,
    `Bot sẽ gửi tin nhắn lúc 8h sáng mỗi ngày nếu ngày mai có học viên đến đăng ký.`,
  ].join('\n');
}

export function formatMainMenu(): string {
  return [
    `🏠 <b>MENU CHÍNH</b>`,
    ``,
    `Chọn chức năng bên dưới hoặc gõ lệnh trực tiếp:`,
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
      `<code>/add Nguyễn Văn A, 0901234567, 1, 15-09, B2</code>`,
      ``,
      `• <b>loại</b>: <code>1</code> = Chứng chỉ, <code>2</code> = Đào tạo`,
      `• <b>ngày</b>: <code>DD-MM</code> (VD: 15-09)`,
      `• <b>xe</b>: B1, B2, C, D, E...`,
    ].join('\n');
  }

  const parts = content.split(',').map((p) => p.trim());

  if (parts.length < 5) {
    return '❌ Thiếu thông tin! Cần đủ: Tên, SĐT, loại, ngày, xe\n\nVí dụ:\n<code>/add Nguyễn Văn A, 0901234567, 1, 15-09, B2</code>';
  }

  const [name, phone, typeRaw, dateRaw, vehicle] = parts;

  // Validate type: 1 = chungchi, 2 = daotao
  const typeMap: Record<string, 'chungchi' | 'daotao'> = {
    '1': 'chungchi',
    '2': 'daotao',
  };
  const studentType = typeMap[typeRaw.trim()];
  if (!studentType) {
    return '❌ Loại học không hợp lệ!\n\n<code>1</code> = Chứng chỉ\n<code>2</code> = Đào tạo';
  }

  // Validate date format: DD-MM
  const dateMatch = dateRaw.match(/^(\d{1,2})-(\d{1,2})$/);
  if (!dateMatch) {
    return '❌ Ngày không đúng định dạng! Dùng: <code>DD-MM</code>\nVí dụ: <code>15-09</code>';
  }

  const day = parseInt(dateMatch[1], 10);
  const month = parseInt(dateMatch[2], 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return '❌ Ngày hoặc tháng không hợp lệ!';
  }

  // Always use current year
  const now = new Date();
  const vnNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
  const year = vnNow.getFullYear();

  const fullDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Validate the constructed date is real
  const [dayStr, monthStr] = fullDate.split('-');

  const dateObj = new Date(
    `${year}-${monthStr.padStart(2, '0')}-${dayStr.padStart(2, '0')}T00:00:00+07:00`
  );

  // Validate phone (basic)
  if (!/^[0-9]{8,15}$/.test(phone.replace(/[\s\-\.]/g, ''))) {
    return '❌ Số điện thoại không hợp lệ! Chỉ nhập số (8-15 chữ số).';
  }

  return {
    name,
    phone: phone.replace(/[\s\-\.]/g, ''),
    type: studentType,
    registrationDate: fullDate,
    vehicle: vehicle.toUpperCase(),
  };
}

