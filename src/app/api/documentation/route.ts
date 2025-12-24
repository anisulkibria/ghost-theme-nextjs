import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const documentation = await prisma.documentation.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return NextResponse.json(documentation);
  } catch (error) {
    console.error('Error fetching documentation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documentation' },
      { status: 500 }
    );
  }
}