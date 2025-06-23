export interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration?: string;
  completed?: boolean;
}

export interface Module {
  id: number;
  title: string;
  summary?: string;
  coverImage?: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  students?: number;
  rating?: number;
  price?: string;
  thumbnail: string;
  progress?: number;
  enrolled?: boolean;
  instructor: string;
  modules?: Module[];
}