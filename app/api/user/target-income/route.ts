import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const kakaoId = searchParams.get('kakaoId');

    if (!kakaoId) {
      console.log('kakaoId is missing');
      return NextResponse.json(
        { error: 'kakaoId is missing' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { kakaoId: kakaoId },
      select: { targetIncome: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { kakaoId, targetIncome } = body;

  if (!kakaoId || !targetIncome) {
    console.log('kakaoId or targetIncome is missing');
    return NextResponse.json({ error: 'kakaoId or targetIncome is missing' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { kakaoId: kakaoId },
      data: { targetIncome: +targetIncome },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' });
  }
}
