import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

function AddAddress(props) {
  const { isOpen, onClose, userProfile, onAddAdressButton } = props;
  //   const [user, setUser] = useState(userProfile);
  //   const { username, bio, firstName, lastName, email, gender } = user;

  // const onHandleChange = (e) => {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        backgroundColor="white"
        padding={{ md: '4' }}
        paddingY={{ base: '3' }}
        marginX={{ base: '4' }}
      >
        <ModalHeader fontWeight={600} fontSize={{ base: '16', md: '19' }}>
          Tambah Alamat
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            align="start"
            fontSize={{ base: '14', md: '15' }}
            fontWeight={500}
          >
            <Text>Provinsi</Text>
            <Select
              _focusVisible
              name="gender"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Provinsi"
              // value={gender}
              variant="filled"
              // onChange={onHandleChange}
            >
              <Text>Kota</Text>
              <option value="Male">Jawa Barat</option>
              <option value="Female">Jawa Timur</option>
            </Select>
            <Text paddingTop={2}>Kota</Text>
            <Select
              _focusVisible
              name="gender"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Kota"
              // value={gender}
              variant="filled"
              // onChange={onHandleChange}
              mb={3}
            >
              <option value="Male">Depok</option>
              <option value="Female">Kediri</option>
            </Select>
            <Text paddingTop={2}>Detail Alamat</Text>
            <Input
              _focusVisible
              name="lastName"
              type="text"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              // value={lastName}
              variant="filled"
              mb={3}
              // onChange={onHandleChange}
            />
            <Text paddingTop={2}>Kode Pos</Text>
            <Input
              _focusVisible
              name="lastName"
              type="number"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              // value={lastName}
              variant="filled"
              mb={3}
              // onChange={onHandleChange}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            height={9}
            fontSize={15}
            fontWeight={500}
            colorScheme="messenger"
            onClick={() => onSaveProfileUpdate(user)}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddAddress;
