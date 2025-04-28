import React, { useState } from 'react';
import useTransactions from '../hooks/useTransactions';
import { format, startOfMonth, endOfMonth, subMonths, subYears } from 'date-fns';
import { CalendarDays, BarChart4, ArrowDownAZ } from 'lucide-react';
import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';
import TransactionList from '../components/TransactionList';
import { formatCurrency, formatMonthYear } from '../utils/formatters';

const ReportsPage: React.FC = () => {
  const {
    filteredTransactions,
    deleteTransaction,
    totalExpenses,
    totalIncome,
    netBalance,
    categoryData,
    trendData,
    dateRangeFilter,
    setDateRangeFilter,
  } = useTransactions();

  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y' | 'all'>('3m');
  const [sortKey, setSortKey] = useState<'date' | 'amount' | 'category'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Handle date range selections
  const handleTimeRangeChange = (range: '1m' | '3m' | '6m' | '1y' | 'all') => {
    setTimeRange(range);
    
    const today = new Date();
    let startDate;
    
    switch (range) {
      case '1m':
        startDate = startOfMonth(today);
        break;
      case '3m':
        startDate = subMonths(today, 3);
        break;
      case '6m':
        startDate = subMonths(today, 6);
        break;
      case '1y':
        startDate = subYears(today, 1);
        break;
      case 'all':
        startDate = new Date(2000, 0, 1); // Effectively "all time"
        break;
      default:
        startDate = subMonths(today, 3);
    }
    
    setDateRangeFilter({
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endOfMonth(today), 'yyyy-MM-dd'),
    });
  };

  // Sort transactions based on current sort criteria
  const sortedTransactions = React.useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let comparison = 0;
      
      if (sortKey === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortKey === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortKey === 'category') {
        comparison = a.category.localeCompare(b.category);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredTransactions, sortKey, sortDirection]);

  // Toggle sort direction
  const toggleSort = (key: 'date' | 'amount' | 'category') => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analysis</h1>
      
      {/* Time range selector */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <CalendarDays className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Time Range:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            { value: '1m', label: 'This Month' },
            { value: '3m', label: 'Last 3 Months' },
            { value: '6m', label: 'Last 6 Months' },
            { value: '1y', label: 'Last Year' },
            { value: 'all', label: 'All Time' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleTimeRangeChange(option.value as any)}
              className={`px-3 py-1.5 text-sm rounded-md ${
                timeRange === option.value
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Showing data from {formatMonthYear(dateRangeFilter.startDate)} to {formatMonthYear(dateRangeFilter.endDate)}
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="text-sm text-gray-500 mb-1">Total Income</h3>
          <p className="text-2xl font-bold text-success-600">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="text-sm text-gray-500 mb-1">Total Expenses</h3>
          <p className="text-2xl font-bold text-error-600">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="text-sm text-gray-500 mb-1">Net Balance</h3>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-success-600' : 'text-error-600'}`}>
            {formatCurrency(Math.abs(netBalance))}
          </p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          data={categoryData}
          title="Spending by Category"
        />
        <LineChart
          data={trendData}
          title="Spending Over Time"
        />
      </div>
      
      {/* Transaction list with sorting */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            All Transactions
          </h3>
          
          <div className="flex items-center space-x-2">
            <BarChart4 className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleSort('date')}
                className={`flex items-center px-3 py-1 text-sm rounded-md ${
                  sortKey === 'date'
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>Date</span>
                {sortKey === 'date' && (
                  <ArrowDownAZ className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </button>
              
              <button
                onClick={() => toggleSort('amount')}
                className={`flex items-center px-3 py-1 text-sm rounded-md ${
                  sortKey === 'amount'
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>Amount</span>
                {sortKey === 'amount' && (
                  <ArrowDownAZ className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </button>
              
              <button
                onClick={() => toggleSort('category')}
                className={`flex items-center px-3 py-1 text-sm rounded-md ${
                  sortKey === 'category'
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>Category</span>
                {sortKey === 'category' && (
                  <ArrowDownAZ className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <TransactionList
          transactions={sortedTransactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default ReportsPage;