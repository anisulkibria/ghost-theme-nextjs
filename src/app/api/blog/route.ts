import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const authorId = searchParams.get('author');

    // Handle tag filtering with raw SQL query
    if (tag) {
      // Find tag by slug first
      const tagRecord = await prisma.tag.findUnique({
        where: { slug: tag },
      });
      
      if (tagRecord) {
        // Use raw query for array contains
        const posts = await prisma.$queryRaw`
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
          WHERE LOWER(${tagRecord.name}) = ANY(bp.tags)
          ORDER BY bp."publishedAt" DESC
        `;
        
        // Format the results to match expected structure
        const formattedPosts = (posts as any[]).map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          readTime: post.readTime,
          category: post.category,
          image: post.image,
          featured: post.featured,
          tags: post.tags,
          publishedAt: post.publishedAt,
          authorId: post.authorId,
          documentationId: post.documentationId,
          author: post.authorId ? {
            id: post.authorId,
            name: post.authorName,
            bio: post.authorBio,
            avatar: post.authorAvatar,
            url: post.authorUrl,
            social: post.authorSocial,
            createdAt: post.authorCreatedAt,
            updatedAt: post.authorUpdatedAt
          } : null
        }));
        
        return NextResponse.json(formattedPosts);
      } else {
        return NextResponse.json([]);
      }
    }

    // Handle author filtering
    if (authorId && !tag) {
      const posts = await prisma.blogPost.findMany({
        where: {
          authorId: authorId
        },
        include: {
          author: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
      });

      return NextResponse.json(posts);
    }

    // Handle both tag and author filtering
    if (tag && authorId) {
      const tagRecord = await prisma.tag.findUnique({
        where: { slug: tag },
      });
      
      if (tagRecord) {
        const posts = await prisma.$queryRaw`
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
          WHERE bp."authorId" = ${authorId} AND LOWER(${tagRecord.name}) = ANY(bp.tags)
          ORDER BY bp."publishedAt" DESC
        `;
        
        // Format the results
        const formattedPosts = (posts as any[]).map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          readTime: post.readTime,
          category: post.category,
          image: post.image,
          featured: post.featured,
          tags: post.tags,
          publishedAt: post.publishedAt,
          authorId: post.authorId,
          documentationId: post.documentationId,
          author: post.authorId ? {
            id: post.authorId,
            name: post.authorName,
            bio: post.authorBio,
            avatar: post.authorAvatar,
            url: post.authorUrl,
            social: post.authorSocial,
            createdAt: post.authorCreatedAt,
            updatedAt: post.authorUpdatedAt
          } : null
        }));
        
        return NextResponse.json(formattedPosts);
      } else {
        return NextResponse.json([]);
      }
    }

    // Default: get all posts
    const posts = await prisma.blogPost.findMany({
      include: {
        author: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}