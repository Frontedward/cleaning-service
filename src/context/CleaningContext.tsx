import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CleaningRequest, RoomStatus } from '../types';
import { mockRequests, mockStaff } from '../data/mockData';

export interface CleaningStaff {
  id: string;
  name: string;
  email: string;
  phone?: string;
  language?: string;
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  role: 'admin' | 'staff';
}

interface CleaningContextType {
  requests: CleaningRequest[];
  filteredRequests: CleaningRequest[];
  staff: CleaningStaff;
  filterRequests: (filter: string, searchTerm?: string) => void;
  assignRequest: (requestId: string, staffId: string) => void;
  cancelRequest: (requestId: string) => void;
  completeRequest: (requestId: string) => void;
  updateStaffInfo: (newInfo: Partial<CleaningStaff>) => void;
  currentFilter: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  getRequestById: (id: string) => CleaningRequest | undefined;
  updateStaffProfile: (profile: Partial<CleaningStaff>) => Promise<void>;
}

const CleaningContext = createContext<CleaningContextType | undefined>(undefined);

export const CleaningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<CleaningRequest[]>(mockRequests);
  const [filteredRequests, setFilteredRequests] = useState<CleaningRequest[]>(mockRequests);
  const [staff, setStaff] = useState<CleaningStaff>(mockStaff);
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    filterRequests(currentFilter, searchTerm);
  }, [requests, currentFilter, searchTerm]);

  const filterRequests = (filter: string, search?: string) => {
    setCurrentFilter(filter);
    if (search !== undefined) setSearchTerm(search);
    
    let result = [...requests];
    
    // Apply filter
    if (filter === 'mine') {
      result = result.filter(request => request.assignedTo === staff.id);
    }
    
    // Apply search
    if (search && search.trim() !== '') {
      const term = search.toLowerCase();
      result = result.filter(
        request => 
          request.id.toLowerCase().includes(term) || 
          request.location.toLowerCase().includes(term) ||
          request.roomNumber.toString().includes(term)
      );
    }
    
    setFilteredRequests(result);
  };

  const getRequestById = (id: string) => {
    return requests.find(request => request.id === id);
  };

  const assignRequest = (requestId: string, staffId: string) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, assignedTo: staffId, status: 'in_progress' } 
        : request
    ));
  };

  const cancelRequest = (requestId: string) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, assignedTo: null, status: 'cancelled' } 
        : request
    ));
  };

  const completeRequest = (requestId: string) => {
    setRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        const history = [...request.cleaningHistory, {
          date: new Date(),
          staffId: staff.id,
          staffName: staff.name
        }];
        
        return { 
          ...request, 
          status: 'completed', 
          roomStatus: 'vacant',
          cleaningHistory: history
        };
      }
      return request;
    }));
  };

  const updateStaffInfo = (newInfo: Partial<CleaningStaff>) => {
    setStaff(prev => ({ ...prev, ...newInfo }));
  };

  const updateStaffProfile = async (profile: Partial<CleaningStaff>) => {
    // Здесь будет логика обновления профиля через API
    // Пока просто обновляем локальное состояние
    setStaff(prev => ({
      ...prev,
      ...profile
    }));
  };

  return (
    <CleaningContext.Provider value={{ 
      requests, 
      filteredRequests, 
      staff, 
      filterRequests, 
      assignRequest, 
      cancelRequest, 
      completeRequest, 
      updateStaffInfo,
      currentFilter,
      searchTerm,
      setSearchTerm,
      getRequestById,
      updateStaffProfile
    }}>
      {children}
    </CleaningContext.Provider>
  );
};

export const useCleaningContext = () => {
  const context = useContext(CleaningContext);
  if (context === undefined) {
    throw new Error('useCleaningContext must be used within a CleaningProvider');
  }
  return context;
};