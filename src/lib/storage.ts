import { put, list } from '@vercel/blob';

// ============================================================
// Data types
// ============================================================

export interface Student {
  id: string;
  name: string;
  phone: string;
  type: 'chungchi' | 'daotao';
  registrationDate: string; // YYYY-MM-DD
  vehicle: string;
  createdAt: string;
  reminded: boolean;
}

const BLOB_FILENAME = 'students.json';

// ============================================================
// Helpers
// ============================================================

/**
 * Find the latest blob URL for students.json.
 * Vercel Blob `put` with the same pathname creates a new blob each time,
 * so we list all blobs with the prefix and pick the most recent.
 */
async function findBlobUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: BLOB_FILENAME });
  if (blobs.length === 0) return null;
  // Sort by uploadedAt descending and take the latest
  blobs.sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  );
  return blobs[0].url;
}

// ============================================================
// Public API
// ============================================================

/**
 * Read all students from Vercel Blob.
 */
export async function getStudents(): Promise<Student[]> {
  try {
    const url = await findBlobUrl();
    if (!url) return [];
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data: Student[] = await res.json();
    return data;
  } catch {
    return [];
  }
}

/**
 * Persist the full students array to Vercel Blob.
 * Uses `addRandomSuffix: false` so the pathname stays stable.
 */
export async function saveStudents(students: Student[]): Promise<void> {
  await put(BLOB_FILENAME, JSON.stringify(students, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

/**
 * Add a single student and persist.
 */
export async function addStudent(
  student: Omit<Student, 'id' | 'createdAt' | 'reminded'>,
): Promise<Student> {
  const students = await getStudents();
  const newStudent: Student = {
    ...student,
    id: generateId(),
    createdAt: new Date().toISOString(),
    reminded: false,
  };
  students.push(newStudent);
  await saveStudents(students);
  return newStudent;
}

/**
 * Delete a student by ID prefix match (first 4+ chars).
 */
export async function deleteStudent(
  idPrefix: string,
): Promise<Student | null> {
  const students = await getStudents();
  const index = students.findIndex((s) =>
    s.id.toLowerCase().startsWith(idPrefix.toLowerCase()),
  );
  if (index === -1) return null;
  const [removed] = students.splice(index, 1);
  await saveStudents(students);
  return removed;
}

/**
 * Get students by type.
 */
export async function getStudentsByType(
  type: 'chungchi' | 'daotao',
): Promise<Student[]> {
  const students = await getStudents();
  return students.filter((s) => s.type === type);
}

/**
 * Get students whose registrationDate falls within the next N days
 * (from today, inclusive of today+1 to today+N).
 */
export async function getStudentsNextDays(days: number): Promise<Student[]> {
  const students = await getStudents();
  const now = getVietnamDate();
  const today = stripTime(now);

  return students.filter((s) => {
    const regDate = new Date(s.registrationDate + 'T00:00:00+07:00');
    const regDay = stripTime(regDate);
    const diff = (regDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 1 && diff <= days;
  });
}

/**
 * Get students whose registrationDate is tomorrow (Vietnam timezone).
 */
export async function getStudentsTomorrow(): Promise<Student[]> {
  return getStudentsNextDays(1);
}

/**
 * Mark students as reminded.
 */
export async function markReminded(ids: string[]): Promise<void> {
  const students = await getStudents();
  for (const s of students) {
    if (ids.includes(s.id)) {
      s.reminded = true;
    }
  }
  await saveStudents(students);
}

// ============================================================
// Utility
// ============================================================

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) +
    Date.now().toString(36);
}

/**
 * Get current date/time in Vietnam timezone (UTC+7).
 */
function getVietnamDate(): Date {
  const now = new Date();
  // Create a date string in Vietnam timezone and parse it back
  const vnString = now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
  return new Date(vnString);
}

/**
 * Strip time component, keeping only date.
 */
function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
