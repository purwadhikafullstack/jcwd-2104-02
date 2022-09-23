import {
  AddIcon,
  Flex,
  Box,
  HStack,
  Button,
  ButtonGroup,
  IconButton,
  Input,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../src/config/api';
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import next from 'next';
import { useToast } from '@chakra-ui/react';
import TransDetailCard from '../../components/TransDetailCard';


function TransactionDetails(props) {
  const {transaction_details} = props
  const [transac, setTransac] = useState(
    transaction_details.resFetchTransactionDetails,
  );
  // console.log(transac)

  function mappedTransactions() {
    return transac.map((transaction, index) => {
      return (
        <TransDetailCard
          // key={transaction.transaction_id}
          // // transactions={transac.transactions}
          // productName={transaction.transaction_details[0].product.productName}
          // productImage={transaction.transaction_details[0].product.productImage}
          // status={transaction.status}
          // totalPrice={transaction.totalPrice}
          // trans_id={transaction.transaction_id}
          // quantity={transaction.transaction_details.product.quantity}
          // fetchTransactions={fetchTransactions}
          // props={props}
        />
      );
    });
  }
    
    return (
        <div>
          <Navbar />
          <div></div>
        </div>
    )
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: '/login' } };
    const { user_token } = session.user;
    // const { user_id } = session.user.user;
    // console.log(session.user.user.user_id);

    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };
    const { transaction_id } = context.params;
    // console.log(transaction_id);
    // console.log('disini');

    const resGetTransactionDetail = await axiosInstance.get(
      `/transactions/getDetails/${transaction_id}`,
      config,
    );
    // console.log(resGetProduct);

    // if (!resGetProduct) return { redirect: { destination: '/' } };

    // console.log(resGetTransactionDetail.data.data);
    return {
      props: {
        transaction_details: resGetTransactionDetail.data.data,
        // user_id,
      },
    };
  } catch (error) {
    const { message } = error;

    return { props: { message } };
  }
}

export default TransactionDetails;
