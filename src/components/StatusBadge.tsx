import React from 'react';
import { RequestStatus } from '../types';
import { CheckCircle, Clock, Loader2, XCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: RequestStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return { 
          bg: 'bg-yellow-100', 
          text: 'text-yellow-800', 
          icon: <Clock size={16} className="text-yellow-500" />,
          label: 'Ожидает'
        };
      case 'assigned':
        return { 
          bg: 'bg-blue-100', 
          text: 'text-blue-800', 
          icon: <AlertCircle size={16} className="text-blue-500" />,
          label: 'Назначено'
        };
      case 'in_progress':
        return { 
          bg: 'bg-purple-100', 
          text: 'text-purple-800', 
          icon: <Loader2 size={16} className="text-purple-500 animate-spin" />,
          label: 'В работе'
        };
      case 'completed':
        return { 
          bg: 'bg-green-100', 
          text: 'text-green-800', 
          icon: <CheckCircle size={16} className="text-green-500" />,
          label: 'Завершено'
        };
      case 'cancelled':
        return { 
          bg: 'bg-red-100', 
          text: 'text-red-800', 
          icon: <XCircle size={16} className="text-red-500" />,
          label: 'Отменено'
        };
      default:
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-800', 
          icon: <AlertCircle size={16} className="text-gray-500" />,
          label: 'Неизвестно'
        };
    }
  };

  const { bg, text, icon, label } = getStatusConfig();

  return (
    <div className={`status-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg} ${text} text-xs font-medium`}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default StatusBadge;