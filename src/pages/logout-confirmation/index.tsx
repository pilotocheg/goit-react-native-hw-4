import { useNavigation } from '@react-navigation/native';

import { ConfirmationModal } from '../../components/confirmation-modal';

export function LogoutConfirmation() {
  const navigation = useNavigation();

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ConfirmationModal
      title="Log out"
      message="Are you sure you want to log out? You'll need to login again to use the app."
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      confirmText="Log out"
    />
  );
}
