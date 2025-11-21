import { View, Text, Button } from 'react-native';

import { theme } from '../../styles/theme';
import { useAuthContext } from '../../context/auth';

import { styles } from './styles';

export default function LoginPage() {
  const { setIsAuthenticated } = useAuthContext();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <Button
        color={theme.colors.primary}
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
}
