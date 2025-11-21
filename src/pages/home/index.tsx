import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TodoList } from '../../components/todo-list';
import { AddTodoInput } from '../../components/add-todo-input';
import { TabBar } from '../../components/tab-bar';
import { Header } from '../../components/header';

import { styles } from './styles';

function HomePage() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) },
      ]}
    >
      <Header />
      <TabBar />
      <TodoList />
      <AddTodoInput />
      <Toast />
    </View>
  );
}

export default HomePage;
