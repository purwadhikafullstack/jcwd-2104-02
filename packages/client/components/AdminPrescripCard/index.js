import { Box, HStack, Text, VStack, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { api_origin } from '../../constraint';

export default function AdminPrescripCard(props) {
  const { trans_id, deliveryCost, prescriptionImage, createdAt } = props;

  return (
    <Box marginTop={3}>
      <Text fontWeight={600} marginBottom={1} marginLeft={'81'}>
        No. Invoice: {trans_id}
      </Text>
      <HStack
        bg={'gray.50'}
        height={125}
        spacing="5vH"
        marginBottom={3}
        ml={'70'}
        px={8}
        rounded={6}
        boxShadow="md"
      >
        <Image
          unoptimized
          alt="resep-logo"
          width={70}
          height={70}
          src={api_origin + prescriptionImage}
        />
        <VStack>
          <Text w="25vH" fontSize={16} fontWeight={600}>
            Resep Dokter
          </Text>
        </VStack>
        <Text w="30vH" fontSize="15" fontWeight={500}>
          Biaya Pengiriman: Rp {deliveryCost.toLocaleString('id')}
        </Text>
        <VStack textAlign="center" fontWeight={500}>
          <Text w="35vH" fontSize="14">
            Tanggal Pemesanan:
          </Text>
          <Text w="37vH" fontSize="13">
            {createdAt.slice(0, 10)}
          </Text>
        </VStack>
        <Link href="/">
          <Button
            color="linkedin.500"
            variant="link"
            paddingRight={95}
            fontSize={13}
            fontWeight={500}
          >
            <Text w="11vH" fontSize="16" fontWeight={600}>
              Tambah Obat
            </Text>
          </Button>
        </Link>
      </HStack>
    </Box>
  );
}
