import { NextResponse } from 'next/server';
import { getUserIdByKakaoId } from '@/lib/actions/getUserIdByKakaoId';
import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
  const { kakaoId, baeminIncome } = await new Response(req.body).json();

  if (!kakaoId || !baeminIncome) {
    console.log('no kakaoId or baeminIncome');
  }

  try {
    const newIncome = await prisma.income.create({
      data: {
        userId: (await getUserIdByKakaoId(kakaoId)) || '',
        baeminIncome,
      },
    });

    return NextResponse.json(newIncome);
  } catch (error) {
    console.error('POST error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
