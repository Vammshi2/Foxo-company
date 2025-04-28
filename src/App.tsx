import React, { useState } from 'react';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import AddTransactionPage from './pages/AddTransactionPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  const [activeView, setActiveView] = useState<string>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Layout>
        {activeView === 'dashboard' && <DashboardPage />}
        {activeView === 'add-transaction' && <AddTransactionPage />}
        {activeView === 'reports' && <ReportsPage />}
      </Layout>
    </div>
  );
}

export default App;