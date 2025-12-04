import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  Text,
} from 'react-native';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  /**
   * The variant of the button.
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined';
};

export function Button(props: Props) {
  const {
    title,
    titleStyle,
    style,
    disabled,
    variant = 'filled',
    ...rest
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.buttonText, styles[`${variant}Text`], titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
