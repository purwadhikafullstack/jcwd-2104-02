import AdminNavbar from '../../components/AdminNavbar';
import { useRouter } from 'next/router';
import {
  Text,
  VStack,
  Button,
  HStack,
  Image,
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import AdminPrescripCard from '../../components/AdminPrescripCard';
import axiosInstance from '../../src/config/api';
import theme from '../../components/theme';

function DaftarTransaksiRacikan(props) {
  const [transac, setTransac] = useState([]);
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const router = useRouter();

  const path = router.pathname;

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

      const { user_token } = session.user;

      const config = {
        params: { page, pageSize },
        headers: { Authorization: `Bearer ${user_token}` },
      };
      const res = await axiosInstance.get(
        `/transactions/admin/transactionsByPrescription`,
        config,
      );
      setTransac(res.data.data.resFetchTransactions);
    } catch (error) {
      alert(error.message);
    }
  };

  function mappedTransactions() {
    return transac?.map((transaction) => {
      return (
        <AdminPrescripCard
          key={transaction.transaction_id}
          prescriptionImage={transaction.prescriptionImage}
          trans_id={transaction.transaction_id}
          deliveryCost={transaction.deliveryCost}
          createdAt={transaction.createdAt}
          transac={transac}
          props={props}
        />
      );
    });
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="flex w-[100vw] h-[100vh]">
        <AdminNavbar path={path} />
        <VStack align="start">
          <Box>
            <Text
              fontSize={21}
              fontWeight={500}
              marginTop={8}
              marginBottom={4}
              marginLeft={16}
              marginRight={310}
            >
              Daftar Pesanan dengan Resep Dokter
            </Text>
          </Box>
          {transac.length ? (
            <div>{mappedTransactions()}</div>
          ) : (
            <VStack paddingTop={100} alignSelf="center" width="180vH">
              <Box align="center">
                <Image
                  src="/admin/Empty-Transaction.png"
                  width={250}
                  height={250}
                />
                <Text paddingTop={6} fontSize={18}>
                  Tidak Ada Pesanan
                </Text>
              </Box>
            </VStack>
          )}
          {transac.length ? (
            <HStack paddingLeft={510} paddingTop={5}>
              <Button
                marginRight={2}
                onClick={onPrevClick}
                isDisabled={page == 1}
                colorScheme="messenger"
              >
                Prev
              </Button>
              <Text paddingRight={2}>{page}</Text>
              <Button
                onClick={onNextClick}
                isDisabled={page >= transac.prescriptionImage}
                colorScheme="messenger"
              >
                Next
              </Button>
            </HStack>
          ) : null}
        </VStack>
      </div>
    </ChakraProvider>
  );
}

export default DaftarTransaksiRacikan;
