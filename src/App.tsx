import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RequestDetails from './pages/RequestDetails';
import Settings from './pages/Settings';
import { CleaningProvider } from './context/CleaningContext';
import { Menu } from 'lucide-react';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <CleaningProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          {/* Мобильное меню */}
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg md:hidden"
          >
            <Menu size={24} className="text-gray-600" />
          </button>

          {/* Затемнение фона при открытом меню на мобильных */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={toggleSidebar}
            />
          )}

          {/* Боковая панель */}
          <div
            className={`fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>

          {/* Основной контент */}
          <main className="flex-1 overflow-y-auto mobile-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/request/:id" element={<RequestDetails />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CleaningProvider>
  );
}

export default App;