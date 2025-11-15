import { View, Text } from 'react-native';

import { TodoItem as TodoItemType } from '../../api/todos/dto';
import { Checkbox } from '../checkbox';

import { styles } from './styles';

export type TodoItemProps = TodoItemType & {
  onCheckboxPress?: () => void;
};

export function TodoItem(props: TodoItemProps) {
  const { text, completed, onCheckboxPress } = props;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, completed && styles.completedText]}>
        {text}
      </Text>
      <Checkbox checked={completed} onPress={onCheckboxPress} hitSlop={10} />
    </View>
  );
}
