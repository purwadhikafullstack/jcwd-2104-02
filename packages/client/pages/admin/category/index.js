import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function index() {
   const router = useRouter();
   useEffect(() => {
     router.replace(`/admin/category/byId=1`);
   }, []);
  return (
    
    <div></div>
  )
}

export default index

// export async function getServerSideProps(){
//     try {
//       return { redirect: { destination: '/admin/category/byId=1' } };
//     } catch (error) {
//         return {props:{error: error.message}}
//     }
// }