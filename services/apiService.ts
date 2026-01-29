
import { Chapter, Exercise, LessonContent, Student } from '../types';

const API_BASE_URL = '/api/v1';

async function safeFetch(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    return null;
  }
}

export const apiService = {
  /**
   * جلب كافة الوحدات الدراسية
   */
  async getChapters(): Promise<Chapter[]> {
    // Check local storage first (Admin modifications)
    const saved = localStorage.getItem('mathdz_chapters_db');
    if (saved) return JSON.parse(saved);

    const data = await safeFetch(`${API_BASE_URL}/chapters`);
    if (data) return data;

    // Fallback to constants
    const { CHAPTERS } = await import('../constants');
    return CHAPTERS;
  },

  /**
   * إضافة تلميذ جديد
   */
  async addStudent(student: Partial<Student>): Promise<any> {
    const result = await safeFetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (result) return result;

    // Local DB simulation
    const saved = localStorage.getItem('mathdz_students_db');
    const students = saved ? JSON.parse(saved) : [];
    const updated = [student, ...students];
    localStorage.setItem('mathdz_students_db', JSON.stringify(updated));
    
    return { status: 'success', data: student };
  },

  /**
   * جلب التمارين الخاصة بوحدة معينة
   */
  async getExercises(chapterId: string): Promise<Exercise[]> {
    // Check local storage first
    const saved = localStorage.getItem('mathdz_exercises_db');
    if (saved) {
      const allEx = JSON.parse(saved) as Exercise[];
      const filtered = allEx.filter(ex => ex.chapterId === chapterId);
      if (filtered.length > 0) return filtered;
    }

    const data = await safeFetch(`${API_BASE_URL}/exercises/${chapterId}`);
    if (data) return data;

    // Fix: Using newly exported EXERCISES from constants
    const { EXERCISES } = await import('../constants');
    return EXERCISES.filter(ex => ex.chapterId === chapterId);
  },

  /**
   * مزامنة النقاط
   */
  async syncProgress(points: number, studentId: string = 'guest_user'): Promise<any> {
    const result = await safeFetch(`${API_BASE_URL}/progress/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: studentId, points })
    });

    if (result) return result;

    localStorage.setItem('math_dz_points', points.toString());
    return { status: 'cached_locally', current_points: points };
  }
};
