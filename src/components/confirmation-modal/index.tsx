import { Text, View } from 'react-native';

import { Button } from '../button';

import { styles } from './styles';

type Props = {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
};

export function ConfirmationModal(props: Props) {
  const {
    title,
    message,
    onCancel,
    onConfirm,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.backdrop} />
      <View style={styles.content}>
        <View style={styles.textualContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            title={cancelText}
            onPress={onCancel}
            variant="outlined"
          />
          <Button
            style={styles.button}
            title={confirmText}
            onPress={onConfirm}
          />
        </View>
      </View>
    </View>
  );
}
