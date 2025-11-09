import { Image, TouchableOpacity, View } from 'react-native';

import checkIcon from '../../assets/icons/check-icon.png';

import { styles } from './styles';

export type Props = {
  checked: boolean;
  onPress?: () => void;
};

export function Checkbox(props: Props) {
  const { checked, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.container, checked && styles.checked]}>
        {checked && <Image source={checkIcon} style={styles.checkedIcon} />}
      </View>
    </TouchableOpacity>
  );
}
