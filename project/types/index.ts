export interface Place {
  id: string;
  name: string;
  type: string;
  image?: string;
  images?: string[];
  location: string;
  fullAddress: string;
  description?: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  openNow?: boolean;
  priceLevel?: number;
  costForTwo?: number;
  distance?: number;
  reviews?: PlaceReview[];
}

export interface PlaceReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  profile_photo_url?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
}

export interface TripGroup {
  id: string;
  name: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  date: string;
  startDate: string;
  endDate: string;
  members: User[];
  budget: number;
  spent: number;
}

export interface Expense {
  id: string;
  groupId: string;
  groupName: string;
  description: string;
  amount: number;
  category: 'food' | 'coffee' | 'shopping' | 'entertainment' | 'sightseeing' | 'transport' | 'other';
  date: string;
  paidBy: User;
  splitBetween: number;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  people: User[];
  likes: number;
  comments: number;
  isLiked: boolean;
}