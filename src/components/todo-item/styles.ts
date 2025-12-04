import { StyleSheet } from 'react-native';

import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
    backgroundColor: theme.colors.background,
  },
  text: {
    flexShrink: 1,
    fontSize: 16,
    color: '#71727A',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButtonVisible: {
    opacity: 1,
  },
});
