import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../styles/theme';

import { styles } from './styles';

export default function LoginPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <Button
        color={theme.colors.primary}
        title="Navigate to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
