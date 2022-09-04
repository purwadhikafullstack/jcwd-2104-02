import React from 'react';
import Image from 'next/image';

function Navbar() {
  return (
    <div className="h-[100px] flex items-end desktop:h-[72px]">
      <div className="flex w-[100%] h-[70px] desktop:h-[100%] items-center justify-between">
        <div className="flex ml-[7vw] h-[70%] items-center">
          <Image
            src="/landing page/Medbox.png"
            alt="medbox-logo"
            layout="fixed"
            width={136}
            height={32}
          />
          <div className="desktop:flex ml-[5vw] justify-between w-[20vw] hidden">
            <p className="duration-300 ease-in-out bg-white text-[1vw] font-[500] hover:cursor-pointer hover:shadow-[0px_5px_0px_-2px_rgba(0,141,235,1)]">
              Beranda
            </p>
            <p className="duration-300 ease-in-out bg-white text-[1vw] font-[500] hover:cursor-pointer hover:shadow-[0px_5px_0px_-2px_rgba(0,141,235,1)]">
              Toko Obat
            </p>
            <p className="duration-300 ease-in-out bg-white text-[1vw] font-[500] hover:cursor-pointer hover:shadow-[0px_5px_0px_-2px_rgba(0,141,235,1)]">
              Riwayat
            </p>
          </div>
        </div>
        <div className="flex mr-[7vw] h-[70%] items-center w-[25vw] desktop:w-[10vw] justify-between">
          <div>
            <Image
              src="/landing page/Bell.png"
              alt="bell-logo"
              layout="fixed"
              width={16.8}
              height={19.2}
            />
          </div>
          <div>
            <Image
              src="/landing page/Cart.png"
              alt="cart-logo"
              layout="fixed"
              width={19.2}
              height={20.4}
            />
          </div>
          <div className="desktop:hidden">
            <Image
              src="/landing page/Menu.png"
              alt="menu-logo"
              layout="fixed"
              width={18}
              height={12}
            />
          </div>
          <div className="hidden desktop:inline">
            <Image
              src="/landing page/Account.png"
              alt="menu-logo"
              layout="fixed"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
