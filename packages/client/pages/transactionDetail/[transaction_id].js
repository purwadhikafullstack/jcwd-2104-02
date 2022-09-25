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
  const {transaction_details, transactions} = props
  const [transac, setTransac] = useState(
    transaction_details.resFetchTransactionDetails,
  );
  const [trans, setTrans] = useState(transactions.resFetchTransactions)
  // console.log(trans.totalPrice)
  const [transByAddress, setTransByAddress] = useState(transactions.resFetchAddress);
const [payment, setPayment] = useState({})

const onFileChange = (event) => {
  setPayment(event.target.files[0]);
};

const onSavePayment = async () => {
  try {
    const session = await getSession();

    const { user_token } = session.user;

    const body = new FormData();

    body.append('paymentProof', payment);

    const transaction_id = trans.transaction_id

    const bods = {
      transStatus:"awaiting_payment_confirmation",
      trans,
    };
    console.log(bods)

    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };

    const res = await axiosInstance.patch(`/transactions/paymentProof/${transaction_id}`, body, config);

    const res2 = await axiosInstance.patch('/transactions/patchTransaction', bods, config)

    setTrans({ ...trans, status: 'awaiting_payment_confirmation' });

    alert(res.data.message);
    // alert(res2.data.message);
  } catch (error) {
    console.log({ Error });
    alert(error.response?.data.message);
  }
};


  function mappedTransactionDetails() {
    return transac.map((transaction, index) => {
      return (
        <TransDetailCard
          key={transaction.transaction_details_id}
          // // transactions={transac.transactions}
          productName={transaction.product.productName}
          productImage={transaction.product.productImage}
          // status={transaction.status}
          productPrice={transaction.product.productPrice}
          quantity={transaction.quantity}
          // trans_id={transaction.transaction_id}
          // quantity={transaction.transaction_details.product.quantity}
          // fetchTransactions={fetchTransactions}
          props={props}
        />
      );
    });
  }

  const rawStatus = trans.status.split('_');
    
    return (
      <div className="w-[100vw] h-[100vh]">
        <Navbar />
        <div className="w-[100%] h-[100%] flex">
          <div className="w-[50%]">
            {/* <div className="h-[30%] w-[100%] bg-gray-500">kotak atas</div> */}
            <div>
              <p>Daftar Pesanan</p>
              <div>{mappedTransactionDetails()}</div>
            </div>
          </div>
          <div className="border-l-[1px] mt-[2vh] border-solid border-gray h-[100%]" />
          <div className="w-[50%] ">
            <p className="w-[30%] ml-3 mt-3">Ringkasan Pembayaran</p>
            <p className="mt-[5vh] ml-[10%]">
              Total Harga: Rp. {trans.totalPrice.toLocaleString('id')}
            </p>
            <p className="mt-[5vh] ml-[10%]">Metode Pengiriman: JNE</p>
            <p className="mt-[5vh] ml-[10%]">
              Metode Pembayaran: Transfer Bank BCA
            </p>
            <p className="mt-[5vh] ml-[10%]">
              Status Pembayaran: {rawStatus.join(' ')}
            </p>
            <div className="mt-[5vh] ml-[10%]">
              {' '}
              <input type={'file'} onChange={onFileChange} />
            </div>
            <Button
              onClick={onSavePayment}
              colorScheme={'linkedin'}
              className="mt-[5vh] ml-[10%]"
            >
              Unggah Bukti Pembayaran
            </Button>
          </div>
        </div>
      </div>
    );
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
    const resgetTransactionById = await axiosInstance.get(`/transactions/transById/${transaction_id}`,config)

    // console.log(resgetTransactionById.data.resFetchAddress);

    // if (!resGetProduct) return { redirect: { destination: '/' } };

    // console.log(resGetTransactionDetail.data.data);
    return {
      props: {
        transaction_details: resGetTransactionDetail.data.data,
        transactions: resgetTransactionById.data.data,
        // transactions: resgetTransactionById.data.resFetchAddress
        // user_id,
      },
    };
  } catch (error) {
    const { message } = error;

    return { props: { message } };
  }
}

export default TransactionDetails;
