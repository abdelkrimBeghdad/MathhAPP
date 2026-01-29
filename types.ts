
export enum AppView {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  EXERCISES = 'EXERCISES',
  PROGRESS = 'PROGRESS',
  FORMULAS = 'FORMULAS',
  LESSON_DETAIL = 'LESSON_DETAIL',
  ADMIN = 'ADMIN',
  EXAMS = 'EXAMS',
  PLAYGROUND = 'PLAYGROUND',
  FLASHCARDS = 'FLASHCARDS'
}

export type YearOfStudy = '1AM' | '2AM' | '3AM' | '4AM';
export type MathField = 'NUMERICAL' | 'GEOMETRIC' | 'DATA_FUNCTIONS';
export type VisualizationType = 'THALES' | 'TRIGONOMETRY' | 'COORDINATES' | 'PGCD_VISUAL' | 'EXPANSION' | 'FACTORIZATION';

export interface CommonMistake {
  title: string;
  mistake: string;
  correction: string;
  tip: string;
}

export interface LessonContent {
  id?: string;
  subtitle: string;
  explanation: string;
  summary?: string; 
  visualization?: VisualizationType;
  commonMistakes?: CommonMistake[];
  example?: {
    problem: string;
    solution: string;
    interactiveAnswer: string; // الجواب المتوقع للمقارنة اليدوية
  };
  isVisible?: boolean;
}

export interface Chapter {
  id: string;
  field: MathField;
  segmentNumber: number;
  title: string;
  icon: string;
  description: string;
  color: string;
  detailedContent: LessonContent[];
  masteryLevel?: number;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: boolean;
  explanation: string;
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
  duration: number;
  questions: Exercise[];
}

export interface Student {
  id: string;
  firstName: string;
  level: number;
  xp: number;
  title: string;
  avatar: string;
  wilaya: string;
  achievements: string[];
}
