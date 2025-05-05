import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useCleaningContext } from '../context/CleaningContext';
import RequestCard from '../components/RequestCard';

const Dashboard: React.FC = () => {
  const { 
    filteredRequests, 
    filterRequests, 
    currentFilter,
    searchTerm,
    setSearchTerm
  } = useCleaningContext();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterRequests(currentFilter, searchTerm);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Панель управления уборкой</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4 sm:mb-6">
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Поиск по ID, местоположению или номеру комнаты..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => filterRequests('all')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition btn ${
                currentFilter === 'all' 
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Все заявки
            </button>
            <button 
              onClick={() => filterRequests('mine')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition btn ${
                currentFilter === 'mine' 
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Мои заявки
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow text-center">
            <div className="mb-4 text-gray-400">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Заявки не найдены</h3>
            <p className="text-gray-500 mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        ) : (
          filteredRequests.map((request, index) => (
            <RequestCard key={request.id} request={request} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;