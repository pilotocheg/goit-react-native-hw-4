import { ActivityIndicator, FlatList, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { TodoItem as TodoItemType } from '../../api/todos/dto';
import { theme } from '../../styles/theme';
import {
  resetTodos,
  selectAllLoaded,
  selectFilter,
  selectLoading,
  selectTodos,
} from '../../redux/todos';
import {
  fetchTodosThunk,
  toggleCompletedThunk,
} from '../../redux/todos/thunks';
import { useAppDispatch } from '../../utils/redux/dispatch';

import { TodoItem } from '../todo-item';

import { useResetScrollPosition } from './use-reset-scroll-position';
import { styles } from './styles';

const keyExtractor = (item: TodoItemType) => item.id;

export function TodoList() {
  const dispatch = useAppDispatch();
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectLoading);
  const allLoaded = useSelector(selectAllLoaded);

  const listRef = useRef<FlatList<TodoItemType>>(null);

  useResetScrollPosition(todos, listRef);

  useEffect(() => {
    dispatch(resetTodos());
    dispatch(fetchTodosThunk());
  }, [filter, dispatch]);

  const loadMoreTodos = () => {
    if (allLoaded || loading) {
      return;
    }

    dispatch(fetchTodosThunk());
  };

  if (loading && !todos.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: TodoItemType }) => (
    <TodoItem
      {...item}
      onCheckboxPress={() => dispatch(toggleCompletedThunk(item))}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  };

  return (
    <FlatList
      ref={listRef}
      data={todos}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
      ListFooterComponent={renderFooter}
      onEndReached={loadMoreTodos}
      onEndReachedThreshold={0.5}
    />
  );
}
