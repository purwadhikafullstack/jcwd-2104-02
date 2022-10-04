import React from 'react'

function index() {
  return (
    <div></div>
  )
}

export default index

export async function getServerSideProps(){
    try {
      return { redirect: { destination: '/admin/category/1' } };
    } catch (error) {
        return {props:{error: error.message}}
    }
}