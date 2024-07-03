import prisma from '@/lib/prismadb';

export const getUserIdByKakaoId = async (kakaoId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        kakaoId: kakaoId,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      return user.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};
