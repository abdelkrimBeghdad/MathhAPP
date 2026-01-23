
export enum AppView {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  EXERCISES = 'EXERCISES',
  PROGRESS = 'PROGRESS',
  FORMULAS = 'FORMULAS',
  LESSON_DETAIL = 'LESSON_DETAIL',
  ADMIN = 'ADMIN',
  EXAMS = 'EXAMS'
}

export type YearOfStudy = '1AM' | '2AM' | '3AM' | '4AM';

export type MathField = 'NUMERICAL' | 'GEOMETRIC' | 'DATA_FUNCTIONS';

export type VisualizationType = 'THALES' | 'TRIGONOMETRY' | 'COORDINATES' | 'PGCD_VISUAL';

export interface LessonContent {
  id?: string;
  subtitle: string;
  explanation: string;
  visualization?: VisualizationType;
  example?: {
    problem: string;
    solution: string;
  };
}

export interface Chapter {
  id: string;
  field: MathField;
  segmentNumber: number; // 1 to 7
  title: string;
  icon: string;
  description: string;
  color: string;
  detailedContent: LessonContent[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chapterId: string;
}

export interface MockExam {
  id: string;
  title: string;
  year: number;
  duration: number; // minutes
  questions: Exercise[];
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  yearOfStudy: YearOfStudy;
  birthDate: string;
  gender: 'male' | 'female';
  wilaya: string;
  schoolName: string;
  fatherName: string;
  fatherPhone: string;
  points: number;
  progress: number;
  lastSeen: string;
  avatar: string;
}
