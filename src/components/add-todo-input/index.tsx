import { useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import addIcon from '../../assets/icons/add-icon.png';

import { styles } from './styles';

type Props = {
  onAddTodo: (text: string) => void;
};

export function AddTodoInput(props: Props) {
  const { onAddTodo } = props;

  const [text, setText] = useState('');

  const inputRef = useRef<TextInput>(null);

  const handleAddTodo = () => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    onAddTodo(trimmedText);
    setText('');
  };

  const handlePlusPress = () => {
    if (inputRef.current?.isFocused()) {
      inputRef.current?.blur();
      handleAddTodo();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={16}
    >
      <TextInput
        placeholder="Add a new todo"
        placeholderTextColor="#71727A"
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAddTodo}
        ref={inputRef}
      />
      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={0.8}
        onPress={handlePlusPress}
      >
        <Image source={addIcon} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
