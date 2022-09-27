import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from '@chakra-ui/react';
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import TransactionCards from '../../components/TransactionCards'
import axiosInstance from '../../src/config/api';

function Transaction(props) {
  const {user_id} = props
  const [transac, setTransac] = useState([])


  console.warn(transac);
  const [Berlangsung, setBerlangsung] = useState([])
  const [selected, setSelected] = useState(0)
  // console.log(user_id)

  useEffect(() => {
    fetchTransactions();
  }, [selected]);

  const fetchTransactions = async () => {
    try {
      const session = await getSession();
      // const { user_id } = props;
      // console.log(user_id)
      // console.log(session.user.user.user_id)
      const {user_id} = session.user.user;
      const { user_token } = session.user;
      // console.log(user_id)

      // console.log({ user_token });

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };
      console.log({selected});
      const res = await axiosInstance.get(
        `/transactions/getTransactionsByIndex/${user_id}/${selected}`,
        config,
      );
      // console.log(res.data.data.resFetchTransactions);
      setTransac(res.data.data.resFetchTransactions);
      // setProds(res.data.data.resFetchTransactions);
    } catch (error) {
      alert(error.message);
    }
  };
  // console.log(prods)

  function mappedTransactions() {
    return transac?.map((transaction, index) => {
      return (
          <TransactionCards
            key={transaction.transaction_id}
            // transactions={transac.transactions}
            productName={transaction.transaction_details[0].product.productName}
            productImage={
              transaction.transaction_details[0].product.productImage
            }
            status={transaction.status}
            totalPrice={transaction.totalPrice}
            trans_id={transaction.transaction_id}
            // quantity={transaction.transaction_details.product.quantity}
            // fetchTransactions={fetchTransactions}
            props={props}
          />
      );
    });
  }
  // console.log(mappedTransactions())

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Text fontSize={30} fontWeight={'semibold'} my={8} ml={20}>
        Riwayat Pemesanan
      </Text>
      <Tabs onChange={(index) => setSelected(index)} mx={100}>
        <TabList>
          <Tab>Semua</Tab>
          <Tab>Diproses</Tab>
          <Tab>Sedang Dikirim</Tab>
          <Tab>Berhasil</Tab>
          <Tab>Tidak Berhasil</Tab>
          <Tab>Menunggu Pembayaran</Tab>
          <Tab>Menunggu Konfirmasi Pembayaran</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div>{mappedTransactions()}</div>
          </TabPanel>
          <TabPanel>
            <div>{mappedTransactions()}</div>
            </TabPanel>
          <TabPanel>
            <div>{mappedTransactions()}</div>
            </TabPanel>
          <TabPanel>
            <div>{mappedTransactions()}</div>
            </TabPanel>
          <TabPanel>
            <div>{mappedTransactions()}</div>
            </TabPanel>
          <TabPanel>
            <div>{mappedTransactions()}</div>
            </TabPanel>
          <TabPanel>
            <div>{mappedTransactions()}</div>
            </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: '/login' } };
    // console.log(session.user)
    const { user_token } = session.user;
    
    // console.log(user_id)
    
    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };
    const { user_id } = context.params;

    // const res = await axiosInstance.get(`/transactions/${user_id}`, config);
    // console.log(res.data.data)

    return {
      props: {
        // transactions: res.data.data,
        user_id,
        user_token,
      },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default Transaction