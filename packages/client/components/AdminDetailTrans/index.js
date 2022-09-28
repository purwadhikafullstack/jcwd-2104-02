import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
} from '@chakra-ui/react';

function SelectAddress(props) {
  const {
    isOpen,
    onClose,
    trans_id,
    totalPrice,
    status,
    courier,
    deliveryCost,
    createdAt,
  } = props;
  const rawStatus = status.split('_');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        backgroundColor="white"
        paddingTop={4}
        paddingBottom={9}
        paddingX={5}
        maxWidth={500}
      >
        <ModalHeader fontWeight={600} fontSize={24}>
          Detail Transaksi
        </ModalHeader>
        <ModalCloseButton margin={5} />
        <ModalBody>
          <VStack align="start" fontWeight={400} fontSize={16}>
            <Text>Status : {rawStatus.join(' ')}</Text>
            <Text>No. Invoice : {trans_id}</Text>
            <Text>Kurir : {courier}</Text>
            <Text paddingBottom={6}>
              Tanggal Pemesanan : {createdAt.slice(0, 10)}
            </Text>
            <Text>Rincian Pembayaran :</Text>
            <Text>
              Biaya Pengiriman: Rp {deliveryCost.toLocaleString('id')}
            </Text>
            <Text fontWeight={500}>
              Biaya Total: Rp {totalPrice.toLocaleString('id')}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SelectAddress;
