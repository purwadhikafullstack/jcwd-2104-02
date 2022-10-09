function Api_origin(props) {
  const api_origin = 'http://localhost:8000';

  return api_origin;
}

export async function getServerSideProps(context) {
  try {
    const { API_PORT } = process.env;
    return {
      props: { API_PORT },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
}

export default Api_origin;
