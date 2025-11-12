import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

export function Header() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('LogoutConfirmation');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerSection, styles.leftSection]}>
        {/* TODO: Add search widget here */}
      </View>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Todos</Text>
      </View>
      <View style={[styles.headerSection, styles.rightSection]}>
        <TouchableOpacity hitSlop={16} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
