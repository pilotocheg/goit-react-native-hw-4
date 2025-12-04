import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Routing } from './src/routing';
import { AuthProvider } from './src/context/auth';
import { store } from './src/redux/store';

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <AuthProvider>
          <Provider store={store}>
            <Routing />
          </Provider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
