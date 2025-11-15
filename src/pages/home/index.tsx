import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TodoItem } from '../../api/todos/dto';
import { TodoList, ListRef } from '../../components/todo-list';
import { AddTodoInput } from '../../components/add-todo-input';
import { TabBar } from '../../components/tab-bar';
import { Header } from '../../components/header';
import { createTodo, getTodos, updateTodo } from '../../api/todos';

import { styles } from './styles';

const tabs = [
  { title: 'All', id: 'all' },
  { title: 'Active', id: 'active' },
  { title: 'Completed', id: 'completed' },
];

const PAGE_SIZE = 10;

const initialPagination = {
  page: 1,
  hasMore: true,
  inProgress: false,
};

function HomePage() {
  const insets = useSafeAreaInsets();

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const pagination = useRef(initialPagination);
  const listRef = useRef<ListRef>(null);

  const loadMoreTodos = useCallback(async (tab: string) => {
    if (!pagination.current.hasMore || pagination.current.inProgress) return;

    setIsLoading(true);
    pagination.current.inProgress = true;
    try {
      const newTodos = await getTodos({
        page: pagination.current.page,
        limit: PAGE_SIZE,
        completed: tab === 'all' ? undefined : tab === 'completed',
      });
      setTodos(prev => [...prev, ...newTodos]);

      pagination.current.hasMore = newTodos.length >= PAGE_SIZE;
      pagination.current.page++;
    } finally {
      setIsLoading(false);
      pagination.current.inProgress = false;
    }
  }, []);

  useEffect(() => {
    setTodos([]);
    pagination.current = { ...initialPagination };
    loadMoreTodos(activeTab);
  }, [activeTab, loadMoreTodos]);

  const handleAddTodo = async (text: string) => {
    const newTodo = await createTodo({
      text,
      completed: false,
      createdAt: Date.now(),
    });

    if (activeTab !== 'completed') {
      setTodos(prev => [
        newTodo,
        ...prev.slice(
          0,
          // when adding a new todo, we need to remove the last item to keep the pagination consistent
          pagination.current.hasMore ? prev.length - 1 : prev.length,
        ),
      ]);
       // scroll to the top of the list to show the new todo
      listRef.current?.scrollToStart();
    }
  };

  const toggleComplete = async (id: string) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) return;

    const updatedTodo = await updateTodo({
      ...todo,
      completed: !todo.completed,
    });

    setTodos(prev => prev.map(t => (t.id === id ? updatedTodo : t)));
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) },
      ]}
    >
      <Header />
      <TabBar onPress={setActiveTab} activeTab={activeTab} tabs={tabs} />
      <TodoList
        loading={isLoading}
        onLoadMore={() => loadMoreTodos(activeTab)}
        todos={todos}
        activeTab={activeTab}
        onToggleComplete={toggleComplete}
        listRef={listRef}
      />
      <AddTodoInput onAddTodo={handleAddTodo} />
      <Toast />
    </View>
  );
}

export default HomePage;
