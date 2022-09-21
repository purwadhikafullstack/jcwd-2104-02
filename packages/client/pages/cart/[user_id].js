import { getSession } from 'next-auth/react';
import React from 'react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../src/config/api';
import {
  Text,
  VStack,
  Button,
  Box,
  ChakraProvider,
  Container,
  useDisclosure,
} from '@chakra-ui/react';
import '@fontsource/poppins';
import { useState, useEffect } from 'react';
import CartCards from '../../components/CartCards';
import theme from '../../components/theme';
import SelectAddress from '../../components/SelectAddress';
import AddAddress from '../../components/AddAddress';

function Cart(props) {
  const [carts, setCarts] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [userAllAddress, setUserAllAddress] = useState(props.userAllAddress);
  const [defaultAddress, setDefaultAddress] = useState(props.defaultAddress);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectAddress, setSelectAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);

  useEffect(() => {
    fetchCarts();
  }, []);

  const chooseAddress = (newAddress) => {
    setSelectedAddress(newAddress);
  };

  const fetchCarts = async () => {
    try {
      const session = await getSession();
      const { user_id } = props;

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };
      const res = await axiosInstance.get(`/carts/getCarts/${user_id}`, config);
      setCarts(res.data.data);
      if (!res.data.data.length) {
        setEmpty(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const countTotalPrice = (body) => {
    const result = carts.reduce(
      (acc, curr) => acc + curr.quantity * curr.product.productPrice,
      0,
    );
    return result;
  };

  function mappedProducts() {
    return carts.map((cart, index) => {
      return (
        <CartCards
          key={cart.cart_id}
          product={cart.product}
          quantity={cart.quantity}
          fetchCarts={fetchCarts}
          totalPrice={countTotalPrice}
          props={props}
        />
      );
    });
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <Navbar />
      {empty ? (
        <div className="text-[20px] font-[400] text-center mt-[35vh]">
          Wah keranjang kamu kosong!
        </div>
      ) : (
        <ChakraProvider theme={theme}>
          <div>
            <div className="text-[20px] font-[400] ml-[10vh] mt-[2vh]">
              Daftar Pesanan
            </div>
            <div className="column-2  gap-4 flex flex-row">
              <div className="w-[89vw] bg-gray-100 rounded-2xl shadow-md ">
                {mappedProducts()}
              </div>
              <div className="h-[35vh] bg-sky-100 rounded-2xl shadow-md text-center w-[50vw]">
                <div className="text-[20px] font-[500] mt-5 mb-5">
                  Total Price
                </div>
                <div>harga: {countTotalPrice()}</div>
              </div>
            </div>
            <Container>
              {selectedAddress ? (
                <Box
                  paddingY={2}
                  paddingLeft={2}
                  border="2px"
                  borderColor="gray.300"
                  borderRadius="md"
                  width={320}
                >
                  <VStack align="start">
                    <Text fontWeight={500} fontSize={12} color="gray.600">
                      Penerima: {selectedAddress.recipient}
                    </Text>
                    <Text fontWeight={500} fontSize={12} color="gray.600">
                      {selectedAddress.addressDetail}
                    </Text>
                    <Text fontWeight={500} fontSize={12} color="gray.600">
                      {selectedAddress.city_name},{selectedAddress.province},{' '}
                      {''}
                      {selectedAddress.postalCode}
                    </Text>
                  </VStack>
                </Box>
              ) : (
                <Button
                  variant="solid"
                  size="xxl"
                  onClick={onOpen}
                  bg="blue.200"
                >
                  Tambah Alamat <AddAddress isOpen={isOpen} onClose={onClose} />
                </Button>
              )}
              {userAllAddress ? (
                <Button
                  variant="solid"
                  size="xxl"
                  onClick={() => setSelectAddress(true)}
                >
                  Pilih Alamat
                  <SelectAddress
                    isOpen={selectAddress}
                    onClose={() => setSelectAddress(false)}
                    userAllAddress={userAllAddress}
                    chooseAddress={chooseAddress}
                  />
                </Button>
              ) : (
                <Text>Alamat belum ada</Text>
              )}
            </Container>
          </div>
        </ChakraProvider>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: '/login' } };

    const { user_token } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };

    const { user_id } = context.params;

    const userAllAddress = await axiosInstance.get(
      `/addresses/useraddresslists`,
      config,
    );
    const defaultAddress = await axiosInstance.get(
      `/addresses/userdefaultaddress`,
      config,
    );

    return {
      props: {
        user_id,
        user_token,
        userAllAddress: userAllAddress.data.data,
        defaultAddress: defaultAddress.data.data,
        session,
      },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default Cart;
