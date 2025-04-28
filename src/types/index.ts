export type Category = 
  | 'Housing'
  | 'Transportation'
  | 'Food'
  | 'Utilities'
  | 'Insurance'
  | 'Healthcare'
  | 'Entertainment'
  | 'Shopping'
  | 'Personal'
  | 'Education'
  | 'Travel'
  | 'Investments'
  | 'Income'
  | 'Other';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string; // ISO string
  isExpense: boolean;
}

export interface TransactionFormData {
  amount: string;
  description: string;
  category: Category;
  date: string;
  isExpense: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface TrendPoint {
  date: string;
  amount: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export type FilterType = 'all' | 'month' | 'custom';