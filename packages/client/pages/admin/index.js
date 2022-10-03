import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/inventory/byId=1');
  }, []);
  return <div></div>;
}

export default Index;

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    // if (!session) return { redirect: { destination: '/login' } };

    // if (!session.user.user.isAdmin) {
    //   return { redirect: { destination: '/' } };
    // }

    // return { redirect: { destination: 'admin/inventory' } };

    return { props: { session } };
  } catch (error) {
    return { props: { error: error.message } };
  }
}
