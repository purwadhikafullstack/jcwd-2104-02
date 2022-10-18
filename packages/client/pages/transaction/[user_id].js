import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  VStack,
  Image,
  HStack,
  Button,
<<<<<<< HEAD
=======
  useToast,
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
} from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import TransactionCards from '../../components/TransactionCards';
import axiosInstance from '../../src/config/api';

function Transaction(props) {
  const { user_id } = props;
  const [transac, setTransac] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
<<<<<<< HEAD
  console.warn(transac);
  const [selected, setSelected] = useState(0);
=======
  const [selected, setSelected] = useState(0);

  const toast = useToast();
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594

  useEffect(() => {
    fetchTransactions();
  }, [selected, page]);

  const onPrevClick = () => {
    setPage(page - 1);
  };

  const onNextClick = () => {
    setPage(page + 1);
  };

  const fetchTransactions = async () => {
    try {
      const session = await getSession();
<<<<<<< HEAD
      // const { user_id } = props;
      // console.log(user_id)
      // console.log(session.user.user.user_id)
=======
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
      const { user_id } = session.user.user;
      const { user_token } = session.user;

      const config = {
        params: { page, pageSize },
        headers: { Authorization: `Bearer ${user_token}` },
      };
<<<<<<< HEAD
      console.log({ selected });
=======

>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
      const res = await axiosInstance.get(
        `/transactions/getTransactionsByIndex/${user_id}/${selected}`,
        config,
      );
      setTransac(res.data.data.resFetchTransactions);
    } catch (error) {
      console.log({ error });
      toast({
        title: 'Unexpected Fail!',
        description: error.response.data?.message
          ? error.response.data.message
          : error.message,
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  function mappedTransactions() {
    return transac?.map((transaction, index) => {
      return (
        <TransactionCards
          key={transaction.transaction_id}
          // transactions={transac.transactions}
          productName={transaction.transaction_details[0].product.productName}
          productImage={transaction.transaction_details[0].product.productImage}
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

  return (
    <div className="h-[100vh] w-[100vw]">
      <div>
        <Navbar />
      </div>
      <Text fontSize={30} fontWeight={'semibold'} my={8} ml={20}>
        Riwayat Pemesanan
      </Text>
<<<<<<< HEAD
      <Tabs
        onChange={(index) => {
          setSelected(index), setPage(1);
        }}
        mx={100}
        variant={'soft-rounded'}
        colorScheme={'facebook'}
        border="1px"
        borderColor="gray.200"
        rounded={10}
        padding={6}
        marginBottom={10}
      >
        <TabList>
          <Tab>Semua</Tab>
          <Tab>Diproses</Tab>
          <Tab>Sedang Dikirim</Tab>
          <Tab>Berhasil</Tab>
          <Tab>Tidak Berhasil</Tab>
          <Tab>Menunggu Pembayaran</Tab>
          <Tab>Menunggu Konfirmasi Pembayaran</Tab>
        </TabList>
        {transac.length ? (
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
        ) : (
          <VStack marginTop={105}>
            <Image
              src="/admin/Empty-Transaction.png"
              width={250}
              height={250}
            />
            <Text paddingTop={6} fontSize={18}>
              Tidak Ada Transaksi
            </Text>
          </VStack>
        )}
        {transac.length ? (
          <HStack paddingLeft={210} paddingBottom={30}>
            <Button
              variant={'outline'}
              marginRight={2}
              onClick={onPrevClick}
              isDisabled={page == 1}
              colorScheme="messenger"
            >
              Prev
            </Button>
            <Text paddingRight={2}>{page}</Text>
            <Button
              variant={'outline'}
              onClick={onNextClick}
              isDisabled={page >= transac.length}
              colorScheme="messenger"
            >
              Next
            </Button>
          </HStack>
        ) : (
          <VStack></VStack>
        )}
      </Tabs>
=======
      {props.session.user.user.isVerified ? (
        <Tabs
          onChange={(index) => {
            setSelected(index), setPage(1);
          }}
          mx={100}
          variant={'soft-rounded'}
          colorScheme={'facebook'}
          border="1px"
          borderColor="gray.200"
          rounded={10}
          padding={6}
          marginBottom={10}
        >
          <TabList>
            <Tab>Semua</Tab>
            <Tab>Diproses</Tab>
            <Tab>Sedang Dikirim</Tab>
            <Tab>Berhasil</Tab>
            <Tab>Tidak Berhasil</Tab>
            <Tab>Menunggu Pembayaran</Tab>
            <Tab>Menunggu Konfirmasi Pembayaran</Tab>
          </TabList>
          {transac.length ? (
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
          ) : (
            <VStack marginTop={105}>
              <Image
                src="/admin/Empty-Transaction.png"
                width={250}
                height={250}
              />
              <Text paddingTop={6} fontSize={18}>
                Tidak Ada Transaksi
              </Text>
            </VStack>
          )}
          {transac.length ? (
            <HStack paddingLeft={210} paddingBottom={30}>
              <Button
                variant={'outline'}
                marginRight={2}
                onClick={onPrevClick}
                isDisabled={page == 1}
                colorScheme="messenger"
              >
                Prev
              </Button>
              <Text paddingRight={2}>{page}</Text>
              <Button
                variant={'outline'}
                onClick={onNextClick}
                isDisabled={page >= transac.length}
                colorScheme="messenger"
              >
                Next
              </Button>
            </HStack>
          ) : (
            <VStack></VStack>
          )}
        </Tabs>
      ) : (
        <div className="w-[100%] h-[50%] flex items-center justify-center">
          <p className="text-[1.5rem]">Unverified Account</p>
        </div>
      )}
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: '/login' } };
<<<<<<< HEAD
    // console.log(session.user)
    const { user_token } = session.user;

    // console.log(user_id)

    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };
    const { user_id } = context.params;
=======
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594

    const { user_token } = session.user;
    const { user_id } = context.params;

    return {
      props: {
        session,
        user_id,
        user_token,
      },
    };
  } catch (error) {
    console.log({ error });
    return { props: { error } };
  }
}

export default Transaction;
