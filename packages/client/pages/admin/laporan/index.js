import React from 'react';

function index() {
  return <div>index</div>;
}

export default index;

export async function getServerSideProps() {
  try {
    return { redirect: { destination: '/admin/laporan/product' } };
  } catch (error) {
    return { props: {} };
  }
}
