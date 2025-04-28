import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Calendar, Filter } from 'lucide-react';
import { formatCurrency, formatMonthYear } from '../utils/formatters';
import { Category, FilterType } from '../types';
import PieChart from './charts/PieChart';
import LineChart from './charts/LineChart';
import TransactionList from './TransactionList';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';

interface DashboardProps {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  categoryData: any[];
  trendData: any[];
  transactions: any[];
  categoryFilter: Category | 'all';
  setCategoryFilter: (category: Category | 'all') => void;
  dateRangeFilter: { startDate: string; endDate: string };
  setDateRangeFilter: (range: { startDate: string; endDate: string }) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  onDeleteTransaction: (id: string) => void;
  onEditTransaction?: (transaction: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  totalIncome,
  totalExpenses,
  netBalance,
  categoryData,
  trendData,
  transactions,
  categoryFilter,
  setCategoryFilter,
  dateRangeFilter,
  setDateRangeFilter,
  filterType,
  setFilterType,
  onDeleteTransaction,
  onEditTransaction,
}) => {
  // Handle filter type changes
  const handleFilterChange = (type: FilterType) => {
    setFilterType(type);
    
    const today = new Date();
    
    if (type === 'month') {
      // Current month
      setDateRangeFilter({
        startDate: format(startOfMonth(today), 'yyyy-MM-dd'),
        endDate: format(endOfMonth(today), 'yyyy-MM-dd'),
      });
    } else if (type === 'all') {
      // Set a large range effectively showing all transactions
      setDateRangeFilter({
        startDate: format(new Date(2000, 0, 1), 'yyyy-MM-dd'),
        endDate: format(new Date(2099, 11, 31), 'yyyy-MM-dd'),
      });
    }
  };

  // Navigate to previous period
  const previousPeriod = () => {
    if (filterType === 'month') {
      const startDate = new Date(dateRangeFilter.startDate);
      const prevMonth = subMonths(startDate, 1);
      setDateRangeFilter({
        startDate: format(startOfMonth(prevMonth), 'yyyy-MM-dd'),
        endDate: format(endOfMonth(prevMonth), 'yyyy-MM-dd'),
      });
    }
  };

  // Navigate to next period
  const nextPeriod = () => {
    if (filterType === 'month') {
      const startDate = new Date(dateRangeFilter.startDate);
      const nextMonth = new Date(startDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setDateRangeFilter({
        startDate: format(startOfMonth(nextMonth), 'yyyy-MM-dd'),
        endDate: format(endOfMonth(nextMonth), 'yyyy-MM-dd'),
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Filter controls */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600 font-medium">View:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleFilterChange('month')}
              className={`px-3 py-1 text-sm rounded-md ${
                filterType === 'month'
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-1 text-sm rounded-md ${
                filterType === 'all'
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {filterType === 'month' && (
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <button
              onClick={previousPeriod}
              className="p-1 rounded-md hover:bg-gray-100"
              aria-label="Previous month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">
                {formatMonthYear(dateRangeFilter.startDate)}
              </span>
            </div>
            <button
              onClick={nextPeriod}
              className="p-1 rounded-md hover:bg-gray-100"
              aria-label="Next month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Income</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalIncome)}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-success-100 flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Expenses</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalExpenses)}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-error-100 flex items-center justify-center">
              <ArrowDownRight className="h-6 w-6 text-error-600" />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Net Balance</p>
              <h3 className={`text-2xl font-bold ${netBalance >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                {formatCurrency(Math.abs(netBalance))}
              </h3>
            </div>
            <div className={`h-12 w-12 rounded-full ${netBalance >= 0 ? 'bg-success-100' : 'bg-error-100'} flex items-center justify-center`}>
              <DollarSign className={`h-6 w-6 ${netBalance >= 0 ? 'text-success-600' : 'text-error-600'}`} />
            </div>
          </div>
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
          title="Spending Trends"
        />
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h3>
        <TransactionList
          transactions={transactions}
          onDelete={onDeleteTransaction}
          onEdit={onEditTransaction}
        />
      </div>
    </div>
  );
};

export default Dashboard;