import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from '../src/config/api';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

export default function Home() {
  // this is just testing api connection, possibly could be remove
  // const [checkApi, setCheckApi] = useState('');
  // const fetchApi = async () => {
  //   try {
  //     const result = await axios.get();
  //     setCheckApi(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchApi();
  // }, []);
  // console.log(checkApi);
  // end of testing api

  return (
    <div className="bg-white w-[100vw] h-[100vh] overflow-auto relative z-[1]">
      <Navbar />
      <div id="box biru" className="bg-[#1068A3] h-[53px]" />
      <div
        id="searchbar"
        className="w-[90vw] absolute z-[2] top-[19vh] bg-white rounded-[2vw] left-[5vw]"
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
      <div
        id="resep doktor"
        className="flex bg-[#F2F8FC] items-center w-[94vw] h-[10vh] mt-[7vh] ml-[3vw]"
      >
        <div className="mx-[25px]">
          <Image
            src="/landing page/Punya-resep.png"
            alt="resep-logo"
            layout="fixed"
            width={35}
            height={35}
          />
        </div>
        <div className="mr-[80px]">
          <p className="font-[500] text-[14px]">Punya Resep Dokter?</p>
          <p className="font-[400] text-[12px] text-[#6E6E6E]">
            klik disini untuk kirim foto <br /> resep dokter
          </p>
        </div>
        <Image
          src="/landing page/Arrow.png"
          alt="arrow-logo"
          layout="fixed"
          width={18}
          height={14}
        />
      </div>
      <div id="kategori obat" className="mt-[]">
        <p className="flex pl-[3vw] font-[500] text-[16px] w-[100%]">
          Jelajahi Kategori Obat
        </p>
        <div></div>
      </div>
    </div>
  );
}
