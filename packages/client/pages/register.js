import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axiosInstance from '../src/config/api';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  ChakraProvider
} from '@chakra-ui/react';
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { TextField } from '../components/textfield';
import '@fontsource/poppins'
import theme from '../components/theme';


export default function Register() {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();
  if (session) router.replace('/');

  const validate = Yup.object({
    fullName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Full Name is Required'),
    email: Yup.string().email('Email is invalid').required('Email is Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is Required'),
    phoneNumber: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Phone Number is Required'),
  });

  const onRegisterClick = async ({fullName, email, password, phoneNumber}) => {
    try {
      const body ={
        name: fullName, email, password, phoneNumber
      }
      const res = await axiosInstance.post('/users/register', body);
      alert(res.data.message)
      window.location.reload();
    } catch (error) {
      if (error.response?.data) return alert(error.response.data.message);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          phoneNumber: '',
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          onRegisterClick({
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            password: values.password,
          });
          setDisabled(true);
          setTimeout(() => {
            setDisabled(false);
          }, 5000);
        }}
      >
        {({ handleSubmit, errors, touched, values, setFieldValue }) => (
          <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex
              flex={1}
              background={
                'linear-gradient(153.41deg, #008DEB 0.81%, rgba(0, 141, 235, 0.56) 49.89%, rgba(0, 141, 235, 0.28) 95.87%);'
              }
              boxShadow={'2xl'}
            >
              <Image
                alt={'Register Image'}
                objectFit={'cover'}
                src={'login/orang.png'}
                zIndex={'popover'}
              />
            </Flex>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
              <Stack spacing={4} w={'full'} maxW={'md'}>
                <Heading fontSize={'2xl'}>Sign up</Heading>
                <Field name="fullName">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      name="fullName"
                      type="text"
                    />
                  )}
                </Field>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      name="email"
                      type="text"
                    />
                  )}
                </Field>
                <Field name="phoneNumber">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      name="phoneNumber"
                      type="string"
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      name="password"
                      type="password"
                    />
                  )}
                </Field>
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  ></Stack>
                  <Button
                    colorScheme={'blue'}
                    variant={'solid'}
                    type="submit"
                    disabled={disabled}
                    onClick={handleSubmit}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </Stack>
        )}
      </Formik>
    </ChakraProvider>
  );
}