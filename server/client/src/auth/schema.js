import * as yup from 'yup'

export const registrationSchema = yup.object({
  name: yup.string().required('Name is Required'),
  email: yup
    .string()
    .email('Invalid Email Address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Length should be greater than 5'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})
