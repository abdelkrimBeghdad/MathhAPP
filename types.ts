
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  EXERCISES = 'EXERCISES',
  PROGRESS = 'PROGRESS',
  FORMULAS = 'FORMULAS',
  LESSON_DETAIL = 'LESSON_DETAIL'
}

export type VisualizationType = 'THALES' | 'TRIGONOMETRY' | 'COORDINATES' | 'PGCD_VISUAL';

export interface LessonContent {
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
}

export interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chapterId: string;
}
