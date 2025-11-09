import { ScrollView } from 'react-native';

import { TodoItem, TodoItemProps } from '../todo-item';

import { styles } from './styles';

type Props = {
  todos: TodoItemProps[];
  activeTab: string;
  onToggleComplete: (id: string) => void;
};

export function TodoList(props: Props) {
  const { todos, activeTab, onToggleComplete } = props;

  const filteredTodos = todos.filter(todo => {
    switch (activeTab) {
      case 'active':
        return !todo.isCompleted;
      case 'completed':
        return todo.isCompleted;
      default:
        return true;
    }
  });

  return (
    <ScrollView style={styles.list}>
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          {...todo}
          onCheckboxPress={() => onToggleComplete(todo.id)}
        />
      ))}
    </ScrollView>
  );
}
