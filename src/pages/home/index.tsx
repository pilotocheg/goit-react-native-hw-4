import { View } from 'react-native';
import { useState } from 'react';

import { TodoList } from '../../components/todo-list';
import { TodoItemProps } from '../../components/todo-item';
import { AddTodoInput } from '../../components/add-todo-input';
import { TabBar } from '../../components/tab-bar';

import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = [
  { title: 'All', id: 'all' },
  { title: 'Active', id: 'active' },
  { title: 'Completed', id: 'completed' },
];

const initialTodos = [
  { id: '1', text: 'Buy groceries', isCompleted: false },
  { id: '2', text: 'Buy groceries', isCompleted: true },
  { id: '3', text: 'Buy groceries', isCompleted: false },
];

function HomePage() {
  const insets = useSafeAreaInsets();

  const [todos, setTodos] = useState<TodoItemProps[]>(initialTodos);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleAddTodo = (text: string) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), text, isCompleted: false },
    ]);
  };

  const toggleComplete = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) },
      ]}
    >
      <TabBar onPress={setActiveTab} activeTab={activeTab} tabs={tabs} />
      <TodoList
        todos={todos}
        activeTab={activeTab}
        onToggleComplete={toggleComplete}
      />
      <AddTodoInput onAddTodo={handleAddTodo} />
    </View>
  );
}

export default HomePage;
