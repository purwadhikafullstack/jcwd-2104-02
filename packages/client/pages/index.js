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
    <div className="bg-white w-[100vw] h-[100vh] overflow-auto">
      <Navbar />
      <div className="bg-[#1068A3] h-[53px]" />
    </div>
  );
}
