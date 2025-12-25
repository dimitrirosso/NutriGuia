export enum NutrientType {
  PROTEIN = 'Proteínas',
  FIBER = 'Fibras',
  CARBS = 'Carboidratos',
  FATS = 'Gorduras Boas'
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  portion: string;
  mainNutrientAmount: number; // in grams
  mainNutrientUnit: string;
  calories: number;
  description?: string;
}

export interface CategoryData {
  id: string;
  title: string;
  type: NutrientType;
  description: string;
  color: string;
  items: FoodItem[];
  iconName: string; // Using Lucide icon names as strings
}

export type SortOption = 'name' | 'nutrient';

export interface User {
  name: string;
  email: string;
  password?: string; // Adicionado para persistência no mock
  isPro: boolean;
  joinedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  logout: () => void;
  upgradeToPro: () => void;
  isLoading: boolean;
}

// Bonus Module Types
export type ExerciseLevel = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface ExerciseItem {
  id: string;
  name: string;
  image: string;
  instructionMain: string; // e.g., "3 sets of 15 reps"
  level: ExerciseLevel;
  steps: string[];
  safetyTip: string;
}

export interface BonusCategoryData {
  id: string;
  title: string;
  description: string;
  color: string; // Gradient class usually
  iconName: string;
  items: ExerciseItem[];
}