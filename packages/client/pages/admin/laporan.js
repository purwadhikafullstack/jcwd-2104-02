import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useRouter } from 'next/router';

function Laporan() {
  const router = useRouter();

  const path = router.pathname;

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <AdminNavbar path={path} />
      <div>Kanan</div>
    </div>
  );
}

export default Laporan;
