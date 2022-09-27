import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosInstance from '../../../src/config/api';

const credentialInstance = CredentialsProvider({
  async authorize(credentials) {
    try {
      const { email, password } = credentials;

      const res = await axiosInstance.post('/users/login', { email, password });

      // console.log({ res: res.data.data });
      const user = res.data.data.result;

      // console.log({ user });

      return user;
    } catch (error) {
      console.log(`yang ini boy ${error.response.data.message}`);
      throw error.response.data;
    }
  },
});

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [credentialInstance],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        // console.log(user);
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
