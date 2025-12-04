import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  View,
} from 'react-native';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { TodoItem as TodoItemType } from '../../api/todos/dto';
import { theme } from '../../styles/theme';
import {
  resetTodos,
  selectAllLoaded,
  selectFilter,
  selectLoading,
  selectTodos,
  TodosFilter,
} from '../../redux/todos';
import { fetchTodosThunk } from '../../redux/todos/thunks';
import { useAppDispatch } from '../../utils/redux/dispatch';
import { useUserId } from '../../context/auth';

import { TodoItem } from '../todo-item';
import { EmptyState } from '../empty-state';

import { useResetScrollPosition } from './use-reset-scroll-position';
import { styles } from './styles';

const keyExtractor = (item: TodoItemType) => item.id;

export function TodoList() {
  const userId = useUserId();
  const dispatch = useAppDispatch();
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectLoading);
  const allLoaded = useSelector(selectAllLoaded);

  const listRef = useRef<FlatList<TodoItemType>>(null);

  useLayoutEffect(() => {
    if (todos.length) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [todos]);

  useResetScrollPosition(todos, listRef);

  useEffect(() => {
    dispatch(resetTodos());
    dispatch(fetchTodosThunk(userId));
  }, [filter, dispatch, userId]);

  const loadMoreTodos = () => {
    if (allLoaded || loading) {
      return;
    }

    dispatch(fetchTodosThunk(userId));
  };

  if (loading && !todos.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!todos.length) {
    if (filter === TodosFilter.ALL) {
      return (
        <EmptyState
          title="Nothing here. For now."
          description="Start adding new todos to get started"
        />
      );
    }
    return (
      <EmptyState
        title="Nothing here"
        description="No todos found for this section"
      />
    );
  }

  const renderItem = ({ item }: { item: TodoItemType }) => (
    <TodoItem {...item} />
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
