import { Button, Icon, Input, Flex, Box,HStack, Tabs, TabList, TabPanels, TabPanel, Tab, Link } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import axiosInstance from '../../src/config/api';
import { DeleteIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import axios from 'axios';

export default function TransactionCards(props) {
  const { trans_id, productName, transactions, totalPrice, status, productImage} =
    props;
//   console.log(fetchTransactions)
console.log(trans_id)
  console.log(productName)
  return (
    <Tabs mx={100}>
      <TabList>
        <Tab>Semua</Tab>
        <Tab>Berlangsung</Tab>
        <Tab>Berhasil</Tab>
        <Tab>Tidak Berhasil</Tab>
        <Tab>Menunggu Pembayaran</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <HStack
            bg={'gray.50'}
            h={100}
            spacing="95"
            my={'10'}
            ml={'20'}
            mr={'20'}
            px={6}
            rounded={6}
            boxShadow="lg"
          >
            <Image
              unoptimized
              alt="resep-logo"
              width={70}
              height={70}
              src={productImage}
            />
            <Box w="180px" bg={'skyblue'}>
              Name: {productName}
            </Box>
            <Box w="180px" bg={'skyblue'}>
              Status: {status}
            </Box>
            <Box w="180px" bg={'skyblue'}>
              Total Price: {totalPrice}
            </Box>
            <Link href={`/transactionDetail/${trans_id}`}>
              <Button color="linkedin.400" variant="link">
                Lihat Pesanan
              </Button>
            </Link>
          </HStack>
        </TabPanel>
        <TabPanel>
          <HStack
            bg={'gray.50'}
            h={100}
            spacing="95"
            my={'10'}
            ml={'20'}
            mr={'20'}
            px={6}
            rounded={6}
            boxShadow="lg"
          >
            <Image
              unoptimized
              alt="resep-logo"
              width={70}
              height={70}
              // src={product.productImage}
            />
            <Box w="180px" bg={'skyblue'}>
              {/* {productName} */}
            </Box>
            <Box w="180px" bg={'skyblue'}>
              3
            </Box>
            <Box w="180px" bg={'skyblue'}>
              total harga
            </Box>
            <Link href={`/transactionDetail/${trans_id}`}>
              <Button color="linkedin.400" variant="link">
                Lihat Pesanan
              </Button>
            </Link>
          </HStack>
        </TabPanel>
        <TabPanel>
          <HStack
            bg={'gray.50'}
            h={100}
            spacing="95"
            my={'10'}
            ml={'20'}
            mr={'20'}
            px={6}
            rounded={6}
            boxShadow="lg"
          >
            <Image
              unoptimized
              alt="resep-logo"
              width={70}
              height={70}
              // src={product.productImage}
            />
            <Box w="180px" bg={'skyblue'}>
              2
            </Box>
            <Box w="180px" bg={'skyblue'}>
              3
            </Box>
            <Box w="180px" bg={'skyblue'}>
              total harga
            </Box>
            <Link href={`/transactionDetail/${trans_id}`}>
              <Button color="linkedin.400" variant="link">
                Lihat Pesanan
              </Button>
            </Link>
          </HStack>
        </TabPanel>
        <TabPanel>
          <HStack
            bg={'gray.50'}
            h={100}
            spacing="95"
            my={'10'}
            ml={'20'}
            mr={'20'}
            px={6}
            rounded={6}
            boxShadow="lg"
          >
            <Image
              unoptimized
              alt="resep-logo"
              width={70}
              height={70}
              // src={product.productImage}
            />
            <Box w="180px" bg={'skyblue'}>
              2
            </Box>
            <Box w="180px" bg={'skyblue'}>
              3
            </Box>
            <Box w="180px" bg={'skyblue'}>
              total harga
            </Box>
            <Link href={`/transactionDetail /${trans_id}`}>
              <Button color="linkedin.400" variant="link">
                Lihat Pesanan
              </Button>
            </Link>
          </HStack>
        </TabPanel>
        <TabPanel>
          <HStack
            bg={'gray.50'}
            h={100}
            spacing="95"
            my={'10'}
            ml={'20'}
            mr={'20'}
            px={6}
            rounded={6}
            boxShadow="lg"
          >
            <Image
              unoptimized
              alt="resep-logo"
              width={70}
              height={70}
              // src={product.productImage}
            />
            <Box w="180px" bg={'skyblue'}>
              2
            </Box>
            <Box w="180px" bg={'skyblue'}>
              3
            </Box>
            <Box w="180px" bg={'skyblue'}>
              total harga
            </Box>
            <Button color="linkedin.400" variant="link">
              Lihat Pesanan
            </Button>
          </HStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
