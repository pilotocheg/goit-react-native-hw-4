import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  text: {
    fontSize: 16,
    color: '#71727A',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
});
