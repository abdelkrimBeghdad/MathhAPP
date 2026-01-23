
import { Chapter, Exercise, LessonContent } from '../types';

// ملاحظة: في بيئة التطوير المحلية أو العرض، قد لا يكون السيرفر متاحاً.
const API_BASE_URL = '/api/v1';

/**
 * دالة مساعدة للتحقق من وجود السيرفر قبل محاولة الجلب
 */
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
    const data = await safeFetch(`${API_BASE_URL}/chapters`);
    if (data) return data;

    // التراجع التلقائي للبيانات المحلية
    const { CHAPTERS } = await import('../constants');
    return CHAPTERS;
  },

  /**
   * إنشاء وحدة دراسية جديدة (للأدمن)
   */
  async createChapter(chapter: Partial<Chapter>): Promise<any> {
    const result = await safeFetch(`${API_BASE_URL}/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chapter)
    });
    if (result) return result;
    
    console.log('Admin: Simulated Chapter Creation', chapter);
    return { status: 'simulated_success', data: chapter };
  },

  /**
   * إضافة درس لوحدة دراسية (للأدمن)
   */
  async addLesson(chapterId: string, lesson: LessonContent): Promise<any> {
    const result = await safeFetch(`${API_BASE_URL}/chapters/${chapterId}/lessons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson)
    });
    if (result) return result;

    console.log('Admin: Simulated Lesson Addition', { chapterId, lesson });
    return { status: 'simulated_success', data: lesson };
  },

  /**
   * جلب التمارين الخاصة بوحدة معينة
   */
  async getExercises(chapterId: string): Promise<Exercise[]> {
    const data = await safeFetch(`${API_BASE_URL}/exercises/${chapterId}`);
    if (data) return data;

    const { EXERCISES } = await import('../constants');
    return EXERCISES.filter(ex => ex.chapterId === chapterId);
  },

  /**
   * مزامنة نقاط التلميذ
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
