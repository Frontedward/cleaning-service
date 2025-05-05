import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, CalendarDays, Users, Home, CheckSquare, XSquare, ArrowLeft, History } from 'lucide-react';
import { useCleaningContext } from '../context/CleaningContext';
import StatusBadge from '../components/StatusBadge';

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRequestById, assignRequest, cancelRequest, completeRequest, staff } = useCleaningContext();
  const [showHistory, setShowHistory] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!id) {
    return <div>ID заявки отсутствует</div>;
  }

  const request = getRequestById(id);

  if (!request) {
    return (
      <div className="p-4 sm:p-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-blue-600 mb-4 sm:mb-6"
        >
          <ChevronLeft size={20} />
          <span>Вернуться к панели управления</span>
        </button>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Заявка не найдена</h2>
          <p className="text-gray-600">Запрошенная заявка на уборку не найдена.</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Не запланировано';
    return new Date(date).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canTakeToWork = request.status === 'pending' || request.status === 'assigned';
  const canComplete = request.status === 'in_progress' && request.assignedTo === staff.id;
  const canCancel = request.status !== 'completed' && request.status !== 'cancelled';

  const handleTakeToWork = () => {
    assignRequest(request.id, staff.id);
  };

  const handleComplete = () => {
    completeRequest(request.id);
  };

  const handleCancel = () => {
    cancelRequest(request.id);
    setShowCancelConfirm(false);
  };

  const getRoomStatusColor = () => {
    switch (request.roomStatus) {
      case 'occupied':
        return 'bg-red-50 text-red-800';
      case 'vacant':
        return 'bg-green-50 text-green-800';
      case 'cleaning_scheduled':
        return 'bg-blue-50 text-blue-800';
      case 'cleaning_not_scheduled':
        return 'bg-amber-50 text-amber-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  const getRoomStatusText = () => {
    switch (request.roomStatus) {
      case 'occupied':
        return 'Комната в настоящее время занята';
      case 'vacant':
        return 'Комната свободна и готова к уборке';
      case 'cleaning_scheduled':
        return 'Уборка запланирована для этой комнаты';
      case 'cleaning_not_scheduled':
        return 'Уборка не запланирована для этой комнаты';
      default:
        return 'Неизвестный статус комнаты';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-blue-600 mb-4 sm:mb-6 hover:underline"
      >
        <ChevronLeft size={20} />
        <span>Вернуться к панели управления</span>
      </button>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold">{request.id}</h1>
                <StatusBadge status={request.status} />
              </div>
              <p className="text-gray-600 mt-1">{request.location}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {canTakeToWork && request.assignedTo !== staff.id && (
                <button 
                  onClick={handleTakeToWork}
                  className="btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <CheckSquare size={18} />
                  <span>Взять в работу</span>
                </button>
              )}
              
              {canComplete && (
                <button 
                  onClick={handleComplete}
                  className="btn bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                  <CheckSquare size={18} />
                  <span>Завершить</span>
                </button>
              )}
              
              {canCancel && (
                <button 
                  onClick={() => setShowCancelConfirm(true)}
                  className="btn bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                >
                  <XSquare size={18} />
                  <span>Отменить</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Детали заявки</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Home size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Местоположение</p>
                    <p className="font-medium">{request.location}</p>
                    <p className="text-sm text-gray-600">Комната {request.roomNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Гости</p>
                    <p className="font-medium">Текущее количество: {request.guestCount} гостей</p>
                    {request.previousGuestCount !== undefined && (
                      <p className="text-sm text-gray-600">Предыдущее количество: {request.previousGuestCount} гостей</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Время</p>
                    <p className="font-medium">Ожидаемое время: {request.estimatedTime} минут</p>
                    <p className="text-sm text-gray-600">Создано: {formatDate(request.created)}</p>
                    <p className="text-sm text-gray-600">Запланировано: {formatDate(request.scheduled)}</p>
                  </div>
                </div>
                
                {request.assignedTo && (
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <CheckSquare size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Назначение</p>
                      <p className="font-medium">
                        Назначено: {request.assignedToName || 'Неизвестный сотрудник'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Room Status */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Статус комнаты</h2>
              <div className={`p-4 rounded-lg ${getRoomStatusColor()} mb-6`}>
                <p className="font-medium">{getRoomStatusText()}</p>
              </div>
              
              <button
                onClick={() => setShowHistory(!showHistory)} 
                className="flex items-center gap-2 text-blue-600 mb-4 hover:underline"
              >
                <History size={18} />
                <span>{showHistory ? 'Скрыть историю уборок' : 'Показать историю уборок'}</span>
              </button>
              
              {showHistory && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b">
                    <h3 className="font-medium">История уборок</h3>
                  </div>
                  
                  {request.cleaningHistory.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      История уборок отсутствует
                    </div>
                  ) : (
                    <div className="divide-y">
                      {request.cleaningHistory.map((entry, index) => (
                        <div key={index} className="p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <p className="font-medium">{entry.staffName}</p>
                            <p className="text-sm text-gray-500">{formatDate(entry.date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cancellation Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Подтверждение отмены</h3>
            <p className="text-gray-600 mb-6">
              Вы уверены, что хотите отменить эту заявку на уборку? Это действие нельзя отменить.
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Отмена
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Подтвердить отмену
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;