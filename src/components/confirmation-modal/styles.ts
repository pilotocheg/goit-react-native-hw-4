import { StyleSheet } from 'react-native';

import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 37,
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#1F2024',
    opacity: 0.85,
  },
  content: {
    zIndex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
  },
  textualContent: {
    padding: 8,
    gap: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.primaryText,
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    color: theme.colors.secondaryText,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 8,
  },
  button: {
    flex: 1,
    width: 'auto',
  },
});
