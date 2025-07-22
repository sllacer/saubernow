export interface Cleaner {
  id: string;
  name: string;
  photo?: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  languages: string[];
  specialties: string[];
  verified: boolean;
  location: string;
  distance?: number;
  description: string;
  phone?: string;
  email: string;
}

export interface JobPosting {
  id: string;
  customerId: string;
  title: string;
  description: string;
  apartmentSize: 'studio' | '2room' | '3room' | '4room';
  cleaningType: 'regular' | 'deep' | 'move';
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'once';
  location: string;
  preferredDate?: string;
  budget?: number;
  status: 'active' | 'filled' | 'expired';
  createdAt: string;
  responses: JobResponse[];
}

export interface JobResponse {
  id: string;
  cleanerId: string;
  message: string;
  proposedRate: number;
  availability: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  jobId?: string;
}