import React, { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-5 ${className} animate-fade-in`}>
      <h3 className="text-gray-700 font-medium text-lg mb-4">{title}</h3>
      <div className="mt-2">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;