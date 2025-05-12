import { Tabs } from 'expo-router';
import { MapPin, Utensils, Wallet, Image as ImageIcon } from 'lucide-react-native';
import { Platform } from 'react-native';
import { Theme } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.colors.primary[600],
        tabBarInactiveTintColor: Theme.colors.neutral[400],
        tabBarStyle: {
          backgroundColor: Theme.colors.white,
          borderTopColor: Theme.colors.neutral[200],
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 85 : 65,
        },
        tabBarLabelStyle: {
          fontFamily: Theme.fontFamily.medium,
          fontSize: 12,
          marginBottom: Platform.OS === 'ios' ? 0 : 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ size, color }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="food-and-beverage"
        options={{
          title: 'Food & Beverage',
          tabBarIcon: ({ size, color }) => (
            <Utensils size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ size, color }) => (
            <Wallet size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="memories"
        options={{
          title: 'Memories',
          tabBarIcon: ({ size, color }) => (
            <ImageIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}