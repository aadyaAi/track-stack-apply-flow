
import React from 'react';
import Dashboard from '@/pages/Dashboard';
import Navbar from '@/components/layout/Navbar';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
