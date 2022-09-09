import { useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import axiosInstance from '../../src/config/api';
import '@fontsource/poppins';
import Navbar from '../../components/Navbar';
import {
  Text,
  VStack,
  Button,
  Link,
  Box,
  Show,
  HStack,
  ChakraProvider,
  Container,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { api_origin } from '../../constraint';
import theme from '../../components/theme';
import { LockIcon } from '@chakra-ui/icons';

function Profile(props) {
  const [user, setUser] = useState(props.user);
  const [imgSource, setimgSource] = useState(api_origin + props.user.avatar);

  const { name, email, gender, birthDate, phoneNumber } = user;

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Container>
        <Box
          marginBlock={{ md: '1' }}
          boxShadow={{ md: 'xl' }}
          p={{ md: '12' }}
          rounded={{ md: 'md' }}
          bg="white"
        >
          <Show below="md">
            <HStack marginTop={9} marginLeft={4}>
              <NextLink href="/">
                <Link>
                  <Image src="/profile/close.png" width={16} height={16} />
                </Link>
              </NextLink>
              <Text
                paddingBottom={1}
                paddingLeft={2}
                fontSize={16}
                fontWeight={600}
                color="#49454F"
              >
                Menu Utama
              </Text>
            </HStack>
          </Show>
          <HStack marginTop={4} marginLeft={{ base: '2', md: '77' }}>
            <Image
              className="rounded-full"
              src={imgSource}
              width={86}
              height={86}
              loader={() => {
                return imgSource;
              }}
            />
            <VStack align="left" paddingLeft={{ md: '2' }}>
              <Text
                fontSize={{ base: '16', md: '18' }}
                paddingLeft={3}
                fontWeight={600}
                color="#262626"
              >
                {name}
              </Text>
              <Text
                paddingLeft={3}
                fontWeight={500}
                color="#878686"
                fontSize={{ base: '12', md: '14' }}
              >
                {phoneNumber}
              </Text>
            </VStack>
          </HStack>
          <VStack>
            <HStack>
              <NextLink href="/profile/edit">
                <Link>
                  <Button
                    colorScheme="messenger"
                    width={327}
                    marginTop={4}
                    color="white"
                    fontWeight={{ base: '500', md: '800' }}
                    fontSize={15}
                    variant={{ base: 'solid', md: 'outline' }}
                  >
                    Ubah Profil
                  </Button>
                </Link>
              </NextLink>
            </HStack>
            <Show above="md">
              <VStack paddingTop={4} align="start">
                <VStack>
                  <Image src="/profile/line.png" width={327} height={2} />
                </VStack>
                <VStack
                  align="start"
                  fontWeight={800}
                  fontSize={15}
                  paddingBlock={3}
                >
                  <VStack>
                    <Text>Email</Text>
                  </VStack>
                  <VStack paddingBottom={2}>
                    <Text fontWeight={500} fontSize={15} color="gray.600">
                      {email}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text>Gender</Text>
                  </VStack>
                  <VStack paddingBottom={2}>
                    <Text fontWeight={500} fontSize={15} color="gray.600">
                      {gender ? gender : 'Not selected yet'}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text>Tanggal Lahir</Text>
                  </VStack>
                  <VStack>
                    <Text fontWeight={500} fontSize={15} color="gray.600">
                      {birthDate ? birthDate.slice(0, 10) : 'Not selected yet'}
                    </Text>
                  </VStack>
                </VStack>
                <VStack>
                  <Image src="/profile/line.png" width={327} height={2} />
                </VStack>
                <VStack
                  fontSize={14}
                  fontWeight={600}
                  paddingBlock={4}
                  width="full"
                >
                  <Box width="full">
                    <NextLink href="/history">
                      <Link>
                        <HStack width="full" justifyContent="space-between">
                          <Text>Riwayat Transaksi</Text>
                          <Image src="/profile/go.png" width={10} height={10} />
                        </HStack>
                      </Link>
                    </NextLink>
                  </Box>
                </VStack>
                <VStack>
                  <Image src="/profile/line.png" width={327} height={2} />
                </VStack>
              </VStack>
            </Show>
            <Show below="md">
              <VStack paddingTop={3}>
                <Image src="/profile/line.png" width={327} height={2} />
                <VStack alignSelf="start" paddingTop={2}>
                  <Text fontWeight={600} fontSize={16}>
                    Aktivitas Saya
                  </Text>
                </VStack>
                <VStack paddingTop={5}>
                  <Text fontWeight={500} fontSize={14} color="#B7B7B7">
                    Belum ada transaksi
                  </Text>
                </VStack>
                <VStack paddingTop={5} paddingBottom={5}>
                  <Image src="/profile/line.png" width={327} height={1} />
                </VStack>
                <VStack alignSelf="start">
                  <NextLink href="/">
                    <Link>
                      <HStack marginBottom={6}>
                        <Image src="/profile/home.png" width={16} height={16} />
                        <Text fontWeight={600} fontSize={14} paddingLeft={2}>
                          Beranda
                        </Text>
                      </HStack>
                    </Link>
                  </NextLink>
                </VStack>
                <VStack alignSelf="start">
                  <NextLink href="/">
                    <Link>
                      <HStack>
                        <Image
                          src="/profile/store.png"
                          width={14}
                          height={16}
                        />
                        <Text fontWeight={600} fontSize={14} paddingLeft={2}>
                          Toko Obat
                        </Text>
                      </HStack>
                    </Link>
                  </NextLink>
                </VStack>
                <VStack alignSelf="start">
                  <NextLink href="/">
                    <Link>
                      <HStack paddingTop={6}>
                        <Image
                          src="/profile/history.png"
                          width={14}
                          height={16}
                        />
                        <Text fontWeight={600} fontSize={14} paddingLeft={2}>
                          Riwayat
                        </Text>
                      </HStack>
                    </Link>
                  </NextLink>
                </VStack>
                <VStack alignSelf="start">
                  <NextLink href="/change-password">
                    <Link>
                      <HStack paddingTop={6}>
                        <LockIcon
                          w={4}
                          h={4}
                          color="#004776
"
                        />
                        <Text fontWeight={600} fontSize={14} paddingLeft={2}>
                          Ubah Password
                        </Text>
                      </HStack>
                    </Link>
                  </NextLink>
                </VStack>
              </VStack>
            </Show>
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

    console.log({ session });

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

export default Profile;
