import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
  },
  text: {
    flexShrink: 1,
    fontSize: 16,
    color: '#71727A',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
});
