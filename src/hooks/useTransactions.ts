import { useState, useCallback, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns';
import { 
  Transaction, 
  Category, 
  TransactionFormData, 
  ChartData, 
  TrendPoint, 
  DateRange, 
  FilterType 
} from '../types';
import useLocalStorage from './useLocalStorage';
import { getCategoryColor } from '../constants/categories';

const useTransactions = () => {
  // Store transactions in localStorage
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  
  // Filter state
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRange>({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  });
  const [filterType, setFilterType] = useState<FilterType>('month');

  // Add a new transaction
  const addTransaction = useCallback((transactionData: TransactionFormData) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount: parseFloat(transactionData.amount),
      description: transactionData.description,
      category: transactionData.category,
      date: transactionData.date,
      isExpense: transactionData.isExpense,
    };

    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    return newTransaction;
  }, [setTransactions]);

  // Delete a transaction
  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prevTransactions => 
      prevTransactions.filter(transaction => transaction.id !== id)
    );
  }, [setTransactions]);

  // Update an existing transaction
  const updateTransaction = useCallback((updatedTransaction: Transaction) => {
    setTransactions(prevTransactions => 
      prevTransactions.map(transaction => 
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  }, [setTransactions]);

  // Filter transactions by date range and category
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionDate = parseISO(transaction.date);
      const startDate = parseISO(dateRangeFilter.startDate);
      const endDate = parseISO(dateRangeFilter.endDate);
      
      const isInDateRange = isWithinInterval(transactionDate, { start: startDate, end: endDate });
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
      
      return isInDateRange && matchesCategory;
    });
  }, [transactions, dateRangeFilter, categoryFilter]);

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return filteredTransactions
      .filter(t => t.isExpense)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }, [filteredTransactions]);

  // Calculate total income
  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter(t => !t.isExpense)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }, [filteredTransactions]);

  // Calculate net balance
  const netBalance = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  // Generate category data for pie chart
  const categoryData = useMemo(() => {
    const expensesByCategory: Record<Category, number> = {} as Record<Category, number>;
    
    filteredTransactions
      .filter(t => t.isExpense)
      .forEach(transaction => {
        const { category, amount } = transaction;
        expensesByCategory[category] = (expensesByCategory[category] || 0) + amount;
      });
    
    const chartData: ChartData[] = Object.entries(expensesByCategory).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: getCategoryColor(category as Category),
    }));
    
    return chartData.sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  // Generate trend data for line chart
  const trendData = useMemo(() => {
    const dailyExpenses: Record<string, number> = {};
    
    filteredTransactions
      .filter(t => t.isExpense)
      .forEach(transaction => {
        const date = transaction.date.slice(0, 10); // YYYY-MM-DD
        dailyExpenses[date] = (dailyExpenses[date] || 0) + transaction.amount;
      });
    
    const sortedDates = Object.keys(dailyExpenses).sort();
    
    return sortedDates.map(date => ({
      date,
      amount: dailyExpenses[date]
    })) as TrendPoint[];
  }, [filteredTransactions]);

  return {
    transactions,
    filteredTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    totalExpenses,
    totalIncome,
    netBalance,
    categoryData,
    trendData,
    categoryFilter,
    setCategoryFilter,
    dateRangeFilter,
    setDateRangeFilter,
    filterType,
    setFilterType,
  };
};

export default useTransactions;