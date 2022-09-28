import AdminNavbar from '../../components/AdminNavbar';
import { useRouter } from 'next/router';
import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  VStack,
} from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import AdminTransCard from '../../components/AdminTransCard';
import axiosInstance from '../../src/config/api';

function Transaksi(props) {
  const router = useRouter();

  const path = router.pathname;

  const [transac, setTransac] = useState([]);

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [selected]);

  const fetchTransactions = async () => {
    try {
      const session = await getSession();

      const { user_token } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${user_token}` },
      };
      console.log({ selected });
      const res = await axiosInstance.get(
        `/transactions/admin/transactionsByIndex/${selected}`,
        config,
      );
      setTransac(res.data.data.resFetchTransactions);
    } catch (error) {
      alert(error.message);
    }
  };

  function mappedTransactions() {
    return transac?.map((transaction, index) => {
      return (
        <AdminTransCard
          key={transaction.transaction_id}
          productName={transaction.transaction_details[0].product.productName}
          productImage={transaction.transaction_details[0].product.productImage}
          status={transaction.status}
          totalPrice={transaction.totalPrice}
          trans_id={transaction.transaction_id}
          courier={transaction.courier}
          deliveryCost={transaction.deliveryCost}
          createdAt={transaction.createdAt}
          props={props}
        />
      );
    });
  }

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <AdminNavbar path={path} />
      <VStack align="start">
        <Text
          fontSize={23}
          fontWeight={500}
          marginTop={6}
          marginBottom={3}
          marginLeft={16}
        >
          Riwayat Transaksi
        </Text>
        <Tabs onChange={(index) => setSelected(index)}>
          <TabList marginLeft={16} marginBottom={2}>
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
      </VStack>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: '/login' } };

    const { user_token } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };
    const { user_id } = context.params;

    return {
      props: {
        user_id,
        user_token,
      },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default Transaksi;
