const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

/**
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ghost-theme.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    const paths = [];
    
    try {
      // Fetch all themes
      const themes = await prisma.theme.findMany({
        select: { id: true, updatedAt: true }
      });
      
      // Fetch all blog posts
      const blogPosts = await prisma.blogPost.findMany({
        select: { id: true, publishedAt: true }
      });
      
      // Fetch all pages
      const pages = await prisma.page.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true }
      });
      
      // Fetch all authors
      const authors = await prisma.author.findMany({
        select: { id: true, updatedAt: true }
      });
      
      // Fetch all tags
      const tags = await prisma.tag.findMany({
        select: { slug: true, updatedAt: true }
      });
      
      // Fetch all documentation
      const documentation = await prisma.documentation.findMany({
        select: { slug: true, publishedAt: true }
      });
      
      // Add theme pages
      themes.forEach(theme => {
        paths.push({
          loc: `/themes/${theme.id}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: theme.updatedAt.toISOString(),
        });
      });
      
      // Add blog post pages
      blogPosts.forEach(post => {
        paths.push({
          loc: `/blog/${post.id}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: post.publishedAt.toISOString(),
        });
      });
      
      // Add static pages
      pages.forEach(page => {
        paths.push({
          loc: `/page/${page.slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: page.updatedAt.toISOString(),
        });
      });
      
      // Add author pages
      authors.forEach(author => {
        paths.push({
          loc: `/author/${author.id}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: author.updatedAt.toISOString(),
        });
      });
      
      // Add tag pages
      tags.forEach(tag => {
        paths.push({
          loc: `/tag/${tag.slug}`,
          changefreq: 'weekly',
          priority: 0.6,
          lastmod: tag.updatedAt.toISOString(),
        });
      });
      
      // Add documentation pages
      documentation.forEach(doc => {
        paths.push({
          loc: `/documentation/${doc.slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: doc.publishedAt.toISOString(),
        });
      });
      
    } catch (error) {
      console.error('Error fetching sitemap data:', error);
    } finally {
      await prisma.$disconnect();
    }
    
    return paths;
  },
};
