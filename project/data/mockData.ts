import { Place, TripGroup, Expense, Memory, User } from '@/types';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '4',
    name: 'Sara Wilson',
    avatar: 'https://images.pexels.com/photos/3754208/pexels-photo-3754208.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '5',
    name: 'David Brown',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

// Mock places
export const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Lalbagh Botanical Garden',
    type: 'attraction',
    image: 'https://images.pexels.com/photos/1114896/pexels-photo-1114896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Bengaluru, Karnataka',
    description: 'A beautiful botanical garden with diverse flora. One of the most visited attractions in Bengaluru with stunning flower displays and historic glasshouse.',
    rating: 4.7,
    reviewCount: 1290,
    tags: ['garden', 'nature', 'peaceful'],
  },
  {
    id: '2',
    name: 'Bengaluru Palace',
    type: 'attraction',
    image: 'https://images.pexels.com/photos/5273044/pexels-photo-5273044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Bengaluru, Karnataka',
    description: 'Historical palace built in Tudor-style architecture. This grand palace offers a glimpse into royal heritage with beautiful wooden interiors and sprawling gardens.',
    rating: 4.5,
    reviewCount: 870,
    tags: ['historical', 'architecture', 'royal'],
  },
  {
    id: '3',
    name: 'The Tao Terraces',
    type: 'restaurant',
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'MG Road, Bengaluru',
    description: 'Elegant rooftop dining with Pan-Asian cuisine. Offers a serene ambiance with Buddha statues and panoramic city views.',
    rating: 4.6,
    reviewCount: 520,
    tags: ['asian', 'rooftop', 'dining'],
  },
  {
    id: '4',
    name: 'Toit Brewpub',
    type: 'pub',
    image: 'https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Indiranagar, Bengaluru',
    description: 'Popular microbrewery offering craft beers and great food. Known for its lively atmosphere and weekend performances.',
    rating: 4.8,
    reviewCount: 980,
    tags: ['craft beer', 'nightlife', 'music'],
  },
  {
    id: '5',
    name: 'Karavalli',
    type: 'restaurant',
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Residency Road, Bengaluru',
    description: 'Authentic coastal cuisine from Southwest India. This award-winning restaurant offers traditional dishes in a garden setting.',
    rating: 4.7,
    reviewCount: 750,
    tags: ['seafood', 'coastal', 'traditional'],
  },
];

// Mock trip groups
export const mockTripGroups: TripGroup[] = [
  {
    id: '1',
    name: 'Europe Trip',
    status: 'Upcoming',
    date: 'Jul 15 - Jul 30, 2025',
    members: mockUsers.slice(0, 4),
    budget: 2000,
    spent: 500,
  },
  {
    id: '2',
    name: 'Beach Weekend',
    status: 'Active',
    date: 'Jun 10 - Jun 12, 2025',
    members: mockUsers.slice(1, 5),
    budget: 500,
    spent: 320,
  },
  {
    id: '3',
    name: 'Mountain Retreat',
    status: 'Completed',
    date: 'May 5 - May 8, 2025',
    members: mockUsers.slice(0, 3),
    budget: 800,
    spent: 750,
  },
];

// Mock expenses
export const mockExpenses: Expense[] = [
  {
    id: '1',
    groupId: '1',
    groupName: 'Europe Trip',
    description: 'Hotel Booking - Paris',
    amount: 350,
    category: 'other',
    date: 'Jun 15, 2025',
    paidBy: mockUsers[0],
    splitBetween: 4,
  },
  {
    id: '2',
    groupId: '2',
    groupName: 'Beach Weekend',
    description: 'Seafood Dinner',
    amount: 120,
    category: 'food',
    date: 'Jun 11, 2025',
    paidBy: mockUsers[1],
    splitBetween: 4,
  },
  {
    id: '3',
    groupId: '2',
    groupName: 'Beach Weekend',
    description: 'Beach Club Entry',
    amount: 80,
    category: 'entertainment',
    date: 'Jun 11, 2025',
    paidBy: mockUsers[2],
    splitBetween: 4,
  },
  {
    id: '4',
    groupId: '3',
    groupName: 'Mountain Retreat',
    description: 'Cable Car Tickets',
    amount: 60,
    category: 'transport',
    date: 'May 6, 2025',
    paidBy: mockUsers[0],
    splitBetween: 3,
  },
];

// Mock memories
export const mockMemories: Memory[] = [
  {
    id: '1',
    title: 'Sunset at Santorini',
    description: 'Watching the beautiful sunset from Oia. The sky was painted with vibrant orange and purple hues, creating the perfect backdrop for our dinner. One of the most breathtaking views I\'ve ever seen!',
    image: 'https://images.pexels.com/photos/1034650/pexels-photo-1034650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'Jun 5, 2025',
    location: 'Santorini, Greece',
    people: mockUsers.slice(0, 4),
    likes: 24,
    comments: 5,
    isLiked: true,
  },
  {
    id: '2',
    title: 'Hiking in the Alps',
    description: 'A challenging but rewarding hike through the Swiss Alps. We climbed for 4 hours to reach this viewpoint, but the panoramic mountain views were absolutely worth every step!',
    image: 'https://images.pexels.com/photos/732632/pexels-photo-732632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'May 20, 2025',
    location: 'Swiss Alps, Switzerland',
    people: mockUsers.slice(0, 3),
    likes: 18,
    comments: 3,
    isLiked: false,
  },
  {
    id: '3',
    title: 'Beach Day in Bali',
    description: 'Perfect day at Nusa Dua beach with crystal clear water and white sand. We spent hours swimming, snorkeling, and enjoying fresh coconut water under the palm trees.',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'Apr 12, 2025',
    location: 'Nusa Dua, Bali',
    people: mockUsers.slice(1, 5),
    likes: 32,
    comments: 7,
    isLiked: true,
  },
];