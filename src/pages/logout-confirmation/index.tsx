import { useNavigation } from '@react-navigation/native';

import { ConfirmationModal } from '../../components/confirmation-modal';
import { useAuthContext } from '../../context/auth';
import { resetState } from '../../redux/todos';
import { useAppDispatch } from '../../utils/redux/dispatch';

export function LogoutConfirmation() {
  const navigation = useNavigation();
  const { setToken } = useAuthContext();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    setToken(null);
    dispatch(resetState());
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
