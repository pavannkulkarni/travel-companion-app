import { Header } from '@/components/ui/Header';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Theme } from '@/constants/theme';
import { Plus, CalendarDays, MapPin } from 'lucide-react-native';
import { MemoryCard } from '@/components/memories/MemoryCard';
import { mockMemories } from '@/data/mockData';

export default function MemoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Memories</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                
        <View style={styles.memoriesList}>
          {mockMemories.map((memory, index) => (
            <MemoryCard key={index} memory={memory} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => console.log('Create new memory')}>
        <Plus size={24} color={Theme.colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
  },
  header: {
    padding: Theme.spacing[2],
    backgroundColor: Theme.colors.white,
  },
  title: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes['2xl'],
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[1],
    marginTop: Theme.spacing[2],
  },
  subtitle: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[600],
  },
  content: {
    flex: 1,
    padding: Theme.spacing[2],
  },
  sectionTitle: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[4],
  },
  memoriesList: {
    gap: Theme.spacing[4],
    marginBottom: Theme.spacing[10],
  },
  fab: {
    position: 'absolute',
    bottom: Theme.spacing[6],
    right: Theme.spacing[6],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});