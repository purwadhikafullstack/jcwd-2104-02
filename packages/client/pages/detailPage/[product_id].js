import { Flex, Box, HStack, Button } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../src/config/api';
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import next from 'next';
import { useToast } from '@chakra-ui/react';

function DetailPage(props) {
  const { products } = props;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user_id } = props;
  const { product_id, quantity } = products;
  const toast = useToast();

  const onAddClick = async () => {
    setLoading(true);
    try {
      const body = {
        quantity: +1,
        product_id,
        user_id,
      };

      const session = await getSession();

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };

      const res = await axiosInstance.post(
        `carts/addToCart/${product_id}`,
        body,
        config,
      );
      toast({
        title: 'Add To Cart',
        description: res.data.message,
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      //setSuccess(true);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="flex-col">
          <div className="w-[65%] ml-[1vw] my-[3vh] columns-2">
            <Image
              unoptimized
              alt="resep-logo"
              layout="responsive"
              width={50}
              height={50}
              src={products.productImage}
            />
            <div className="flex-row font-semibold">
              <p className="text-[25px]">{products.productName}</p>
              <br />
              <div className="flex bg-white w-[100%] items-center text-[#6E6E6E]">
                <p className="text-[20px] font-[400]">{products.packageType}</p>
                <p className="text-[20px] font-[400] mx-[1vw]">-</p>
                <p className="text-[20px] font-[400]">
                  Stok {products.productStock}
                </p>
              </div>
              <br />
              <div className="flex bg-white w-[100%] items-center text-[#6E6E6E]">
                <p className="text-[20px] font-[400]">
                  Price: Rp. {products.productPrice.toLocaleString('id')}
                </p>
              </div>
              <br />
              <div className="flex bg-white w-[100%] items-center">
                <p className="text-[16.3px] font-[400]">
                  Desription
                  <br />
                  {products.description}
                </p>
              </div>
              <br />
              {loading ? (
                <Button onClick={onAddClick} isLoading colorScheme="linkedin">
                  Add To Cart
                </Button>
              ) : (
                <Button onClick={onAddClick} colorScheme="linkedin">
                  Add To Cart
                </Button>
              )}
              {/* <Button colorScheme="linkedin">Add To Cart</Button> */}
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });
    // console.log("testing");

    if (!session) return { redirect: { destination: '/login' } };

    const { user_token, user_id } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };
    const { product_id } = context.params;
    // console.log(product_id);

    const resGetProduct = await axiosInstance.get(
      `/products/${product_id}`,
      config,
    );
    // console.log(resGetProduct);

    if (!resGetProduct) return { redirect: { destination: '/' } };

    // console.log(productDetail);
    return {
      props: {
        products: resGetProduct.data.data,
        user_id,
      },
    };
  } catch (error) {
    const { message } = error;

    return { props: { message } };
  }
}

export default DetailPage;
