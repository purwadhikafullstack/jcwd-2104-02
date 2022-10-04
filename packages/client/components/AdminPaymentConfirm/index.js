import {
  Button,
  Box,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import { api_origin } from '../../constraint';
import TransactionDetails from '../AdminDetailTrans';
import AdminPaymentDetails from '../AdminPaymentDetails';
import { useState, useEffect } from 'react';

export default function AdminPaymentConfirm(props) {
  const {
    trans_id,
    productName,
    totalPrice,
    status,
    paymentProof,
    productImage,
    courier,
    deliveryCost,
    createdAt,

  } = props;
  console.log(paymentProof)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalDetails, setModalDetails] = useState(false)

  const rawStatus = status.split('_');
  return (
    <Box>
      <Text fontWeight={600} marginBottom={1} marginLeft={'81'}>
        No. Invoice: {trans_id}
      </Text>
      <HStack
        bg={'gray.50'}
        height={125}
        spacing="50"
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
          src={productImage}
        />
        <VStack>
          <Text w="200px" fontSize={16} fontWeight={600}>
            {productName}
          </Text>
          <Text w="200px" fontSize={14} fontWeight={450}>
            Total Harga: Rp. {totalPrice.toLocaleString('id')}
          </Text>
          <Button
            color="linkedin.500"
            variant="link"
            paddingRight={95}
            fontSize={13}
            fontWeight={500}
            onClick={()=>{
                setModalDetails(true)
            }}
          >
            Detail Transaksi
            <TransactionDetails
              isOpen={modalDetails}
              onClose={()=>{
                setModalDetails(false)
            }}
              key={trans_id}
              productName={productName}
              productImage={productImage}
              status={status}
              totalPrice={totalPrice}
              trans_id={trans_id}
              courier={courier}
              deliveryCost={deliveryCost}
              createdAt={createdAt}
              props={props}
            />
          </Button>
        </VStack>
        <Box w="200px" fontSize="15" fontWeight={500}>
          Status: {rawStatus.join(' ')}
        </Box>
        <VStack textAlign="center" fontWeight={500}>
          <Text w="160px" fontSize="14">
            Tanggal Pemesanan:
          </Text>
          <Text w="150px" fontSize="13">
            {createdAt.slice(0, 10)}
          </Text>
        </VStack>
        <VStack textAlign="center" fontWeight={500}>
          <Button
            color="linkedin.500"
            variant="link"
            paddingRight={95}
            fontSize={15}
            fontWeight={500}
            onClick={onOpen}
          >
            Payment Proof
            <AdminPaymentDetails
              isOpen={isOpen}
              onClose={onClose}
              key={trans_id}
              paymentProof={api_origin + paymentProof}
              props={props}
            />
          </Button>
        </VStack>
        <VStack textAlign="center" fontWeight={500}>
          <Button
            variant="outline"
            colorScheme="green"
            width={180}
            fontSize={14}
          >
            Konfirmasi Pesanan
          </Button>
          <Button variant="outline" colorScheme="red" width={180} fontSize={14}>
            Batalkan Pesanan
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}
