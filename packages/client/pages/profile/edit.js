import { useState } from 'react';
import { getSession } from 'next-auth/react';
import axiosInstance from '../../src/config/api';
import '@fontsource/poppins';
import { Formik, Form } from 'formik';
import { TextField } from '../../components/textFieldProfile';
import * as Yup from 'yup';
import Navbar from '../../components/Navbar';
import {
  Text,
  VStack,
  Button,
  Link,
  Show,
  HStack,
  ChakraProvider,
  Container,
  Select,
  Box,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { api_origin } from '../../constraint';
import theme from '../../components/theme';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

function Edit(propsuser, props) {
  const router = useRouter();
  const [avatar, setAvatar] = useState({});
  const [user, setUser] = useState(propsuser.user);
  const [birthDateIsSet, setBirthDateIsSet] = useState(false);
  const [imgSource, setimgSource] = useState(
    api_origin + propsuser.user.avatar,
  );

  const { name, email, gender, birthDate, phoneNumber } = user;

  const onSaveAvatarUpdate = async () => {
    try {
      const session = await getSession();

      const { user_token } = session.user;

      const body = new FormData();

      body.append('avatar', avatar);

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const res = await axiosInstance.patch('/users/avatar', body, config);

      alert(res.data.message);
    } catch (error) {
      console.log({ Error });
      alert(error.response.data.message);
    }
  };

  const onSaveProfileUpdate = async ({
    fullName,
    phoneNumber,
    email,
    gender,
    birthDate,
  }) => {
    try {
      const session = await getSession();

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const body = {
        name: fullName,
        phoneNumber,
        email,
        gender,
        birthDate,
      };

      await axiosInstance.patch('/users/profile', body, config);
      alert('Update Profile Success');
      router.replace('/profile');
    } catch (error) {
      console.log({ error });
      alert(error.response.data.message);
    }
  };

  const validate = Yup.object({
    fullName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    phoneNumber: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Phone Number is Required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    startDate: Yup.string(),
  });

  const onFileChange = (event) => {
    setAvatar(event.target.files[0]);
    setimgSource(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Container>
        <Box
          marginBlock={{ md: '8' }}
          boxShadow={{ md: 'xl' }}
          p={{ md: '6' }}
          rounded={{ md: 'md' }}
          bg="white"
        >
          <Show below="md">
            <HStack marginTop={9} marginLeft={4} marginBottom={5}>
              <NextLink href="/profile">
                <Link>
                  <Image src="/back.png" width={16} height={16} />
                </Link>
              </NextLink>
              <Text
                paddingBottom={1}
                paddingLeft={2}
                fontSize={16}
                fontWeight={600}
                color="#49454F"
              >
                Ubah Profil
              </Text>
            </HStack>
          </Show>
          <VStack>
            <Image
              className="rounded-full"
              src={imgSource}
              width={86}
              height={86}
              loader={() => {
                return imgSource;
              }}
            />
          </VStack>
          <VStack marginTop={4}>
            <VStack
              paddingLeft={{ base: '10vH', md: '90' }}
              fontSize={{ base: '10', md: '13' }}
            >
              <input type={'file'} onChange={onFileChange} />
            </VStack>
            <HStack paddingBottom={3}>
              <Button onClick={onSaveAvatarUpdate} size="sm" bgColor="white">
                <Image src="/edit-blue.png" width={12} height={12} />
                <Text
                  paddingLeft={2}
                  fontWeight={600}
                  fontSize={{ base: '13', md: '16' }}
                  color="#008DEB"
                >
                  Ubah Foto Profil
                </Text>
              </Button>
            </HStack>
            <Image src="/line.png" width={327} height={2} />
            <VStack
              alignSelf="start"
              paddingLeft={3}
              paddingTop={2}
              paddingBottom={1}
            >
              <Text
                fontWeight={600}
                fontSize={{ base: '16', md: '19' }}
                paddingLeft={{ md: '90' }}
              >
                Info Profil
              </Text>
            </VStack>
            <Formik
              initialValues={{
                fullName: name || null,
                phoneNumber: phoneNumber,
                email: email,
                gender: 'Male' || null,
                birthDate: birthDate ? birthDate.slice(0, 10) : null,
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                const fixdate = moment(
                  new Date(values.startDate),
                  'DD-MM-YYYY',
                ).add(1, 'days');

                onSaveProfileUpdate({
                  fullName: values.fullName,
                  phoneNumber: values.phoneNumber,
                  email: values.email,
                  gender: values.gender,
                  birthDate: fixdate,
                });
              }}
            >
              {({ values, handleSubmit, setFieldValue }) => (
                <Form>
                  <TextField label="Nama" name="fullName" type="text" />
                  <TextField
                    label="Nomor Telepon"
                    name="phoneNumber"
                    type="text"
                    disabled
                  />
                  <TextField label="Email" name="email" type="text" />
                  <Text marginBottom={2} fontWeight={600} fontSize={14}>
                    Gender
                  </Text>
                  <Select
                    name="gender"
                    onChange={(event) =>
                      setFieldValue('gender', event.target.value)
                    }
                    value={values.gender}
                    width={320}
                    height={8}
                    fontWeight={500}
                    fontSize={14}
                    marginBottom={3}
                  >
                    {/* <option value="gender">Gender</option> */}
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                  <VStack
                    fontWeight={600}
                    align="start"
                    fontSize={14}
                    marginBottom={2}
                  >
                    <Text>Tanggal Lahir</Text>
                  </VStack>
                  <VStack fontSize={13} marginBottom={2}>
                    <DatePicker
                      selected={values.startDate}
                      dateFormat="yyyy-MM-d"
                      className="form-control w-80 h-8"
                      name="startDate"
                      onChange={(date) => {
                        setBirthDateIsSet(true);
                        setFieldValue('startDate', date);
                      }}
                    />
                    <p>{birthDate ? birthDate.slice(0, 10) : ''}</p>
                  </VStack>
                  <Button
                    colorScheme="messenger"
                    width={310}
                    marginTop={4}
                    color="white"
                    fontWeight={500}
                    fontSize={14}
                    type="submit"
                    marginBottom={6}
                    onClick={handleSubmit}
                  >
                    Simpan Perubahan
                  </Button>
                </Form>
              )}
            </Formik>
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: '/login' } };

    const { user_token } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };

    const user_id = session.user.user_id;
    const res = await axiosInstance.get(`/users/profile/${user_id}`, config);

    return {
      props: { user: res.data.data.result, session },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default Edit;
