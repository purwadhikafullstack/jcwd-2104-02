import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axiosInstance from '../../src/config/api';

function ResetPassword(props) {
  const [inputs, setInputs] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const router = useRouter();

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
      router.replace('/');
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <div className="w-[50vw] mb-[10vh] desktop:w-[20vw]">
        <Image
          src="/forgotPassword/Medbox-logo.svg"
          alt="medbox-logo"
          layout="responsive"
          width={136}
          height={32}
        />
      </div>
      <div className="w-[80%] desktop:w-[50%] py-[10vh] flex flex-col items-center justify-center bg-white shadow-[0px_20px_36px_1px_rgba(0,28,47,0.1)]">
        <p className="text-[1.6rem] desktop:text-[2rem] font-[500] w-[100%] flex justify-center">
          Reset Password
        </p>
        <p>Enter new password.</p>
        <div
          id="new-password-input"
          className="bg-white w-[90%] desktop:w-[50%] my-[1vh] rounded-[3vw]"
        >
          <Input
            size="lg"
            type="password"
            variant="filled"
            placeholder="New password"
            onChange={handleChange('newPassword')}
          />
        </div>
        <div
          id="confirm-password-input"
          className="bg-white w-[90%] desktop:w-[50%] my-[1vh] rounded-[3vw]"
        >
          <Input
            size="lg"
            type="password"
            variant="filled"
            placeholder="Confirm new password"
            onChange={handleChange('confirmNewPassword')}
          />
        </div>
        <div id="mobile-button" className="w-[50vw] desktop:hidden">
          <Button
            onClick={onChangePasswordClick}
            style={{ width: '100%' }}
            colorScheme="linkedin"
            size="sm"
          >
            Submit
          </Button>
        </div>
        <div id="desktop-button" className="hidden desktop:inline w-[30%]">
          <Button
            onClick={onChangePasswordClick}
            style={{ width: '100%' }}
            colorScheme="linkedin"
            size="lg"
          >
            Submit
          </Button>
        </div>
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

export default ResetPassword;
