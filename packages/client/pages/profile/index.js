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
import { LockIcon, AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

function Profile(props) {
  const [user, setUser] = useState(props.user);
  const [imgSource, setimgSource] = useState(api_origin + props.user.avatar);

  const { name, email, gender, birthDate, phoneNumber } = user;

  const addresses = [
    {
      address: 'Jalan Asia',
      city: 'Depok',
      province: 'Jawa Barat',
      postalCode: '16454',
    },
    {
      address: 'Jalan Afrika',
      city: 'Kediri',
      province: 'Jawa Timur',
      postalCode: '16499',
    },
    {
      address: 'Jalan Eropa',
      city: 'Bandung',
      province: 'Jawa Barat',
      postalCode: '16498',
    },
  ];

  const renderAddresses = () => {
    return addresses.map((address) => (
      <Box
        paddingY={2}
        paddingLeft={2}
        border="2px"
        borderColor="gray.300"
        borderRadius="md"
        width={320}
      >
        <HStack justifyContent="space-between">
          <VStack align="start">
            <Text fontWeight={500} fontSize={12} color="gray.600">
              {address.address}
            </Text>
            <Text fontWeight={500} fontSize={12} color="gray.600">
              {address.city}, {address.province}, {address.postalCode}
            </Text>
          </VStack>
          <HStack paddingRight={3}>
            <EditIcon w={3.5} h={3.5} color="#004776" />
            <DeleteIcon w={3.5} h={3.5} color="#004776" />
          </HStack>
        </HStack>
      </Box>
    ));
  };

  return (
    <ChakraProvider theme={theme}>
      <Show above="md">
        <Navbar />
      </Show>
      <Container>
        <Box
          marginTop={{ md: '3' }}
          marginBottom={{ md: '8' }}
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
              width={70}
              height={70}
              loader={() => {
                return imgSource;
              }}
            />
            <VStack align="left">
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
                    fontWeight={{ base: '500', md: '600' }}
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
                  fontWeight={700}
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
                      {gender ? gender : 'Belum dipilih'}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text>Tanggal Lahir</Text>
                  </VStack>
                  <VStack>
                    <Text fontWeight={500} fontSize={15} color="gray.600">
                      {birthDate ? birthDate.slice(0, 10) : 'Belum dipilih'}
                    </Text>
                  </VStack>
                </VStack>
                <VStack>
                  <Image src="/profile/line.png" width={327} height={2} />
                </VStack>
                <VStack
                  fontSize={14}
                  fontWeight={600}
                  paddingBlock={3}
                  width="full"
                >
                  <Box width={320}>
                    <VStack align="start" fontWeight={700} fontSize={15}>
                      <HStack>
                        <HStack>
                          <Text>Alamat</Text>
                        </HStack>
                        <HStack paddingBottom={0.5}>
                          <AddIcon w={3} h={3} color="#004776" marginLeft={1} />
                        </HStack>
                      </HStack>
                      <VStack>{renderAddresses()}</VStack>
                    </VStack>
                  </Box>
                </VStack>
                <VStack>
                  <Image src="/profile/line.png" width={327} height={1} />
                </VStack>
                <VStack
                  fontSize={14}
                  fontWeight={600}
                  paddingBlock={3}
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
              </VStack>
              <VStack>
                <VStack>
                  <Image src="/profile/line.png" width={327} height={1.5} />
                </VStack>
                <VStack>
                  <NextLink href="/change-password">
                    <Link>
                      <HStack marginTop={4}>
                        <LockIcon w={4} h={4} color="#004776" />
                        <Text fontWeight={600} fontSize={14} paddingLeft={2}>
                          Ubah Password
                        </Text>
                      </HStack>
                    </Link>
                  </NextLink>
                </VStack>
              </VStack>
            </Show>
            <Show below="md">
              <VStack paddingTop={3}>
                <Image src="/profile/line.png" width={327} height={2} />
                <HStack alignSelf="start" paddingTop={1}>
                  <Text fontWeight={600} fontSize={14}>
                    Alamat
                  </Text>
                  <HStack>
                    <AddIcon w={3} h={3} color="#004776" marginLeft={1} />
                  </HStack>
                </HStack>
                <VStack paddingTop={1} alignSelf="start" paddingBottom={5}>
                  <Box
                    paddingY={2}
                    paddingLeft={2}
                    border="2px"
                    borderColor="gray.300"
                    borderRadius="md"
                    width={327}
                  >
                    <HStack justifyContent="space-between">
                      <VStack align="start">
                        <Text fontWeight={500} fontSize={12} color="gray.600">
                          Jalan Tongkol Raya BA/12 Kedayutamaa
                        </Text>
                        <Text fontWeight={500} fontSize={12} color="gray.600">
                          Kota Depok, Jawa Barat, ID 16454
                        </Text>
                      </VStack>
                      <HStack paddingRight={3}>
                        <EditIcon w={3.5} h={3.5} color="#004776" />
                        <DeleteIcon w={3.5} h={3.5} color="#004776" />
                      </HStack>
                    </HStack>
                  </Box>
                </VStack>
                <Image src="/profile/line.png" width={327} height={1.5} />
                <VStack alignSelf="start" paddingTop={1}>
                  <Text fontWeight={600} fontSize={14}>
                    Aktivitas Saya
                  </Text>
                </VStack>
                <VStack alignSelf="start" paddingTop={1.5}>
                  <Text fontWeight={500} fontSize={13} color="#B7B7B7">
                    Belum ada transaksi
                  </Text>
                </VStack>
                <VStack paddingTop={3} paddingBottom={5}>
                  <Image src="/profile/line.png" width={327} height={1.5} />
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
                        <Text fontWeight={600} fontSize={14} paddingLeft={2.5}>
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
                        <Text fontWeight={600} fontSize={14} paddingLeft={2.5}>
                          Riwayat
                        </Text>
                      </HStack>
                    </Link>
                  </NextLink>
                </VStack>
                <VStack alignSelf="start">
                  <NextLink href="/change-password">
                    <Link>
                      <HStack paddingTop={5} marginBottom={10}>
                        <LockIcon
                          w={3.5}
                          h={3.5}
                          color="#004776
"
                        />
                        <Text
                          fontWeight={600}
                          fontSize={14}
                          paddingLeft={2.5}
                          paddingTop={1}
                        >
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
