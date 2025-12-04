import { View, Text, TouchableOpacity } from 'react-native';
import { memo, useEffect, useState } from 'react';
import {
  EAnimationType,
  SwipeableItemWrapper,
} from 'react-native-swipe-reveal';

import { TodoItem as TodoItemType } from '../../api/todos/dto';
import {
  deleteTodoThunk,
  toggleCompletedThunk,
} from '../../redux/todos/thunks';
import { useAppDispatch } from '../../utils/redux/dispatch';

import { Checkbox } from '../checkbox';

import { styles } from './styles';

export type TodoItemProps = TodoItemType;

export const TodoItem = memo((props: TodoItemProps) => {
  const { id, text, completed } = props;

  // This is a workaround to fix the issue with the delete button blinking on mount
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 300);
  }, []);

  const dispatch = useAppDispatch();

  const handleCheckboxPress = () => {
    dispatch(toggleCompletedThunk(props));
  };

  const handleDeletePress = () => {
    dispatch(deleteTodoThunk(props));
  };

  return (
    <SwipeableItemWrapper
      id={id}
      animationType={EAnimationType['left-swipe']}
      leftSwipeView={
        <TouchableOpacity
          style={[styles.deleteButton, isMounted && styles.deleteButtonVisible]}
          activeOpacity={0.8}
          onPress={handleDeletePress}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      }
    >
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
    </SwipeableItemWrapper>
  );
});
