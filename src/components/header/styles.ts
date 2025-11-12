import { StyleSheet } from 'react-native';

import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerSection: {
    flex: 1,
    alignItems: 'center',
  },
  leftSection: {
    alignItems: 'flex-start',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primaryText,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
