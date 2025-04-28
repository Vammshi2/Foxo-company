import { Category } from '../types';
import { 
  Home, Car, Utensils, Lightbulb, Umbrella, Heart, 
  Music, ShoppingBag, User, GraduationCap, Plane, 
  TrendingUp, DollarSign, HelpCircle
} from 'lucide-react';

interface CategoryInfo {
  name: Category;
  icon: typeof Home;
  color: string;
}

export const categories: CategoryInfo[] = [
  { name: 'Housing', icon: Home, color: '#ef4444' },
  { name: 'Transportation', icon: Car, color: '#f97316' },
  { name: 'Food', icon: Utensils, color: '#84cc16' },
  { name: 'Utilities', icon: Lightbulb, color: '#3b82f6' },
  { name: 'Insurance', icon: Umbrella, color: '#8b5cf6' },
  { name: 'Healthcare', icon: Heart, color: '#ec4899' },
  { name: 'Entertainment', icon: Music, color: '#f43f5e' },
  { name: 'Shopping', icon: ShoppingBag, color: '#06b6d4' },
  { name: 'Personal', icon: User, color: '#14b8a6' },
  { name: 'Education', icon: GraduationCap, color: '#a855f7' },
  { name: 'Travel', icon: Plane, color: '#0ea5e9' },
  { name: 'Investments', icon: TrendingUp, color: '#22c55e' },
  { name: 'Income', icon: DollarSign, color: '#22c55e' },
  { name: 'Other', icon: HelpCircle, color: '#78716c' },
];

export const getCategoryInfo = (categoryName: Category): CategoryInfo | undefined => {
  return categories.find(category => category.name === categoryName);
};

export const getCategoryColor = (categoryName: Category): string => {
  const category = getCategoryInfo(categoryName);
  return category ? category.color : '#78716c';
};

export const getCategoryIcon = (categoryName: Category) => {
  const category = getCategoryInfo(categoryName);
  return category ? category.icon : HelpCircle;
};