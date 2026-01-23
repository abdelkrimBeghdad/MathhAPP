
import { Chapter, Exercise } from '../types';

// ملاحظة: في بيئة التطوير المحلية أو العرض، قد لا يكون السيرفر متاحاً.
const API_BASE_URL = '/api/v1';

/**
 * دالة مساعدة للتحقق من وجود السيرفر قبل محاولة الجلب
 * لتجنب رسائل الخطأ الحمراء في المتصفح قدر الإمكان.
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

    // التراجع التلقائي للبيانات المحلية في حال فشل الاتصال بالـ Backend
    console.warn('MathDz: Backend API not reachable. Using local chapters data.');
    const { CHAPTERS } = await import('../constants');
    return CHAPTERS;
  },

  /**
   * جلب التمارين الخاصة بوحدة معينة
   */
  async getExercises(chapterId: string): Promise<Exercise[]> {
    const data = await safeFetch(`${API_BASE_URL}/exercises/${chapterId}`);
    if (data) return data;

    console.warn(`MathDz: Backend API not reachable. Using local exercises for chapter: ${chapterId}`);
    const { EXERCISES } = await import('../constants');
    return EXERCISES.filter(ex => ex.chapterId === chapterId);
  },

  /**
   * مزامنة نقاط التلميذ مع قاعدة بيانات Laravel
   */
  async syncProgress(points: number, studentId: string = 'guest_user'): Promise<any> {
    const result = await safeFetch(`${API_BASE_URL}/progress/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: studentId, points })
    });

    if (result) return result;

    // في حال عدم الاتصال، نحفظ البيانات محلياً في المتصفح
    localStorage.setItem('math_dz_points', points.toString());
    return { status: 'cached_locally', current_points: points };
  }
};
