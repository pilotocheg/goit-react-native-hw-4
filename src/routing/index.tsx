import { NavigationContainer, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import { LogoutConfirmation } from '../pages/logout-confirmation';
import { useAuthContext } from '../context/auth';

const AppStack = createNativeStackNavigator();

export function Routing() {
  const { isAuthenticated } = useAuthContext();

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        {isAuthenticated ? (
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
