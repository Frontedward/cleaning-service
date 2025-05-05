export type RequestStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
export type RoomStatus = 'occupied' | 'vacant' | 'cleaning_scheduled' | 'cleaning_not_scheduled';

export interface CleaningHistoryEntry {
  date: Date;
  staffId: string;
  staffName: string;
}

export interface CleaningRequest {
  id: string;
  roomNumber: number;
  floor: number;
  location: string;
  status: RequestStatus;
  roomStatus: RoomStatus;
  guestCount: number;
  previousGuestCount?: number;
  estimatedTime: number; // in minutes
  assignedTo: string | null;
  assignedToName?: string;
  created: Date;
  scheduled: Date | null;
  cleaningHistory: CleaningHistoryEntry[];
  roomCharacteristics: {
    area: number; // in square meters
    beds: number;
    bathrooms: number;
    type: 'apartment' | 'office' | 'hotel_room';
  };
}

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