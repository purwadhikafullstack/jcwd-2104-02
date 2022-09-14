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
import { getSession, signOut } from 'next-auth/react';
import axiosInstance from '../../src/config/api';
import { jsx } from '@emotion/react';

function AddAddress(props) {
  const { isOpen, onClose, userAddress } = props;
  const [addressUser, setAddresses] = useState({});
  const {
    recipient,
    province_id,
    province,
    city_id,
    city,
    addressDetail,
    postalCode,
  } = addressUser;
  const [getprovince, setGetProvince] = useState([]);

  useEffect(() => {
    fetchProvince();
  }, []);

  const onAddAddress = async (body) => {
    console.log('x');
  };

  const onHandleChange = (e) => {
    setAddresses({ ...addressUser, [e.target.name]: e.target.value });
  };

  // function loadProvinsi() {
  //   fetch('/api/provinsi')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let temp =
  //         '<option value="" selected="" disabled="">-- Pilih Provinsi --</option>';
  //       data.rajaongkir.results.forEach((rs) => {
  //         temp += `<option value="${rs.province_id}">${rs.province}</option>`;
  //       });
  //       document.getElementById('prov1').innerHTML = temp;
  //       document.getElementById('prov2').innerHTML = temp;
  //     })
  //     .catch((err) => alert(err));
  // }

  // function loadKota(id, el) {
  //   fetch(`/api/kota/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let temp =
  //         '<option value="" selected="" disabled="">-- Pilih Kota --</option>';
  //       data.rajaongkir.results.forEach((rs) => {
  //         temp += `<option value="${rs.city_id}">${rs.city_name}</option>`;
  //       });
  //       document.getElementById(el).innerHTML = temp;
  //     })
  //     .catch((err) => alert(err));
  // }

  const renderProvince = () => {
    return getprovince.map((province) => (
      <option value={province.province_id}>{province.province}</option>
    ));
  };

  const fetchProvince = async () => {
    try {
      const resGetProvince = await axiosInstance.get('/rajaongkir/provinsi');
      setGetProvince(resGetProvince.data.rajaongkir.results);
      console.log(resGetProvince.data.rajaongkir.results);
    } catch (error) {
      console.log({ error });
      // alert(error.data.message);
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
              id="prov1"
              // onchange="loadKota(this.value, 'kot1')"
              _focusVisible
              name="province"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Provinsi"
              value={province_id}
              variant="filled"
              onChange={onHandleChange}
            >
              <option value="" selected="" disabled="">
                -- Pilih Provinsi --
              </option>
              {renderProvince()}{' '}
              {/* <option value="Jawa Barat">Jawa Barat</option>
              <option value="Jawa Timur">Jawa Timur</option> */}
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
              {' '}
              <option value="" selected="" disabled="">
                -- Pilih Kota --
              </option>
              {/* <option value="Depok">Depok</option>
              <option value="Kediri">Kediri</option> */}
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
            onClick={() => {
              console.log(addressUser);
              onAddAddress(addressUser);
            }}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddAddress;
