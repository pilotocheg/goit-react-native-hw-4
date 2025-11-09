import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  button: {
    paddingHorizontal: 16,
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#71727A',
  },
  activeText: {
    color: '#000',
    fontWeight: '700',
  },
  underline: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#006FFD',
    opacity: 0,
    marginTop: 13.5,
  },
  activeUnderline: {
    opacity: 1,
  },
});
