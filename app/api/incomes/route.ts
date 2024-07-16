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
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!kakaoId) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  try {
    const userId = await getUserIdByKakaoId(kakaoId);
    if (!userId) {
      return new NextResponse('User Not Found', { status: 404 });
    }

    interface DateFilter {
      gte?: Date;
      lte?: Date;
    }

    const filter = { userId, createdAt: {} as DateFilter };

    if (startDate || endDate) {
      filter['createdAt'] = {};
      if (startDate) {
        filter['createdAt']['gte'] = new Date(startDate);
      }
      if (endDate) {
        filter['createdAt']['lte'] = new Date(endDate);
      }
    }

    const incomes = await prisma.income.findMany({
      where: filter,
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
