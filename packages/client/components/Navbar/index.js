import React from 'react';
import Image from 'next/image';

function Navbar() {
  return (
    <div className="h-[100px] flex items-end">
      <div className="flex w-[100%] h-[70px] items-center justify-between">
        <div className="flex ml-[7vw] h-[70%] items-center">
          <Image
            src="/landing page/Medbox.png"
            alt="medbox-logo"
            layout="fixed"
            width={136}
            height={32}
          />
        </div>
        <div className="flex mr-[7vw] h-[70%] items-center w-[25vw] justify-between">
          <Image
            src="/landing page/Bell.png"
            alt="bell-logo"
            layout="fixed"
            width={16.8}
            height={19.2}
          />
          <Image
            src="/landing page/Cart.png"
            alt="cart-logo"
            layout="fixed"
            width={19.2}
            height={20.4}
          />
          <Image
            src="/landing page/Menu.png"
            alt="menu-logo"
            layout="fixed"
            width={18}
            height={12}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
