import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from '../src/config/api';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

export default function Home() {
  const categoriesTestArray = [
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:3000/landingpage/categories/Batuk.png',
    },
    {
      category_list_id: 2,
      category: 'Asma',
      categoryImage: 'http://localhost:3000/landingpage/categories/Asthma.png',
    },
    {
      category_list_id: 3,
      category: 'Antibiotik',
      categoryImage:
        'http://localhost:3000/landingpage/categories/Antibiotik.png',
    },
    {
      category_list_id: 4,
      category: 'Mata',
      categoryImage: 'http://localhost:3000/landingpage/categories/Mata.png',
    },
    {
      category_list_id: 5,
      category: 'P3K',
      categoryImage: 'http://localhost:3000/landingpage/categories/P3K.png',
    },
    {
      category_list_id: 6,
      category: 'Vitamin',
      categoryImage: 'http://localhost:3000/landingpage/categories/Vitamin.png',
    },
    {
      category_list_id: 7,
      category: 'Pusing',
      categoryImage: 'http://localhost:3000/landingpage/categories/Logo-pusing.png',
    },
    {
      category_list_id: 8,
      category: 'Pencernaan',
      categoryImage:
        'http://localhost:3000/landingpage/categories/Pencernaan.png',
    },
    {
      category_list_id: 9,
      category: 'Minyak angin & Balsem',
      categoryImage:
        'http://localhost:3000/landingpage/categories/Minyak-angin-balsem.png',
    },
  ];

  const productsTestArray = [
    {
      product_id: 1,
      productName: 'Vitamin B1 50 mg 10 tablet',
      productPrice: 1300,
      description: 'Product desc',
      productStock: 23,
      productImage: 'http://localhost:3000/testProductImage/VitaminB1.png',
      packageType: 'Per Strip',
      servingType: 'Kapsul',
    },
    {
      product_id: 2,
      productName: 'Vitamin C 100 mg 10 Tablet',
      productPrice: 1000,
      description: 'Product desc',
      productStock: 23,
      productImage: 'http://localhost:3000/testProductImage/VitaminC.png',
      packageType: 'Per Strip',
      servingType: 'Kapsul',
    },
    {
      product_id: 3,
      productName: 'Vitamin B12 IPI 45 Tablet',
      productPrice: 5100,
      description: 'Product desc',
      productStock: 23,
      productImage: 'http://localhost:3000/testProductImage/B12.png',
      packageType: 'Per Botol',
      servingType: 'Kapsul',
    },
    {
      product_id: 4,
      productName: 'Blackmores Vitamin C 500  mg 60 Tablet',
      productPrice: 109800,
      description: 'Product desc',
      productStock: 23,
      productImage: 'http://localhost:3000/testProductImage/Blackmores.png',
      packageType: 'Per Botol',
      servingType: 'Kapsul',
    },
    {
      product_id: 5,
      productName: 'Vitamin A IPI 45 Tablet',
      productPrice: 3700,
      description: 'Product desc',
      productStock: 23,
      productImage: 'http://localhost:3000/testProductImage/AIPI.png',
      packageType: 'Per Botol',
      servingType: 'Kapsul',
    },
  ];

  function categoriesMap() {
    return categoriesTestArray.map((category) => {
      return (
        <div
          key={category.category_list_id}
          className="flex flex-col flex-none items-center justify-start w-[25%] desktop:flex-row desktop:h-[9vh] desktop:w-[31%] desktop:bg-white desktop:shadow-[0px_6px_20px_0px_rgba(0,28,47,0.05)]"
        >
          <div className="w-[35px] h-[35px] desktop:w-[3.5vw] desktop:h-[3.5vw] desktop:mx-[1vw]">
            <Image
              unoptimized
              alt="resep-logo"
              layout="responsive"
              width={35}
              height={35}
              src={category.categoryImage}
              loader={() => {
                return category.categoryImage;
              }}
            />
          </div>
          <p className="text-[12px] desktop:text-[14px] desktop:font-[500] desktop:font-[#262626]">
            {category.category}
          </p>
        </div>
      );
    });
  }

  function productsMap() {
    return productsTestArray.map((product) => {
      return (
        <div
          key={product.product_id}
          className="w-[35vw] mx-[3vw] h-[100%] flex-none flex flex-col items-center desktop:w-[10vw]"
        >
          <div className="w-[100%] my-[3vh] hover:cursor-pointer">
            <Image
              unoptimized
              alt="resep-logo"
              layout="responsive"
              width={102}
              height={66}
              src={product.productImage}
              loader={() => {
                return product.productImage;
              }}
            />
          </div>
          <p className="text-[12px] w-[100%]">
            {product.productName.length <= 25
              ? product.productName
              : `${product.productName.slice(0, 20)}...`}
          </p>
          <div className="flex bg-white w-[100%] items-center text-[#6E6E6E]">
            <p className="text-[10px] font-[400]">{product.packageType}</p>
            <p className="text-[10px] font-[400] mx-[1vw]">-</p>
            <p className="text-[10px] font-[400]">
              Stok {product.productStock}
            </p>
          </div>
          <p className="font-[500] text-[12px] w-[100%]">
            Rp.{product.productPrice.toLocaleString('id')}
          </p>
          <div className="grow" />
          <div className="w-[100%]">
            <Button
              variant="outline"
              colorScheme="linkedin"
              sx={{ width: '100%', height: '5vh', marginBottom: '6vh' }}
            >
              <p className="text-[12px]">Tambah</p>
            </Button>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="bg-white w-[100%] h-[100vh] relative z-[1] desktop:scrollbar">
      <Navbar />
      <div id="box biru" className="bg-[#1068A3] h-[53px] desktop:hidden" />
      <div id="hero-desktop" className="relative hidden desktop:inline">
        <p className="absolute z-[2] text-white font-[400] text-[4vw] left-[15vw] bottom-[200px]">
          Your Pharmacy, <br /> Everywhere
        </p>
        <p className="absolute z-[2] text-white font-[500] text-[14px] bottom-[55px] left-[15vw] underline underline-offset-4 decoration-white hover:cursor-pointer">
          Lihat Semua Obat
        </p>
        <div
          id="searchbar desktop"
          className="bg-[#F5F6F6] flex absolute w-[40vw] h-[8vh] z-[2] left-[15vw] bottom-[88px] justify-end"
        >
          <Input
            variant="unstyled"
            placeholder="Cari Obat"
            sx={{ paddingLeft: '5%' }}
          />
          <div className="bg-[#008DEB] flex items-center justify-center w-[20%] hover:cursor-pointer">
            <Image
              src="/landing page/Search-desktop.png"
              alt="arrow-logo"
              layout="fixed"
              width={24}
              height={24}
            />
          </div>
        </div>
        <Image
          src="/landing page/Hero-desktop.png"
          alt="arrow-logo"
          layout="responsive"
          width={1440}
          height={408}
        />
      </div>
      <div
        id="searchbar"
        className="w-[90vw] absolute z-[2] top-[19vh] bg-white rounded-[2vw] left-[5vw] desktop:hidden"
      >
        <InputGroup>
          <Input variant="filled" placeholder="Cari Obat" size="lg" />
          <InputRightElement>
            <div className="flex items-end h-[65%]">
              <Image
                src="/landing page/Search.png"
                alt="search-logo"
                layout="fixed"
                width={18}
                height={18}
              />
            </div>
          </InputRightElement>
        </InputGroup>
      </div>
      <div className="w-[100%] desktop:flex desktop:flex-col desktop:items-center">
        <div id="resep doktor" className="desktop:w-[70%]">
          <p className="font-[500] text-[22px] hidden desktop:flex desktop:mt-[5vh]">
            Punya Resep dari Dokter?
          </p>
          <div className="flex bg-[#F2F8FC] items-center w-[94vw] h-[10vh] mt-[7vh] ml-[3vw] desktop:w-[100%] desktop:mt-0 desktop:ml-0">
            <div className="mx-[25px] mt-[10px]">
              <Image
                src="/landing page/Punya-resep.png"
                alt="resep-logo"
                layout="fixed"
                width={35}
                height={35}
              />
            </div>
            <div className="mr-[80px]">
              <p className="font-[500] text-[14px] desktop:hidden">
                Punya Resep Dokter?
              </p>
              <p className="font-[500] text-[14px] desktop:inline hidden">
                Unggah Resep
              </p>
              <p className="font-[400] w-[150px] desktop:w-[50vw] text-[12px] text-[#6E6E6E]">
                klik disini untuk kirim foto resep dokter
              </p>
            </div>
            <div className="w-[18px] h-[14px] desktop:hidden">
              <Image
                src="/landing page/Arrow.png"
                alt="arrow-logo"
                layout="responsive"
                width={18}
                height={14}
              />
            </div>
            <div className="hidden desktop:inline">
              <Button
                variant="outline"
                colorScheme="linkedin"
                sx={{ width: '8vw', height: '6vh' }}
              >
                Unggah Resep
              </Button>
            </div>
          </div>
        </div>
        <div id="kategori obat" className="mt-[4 vh] desktop:w-[70%]">
          <p className="flex pl-[4vw] mt-[3vh] mb-[2vh] font-[500] text-[16px] desktop:text-[22px] w-[100%] desktop:pl-0">
            Jelajahi Kategori Obat
          </p>
          <div className="w-[100%] h-[13vh] items-start flex flex-nowrap overflow-x-auto  desktop:flex-wrap desktop:h-[30vh] desktop:justify-evenly">
            {categoriesMap()}
          </div>
        </div>
        <div
          id="Rekomendasi Obat & Vitamin"
          className="mt-[4 vh] desktop:w-[70%]"
        >
          <p className="flex pl-[4vw] font-[500] text-[16px] desktop:text-[22px] w-[100%] desktop:pl-0">
            Rekomendasi Obat & Vitamin
          </p>
          <div className="w-[100%] h-[40vh] flex overflow-x-auto">
            {productsMap()}
          </div>
        </div>
      </div>
    </div>
  );
}
