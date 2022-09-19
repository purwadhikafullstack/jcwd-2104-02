import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { getSession, signOut } from 'next-auth/react';

function Navbar() {
  const [session, setSession] = useState();
  const [userId, setUserId] = useState('');
  useEffect(() => {
    getSessionAsync();
  }, []);

  // console.log({ session });

  async function getSessionAsync() {
    const session = await getSession();

    if (session) {
      const { user_id } = session.user.user;
      // console.log(first);
      setUserId(user_id);
    }

    setSession(session);
    // const { user_id } = session.user;
    // setUserId(user_id);
  }
  console.log({ session });

  async function onLogoutClick() {
    try {
      signOut();
    } catch (error) {
      console.log({ error });
    }
  }

  console.log(`user id = ${userId}`);

  return (
    <div className="h-[100px] flex items-end desktop:h-[72px] shadow-[0px_6px_20px_0px_rgba(0,28,47,0.05)]">
      <div className="flex w-[100%] h-[70px] desktop:h-[100%] items-center justify-between">
        <div className="flex ml-[7vw] h-[70%] items-center">
          <Link href="/">
            <Image
              className="hover:cursor-pointer"
              src="/landingpage/Medbox.svg"
              alt="medbox-logo"
              layout="fixed"
              width={136}
              height={32}
            />
          </Link>
          <div className="desktop:flex ml-[5vw] justify-between w-[20vw] hidden">
            <Link href="/">
              <p className="duration-300 ease-in-out bg-white text-[1vw] font-[500] hover:cursor-pointer hover:shadow-[0px_5px_0px_-2px_rgba(0,141,235,1)]">
                Beranda
              </p>
            </Link>
            <Link href="/productCatalog">
              <p className="duration-300 ease-in-out bg-white text-[1vw] font-[500] hover:cursor-pointer hover:shadow-[0px_5px_0px_-2px_rgba(0,141,235,1)]">
                Toko Obat
              </p>
            </Link>
            <p className="duration-300 ease-in-out bg-white text-[1vw] font-[500] hover:cursor-pointer hover:shadow-[0px_5px_0px_-2px_rgba(0,141,235,1)]">
              Riwayat
            </p>
          </div>
        </div>
        <div className="grow" />
        <div className="flex mr-[7vw] h-[70%] items-center w-[25vw] desktop:w-[10vw]">
          <div className="w-[3.5vw] desktop:w-[1.2vw] hover:cursor-pointer  ml-[4.5vw] desktop:ml-[2vw]">
            <Image
              src="/landingpage/Bell.svg"
              alt="bell-logo"
              layout="responsive"
              width={16.8}
              height={19.2}
            />
          </div>
          <div className="w-[3.5vw] desktop:w-[1.2vw] hover:cursor-pointer  ml-[4.5vw] desktop:ml-[2vw]">
            <Link href={`/cart/${userId}`}>
              <Image
                src="/landingpage/Cart.svg"
                alt="cart-logo"
                layout="responsive"
                width={19.2}
                height={20.4}
              />
            </Link>
          </div>
          <div className="desktop:hidden w-[3.5vw] desktop:w-[1.2vw] hover:cursor-pointer  ml-[4.5vw] desktop:ml-[2vw]">
            <Image
              src="/landingpage/Menu.svg"
              alt="menu-logo"
              layout="responsive"
              width={18}
              height={12}
            />
          </div>
          {session ? (
            <div className="hidden desktop:inline w-[3.5vw] desktop:w-[1.2vw] hover:cursor-pointer ml-[4.5vw] desktop:ml-[2vw]">
              <Link href="/profile">
                <Image
                  src="/landingpage/Account.svg"
                  alt="menu-logo"
                  layout="responsive"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
        {session ? (
          <div className="hidden desktop:flex desktop:ml-[-5vw]">
            <Button
              onClick={() => {
                signOut();
              }}
              variant="outline"
              colorScheme="linkedin"
              sx={{
                width: '6vw',
                height: '5vh',
                borderRadius: '1.2vh',
                marginRight: '2vw',
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden desktop:flex desktop:ml-[-8vw]">
            <Link href="/login">
              <Button
                variant="outline"
                colorScheme="linkedin"
                sx={{
                  width: '6vw',
                  height: '5vh',
                  borderRadius: '1.2vh',
                  marginRight: '2vw',
                }}
              >
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   try {
//     const session = await getSession({ req: context.req });

//     return { props: { session } };
//   } catch (error) {
//     return {
//       props: {
//         error,
//       },
//     };
//   }
// }

export default Navbar;
