import { StyleSheet } from 'react-native';

import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: '600',
  },
  filled: {
    backgroundColor: theme.colors.primary,
  },
  filledText: {
    color: 'white',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  outlinedText: {
    color: theme.colors.primary,
  },
});
