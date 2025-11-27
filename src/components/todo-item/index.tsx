import { View, Text } from 'react-native';
import { memo } from 'react';

import { TodoItem as TodoItemType } from '../../api/todos/dto';
import { Checkbox } from '../checkbox';

import { styles } from './styles';
import { toggleCompletedThunk } from '../../redux/todos/thunks';
import { useAppDispatch } from '../../utils/redux/dispatch';

export type TodoItemProps = TodoItemType;

export const TodoItem = memo((props: TodoItemProps) => {
  const { text, completed, id } = props;

  const dispatch = useAppDispatch();

  const handleCheckboxPress = () => {
    dispatch(toggleCompletedThunk(props));
  };

  console.log('todo item render', id);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, completed && styles.completedText]}>
        {text}
      </Text>
      <Checkbox
        checked={completed}
        onPress={handleCheckboxPress}
        hitSlop={10}
      />
    </View>
  );
});
