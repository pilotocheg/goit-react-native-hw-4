import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomePage from './src/pages/home';

function App() {
  return (
    <SafeAreaProvider>
      <HomePage />
    </SafeAreaProvider>
  );
}

export default App;
