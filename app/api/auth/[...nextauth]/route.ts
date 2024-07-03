import prisma from '@/lib/prismadb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            kakaoId: user.id,
          },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              kakaoId: user.id,
              name: user.name!,
              bicycleType: '기타',
            },
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = token.sub!;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
