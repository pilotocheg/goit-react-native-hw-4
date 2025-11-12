import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Routing } from './src/routing';
import { StatusBar } from 'react-native';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Routing />
    </SafeAreaProvider>
  );
}

export default App;
