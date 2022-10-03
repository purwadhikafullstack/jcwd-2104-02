import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

function Laporan() {
  const router = useRouter();

  const session = useSession();

  if (session.data) {
    if (!session.data.user.user.isAdmin) {
      router.replace('/');
    }
  }

  const path = router.pathname;

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <AdminNavbar path={path} />
      <div>Kanan</div>
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
