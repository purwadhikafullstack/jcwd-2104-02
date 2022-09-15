import React from 'react';
import Navbar from '../../components/Navbar';

function cart() {
  return (
    <div>
      <Navbar />
      cart
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: '/login' } };

    console.log({ session });

    const { user_token } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${user_token}` },
    };

    const user_id = session.user.user_id;
    const res = await axiosInstance.get(`/users/profile/${user_id}`, config);

    return {
      props: { user: res.data.data.result, session },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default cart;
