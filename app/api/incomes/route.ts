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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const kakaoId = searchParams.get('kakaoId');

  if (!kakaoId) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  try {
    const userId = await getUserIdByKakaoId(kakaoId);
    if (!userId) {
      return new NextResponse('User Not Found', { status: 404 });
    }

    const incomes = await prisma.income.findMany({
      where: { userId },
    });

    return NextResponse.json(incomes);
  } catch (error) {
    console.error('GET error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export interface IncomeType {
  id: number;
  baeminIncome: number;
}
