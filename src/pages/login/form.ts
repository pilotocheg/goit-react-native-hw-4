import * as yup from 'yup';

export type AuthFormValues = {
  email: string;
  password: string;
};

export const initialValues: AuthFormValues = {
  email: '',
  password: '',
};

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim('Email cannot contain spaces')
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('Password cannot contain spaces')
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
    .max(10, 'Password must be at most 10 characters long'),
});
