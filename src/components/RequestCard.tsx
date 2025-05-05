import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Building2, CalendarClock } from 'lucide-react';
import { CleaningRequest } from '../types';
import StatusBadge from './StatusBadge';

interface RequestCardProps {
  request: CleaningRequest;
  index: number;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, index }) => {
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

  const getRoomStatusColor = () => {
    switch (request.roomStatus) {
      case 'occupied':
        return 'text-red-600';
      case 'vacant':
        return 'text-green-600';
      case 'cleaning_scheduled':
        return 'text-blue-600';
      case 'cleaning_not_scheduled':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const getRoomStatusText = () => {
    switch (request.roomStatus) {
      case 'occupied':
        return 'Комната занята';
      case 'vacant':
        return 'Комната свободна';
      case 'cleaning_scheduled':
        return 'Уборка запланирована';
      case 'cleaning_not_scheduled':
        return 'Уборка не запланирована';
      default:
        return 'Неизвестный статус';
    }
  };

  return (
    <Link 
      to={`/request/${request.id}`}
      className={`request-card block bg-white rounded-lg shadow p-4 mb-4 hover:shadow-md animate-fade-in`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-lg">{request.id}</h3>
          <p className="text-gray-600 text-sm">{request.location}</p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <Building2 size={16} className="text-gray-500" />
          <span>Комната {request.roomNumber}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users size={16} className="text-gray-500" />
          <span>{request.guestCount} гостей</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className="text-gray-500" />
          <span>{request.estimatedTime} мин</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CalendarClock size={16} className="text-gray-500" />
          <span>{formatDate(request.scheduled)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-2 border-t">
        <div className={`text-sm font-medium ${getRoomStatusColor()}`}>
          {getRoomStatusText()}
        </div>
        {request.assignedToName && (
          <div className="text-sm text-gray-600">
            Назначено: <span className="font-medium">{request.assignedToName}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RequestCard;