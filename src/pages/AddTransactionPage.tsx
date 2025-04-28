import React from 'react';
import TransactionForm from '../components/TransactionForm';
import useTransactions from '../hooks/useTransactions';

const AddTransactionPage: React.FC = () => {
  const { addTransaction } = useTransactions();

  const handleSubmit = (formData: any) => {
    addTransaction(formData);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed bottom-4 right-4 bg-success-100 text-success-800 px-4 py-2 rounded-md shadow-md animate-slide-up';
    successMsg.textContent = 'Transaction added successfully!';
    document.body.appendChild(successMsg);
    
    // Remove after 3 seconds
    setTimeout(() => {
      document.body.removeChild(successMsg);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Transaction</h1>
      <TransactionForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTransactionPage;