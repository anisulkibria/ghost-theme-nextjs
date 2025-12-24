import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Get tag by slug
    const tag = await prisma.tag.findUnique({
      where: { slug },
    });

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    // Get posts for this tag using raw SQL for better array handling
    const postsQuery = `
      SELECT bp.*,
             a.id as "authorId",
             a.name as "authorName",
             a.bio as "authorBio",
             a.avatar as "authorAvatar",
             a.url as "authorUrl",
             a.social as "authorSocial",
             a."createdAt" as "authorCreatedAt",
             a."updatedAt" as "authorUpdatedAt"
      FROM "posts" bp
      LEFT JOIN "authors" a ON bp."authorId" = a.id
      WHERE LOWER($1) = ANY(bp.tags)
      ORDER BY bp."publishedAt" DESC
    `;
    
    const posts = await prisma.$queryRawUnsafe(postsQuery, tag.name.toLowerCase());

    return NextResponse.json({
      tag,
      posts,
    });
  } catch (error) {
    console.error('Error fetching tag:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tag' },
      { status: 500 }
    );
  }
}