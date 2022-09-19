import { Button, Icon, Input } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import axiosInstance from '../../src/config/api';
import { DeleteIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import axios from 'axios';

export default function CartCards(props) {
  //, totalPrice, fetchCarts
  const { product, quantity, totalPrice, fetchCarts } = props;
  const [quantityCart, setQuantityCart] = useState(quantity);

  useEffect(() => {
    // onClickMinus();
    // onClickPlus();
    // totalPrice();
    // fetchCarts();
  }, []);

  totalPrice(quantityCart);

  const deleteProduct = async () => {
    try {
      const session = await getSession();

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const product_id = product.product_id;

      const res = await axiosInstance.delete(`carts/${product_id}`, config);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const onClickPlus = async () => {
    const { product_id } = product;
    try {
      setQuantityCart(quantityCart + 1);
      const session = await getSession();

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const body = { quantity: quantityCart + 1 };

      await axiosInstance.patch(`carts/patchCart/${product_id}`, body, config);
      fetchCarts();
    } catch (error) {
      alert(error.message);
    }
  };

  const onClickMinus = async () => {
    const { product_id } = product;
    try {
      setQuantityCart(quantityCart - 1);
      const session = await getSession();

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const body = { quantity: quantityCart - 1 };
      totalPrice(quantityCart - 1);
      await axiosInstance.patch(`carts/patchCart/${product_id}`, body, config);
      fetchCarts();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-[100%] ml-[12vh] my-[3vh] columns-5  ">
      <Image
        unoptimized
        alt="resep-logo"
        width={70}
        height={70}
        src={product.productImage}
      />
      <p className="text-[13.5px] font-[500]">{product.productName}</p>
      <div className=" text-[#6E6E6E]">
        Price: Rp. {product.productPrice.toLocaleString('id')}
      </div>
      <div className="flex justify-between font-semibold ">
        <Button
          width="50px"
          onClick={() => {
            onClickMinus();
          }}
          colorScheme="linkedin"
        >
          -
        </Button>
        <Input
          htmlSize={4}
          width="60px"
          variant="outline"
          value={quantityCart}
        />

        <Button
          width="50px"
          onClick={() => {
            onClickPlus();
          }}
          colorScheme="linkedin"
        >
          +
        </Button>

        <Button
          onClick={() => {
            deleteProduct();
          }}
          size={'xl'}
          variant={'ghost'}
          ml={3}
        >
          <DeleteIcon></DeleteIcon>
        </Button>
      </div>
    </div>
  );
}
