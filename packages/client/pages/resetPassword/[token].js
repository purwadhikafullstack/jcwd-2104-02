import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import axiosInstance from '../../src/config/api';

function resetPassword(props) {
  const [inputs, setInputs] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  console.log({ props });

  const handleChange = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });
  };

  const onChangePasswordClick = async () => {
    try {
      if (inputs.newPassword != inputs.confirmNewPassword) {
        return alert('Password does not match');
      }

      const resUpdatePassword = await axiosInstance.post(
        `users/resetPassword/${props.token}`,
        inputs,
      );

      console.log({ resUpdatePassword });
      alert('Success');
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-500 flex items-center justify-center">
      <div className="flex flex-col items-center ">
        <p>Reset your password</p>
        <div className="w-[70vw] my-[1vh]">
          <Input
            onChange={handleChange('newPassword')}
            placeholder="New password"
            variant="filled"
            type="password"
          />
        </div>
        <div className="w-[70vw] my-[1vh]">
          <Input
            onChange={handleChange('confirmNewPassword')}
            placeholder="Confirm new password"
            variant="filled"
            type="password"
          />
        </div>
        <Button colorScheme="linkedin" onClick={onChangePasswordClick}>
          Change Password
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const accessToken = context.params.token;

    return {
      props: {
        token: accessToken,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}

export default resetPassword;
