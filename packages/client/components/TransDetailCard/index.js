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
        {quantity < 2 ? (
          <Button
            isDisabled
            width="50px"
            onClick={() => {
              onClickMinus();
            }}
            colorScheme="linkedin"
          >
            -
          </Button>
        ) : (
          <Button
            width="50px"
            onClick={() => {
              onClickMinus();
            }}
            colorScheme="linkedin"
          >
            -
          </Button>
        )}
        {/* <Button
          width="50px"
          onClick={() => {
            onClickMinus();
          }}
          colorScheme="linkedin"
        >
          -
        </Button> */}
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
