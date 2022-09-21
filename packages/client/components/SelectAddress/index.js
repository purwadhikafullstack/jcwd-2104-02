import { EditIcon } from '@chakra-ui/icons';
import { getSession } from 'next-auth/react';
import axiosInstance from '../../src/config/api';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import EditAddress from '../EditAddress';

function SelectAddress(props) {
  const { isOpen, onClose, userAllAddress, chooseAddress } = props;
  const [addresses, setAddresses] = useState(userAllAddress);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState('');

  useEffect(() => {
    RenderUserAddresses();
  }, []);

  useEffect(() => {}, [selectedAddressId]);

  const RenderUserAddresses = async () => {
    try {
      const session = await getSession();

      if (!session) return { redirect: { destination: '/login' } };

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const addressRes = await axiosInstance.get(
        `/addresses/useraddresslists`,
        config,
      );
      setAddresses(addressRes.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const renderAddresses = (onClose) => {
    return addresses.map((address) => (
      <HStack>
        <Button height="auto" width="45" bgColor="white" _hover="white">
          <Box
            paddingY={2}
            paddingLeft={2}
            border="2px"
            borderColor="gray.300"
            borderRadius="md"
            width={340}
            key={address.address_id}
            onClick={() => {
              chooseAddress(address);
              onClose();
            }}
          >
            <HStack>
              <VStack
                align="start"
                fontWeight={500}
                fontSize={13}
                color="gray.600"
                width={320}
              >
                <Text>Penerima: {address.recipient}</Text>
                <Text>{address.addressDetail}</Text>
                <Text>
                  {address.city_name}, {address.province}, {address.postalCode}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Button>
        <Button
          height={4}
          width={4}
          colorScheme="white"
          variant="solid"
          size="xxs"
          onClick={() => {
            setSelectedAddressId(address.address_id);
            setModalEdit(true);
          }}
        >
          <EditIcon w={3.5} h={3.5} color="#004776" />
          <EditAddress
            isOpen={modalEdit}
            onClose={() => setModalEdit(false)}
            address_id={selectedAddressId}
            RenderUserAddresses={RenderUserAddresses}
          />
        </Button>
      </HStack>
    ));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        backgroundColor="white"
        paddingTop={{ md: '4' }}
        paddingBottom={{ md: '9' }}
        paddingX={{ md: '5' }}
      >
        <ModalHeader fontWeight={600} fontSize={{ base: '16', md: '19' }}>
          Pilih Alamat
        </ModalHeader>
        <ModalCloseButton margin={5} />
        <ModalBody>
          <VStack>{renderAddresses(onClose)}</VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SelectAddress;
