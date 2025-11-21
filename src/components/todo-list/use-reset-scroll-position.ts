import { FlatList } from 'react-native';
import { RefObject, useEffect, useRef } from 'react';

import { TodoItem } from '../../api/todos/dto';

export const useResetScrollPosition = (
  todos: TodoItem[],
  listRef: RefObject<FlatList | null>,
) => {
  const prevFirstTodoId = useRef<string>(null);

  const firstTodoId = todos[0]?.id;
  useEffect(() => {
    if (firstTodoId && firstTodoId !== prevFirstTodoId.current) {
      prevFirstTodoId.current = firstTodoId;
      // reset scroll if first todo is changed
      listRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  }, [firstTodoId, listRef]);
};
