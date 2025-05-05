import React from 'react';
import { CleaningRequest } from '../types';
import { Users, Clock, Home, CalendarDays } from 'lucide-react';

interface GeneralRequestCardProps {
  request: CleaningRequest;
  index: number;
}

const formatDate = (date?: Date) => {
  if (!date) return '-';
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const GeneralRequestCard: React.FC<GeneralRequestCardProps> = ({ request, index }) => {
  return (
    <div className="request-card bg-white border-2 border-orange-light shadow rounded-lg p-4 mb-4 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-lg text-orange-dark">Комната занята</h3>
          <p className="text-gray-600 text-sm">{request.location}</p>
        </div>
        <div className="text-xs text-orange font-bold uppercase">Генеральная уборка</div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <Home size={16} className="text-turquoise" />
          <span>Комната {request.roomNumber}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users size={16} className="text-turquoise" />
          <span>{request.guestCount} гостей</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays size={16} className="text-orange" />
          <span>Заезд: {formatDate(request.checkIn)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays size={16} className="text-orange" />
          <span>Выезд: {formatDate(request.checkOut)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className="text-turquoise" />
          <span>Время на уборку: {request.estimatedTime} мин</span>
        </div>
      </div>
      {request.status === 'in_progress' && request.assignedToName && (
        <div className="text-sm text-turquoise-dark font-semibold mt-2">
          В работе у {request.assignedToName}
        </div>
      )}
    </div>
  );
};

export default GeneralRequestCard; 