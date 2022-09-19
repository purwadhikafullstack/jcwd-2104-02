import { getSession } from 'next-auth/react';
import React from 'react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../src/config/api';
import {
  Select,
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
  Box,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import CartCards from '../../components/CartCards';

function cart(props) {
  const [carts, setCarts] = useState([]);
  const [empty, setEmpty] = useState(false);
  // const { user_id, user_token } = props;
  const [cartsPrice, setCartsPrice] = useState([]);

  const fetchCarts = async () => {
    try {
      const session = await getSession();
      const { user_id } = props;

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };
      const res = await axiosInstance.get(`/carts/getCarts/${user_id}`, config);
      console.log(res.data.data);
      setCarts(res.data.data);
    } catch (error) {
      alert(error.message);
    }
  };

  // [] = carts;
  // console.log(carts);
  const countTotalPrice = (body) => {
    const result = carts.reduce(
      (acc, curr) => acc + curr.quantity * curr.product.productPrice,
      0,
    );
    return result;
  };

  // const total = countTotalPrice();
  // const PPN = subTotal * 0.11;
  // const total = subTotal + PPN;

  // console.log(`TOTALNYAAAAAAAAAA BOSQQQQQ ${subTotal}`);

  useEffect(() => {
    if (!cart.length) {
      setEmpty(true);
    }
  }, []);

  useEffect(() => {
    fetchCarts();
  }, []);

  function mappedProducts() {
    return carts.map((cart, index) => {
      return (
        <CartCards
          // product_id={cart.product_id}
          // productName={cart.productName}
          // productPrice={cart.productPrice}
          product={cart.product}
          quantity={cart.quantity}
          // index={index}
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
        <></>
      )}
      <div className="text-[20px] font-[400] ml-[10vh] mt-[2vh]">
        Daftar Pesanan
      </div>
      <div className="column-2  gap-4 flex flex-row">
        <div className="w-[89vw] bg-gray-100 rounded-2xl shadow-md ">
          {mappedProducts()}
        </div>
        <div className="h-[35vh] bg-sky-100 rounded-2xl shadow-md text-center w-[50vw]">
          <div className="text-[20px] font-[500] mt-5 mb-5">Total Price</div>
          <div>harga: {countTotalPrice()}</div>
        </div>
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
    // const res = await axiosInstance.get(`/carts/getCarts/${user_id}`, config);

    return {
      props: {
        // carts: res.data.data,
        user_id,
        user_token,
      },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default cart;
