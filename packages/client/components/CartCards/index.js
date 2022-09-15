import { Button, Input } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import axiosInstance from '../../src/config/api';

export default function CartCards(props) {
  const { product, quantity, index } = props;
  const [edit, setEdit] = useState(false);
  const [quantityItem, setQuantityItem] = useState('');

  const onChangeQuantity = (e) => {
    setQuantityItem(e.target.value);
  };

  const saveQuantityUpdate = async () => {
    try {
      const session = await getSession();

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const body = {
        quantity: quantityItem,
      };

      const product_id = product.product_id;
      console.log(product_id);

      const res = await axiosInstance.patch(
        `carts/patchCart/${product_id}`,
        body,
        config,
      );
      setQuantityItem(res.data.quantityPatched);
      window.location.reload();
      alert(res.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteProduct = async () => {
    try {
      const session = await getSession();

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const product_id = product.product_id;
      console.log(product_id);

      const res = await axiosInstance.delete(`carts/${product_id}`, config);

      window.location.reload();
      alert(res.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-[100%]  my-[3vh] columns-5  ">
      <Image
        unoptimized
        alt="resep-logo"
        // layout="responsive"
        width={70}
        height={70}
        src={product.productImage}
      />
      <p className="text-[20px]">{product.productName}</p>
      <div className=" text-[#6E6E6E]">
        Price: Rp. {product.productPrice.toLocaleString('id')}
      </div>
      <div className="flex justify-between font-semibold ">
        {edit ? (
          <Input
            type={'text'}
            placeholder={`${quantity[index].quantity}`}
            onChange={onChangeQuantity}
          ></Input>
        ) : (
          <div>{`${quantity[index].quantity}`}</div>
        )}
        {edit ? (
          <>
            <Button
              onClick={() => {
                saveQuantityUpdate();
                setEdit(false);
              }}
              mx={'2'}
              size={'xl'}
              colorScheme={'green'}
            >
              Save
            </Button>

            <Button
              onClick={() => {
                deleteProduct();
                setEdit(false);
              }}
              mx={'2'}
              size={'xl'}
              colorScheme={'red'}
            >
              Delete
            </Button>

            <Button
              onClick={() => {
                setEdit(false);
              }}
              mx={'1'}
              size={'xl'}
              colorScheme={'yellow'}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setEdit(true);
            }}
            colorScheme={'linkedin'}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}
