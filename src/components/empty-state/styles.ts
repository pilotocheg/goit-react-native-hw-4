import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    color: theme.colors.primaryText,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
  },
  description: {
    color: theme.colors.secondaryText,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  spacer: {
    flex: 1,
  },
});
