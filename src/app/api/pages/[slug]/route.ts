import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const page = await prisma.page.findUnique({
      where: {
        slug: slug,
        published: true,
      },
    });

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, content, description, published } = body;

    const page = await prisma.page.update({
      where: {
        slug: slug,
      },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(description !== undefined && { description }),
        ...(published !== undefined && { published }),
      },
    });

    return NextResponse.json(page);
  } catch (error: any) {
    console.error('Error updating page:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await prisma.page.delete({
      where: {
        slug: slug,
      },
    });

    return NextResponse.json(
      { message: 'Page deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting page:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}