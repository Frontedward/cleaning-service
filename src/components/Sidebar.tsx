import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, Settings, LogOut, X, Wand2 } from 'lucide-react';
import { useCleaningContext } from '../context/CleaningContext';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { staff } = useCleaningContext();

  return (
    <div className="w-64 bg-white shadow-lg h-full overflow-y-auto flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Wand2 size={24} />
          </div>
          <h1 className="text-xl font-bold text-blue-600">CleanMaster</h1>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <X size={20} className="text-gray-600" />
          </button>
        )}
      </div>
      
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {staff.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-medium">{staff.name}</p>
            <p className="text-sm text-gray-500 capitalize">{staff.role}</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `sidebar-item flex items-center gap-3 p-3 rounded-lg ${
                  isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`
              }
              onClick={onClose}
            >
              <HomeIcon size={20} />
              <span>Панель управления</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `sidebar-item flex items-center gap-3 p-3 rounded-lg ${
                  isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`
              }
              onClick={onClose}
            >
              <Settings size={20} />
              <span>Настройки</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <button className="sidebar-item flex items-center gap-3 p-3 rounded-lg w-full text-gray-600 hover:bg-gray-50">
          <LogOut size={20} />
          <span>Выйти</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;