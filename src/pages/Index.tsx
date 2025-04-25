
import React from 'react';
import { ApplicationProvider } from '@/context/ApplicationContext';
import Dashboard from '@/pages/Dashboard';
import Navbar from '@/components/layout/Navbar';

const Index: React.FC = () => {
  return (
    <ApplicationProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Dashboard />
        </main>
      </div>
    </ApplicationProvider>
  );
};

export default Index;
