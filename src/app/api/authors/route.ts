import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const authors = await prisma.author.findMany({
      include: {
        posts: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Add post count to each author
    const authorsWithCount = authors.map(author => ({
      ...author,
      postCount: author.posts.length,
    }));

    return NextResponse.json(authorsWithCount);
  } catch (error) {
    console.error('Error fetching authors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch authors' },
      { status: 500 }
    );
  }
}