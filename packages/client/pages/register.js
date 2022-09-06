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
} from '@chakra-ui/react';


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();
  if (session) router.replace('/');

  const onRegisterClick = async () => {
    try {
      const body = {
        name,
        email,
        phoneNumber,
        password,
      };
      const res = await axiosInstance.post('/users/register', body);
      alert(res.data.message)
      console.log(res.data.message)
    } catch (error) {
      if (error.response?.data) return alert(error.response.data.message);
    }
  };
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex
        flex={1}
        background={
          'linear-gradient(153.41deg, #008DEB 0.81%, rgba(0, 141, 235, 0.56) 49.89%, rgba(0, 141, 235, 0.28) 95.87%);'
        }
        boxShadow={"2xl"}
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
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="name"
              value={name}
              placeholder="Full Name"
              variant="filled"
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              value={email}
              placeholder="Email"
              variant="filled"
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="string"
              value={phoneNumber}
              placeholder="Phone Name"
              variant="filled"
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              placeholder="Password"
              variant="filled"
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            ></Stack>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              disabled={disabled}
              onClick={() => {
                onRegisterClick();
                setDisabled(true);
                setTimeout(() => {
                  setDisabled(false);
                }, 5000);
              }}
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}