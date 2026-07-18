import { StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.secondary,
    fontSize: 18,
  },
});
