import { View, Text } from 'react-native';

import { Checkbox } from '../checkbox';

import { styles } from './styles';

export type TodoItemProps = {
  id: string;
  text: string;
  isCompleted: boolean;
  onCheckboxPress?: () => void;
};

export function TodoItem(props: TodoItemProps) {
  const { text, isCompleted, onCheckboxPress } = props;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, isCompleted && styles.completedText]}>
        {text}
      </Text>
      <Checkbox checked={isCompleted} onPress={onCheckboxPress} />
    </View>
  );
}
