import { Flex,Box, HStack, Button } from "@chakra-ui/react";
import Navbar from "../../components/Navbar"
import axiosInstance from "../../src/config/api";
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Image from 'next/image';


function DetailPage(props) {
const {products} = props
// console.log(products);



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
              <br/>
              <div className="flex bg-white w-[100%] items-center">
                <p className="text-[16.3px] font-[400]">
                  Desription
                  <br/>
                  {products.description}
                </p>
              </div>
              <br/>
              <Button colorScheme="linkedin">Add To Cart</Button>
              <br/>

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
    
    const { user_token } = session.user;
    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };
    const { product_id } = context.params;
    // console.log(product_id);
    
    const resGetProduct = await axiosInstance.get(`/products/${product_id}`, config)
    // console.log(resGetProduct);
    

    if (!resGetProduct) return { redirect: { destination: '/' } };

    // console.log(productDetail);
    return {
      props: {
        products: resGetProduct.data.data
      },
    };
  } catch (error) {
    const { message } = error;

    return { props: { message } };
  }
}

export default DetailPage