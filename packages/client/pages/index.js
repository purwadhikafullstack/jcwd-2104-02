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
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 1,
      category: 'Flu & Batuk',
      categoryImage: 'http://localhost:5000/categoriesImage/Batuk.png',
    },
    {
      category_list_id: 2,
      category: 'Asma',
      categoryImage: 'http://localhost:5000/categoriesImage/Asthma.png',
    },
    {
      category_list_id: 3,
      category: 'Antibiotik',
      categoryImage: 'http://localhost:5000/categoriesImage/Antibiotik.png',
    },
    {
      category_list_id: 4,
      category: 'Mata',
      categoryImage: 'http://localhost:5000/categoriesImage/Mata.png',
    },
    {
      category_list_id: 5,
      category: 'P3K',
      categoryImage: 'http://localhost:5000/categoriesImage/P3K.png',
    },
    {
      category_list_id: 6,
      category: 'Vitamin',
      categoryImage: 'http://localhost:5000/categoriesImage/Vitamin.png',
    },
    {
      category_list_id: 7,
      category: 'Pusing',
      categoryImage: 'http://localhost:5000/categoriesImage/Pusing.png',
    },
  ];

  function categoriesMap() {
    return categoriesTestArray.map((category) => {
      return (
        <div
          key={category.category_list_id}
          className="flex flex-col bg-gray-500 h-[10vh] items-center justify-center w-[25%]"
        >
          <Image
            unoptimized
            alt="resep-logo"
            layout="fixed"
            width={35}
            height={35}
            src={category.categoryImage}
            loader={() => {
              return category.categoryImage;
            }}
          />
          <p>{category.category}</p>
        </div>
      );
    });
  }

  return (
    <div className="bg-white w-[100%] h-[100vh] relative z-[1]">
      <Navbar />
      <div id="box biru" className="bg-[#1068A3] h-[53px] desktop:hidden" />
      <div id="hero-desktop" className="relative hidden desktop:inline">
        <p className="absolute z-[2] text-white font-[400] text-[45px] left-[15vw] bottom-[200px]">
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
          <InputRightElement
            children={
              <div className="flex items-end h-[65%]">
                <Image
                  src="/landing page/Search.png"
                  alt="search-logo"
                  layout="fixed"
                  width={18}
                  height={18}
                />
              </div>
            }
          />
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
        <div
          id="kategori obat"
          className="mt-[4 vh] desktop:w-[70%] flex flex-col"
        >
          <p className="flex pl-[4vw] font-[500] text-[16px] desktop:text-[22px] w-[100%] desktop:pl-0">
            Jelajahi Kategori Obat
          </p>
          <div className="overflow-auto h-[15vh] desktop:h-[70vh]">
            <div className="inline-flex">{categoriesMap()}</div>
          </div>
        </div>
        <div
          id="Rekomendasi Obat & Vitamin"
          className="mt-[4 vh] desktop:w-[70%]"
        >
          <p className="flex pl-[4vw] font-[500] text-[16px] desktop:text-[22px] w-[100%] desktop:pl-0">
            Rekomendasi Obat & Vitamin
          </p>
          <div className="bg-gray-900 w-[100%] h-[40vh]"></div>
        </div>
      </div>
    </div>
  );
}
