import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { TransactionFormData, Category } from '../types';
import { categories } from '../constants/categories';

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  initialData?: TransactionFormData;
}

const defaultFormData: TransactionFormData = {
  amount: '',
  description: '',
  category: 'Other',
  date: new Date().toISOString().split('T')[0],
  isExpense: true,
};

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  onSubmit, 
  initialData = defaultFormData 
}) => {
  const [formData, setFormData] = useState<TransactionFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof TransactionFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name as keyof TransactionFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleTransactionType = () => {
    setFormData(prev => ({ ...prev, isExpense: !prev.isExpense }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TransactionFormData, string>> = {};
    
    if (!formData.amount || isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than zero';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Reset form after submission if this is a new transaction
      if (!initialData.amount) {
        setFormData(defaultFormData);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {initialData.amount ? 'Edit Transaction' : 'Add New Transaction'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            type="button"
            onClick={toggleTransactionType}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              formData.isExpense
                ? 'bg-error-50 text-error-600 ring-1 ring-error-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MinusCircle className="h-5 w-5" />
            <span>Expense</span>
          </button>
          
          <button
            type="button"
            onClick={toggleTransactionType}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              !formData.isExpense
                ? 'bg-success-50 text-success-600 ring-1 ring-success-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <PlusCircle className="h-5 w-5" />
            <span>Income</span>
          </button>
        </div>
        
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`pl-8 pr-3 py-2 block w-full rounded-md border ${
                errors.amount ? 'border-error-300' : 'border-gray-300'
              } shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-error-600">{errors.amount}</p>}
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              errors.description ? 'border-error-300' : 'border-gray-300'
            } shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-3 py-2`}
            placeholder="What was this transaction for?"
          />
          {errors.description && <p className="mt-1 text-sm text-error-600">{errors.description}</p>}
        </div>
        
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-3 py-2"
          >
            {categories.map(category => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              errors.date ? 'border-error-300' : 'border-gray-300'
            } shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-3 py-2`}
          />
          {errors.date && <p className="mt-1 text-sm text-error-600">{errors.date}</p>}
        </div>
        
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            {initialData.amount ? 'Update' : 'Add'} Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;