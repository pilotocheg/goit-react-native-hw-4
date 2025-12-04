import { useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import addIcon from '../../assets/icons/add-icon.png';
import { createTodoThunk } from '../../redux/todos/thunks';
import { useAppDispatch } from '../../utils/redux/dispatch';
import { useUserId } from '../../context/auth';

import { styles } from './styles';

export function AddTodoInput() {
  const userId = useUserId();
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');

  const inputRef = useRef<TextInput>(null);

  const handleAddTodo = () => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    dispatch(createTodoThunk({ text: trimmedText, userId }));
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
