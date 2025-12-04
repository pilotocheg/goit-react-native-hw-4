import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useFormik } from 'formik';
import hash from 'stable-hash';

import { useAuthContext } from '../../context/auth';
import { TextInput } from '../../components/text-input';
import { Button } from '../../components/button';

import { validationSchema, initialValues, AuthFormValues } from './form';
import { styles } from './styles';

export default function LoginPage() {
  const { setToken } = useAuthContext();

  const onSubmit = (values: AuthFormValues) => {
    setToken(hash(values));
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, isValid } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={16}>
          <Text style={styles.title}>Welcome!</Text>
          <TextInput
            containerStyle={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            returnKeyType="next"
          />
          <TextInput
            containerStyle={styles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
          <Button
            title="Login"
            disabled={!isValid}
            onPress={handleSubmit}
            style={styles.button}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
