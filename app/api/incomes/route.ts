import { NextResponse } from 'next/server';
import { getUserIdByKakaoId } from '@/lib/actions/getUserIdByKakaoId';
import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
  const { kakaoId, baeminIncome, coupangIncome, createdAt } =
    await new Response(req.body).json();

  if (!kakaoId || !baeminIncome || !coupangIncome) {
    console.log('no kakaoId or income');
  }

  try {
    const newIncome = await prisma.income.create({
      data: {
        userId: (await getUserIdByKakaoId(kakaoId)) || '',
        baeminIncome,
        coupangIncome,
        createdAt,
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

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { baeminIncome, coupangIncome } = await new Response(req.body).json();

  if (!id || !baeminIncome || !coupangIncome) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  try {
    const income = await prisma.income.update({
      where: { id: id },
      data: { baeminIncome, coupangIncome },
    });

    return NextResponse.json(income);
  } catch (error) {
    console.error('PATCH error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export interface IncomeType {
  id: number;
  baeminIncome?: number;
  coupangIncome?: number;
  createdAt: Date;
  updatedAt: Date;
}
