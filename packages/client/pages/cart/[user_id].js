import { getSession } from 'next-auth/react';
import React from 'react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../src/config/api';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  useColorModeValue,
  HStack,
  VStack,
  Button,
  ButtonGroup,
  Input,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import CartCards from '../../components/CartCards';

function cart(props) {
  const { productDetailsMap, cartDetailsMap } = props;
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (!cartDetailsMap.length) {
      setEmpty(true);
    }
  }, []);

  function mappedProducts() {
    return productDetailsMap.map((product, index) => {
      return (
        <CartCards product={product} quantity={cartDetailsMap} index={index} />
      );
    });
  }

  function mappedCarts() {
    return cartDetailsMap.map((cart) => {
      return (
        <>
          <Center py={12}>
            <Box
              role={'group'}
              p={6}
              maxW={'330px'}
              w={'full'}
              bg={'white'}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
            >
              <Box rounded={'lg'} pos={'relative'} height={'300px'}>
                <Button colorScheme="blue">{cart.quantity}</Button>
              </Box>
              <Stack pt={10} align={'center'}></Stack>
            </Box>
          </Center>
        </>
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
        <></>
      )}

      <div className="w-[100vw] flex flex-col px-[5vw]">
        {/* <div className="container shadow-[0px_6px_20px_0px_rgba(0,28,47,0.05)]"> */}
        {mappedProducts()}
        {/* </div> */}
      </div>
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
    const res = await axiosInstance.get(`/carts/getCarts/${user_id}`, config);

    return {
      props: {
        carts: res.data,
        productDetailsMap: res.data.productMap,
        cartDetailsMap: res.data.cartMap,
      },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default cart;
