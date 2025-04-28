import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import TransactionForm from '../components/TransactionForm';
import useTransactions from '../hooks/useTransactions';
import { Transaction } from '../types';

const DashboardPage: React.FC = () => {
  const {
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
  } = useTransactions();

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const handleUpdate = (formData: any) => {
    if (selectedTransaction) {
      const updatedTransaction: Transaction = {
        ...selectedTransaction,
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        date: formData.date,
        isExpense: formData.isExpense,
      };
      
      updateTransaction(updatedTransaction);
      setShowEditModal(false);
      setSelectedTransaction(null);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="pb-10">
      <Dashboard
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netBalance={netBalance}
        categoryData={categoryData}
        trendData={trendData}
        transactions={filteredTransactions}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        filterType={filterType}
        setFilterType={setFilterType}
        onDeleteTransaction={handleDelete}
        onEditTransaction={handleEdit}
      />

      {/* Edit Transaction Modal */}
      {showEditModal && selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={handleCloseModal}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={handleCloseModal}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 sm:mt-0">
                <TransactionForm
                  onSubmit={handleUpdate}
                  initialData={{
                    amount: selectedTransaction.amount.toString(),
                    description: selectedTransaction.description,
                    category: selectedTransaction.category,
                    date: selectedTransaction.date,
                    isExpense: selectedTransaction.isExpense,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;