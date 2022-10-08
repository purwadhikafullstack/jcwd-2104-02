import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

function AdminNavbar({ path }) {
  const sideMenu = ['Transaksi', 'Inventory', 'Laporan', 'Resep'];

  function sideMenuMap() {
    return sideMenu.map((Menu) => {
      return (
        <Link key={Menu} href={`/admin/${Menu.toLowerCase()}`}>
          <div
            className={
              path.includes(Menu.toLowerCase())
                ? 'w-[100%] bg-[#005E9D] hover:cursor-pointer h-[33.3%] flex items-center'
                : 'w-[100%] bg-[#008DEB] hover:cursor-pointer h-[33.3%] flex items-center'
            }
          >
            <div className="w-[10%] ml-[2vw]">
              <Image
                src={`/admin/${Menu}.svg`}
                alt="medbox-logo"
                layout="responsive"
                width={24}
                height={24}
              />
            </div>
            <p className="ml-[.5vw]">{Menu}</p>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="h-[100%] w-[15%] flex flex-col items-center bg-[#008DEB]">
      <div id="logo" className="w-[70%] my-[5vh]">
        <Image
          src="/admin/AdminNavbarVector.svg"
          alt="medbox-logo"
          layout="responsive"
          width={136}
          height={32}
        />
      </div>
      <div className="w-[100%] h-[25%] text-white">{sideMenuMap()}</div>

      <div className="grow" />

      <button
        onClick={() => {
          signOut();
        }}
        className="border-[1px] w-[80%] h-[6%] border-white text-white flex items-center justify-evenly mb-[3vh]"
      >
        <div className="w-[7%]">
          <Image
            src="/admin/LogoutAdmin.svg"
            alt="medbox-logo"
            layout="responsive"
            width={16}
            height={14}
          />
        </div>
        Logout
      </button>
    </div>
  );
}

export default AdminNavbar;
