import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function FloatingActionButton({ onPress, iconName = 'add', color = COLORS.primary }) {
  return (
    <TouchableOpacity 
      style={[styles.fab, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <Ionicons name={iconName} size={30} color={COLORS.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 