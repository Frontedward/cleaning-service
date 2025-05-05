import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useCleaningContext } from '../context/CleaningContext';
import ActiveRequestCard from '../components/ActiveRequestCard';
import GeneralRequestCard from '../components/GeneralRequestCard';
import MyRequestCard from '../components/MyRequestCard';

const Dashboard: React.FC = () => {
  const { 
    filteredRequests, 
    filterRequests, 
    currentFilter,
    searchTerm,
    setSearchTerm,
    staff
  } = useCleaningContext();
  
  const [activeTab, setActiveTab] = useState<'all' | 'mine' | 'active'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'active') {
      filterRequests('active', searchTerm);
    } else {
      filterRequests(currentFilter, searchTerm);
    }
  };

  const handleTab = (tab: 'all' | 'mine' | 'active') => {
    setActiveTab(tab);
    if (tab === 'active') {
      filterRequests('active', searchTerm);
    } else {
      filterRequests(tab, searchTerm);
    }
  };

  // Фильтрация активных заявок
  const getActiveRequests = () =>
    filteredRequests.filter(r =>
      r.roomStatus === 'vacant' && r.cleaningType === 'поддерживающая'
    );

  // Фильтрация для "Все заявки"
  const getGeneralRequests = () => filteredRequests;

  // Фильтрация для "Мои заявки"
  const getMyRequests = () =>
    filteredRequests.filter(r =>
      r.roomStatus === 'vacant' &&
      r.cleaningType === 'поддерживающая' &&
      r.assignedTo === staff.id
    );

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
              onClick={() => handleTab('all')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition btn ${
                activeTab === 'all' 
                  ? 'bg-pink text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Все заявки
            </button>
            <button 
              onClick={() => handleTab('active')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition btn ${
                activeTab === 'active' 
                  ? 'bg-pink text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Активные
            </button>
            <button 
              onClick={() => handleTab('mine')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition btn ${
                activeTab === 'mine' 
                  ? 'bg-pink text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Мои заявки
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {activeTab === 'active' ? (
          getActiveRequests().length === 0 ? (
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow text-center">
              <div className="mb-4 text-gray-400">
                <Filter size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Активных заявок не найдено</h3>
              <p className="text-gray-500 mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          ) : (
            getActiveRequests().map((request, index) => (
              <ActiveRequestCard key={request.id} request={request} index={index} />
            ))
          )
        ) : activeTab === 'mine' ? (
          getMyRequests().length === 0 ? (
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow text-center">
              <div className="mb-4 text-gray-400">
                <Filter size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Нет ваших заявок</h3>
              <p className="text-gray-500 mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          ) : (
            getMyRequests().map((request, index) => (
              <MyRequestCard key={request.id} request={request} index={index} />
            ))
          )
        ) : (
          getGeneralRequests().length === 0 ? (
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow text-center">
              <div className="mb-4 text-gray-400">
                <Filter size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Заявки не найдены</h3>
              <p className="text-gray-500 mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          ) : (
            getGeneralRequests().map((request, index) => (
              <GeneralRequestCard key={request.id} request={request} index={index} />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;