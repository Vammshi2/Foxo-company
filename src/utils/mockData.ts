import { Transaction, Category } from '../types';
import { subDays } from 'date-fns';

// Generate a date string for n days ago
const daysAgo = (days: number): string => {
  return subDays(new Date(), days).toISOString().split('T')[0];
};

// Generate mock transaction data
export const generateMockTransactions = (): Transaction[] => {
  return [
    {
      id: '1',
      amount: 2000,
      description: 'Monthly Salary',
      category: 'Income',
      date: daysAgo(2),
      isExpense: false,
    },
    {
      id: '2',
      amount: 800,
      description: 'Rent Payment',
      category: 'Housing',
      date: daysAgo(5),
      isExpense: true,
    },
    {
      id: '3',
      amount: 120,
      description: 'Grocery Shopping',
      category: 'Food',
      date: daysAgo(7),
      isExpense: true,
    },
    {
      id: '4',
      amount: 50,
      description: 'Gas',
      category: 'Transportation',
      date: daysAgo(10),
      isExpense: true,
    },
    {
      id: '5',
      amount: 35,
      description: 'Movie Night',
      category: 'Entertainment',
      date: daysAgo(12),
      isExpense: true,
    },
    {
      id: '6',
      amount: 500,
      description: 'Freelance Work',
      category: 'Income',
      date: daysAgo(15),
      isExpense: false,
    },
    {
      id: '7',
      amount: 200,
      description: 'Health Insurance',
      category: 'Insurance',
      date: daysAgo(18),
      isExpense: true,
    },
    {
      id: '8',
      amount: 75,
      description: 'Internet Bill',
      category: 'Utilities',
      date: daysAgo(20),
      isExpense: true,
    },
    {
      id: '9',
      amount: 60,
      description: 'Phone Bill',
      category: 'Utilities',
      date: daysAgo(25),
      isExpense: true,
    },
    {
      id: '10',
      amount: 150,
      description: 'New Clothes',
      category: 'Shopping',
      date: daysAgo(28),
      isExpense: true,
    },
  ];
};

// Load or initialize mock data
export const initMockData = (): void => {
  if (!localStorage.getItem('transactions')) {
    localStorage.setItem('transactions', JSON.stringify(generateMockTransactions()));
  }
};