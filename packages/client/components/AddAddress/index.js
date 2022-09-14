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
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import axiosInstance from '../../src/config/api';

function AddAddress(props) {
  const { isOpen, onClose } = props;
  const [userAddress, setUserAddress] = useState({});
  const [getProvince, setGetProvince] = useState([]);

  const {
    recipient,
    province_id,
    province,
    // city_id,
    city,
    addressDetail,
    postalCode,
  } = userAddress;

  useEffect(() => {
    fetchProvince();
  }, []);

  const onAddAddress = async ({
    recipient,
    province_id,
    province,
    // city_id,
    city,
    addressDetail,
    postalCode,
  }) => {
    try {
      const session = await getSession();

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const body = {
        recipient,
        province_id,
        // city_id,
        city,
        addressDetail,
        postalCode,
      };

      var filteredProvince = getProvince.filter(function (province) {
        return province.province_id == province_id;
      });

      if (filteredProvince.length > 0) {
        body['province'] = filteredProvince[0].province;
      }

      const res = await axiosInstance.post('/addresses/add', body, config);

      alert(res.data.message);
      // const resGetUserAddress = await axiosInstance.get(
      //   `/addresses/useraddresslists`,
      //   config,
      // );
      // setAddresses(resGetUserAddress.data.data.result);
    } catch (error) {
      console.log({ error });
      alert(error.response.data.message);
    }
  };

  const onHandleChange = (e) => {
    setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
  };

  const renderProvince = () => {
    return getProvince.map((province) => (
      <option value={province.province_id}>{province.province}</option>
    ));
  };

  const fetchProvince = async () => {
    try {
      const resGetProvince = await axiosInstance.get('/rajaongkir/provinsi');
      setGetProvince(resGetProvince.data.rajaongkir.results);
    } catch (error) {
      console.log({ error });
    }
  };

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
            <Text paddingTop={2}>Penerima</Text>
            <Input
              _focusVisible
              name="recipient"
              type="text"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              value={recipient}
              variant="filled"
              mb={3}
              onChange={onHandleChange}
            />
            <Text>Provinsi</Text>
            <Select
              _focusVisible
              name="province_id"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Provinsi"
              variant="filled"
              onChange={onHandleChange}
            >
              {renderProvince()}
            </Select>
            <Text paddingTop={2}>Kota</Text>
            <Select
              _focusVisible
              name="city"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Kota"
              value={city}
              variant="filled"
              onChange={onHandleChange}
              mb={3}
            >
              <option value="Depok">Depok</option>
              <option value="Kediri">Kediri</option>
            </Select>
            <Text paddingTop={2}>Detail Alamat</Text>
            <Input
              _focusVisible
              name="addressDetail"
              type="text"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              value={addressDetail}
              variant="filled"
              mb={3}
              onChange={onHandleChange}
            />
            <Text paddingTop={2}>Kode Pos</Text>
            <Input
              _focusVisible
              name="postalCode"
              type="number"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              value={postalCode}
              variant="filled"
              mb={3}
              onChange={onHandleChange}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            height={9}
            fontSize={15}
            fontWeight={500}
            colorScheme="messenger"
            onClick={() => onAddAddress(userAddress)}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddAddress;
