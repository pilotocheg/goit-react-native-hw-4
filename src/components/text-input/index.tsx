import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { theme } from '../../styles/theme';

import { styles } from './styles';

type Props = RNTextInputProps & {
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function TextInput(props: Props) {
  const { error, style, containerStyle, ...inputProps } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <RNTextInput
        style={[styles.input, error && styles.error, style]}
        cursorColor={theme.colors.primary}
        placeholderTextColor={theme.colors.secondaryText}
        {...inputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : undefined}
    </View>
  );
}
