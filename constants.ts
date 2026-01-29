
import { Chapter, MathField, Exercise, MockExam, Flashcard } from './types';

export const FIELD_LABELS: Record<string, string> = {
  'NUMERICAL': 'الأنشطة العددية',
  'GEOMETRIC': 'الأنشطة الهندسية',
  'DATA_FUNCTIONS': 'تنظيم المعطيات والدوال'
};

export const CHAPTERS: Chapter[] = [
  {
    id: 'seg1',
    field: 'NUMERICAL',
    segmentNumber: 1,
    title: 'الأعداد الطبيعية والناطقة',
    icon: '🔢',
    description: 'قواعد الحساب، القواسم، والـ PGCD.',
    color: 'bg-indigo-600',
    masteryLevel: 75,
    detailedContent: [
      { 
        id: 'l1', 
        subtitle: 'قاسم عدد طبيعي', 
        explanation: 'القول أن b قاسم لـ a يعني وجود عدد k حيث a = bk.', 
        summary: 'العدد b يقسم a إذا كان باقي القسمة الإقليدية لـ a على b هو الصفر.\n a = b × k',
        example: {
          problem: 'هل العدد {#blue:8} قاسم للعدد {#indigo:64}؟ (اكتب: نعم أو لا)',
          solution: '{#indigo:64} = {#blue:8}({#green:8}) + {#red:0}\n نعم، لأن الباقي صفر.',
          interactiveAnswer: 'نعم'
        },
        isVisible: true 
      },
      { 
        id: 'l3', 
        subtitle: 'خوارزمية إقليدس', 
        explanation: 'حساب PGCD عن طريق القسمات المتتالية.', 
        summary: 'تعتمد خوارزمية إقليدس على القسمة الإقليدية المتتالية حتى الحصول على باقي معدوم. \n a = b × q + r',
        visualization: 'PGCD_VISUAL', 
        example: {
          problem: 'احسب PGCD(25, 10).',
          solution: '{#blue:25} = {#red:10}({#slate:2}) + {#green:5}\n {#red:10} = {#green:5}({#slate:2}) + {#orange:0}\n إذن PGCD هو {#green:5}.',
          interactiveAnswer: '5'
        },
        isVisible: true 
      }
    ]
  },
  {
    id: 'seg4',
    field: 'NUMERICAL',
    segmentNumber: 4,
    title: 'الحساب الحرفي والمعادلات',
    icon: '📝',
    description: 'النشر، التحليل، وحل المعادلات.',
    color: 'bg-purple-600',
    masteryLevel: 60,
    detailedContent: [
      { 
        id: 'l17', 
        subtitle: 'النشر والتبسيط', 
        explanation: 'توزيع الضرب على الجمع والطرح باستخدام الأقواس لتوضيح توزيع العناصر.', 
        summary: 'نشر عبارة هو كتابتها على شكل مجموع أو فرق. \n k(a+b) = ka + kb',
        visualization: 'EXPANSION', 
        example: {
          problem: 'انشر العبارة: {#blue:2}({#red:x} + {#green:5})',
          solution: '{#blue:2}({#red:x} + {#green:5}) = {#blue:2}({#red:x}) + {#blue:2}({#green:5}) = 2x + 10',
          interactiveAnswer: '2x+10'
        },
        isVisible: true 
      },
      { 
        id: 'l18', 
        subtitle: 'المتطابقات الشهيرة', 
        explanation: 'قواعد النشر السريع المعتمدة على المربعات.', 
        summary: '(a+b)² = a² + 2ab + b² \n (a-b)² = a² - 2ab + b² \n (a-b)(a+b) = a² - b²',
        example: {
          problem: 'انشر العبارة: ({#blue:x} + {#red:3})²',
          solution: '({#blue:x} + {#red:3})² = ({#blue:x})² + 2({#blue:x})({#red:3}) + ({#red:3})² = x² + 6x + 9',
          interactiveAnswer: 'x²+6x+9'
        },
        isVisible: true 
      }
    ]
  },
  {
    id: 'seg5',
    field: 'GEOMETRIC',
    segmentNumber: 5,
    title: 'خاصية طالس',
    icon: '📐',
    description: 'حساب الأطوال وإثبات التوازي.',
    color: 'bg-blue-500',
    masteryLevel: 40,
    detailedContent: [
      {
        id: 'l20',
        subtitle: 'خاصية طالس المباشرة',
        explanation: 'تستعمل لحساب الأطوال في حالة التوازي.',
        summary: 'إذا كان (BC) // (MN) فإن الأطوال متناسبة: \n AM / AB = AN / AC = MN / BC',
        visualization: 'THALES',
        example: {
          problem: 'إذا كان AM=2، AB=6، BC=12. احسب MN.',
          solution: 'AM / AB = MN / BC\n 2 / 6 = MN / 12\n 6(MN) = 2(12)\n 6(MN) = 24\n MN = 24 / 6 = 4',
          interactiveAnswer: '4'
        },
        isVisible: true
      }
    ]
  }
];

export const EXERCISES: Exercise[] = [
  {
    id: 'ex1',
    chapterId: 'seg1',
    question: 'ما هو PGCD(12, 18)؟',
    options: ['3', '6', '2', '12'],
    correctAnswer: 1,
    explanation: 'القاسم المشترك الأكبر للعددين 12 و 18 هو 6.'
  }
];

export const BEM_EXAMS: MockExam[] = [
  {
    id: 'bem2023',
    title: 'امتحان شهادة التعليم المتوسط 2023',
    year: 2023,
    duration: 120,
    questions: [
      {
        id: 'q1',
        chapterId: 'seg1',
        question: 'احسب PGCD(1053, 825)',
        options: ['3', '39', '13', '1'],
        correctAnswer: 1,
        explanation: 'النتيجة هي 39.'
      }
    ]
  }
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'f1',
    question: 'هل √(a + b) = √a + √b دائماً؟',
    answer: false,
    explanation: 'هذا خطأ شائع. الجذور لا تتوزع على الجمع.'
  }
];
