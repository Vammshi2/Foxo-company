import React, { ReactNode, useState } from 'react';
import { Menu, X, LayoutDashboard, ListPlus, BarChart3, CircleDollarSign } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
      active 
        ? 'bg-primary-100 text-primary-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <span className={active ? 'text-primary-600' : 'text-gray-500'}>
      {icon}
    </span>
    <span className="font-medium">{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when changing views
  const handleViewChange = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {/* <CircleDollarSign className="w-8 h-8 text-primary-600" /> */}
            <h1 className="text-xl font-bold text-gray-900">Foxo.club</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Personal Finance Tracker</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={activeView === 'dashboard'} 
            onClick={() => handleViewChange('dashboard')}
          />
          <NavItem 
            icon={<ListPlus className="w-5 h-5" />} 
            label="Add Transaction" 
            active={activeView === 'add-transaction'} 
            onClick={() => handleViewChange('add-transaction')}
          />
          <NavItem 
            icon={<BarChart3 className="w-5 h-5" />} 
            label="Reports" 
            active={activeView === 'reports'} 
            onClick={() => handleViewChange('reports')}
          />
        </nav>
      </aside>

      {/* Mobile menu button and header */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 md:py-0">
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="ml-3 flex items-center space-x-2">
              {/* <CircleDollarSign className="w-6 h-6 text-primary-600" /> */}
              <h1 className="text-lg font-bold text-gray-900">Foxo.club</h1>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-gray-600 bg-opacity-75">
            <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* <CircleDollarSign className="w-7 h-7 text-primary-600" /> */}
                    <h1 className="text-xl font-bold text-gray-900">Foxo.club</h1>
                  </div>
                  <button 
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Personal Finance Tracker</p>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                <NavItem 
                  icon={<LayoutDashboard className="w-5 h-5" />} 
                  label="Dashboard" 
                  active={activeView === 'dashboard'} 
                  onClick={() => handleViewChange('dashboard')}
                />
                <NavItem 
                  icon={<ListPlus className="w-5 h-5" />} 
                  label="Add Transaction" 
                  active={activeView === 'add-transaction'} 
                  onClick={() => handleViewChange('add-transaction')}
                />
                <NavItem 
                  icon={<BarChart3 className="w-5 h-5" />} 
                  label="Reports" 
                  active={activeView === 'reports'} 
                  onClick={() => handleViewChange('reports')}
                />
              </nav>
            </div>
          </div>
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;