import { ActivityIndicator, FlatList, View } from 'react-native';
import { RefObject, useImperativeHandle, useMemo, useRef } from 'react';

import { TodoItem as TodoItemType } from '../../api/todos/dto';
import { theme } from '../../styles/theme';
import { TodoItem } from '../todo-item';

import { styles } from './styles';

export type ListRef = {
  scrollToStart: () => void;
};

type Props = {
  loading: boolean;
  todos: TodoItemType[];
  activeTab: string;
  onToggleComplete: (id: string) => void;
  onLoadMore: () => void;
  listRef?: RefObject<ListRef | null>;
};

const keyExtractor = (item: TodoItemType) => item.id;

export function TodoList(props: Props) {
  const {
    loading,
    todos,
    activeTab,
    onToggleComplete,
    onLoadMore,
    listRef: externalListRef,
  } = props;

  const listRef = useRef<FlatList<TodoItemType>>(null);

  useImperativeHandle(externalListRef, () => ({
    scrollToStart: () => {
      listRef.current?.scrollToIndex({ index: 0, animated: true });
    },
  }));

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (activeTab) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, activeTab]);

  if (loading && !todos.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: TodoItemType }) => (
    <TodoItem {...item} onCheckboxPress={() => onToggleComplete(item.id)} />
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
      data={filteredTodos}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}
