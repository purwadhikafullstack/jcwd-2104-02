import React from 'react';
import AdminNavbar from '../../../components/AdminNavbar';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

function Laporan() {
  const router = useRouter();
  const { params } = router.query;
  const session = useSession();

  const pageTabs = ['Product', 'Transaction', 'User'];

  if (session.data) {
    if (!session.data.user.user.isAdmin) {
      router.replace('/');
    }
  }

  function tabsMap() {
    return pageTabs.map((content) => {
      return (
        <div
          onClick={() => {
            router.replace(`/admin/laporan/${content.toLowerCase()}`);
          }}
          className="w-[33.3%] flex justify-center items-center bg-gray-500"
        >
          Per {content}
        </div>
      );
    });
  }

  const path = router.pathname;

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <AdminNavbar path={path} />
      <div className="w-[85%] h-[100%] flex justify-center">
        <div className="w-[90%] h-[100%]">
          <div className="h-[10%] flex items-center">
            <p className="text-[2rem]">Laporan penjualan</p>
          </div>
          <div className="h-[90%] bg-gray-200 flex flex-col">
            <div className="h-[10%] flex text-[1.3rem] hover:cursor-pointer">
              {tabsMap()}
            </div>
            <div>{params}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Laporan;

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: '/login' } };

    if (!session.user.user.isAdmin) {
      return { redirect: { destination: '/' } };
    }

    return { props: {} };
  } catch (error) {
    return { props: { error: error.message } };
  }
}
