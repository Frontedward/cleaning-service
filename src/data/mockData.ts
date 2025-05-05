import { CleaningRequest, CleaningStaff } from '../types';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export const mockRequests: CleaningRequest[] = [
  {
    id: 'REQ-001',
    roomNumber: 101,
    floor: 1,
    location: 'Sunset Apartments, Building A',
    status: 'pending',
    roomStatus: 'occupied',
    guestCount: 2,
    estimatedTime: 60,
    assignedTo: null,
    created: yesterday,
    scheduled: tomorrow,
    cleaningHistory: [
      {
        date: new Date(yesterday.setDate(yesterday.getDate() - 7)),
        staffId: 'S-002',
        staffName: 'Elena Petrova'
      }
    ],
    roomCharacteristics: {
      area: 45,
      beds: 1,
      bathrooms: 1,
      type: 'apartment'
    }
  },
  {
    id: 'REQ-002',
    roomNumber: 205,
    floor: 2,
    location: 'Sunset Apartments, Building B',
    status: 'assigned',
    roomStatus: 'occupied',
    guestCount: 3,
    previousGuestCount: 2,
    estimatedTime: 90,
    assignedTo: 'S-001',
    assignedToName: 'Ivan Ivanov',
    created: yesterday,
    scheduled: today,
    cleaningHistory: [
      {
        date: new Date(yesterday.setDate(yesterday.getDate() - 5)),
        staffId: 'S-001',
        staffName: 'Ivan Ivanov'
      }
    ],
    roomCharacteristics: {
      area: 65,
      beds: 2,
      bathrooms: 1,
      type: 'apartment'
    }
  },
  {
    id: 'REQ-003',
    roomNumber: 301,
    floor: 3,
    location: 'Downtown Business Center',
    status: 'in_progress',
    roomStatus: 'cleaning_scheduled',
    guestCount: 0,
    estimatedTime: 120,
    assignedTo: 'S-001',
    assignedToName: 'Ivan Ivanov',
    created: yesterday,
    scheduled: today,
    cleaningHistory: [
      {
        date: new Date(yesterday.setDate(yesterday.getDate() - 14)),
        staffId: 'S-003',
        staffName: 'Alexei Smirnov'
      }
    ],
    roomCharacteristics: {
      area: 100,
      beds: 0,
      bathrooms: 2,
      type: 'office'
    }
  },
  {
    id: 'REQ-004',
    roomNumber: 502,
    floor: 5,
    location: 'Grand Hotel',
    status: 'completed',
    roomStatus: 'vacant',
    guestCount: 0,
    previousGuestCount: 2,
    estimatedTime: 45,
    assignedTo: 'S-002',
    assignedToName: 'Elena Petrova',
    created: new Date(yesterday.setDate(yesterday.getDate() - 1)),
    scheduled: yesterday,
    cleaningHistory: [
      {
        date: new Date(yesterday.setDate(yesterday.getDate() - 1)),
        staffId: 'S-002',
        staffName: 'Elena Petrova'
      },
      {
        date: new Date(yesterday.setDate(yesterday.getDate() - 8)),
        staffId: 'S-001',
        staffName: 'Ivan Ivanov'
      }
    ],
    roomCharacteristics: {
      area: 35,
      beds: 1,
      bathrooms: 1,
      type: 'hotel_room'
    }
  },
  {
    id: 'REQ-005',
    roomNumber: 103,
    floor: 1,
    location: 'Sunset Apartments, Building A',
    status: 'pending',
    roomStatus: 'cleaning_not_scheduled',
    guestCount: 1,
    estimatedTime: 60,
    assignedTo: null,
    created: today,
    scheduled: tomorrow,
    cleaningHistory: [],
    roomCharacteristics: {
      area: 40,
      beds: 1,
      bathrooms: 1,
      type: 'apartment'
    }
  },
  {
    id: 'REQ-006',
    roomNumber: 402,
    floor: 4,
    location: 'Grand Hotel',
    status: 'pending',
    roomStatus: 'vacant',
    guestCount: 1,
    previousGuestCount: 2,
    estimatedTime: 40,
    assignedTo: null,
    created: new Date(),
    scheduled: new Date(),
    cleaningHistory: [],
    roomCharacteristics: {
      area: 30,
      beds: 1,
      bathrooms: 1,
      type: 'hotel_room',
    },
    checkIn: new Date('2025-05-10T14:00:00'),
    checkOut: new Date('2025-05-12T12:00:00'),
    cleaningType: 'поддерживающая',
  },
  {
    id: 'REQ-007',
    roomNumber: 305,
    floor: 3,
    location: 'Downtown Business Center',
    status: 'assigned',
    roomStatus: 'vacant',
    guestCount: 2,
    previousGuestCount: 1,
    estimatedTime: 50,
    assignedTo: null,
    created: new Date(),
    scheduled: new Date(),
    cleaningHistory: [],
    roomCharacteristics: {
      area: 55,
      beds: 2,
      bathrooms: 1,
      type: 'apartment',
    },
    checkIn: new Date('2025-05-15T15:00:00'),
    checkOut: new Date('2025-05-18T11:00:00'),
    cleaningType: 'поддерживающая',
  },
  {
    id: 'REQ-008',
    roomNumber: 210,
    floor: 2,
    location: 'Sunset Apartments, Building C',
    status: 'pending',
    roomStatus: 'vacant',
    guestCount: 3,
    previousGuestCount: 2,
    estimatedTime: 60,
    assignedTo: null,
    created: new Date(),
    scheduled: new Date(),
    cleaningHistory: [],
    roomCharacteristics: {
      area: 70,
      beds: 3,
      bathrooms: 2,
      type: 'apartment',
    },
    checkIn: new Date('2025-05-20T13:00:00'),
    checkOut: new Date('2025-05-25T12:00:00'),
    cleaningType: 'поддерживающая',
  },
];

export const mockStaff: CleaningStaff = {
  id: '1',
  name: 'Иван Петров',
  email: 'ivan.petrov@example.com',
  phone: '+7 (999) 123-45-67',
  language: 'ru',
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  role: 'staff'
};

const getGeneralRequests = () => mockRequests;