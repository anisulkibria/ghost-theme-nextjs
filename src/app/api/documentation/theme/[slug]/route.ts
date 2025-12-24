import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const documentation = await prisma.documentation.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!documentation) {
      return NextResponse.json(
        { error: 'Documentation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(documentation);
  } catch (error) {
    console.error('Error fetching theme documentation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documentation' },
      { status: 500 }
    );
  }
}