import { useState } from 'react';
import { getSession } from 'next-auth/react';
import axiosInstance from '../../src/config/api';
import '@fontsource/poppins';
import Navbar from '../../components/Navbar';
import {
  Text,
  VStack,
  Button,
  Link,
  HStack,
  ChakraProvider,
  Box,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { api_origin } from '../../constraint';
import theme from '../../components/theme';
import { useRouter } from 'next/router';

function UploadPrescriptionImage(props) {
  const router = useRouter();
  const [prescriptionImage, setPrescriptionImage] = useState({});
  const [imgSource, setimgSource] = useState(
    api_origin + `/public/prescriptionImage/default-prescription-image.png`,
  );

  const toast = useToast();

  const onSaveUserPrescriptionImage = async () => {
    try {
      const session = await getSession();

      const { user_token } = session.user;

      const body = new FormData();

      body.append('prescriptionImage', prescriptionImage);

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const res = await axiosInstance.post(
        '/prescriptions/uploadPrescriptionImage',
        body,
        config,
      );

      toast({
        description: res.data.message,
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        router.replace('/');
      }, 1000);
    } catch (error) {
      console.log({ Error });
      alert(error.response.data.message);
    }
  };

  const onFileChange = (event) => {
    setPrescriptionImage(event.target.files[0]);
    setimgSource(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Box
        bg="white"
        paddingLeft={320}
        paddingRight={320}
        marginTop={3}
        paddingTop={3}
        marginBottom={12}
      >
        <VStack>
          <HStack marginBottom={2} fontSize="15" alignSelf="start">
            <NextLink href="/">
              <Link>
                <Text color="#B7B7B7" paddingRight={3}>
                  Beranda
                </Text>
              </Link>
            </NextLink>
            <Image
              src="/uploadPrescriptionImage/next.png"
              width={5}
              height={9}
            />
            <Text color="#008DEB" paddingLeft={0.5}>
              Unggah Resep
            </Text>
          </HStack>
          <Text alignSelf="start" fontSize="17" fontWeight="500">
            Unggah Resep Dokter
          </Text>
          <VStack>
            <Image src={imgSource} width={235} height={235} />
            <VStack paddingLeft="89" paddingTop={1} fontSize={12.5}>
              <input type={'file'} onChange={onFileChange} />
            </VStack>
            <VStack paddingY={1}>
              <Button
                onClick={onSaveUserPrescriptionImage}
                size="sm"
                colorScheme="messenger"
                variant="solid"
                borderRadius={15}
                width={130}
              >
                <Text fontWeight={500} fontSize={13} color="white">
                  Unggah Resep
                </Text>
              </Button>
            </VStack>
            <VStack>
              <Text
                fontSize="16"
                fontWeight="500"
                marginTop={7}
                marginBottom={2}
              >
                Cara Unggah Resep Dokter
              </Text>
            </VStack>
            <HStack paddingTop={4}>
              <VStack
                width={220}
                fontSize={12}
                textAlign="center"
                paddingRight={10}
              >
                <Image
                  src="/uploadPrescriptionImage/upload-prescription.png"
                  width={60}
                  height={60}
                />
                <VStack paddingTop={2}>
                  <Text fontWeight={600}>1. Unggah Resep</Text>
                  <Text>
                    Foto resep yang ditulis oleh dokter anda, kemudian unggah
                    pada form di atas.
                  </Text>
                </VStack>
              </VStack>
              <VStack
                width={180}
                fontSize={12}
                textAlign="center"
                paddingTop={1.5}
                paddingRight={5}
              >
                <Image
                  src="/uploadPrescriptionImage/waiting-for-validation.png"
                  width={52}
                  height={48}
                />
                <VStack paddingTop={3}>
                  <Text fontWeight={600}>2. Menunggu Validasi</Text>
                </VStack>
                <Text>
                  Tim kami akan mengecek ketersediaan obat sesuai resep.
                </Text>
              </VStack>
              <VStack
                width={220}
                fontSize={12}
                textAlign="center"
                paddingLeft={5}
              >
                <Image
                  src="/uploadPrescriptionImage/delivery.png"
                  width={60}
                  height={60}
                />
                <VStack paddingTop={2}>
                  <Text fontWeight={600}>3. Lakukan Pembayaran</Text>
                  <Text>
                    Segera lakukan pembayaran agar kami dapat memproses obat
                    anda.
                  </Text>
                </VStack>
              </VStack>
              <VStack
                width={180}
                fontSize={12}
                textAlign="center"
                paddingLeft={8}
              >
                <Image
                  src="/uploadPrescriptionImage/payment.png"
                  width={64}
                  height={64}
                />
                <VStack>
                  <Text fontWeight={600}>4. Obat Diantar</Text>
                  <Text>
                    Kami akan segera mengirimkan obat yang anda pesan.
                  </Text>
                </VStack>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default UploadPrescriptionImage;
