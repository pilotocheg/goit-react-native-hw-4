import { NavigationContainer, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';

import { useAuthContext } from '../context/auth';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import { LogoutConfirmation } from '../pages/logout-confirmation';

const AppStack = createNativeStackNavigator();

export function Routing() {
  const { token } = useAuthContext();

  return (
    <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        {token ? (
          <>
            <AppStack.Screen name="Home" component={HomePage} />
            <AppStack.Screen
              name="LogoutConfirmation"
              component={LogoutConfirmation}
              options={{
                presentation: 'transparentModal',
                animation: 'fade',
              }}
            />
          </>
        ) : (
          <AppStack.Screen name="Login" component={LoginPage} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

type AppStackParamList = StaticParamList<typeof AppStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
