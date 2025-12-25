import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Load environment variables from .env.local or .env
function loadEnvFile(filename: string) {
  try {
    const envFile = readFileSync(filename, 'utf-8');
    const lines = envFile.split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim();
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;
      
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^"|"$/g, '').trim();
        process.env[key.trim()] = value;
      }
    }
    console.log(`Loaded environment variables from ${filename}`);
    return true;
  } catch (error) {
    return false;
  }
}

// Try to load from .env.local first, then .env, then use existing env vars
if (!loadEnvFile('.env.local')) {
  if (!loadEnvFile('.env')) {
    console.log('Using existing environment variables');
  }
}

// Use DATABASE_URL from environment variables
const tcpConnectionString = process.env.DATABASE_URL;

if (!tcpConnectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({
  connectionString: tcpConnectionString,
});

const prisma = new PrismaClient({ adapter });

const themes = [
  {
    id: 'factum',
    name: 'Factum',
    description: 'Modern Journalism Platform',
    fullDescription: 'Factum is a sophisticated magazine theme designed for modern journalism and content-heavy publications. With its clean typography and thoughtful layout, Factum provides an exceptional reading experience across all devices.',
    price: 9,
    category: 'magazine',
    image: '/images/theme1.webp',
    featured: true,
    tags: ['magazine layout'],
    layout: '2 Columns',
    browsers: 'Chrome, Safari, Firefox',
    version: '1.2.0',
    ghostVersion: '5.0+',
    features: [
      'Responsive design that works on all devices',
      'Multiple layout options for different content types',
      'Built-in support for Ghost memberships',
      'SEO optimized with structured data',
      'Fast loading with optimized images',
      'Custom color schemes and typography',
      'Social media integration',
      'Newsletter signup forms',
      'Related posts functionality',
      'Author bio sections'
    ],
    screenshots: [
      '/images/theme1.webp',
      '/images/theme1.webp',
      '/images/theme1.webp'
    ],
    purchaseLink: 'https://shop.ghost-theme.com/buy/53df98aa-fd0b-4b2f-9898-ed34518dfffe',
    demoLink: null
  },
  {
    id: 'robotical',
    name: 'Robotical',
    description: 'Futuristic Tech & Innovation',
    fullDescription: 'Robotical is a cutting-edge theme perfect for tech blogs, innovation hubs, and forward-thinking publications. With its bold design and dark mode support, Robotical makes your content stand out.',
    price: 9,
    category: 'portfolio',
    image: '/images/theme2.webp',
    featured: false,
    tags: ['Dark mode ready'],
    layout: 'Responsive',
    browsers: 'Chrome, Safari, Firefox',
    version: '1.2.0',
    ghostVersion: '5.0+',
    features: [
      'Dark and light mode support',
      'Futuristic design elements',
      'Portfolio showcase capabilities',
      'Tech-focused layout patterns',
      'Code syntax highlighting',
      'Developer-friendly structure',
      'Performance optimized',
      'Mobile-first responsive design',
      'Custom animations and transitions',
      'Integration with popular tech platforms'
    ],
    screenshots: [
      '/images/theme2.webp',
      '/images/theme2.webp',
      '/images/theme2.webp'
    ],
    purchaseLink: 'https://shop.ghost-theme.com/checkout/buy/bb22d463-329c-4ac1-a8c1-8cc2b0998309',
    demoLink: 'https://robotical.ghost-theme.com'
  },
  {
    id: 'writer',
    name: 'Writer',
    description: 'Minimalist Writing Theme',
    fullDescription: 'Writer is a minimalist theme designed for authors and bloggers who want their content to take center stage. With its clean typography and distraction-free design, Writer provides the perfect reading experience.',
    price: 9,
    category: 'newsletter',
    image: '/images/theme3.webp',
    featured: false,
    tags: ['Ghost & CMS ready'],
    layout: 'Responsive',
    browsers: 'Chrome, Safari, Firefox',
    version: '1.2.0',
    ghostVersion: '5.0+',
    features: [
      'Minimalist design philosophy',
      'Focus on typography and readability',
      'Distraction-free reading experience',
      'Multiple post formats support',
      'Author-focused design elements',
      'Newsletter integration',
      'Comment system ready',
      'Social sharing capabilities',
      'Search functionality',
      'Tag and category organization'
    ],
    screenshots: [
      '/images/theme3.webp',
      '/images/theme3.webp',
      '/images/theme3.webp'
    ],
    purchaseLink: 'https://shop.ghost-theme.com/buy/7ea9304c-7797-4924-8223-36c6e9783f21',
    demoLink: null
  },
  {
    id: 'ylogger',
    name: 'Ylogger',
    description: 'Clean & Familiar UI',
    fullDescription: 'Ylogger combines the familiarity of traditional blog layouts with modern design principles. Perfect for personal blogs and small publications looking for a clean, professional appearance.',
    price: 9,
    category: 'magazine',
    image: '/images/theme4.webp',
    featured: false,
    tags: ['Modern Blog'],
    layout: 'Responsive',
    browsers: 'Chrome, Safari, Firefox',
    version: '1.2.0',
    ghostVersion: '5.0+',
    features: [
      'Familiar blog layout patterns',
      'Clean and modern design',
      'Easy customization options',
      'Widget-ready sidebar areas',
      'Multiple post layouts',
      'Social media integration',
      'Newsletter signup',
      'Related posts section',
      'Author profiles',
      'Mobile responsive'
    ],
    screenshots: [
      '/images/theme4.webp',
      '/images/theme4.webp',
      '/images/theme4.webp'
    ],
    purchaseLink: 'https://shop.ghost-theme.com/checkout/buy/6b0ef9df-66ac-4819-9ab1-56955224a41a',
    demoLink: 'https://ylogger.ghost-theme.com'
  },
  {
    id: 'bloggie',
    name: 'Bloggie',
    description: 'Clean, Modern & Fast',
    fullDescription: 'Bloggie is optimized for speed and performance while maintaining a beautiful, modern appearance. Perfect for bloggers who prioritize both aesthetics and loading times.',
    price: 9,
    category: 'newsletter',
    image: '/images/theme5.jpg',
    featured: false,
    tags: ['High Performance'],
    layout: 'Responsive',
    browsers: 'Chrome, Safari, Firefox',
    version: '1.2.0',
    ghostVersion: '5.0+',
    features: [
      'Lightning-fast loading times',
      'Performance optimized code',
      'Modern and clean design',
      'SEO friendly structure',
      'Mobile-first approach',
      'Lazy loading for images',
      'Minified CSS and JavaScript',
      'CDN ready',
      'Schema markup included',
      'Google Fonts integration'
    ],
    screenshots: [
      '/images/theme5.jpg',
      '/images/theme5.jpg',
      '/images/theme5.jpg'
    ],
    purchaseLink: 'https://shop.ghost-theme.com/buy/96bf281d-23e3-4767-ae4c-c08180f8c369',
    demoLink: 'https://bloggie.ghost-theme.com'
  },
  {
    id: 'icelog',
    name: 'Icelog',
    description: 'Minimal & Calm',
    fullDescription: 'Icelog brings a sense of calm and focus to your content with its minimal design and soothing color palette. Ideal for personal blogs and thoughtful writing.',
    price: 9,
    category: 'newsletter',
    image: '/images/theme6.jpg',
    featured: false,
    tags: ['Focused Writing'],
    layout: 'Responsive',
    browsers: 'Chrome, Safari, Firefox',
    version: '1.2.0',
    ghostVersion: '5.0+',
    features: [
      'Minimal and calming design',
      'Focus on readability',
      'Soft color palette',
      'Clean typography',
      'Distraction-free layout',
      'Mobile responsive',
      'Easy customization',
      'Social sharing',
      'Newsletter integration',
      'Search functionality'
    ],
    screenshots: [
      '/images/theme6.jpg',
      '/images/theme6.jpg',
      '/images/theme6.jpg'
    ],
    purchaseLink: 'https://shop.ghost-theme.com/buy/7b70e7fa-eb6b-4e2f-8995-3131920302a6',
    demoLink: null
  },
  {
    id: 'beguni',
    name: 'Beguni',
    description: 'Bold, Color-Rich',
    fullDescription: 'Beguni is a bold and vibrant theme perfect for creative professionals, photographers, and artists who want their work to make a strong impression.',
    price: 9,
    category: 'photography',
    image: '/images/theme7.jpg',
    featured: false,
    tags: ['Creative Design'],
    layout: 'Responsive',
    browsers: 'Chrome, Safari, Firefox',
    version: '1.2.0',
    ghostVersion: '5.0+',
    features: [
      'Bold and colorful design',
      'Photography focused layouts',
      'Gallery support',
      'Image optimization',
      'Creative typography',
      'Portfolio showcases',
      'Mobile responsive galleries',
      'Social media integration',
      'High-resolution image support',
      'Custom color schemes'
    ],
    screenshots: [
      '/images/theme7.jpg',
      '/images/theme7.jpg',
      '/images/theme7.jpg'
    ],
    purchaseLink: 'https://shop.ghost-theme.com/buy/952c69cf-7325-4191-9583-a895ace77044',
    demoLink: 'https://beguni.ghost-theme.com/'
  },
  {
    id: 'acceler',
    name: 'Acceler',
    description: 'Bootstrap Ghost Theme',
    fullDescription: 'Acceler combines the power of Bootstrap with Ghost CMS to create a flexible and customizable theme perfect for portfolios and business websites.',
    price: 9,
    category: 'portfolio',
    image: '/images/theme8.jpg',
    featured: false,
    tags: ['Free Customization'],
    layout: 'Responsive',
    browsers: 'Chrome, Safari, Firefox',
    version: '1.2.0',
    ghostVersion: '5.0+',
    features: [
      'Bootstrap 5 framework',
      'Highly customizable',
      'Portfolio layouts',
      'Business-friendly design',
      'Multiple color schemes',
      'Component-based structure',
      'Responsive grid system',
      'Cross-browser compatible',
      'SEO optimized',
      'Easy to extend'
    ],
    screenshots: [
      '/images/theme8.jpg',
      '/images/theme8.jpg',
      '/images/theme8.jpg'
    ],
    purchaseLink: 'https://shop.ghost-theme.com/buy/d5cc9715-97ed-4e05-bfdc-0bee0bd5ed69',
    demoLink: 'https://acceler.ghost-theme.com/'
  },
  {
    id: 'asahi',
    name: 'Asahi',
    description: 'Clean & Lightning Fast',
    fullDescription: 'Asahi is built with Tailwind CSS for maximum performance and customization. Perfect for modern magazines and publications that need speed and flexibility.',
    price: 9,
    category: 'magazine',
    image: '/images/theme9.webp',
    featured: false,
    tags: ['Tailwind CSS'],
    layout: 'Responsive',
    browsers: 'Chrome, Safari, Firefox',
    version: '1.2.0',
    ghostVersion: '5.0+',
    features: [
      'Built with Tailwind CSS',
      'Ultra-fast performance',
      'Highly customizable',
      'Modern design patterns',
      'Utility-first approach',
      'Mobile-first responsive',
      'SEO optimized',
      'Clean code structure',
      'Easy to modify',
      'Production ready'
    ],
    screenshots: [
      '/images/theme9.webp',
      '/images/theme9.webp',
      '/images/theme9.webp'
    ],
    purchaseLink: 'https://shop.ghost-theme.com/buy/205518fe-3146-4bb5-ae04-4a076ab722f2',
    demoLink: 'https://asahi.ghost-theme.com/'
  }
];

const authors = [
  {
    id: 'anisul-kibria',
    name: 'Anisul Kibria',
    bio: 'Full-stack developer passionate about creating beautiful and functional web applications. Specializing in React, Next.js, and modern web technologies.',
    avatar: '/images/author-avatar.jpg',
    url: 'https://anisulkibria.com',
    social: {
      twitter: 'https://twitter.com/anisul_kibria',
      github: 'https://github.com/anisulkibria',
      linkedin: 'https://linkedin.com/in/anisulkibria'
    }
  },
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    bio: 'Technical writer and content strategist with a focus on web development and design. Love helping developers create better user experiences.',
    avatar: '/images/author-avatar.jpg',
    url: 'https://sarahjohnson.com',
    social: {
      twitter: 'https://twitter.com/sarahjohnson',
      github: 'https://github.com/sarahjohnson'
    }
  },
  {
    id: 'mike-chen',
    name: 'Mike Chen',
    bio: 'Frontend developer and UI/UX enthusiast. Passionate about creating intuitive interfaces and optimizing web performance.',
    avatar: '/images/author-avatar.jpg',
    url: 'https://mikechen.dev',
    social: {
      twitter: 'https://twitter.com/mikechen',
      github: 'https://github.com/mikechen',
      dribbble: 'https://dribbble.com/mikechen'
    }
  }
];

const tags = [
  {
    id: 'tutorials',
    name: 'Tutorials',
    slug: 'tutorials',
    description: 'Step-by-step guides and how-to articles'
  },
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest tech trends and innovations'
  },
  {
    id: 'design',
    name: 'Design',
    slug: 'design',
    description: 'UI/UX design principles and best practices'
  },
  {
    id: 'development',
    name: 'Development',
    slug: 'development',
    description: 'Web development tips and techniques'
  },
  {
    id: 'seo',
    name: 'SEO',
    slug: 'seo',
    description: 'Search engine optimization strategies'
  },
  {
    id: 'minimalism',
    name: 'Minimalism',
    slug: 'minimalism',
    description: 'Minimalist design and lifestyle'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    slug: 'marketing',
    description: 'Digital marketing strategies and techniques'
  }
];

const blogPosts = [
  {
    id: 'whats-new-in-ghost-5',
    title: "What's New in Ghost 5.0",
    excerpt: 'Discover the latest features and improvements in Ghost 5.0, including enhanced performance, new themes, and improved developer experience.',
    content: `## What's New in Ghost 5.0

Ghost 5.0 brings a host of exciting new features and improvements that make it the best version yet. Let's dive into what makes this release special.

## Performance Enhancements

The Ghost team has focused heavily on performance in this release. With improved caching, faster image optimization, and better database queries, your site will load faster than ever.

### Key Performance Improvements:
- 40% faster page load times
- Improved image optimization
- Better database query performance
- Enhanced caching mechanisms

## New Theme Features

Ghost 5.0 introduces powerful new theme capabilities that give developers more flexibility and control.

### Theme Highlights:
- Enhanced custom template support
- Improved block editor integration
- Better responsive design tools
- New theme development APIs

## Developer Experience

We've made significant improvements to the developer experience with better tools and documentation.

### Developer Tools:
- Improved CLI with new commands
- Better error handling and debugging
- Enhanced API documentation
- New development templates

## Conclusion

Ghost 5.0 represents a significant step forward in the evolution of the platform. Whether you're a content creator, developer, or site owner, there's something in this release for you.`,
    readTime: '5 min read',
    category: 'Technology',
    image: '/images/blog-post-5.jpg',
    featured: true,
    tags: ['technology', 'development'],
    authorId: 'anisul-kibria'
  },
  {
    id: 'the-future-of-digital-publishing',
    title: 'The Future of Digital Publishing',
    excerpt: 'Explore how digital publishing is evolving with new technologies, platforms, and business models that are reshaping the industry.',
    content: `## The Future of Digital Publishing

The digital publishing landscape is constantly evolving, with new technologies and platforms emerging that are changing how we create, distribute, and consume content.

## Current Trends

### 1. Subscription Models
Subscription-based content is becoming increasingly popular, with publishers offering premium content through membership programs.

### 2. Interactive Content
From interactive infographics to immersive storytelling, publishers are finding new ways to engage readers.

### 3. Mobile-First Approach
With the majority of readers accessing content on mobile devices, publishers are prioritizing mobile experiences.

## Emerging Technologies

### AI and Machine Learning
Artificial intelligence is transforming how content is created, personalized, and distributed.

### Blockchain and Web3
New technologies are enabling new models for content ownership and monetization.

## Challenges and Opportunities

While the future looks bright, publishers face challenges including:
- Content saturation
- Ad-blocker adoption
- Privacy regulations

But these challenges also present opportunities for innovation and growth.

## Conclusion

The future of digital publishing is exciting, with endless possibilities for those willing to embrace change and innovation.`,
    readTime: '7 min read',
    category: 'Technology',
    image: '/images/blog-post-1.jpg',
    featured: false,
    tags: ['technology', 'tutorials'],
    authorId: 'anisul-kibria'
  },
  {
    id: 'optimizing-your-ghost-blog-for-seo',
    title: 'Optimizing Your Ghost Blog for SEO',
    excerpt: 'Learn essential SEO strategies and techniques to improve your Ghost blog\'s visibility in search engine results.',
    content: `## Optimizing Your Ghost Blog for SEO

Search engine optimization is crucial for driving organic traffic to your Ghost blog. Here's how to do it right.

## On-Page SEO

### Title Tags and Meta Descriptions
Ghost makes it easy to customize title tags and meta descriptions for each post. Use them wisely to improve click-through rates.

### URL Structure
Keep your URLs clean and descriptive. Ghost automatically creates SEO-friendly URLs, but you can customize them.

### Internal Linking
Link to relevant content within your blog to improve navigation and distribute page authority.

## Technical SEO

### Site Speed
Optimize images, enable caching, and use a CDN to improve your site's loading speed.

### Mobile Optimization
Ensure your theme is fully responsive and provides a great mobile experience.

### Structured Data
Ghost automatically includes structured data for posts and pages, helping search engines understand your content better.

## Content Strategy

### Keyword Research
Identify relevant keywords and incorporate them naturally into your content.

### Quality Content
Focus on creating valuable, comprehensive content that answers your audience's questions.

### Regular Updates
Consistently publish fresh content to keep your audience engaged and search engines crawling.

## Conclusion

SEO is an ongoing process, but with these strategies, you'll be well on your way to improving your Ghost blog's search visibility.`,
    readTime: '6 min read',
    category: 'SEO',
    image: '/images/blog-post-2.jpg',
    featured: false,
    tags: ['seo', 'tutorials'],
    authorId: 'anisul-kibria'
  },
  {
    id: 'growing-your-newsletter',
    title: 'Growing Your Newsletter with Ghost',
    excerpt: 'Discover effective strategies to build and grow your email newsletter using Ghost\'s built-in membership features.',
    content: `## Growing Your Newsletter with Ghost

Ghost's built-in membership features make it easy to create and grow your email newsletter. Here's how to make the most of them.

## Setting Up Your Newsletter

### Membership Tiers
Ghost allows you to create different membership tiers:
- Free subscribers
- Paid subscribers
- Premium members

### Email Templates
Customize your email templates to match your brand and provide a consistent experience.

## Growth Strategies

### Content Upgrades
Offer exclusive content to newsletter subscribers to encourage sign-ups.

### Lead Magnets
Create valuable resources (eBooks, guides, templates) that visitors can access by subscribing.

### Pop-up Forms
Use strategic pop-up forms to capture visitor attention at the right moment.

## Engagement Tactics

### Segmentation
Segment your subscribers based on their interests and behavior for targeted content.

### Personalization
Use subscriber data to personalize your newsletters and improve engagement.

### Analytics
Track open rates, click-through rates, and other metrics to optimize your strategy.

## Monetization

### Paid Newsletters
Ghost makes it easy to create paid newsletter subscriptions with different pricing tiers.

### Premium Content
Offer exclusive content to paid subscribers while keeping some content free for broader reach.

## Conclusion

With Ghost's powerful membership features and these strategies, you can build a thriving newsletter that engages your audience and generates revenue.`,
    readTime: '8 min read',
    category: 'Marketing',
    image: '/images/blog-post-3.jpg',
    featured: false,
    tags: ['marketing', 'development'],
    authorId: 'anisul-kibria'
  },
  {
    id: 'minimalist-design-principles',
    title: 'Minimalist Design Principles for Modern Websites',
    excerpt: 'Explore the core principles of minimalist design and how to apply them to create clean, effective websites.',
    content: `## Minimalist Design Principles for Modern Websites

Minimalist design is more than just a trend—it's a philosophy that focuses on simplicity and functionality. Let's explore how to apply these principles to create stunning websites.

## The Philosophy of Minimalism

### Less is More
The core principle of minimalist design is that less is more. By removing unnecessary elements, we create a more focused user experience.

### Purposeful Design
Every element in a minimalist design should serve a specific purpose. Nothing is included just for decoration.

## Key Principles

### 1. Abundant White Space
White space (or negative space) is crucial in minimalist design:
- Creates breathing room for content
- Improves readability and comprehension
- Establishes visual hierarchy
- Reduces cognitive load

### 2. Limited Color Palette
Minimalist designs typically use:
- 2-3 primary colors maximum
- High contrast for readability
- Monochromatic schemes with accent colors
- Neutral backgrounds with strategic color use

### 3. Simple Typography
Typography in minimalist design:
- Clean, readable fonts
- Limited font families (1-2 maximum)
- Clear hierarchy with size and weight
- Adequate line spacing

### 4. Focus on Content
Content should be the star:
- Remove distracting elements
- Use high-quality images sparingly
- Create clear navigation paths
- Prioritize user needs

## Implementation Tips

### Start with Content
- Define your core message
- Structure information hierarchically
- Remove non-essential content
- Focus on user goals

### Use Grid Systems
- Create consistent layouts
- Maintain alignment
- Establish rhythm and flow
- Ensure responsive behavior

### Optimize Performance
- Minimal code means faster loading
- Reduce HTTP requests
- Optimize images and assets
- Implement lazy loading

## Common Pitfalls to Avoid

### Over-simplification
- Don't sacrifice functionality
- Maintain clear navigation
- Provide necessary information
- Keep accessibility in mind

### Inconsistency
- Maintain design patterns
- Use consistent spacing
- Apply styles uniformly
- Test across devices

## Conclusion

Minimalist design creates powerful, effective websites by focusing on what truly matters. By applying these principles, you can create designs that are both beautiful and functional.`,
    readTime: '6 min read',
    category: 'Design',
    image: '/images/blog-post-4.jpg',
    featured: false,
    tags: ['design', 'minimalism'],
    authorId: 'anisul-kibria'
  },
  {
    id: 'web-performance-optimization',
    title: 'Web Performance Optimization: A Complete Guide',
    excerpt: 'Learn essential techniques to optimize your website performance and improve user experience.',
    content: `## Web Performance Optimization: A Complete Guide

Website performance directly impacts user experience, SEO rankings, and conversion rates. This comprehensive guide covers essential optimization techniques.

## Why Performance Matters

### User Experience
- Faster sites provide better user experience
- Reduced bounce rates
- Increased engagement
- Higher conversion rates

### SEO Benefits
- Google uses page speed as ranking factor
- Core Web Vitals impact search rankings
- Mobile-first indexing prioritizes performance
- Better crawl efficiency

## Key Performance Metrics

### Core Web Vitals
1. **Largest Contentful Paint (LCP)** - Loading performance
2. **First Input Delay (FID)** - Interactivity
3. **Cumulative Layout Shift (CLS)** - Visual stability

### Other Important Metrics
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Time to Interactive (TTI)
- Speed Index

## Optimization Techniques

### 1. Image Optimization
- Choose the right format (WebP, AVIF)
- Compress images without quality loss
- Implement responsive images
- Use lazy loading
- Serve scaled images

### 2. Code Optimization
- Minify CSS and JavaScript
- Remove unused code
- Optimize critical rendering path
- Implement code splitting
- Use tree shaking

### 3. Caching Strategies
- Browser caching headers
- Content Delivery Networks (CDN)
- Service workers for offline access
- Database query caching
- Application-level caching

### 4. Server Optimization
- Choose fast hosting
- Implement HTTP/2 or HTTP/3
- Use Gzip or Brotli compression
- Optimize server response time
- Implement load balancing

## Advanced Techniques

### Critical CSS
- Extract above-the-fold styles
- Inline critical CSS
- Load non-critical CSS asynchronously
- Optimize CSS delivery

### JavaScript Optimization
- Defer non-critical JavaScript
- Use async loading when appropriate
- Implement resource hints (preload, prefetch)
- Optimize third-party scripts

### Font Optimization
- Use modern font formats (WOFF2)
- Implement font-display strategies
- Subset fonts to reduce size
- Use system fonts when possible

## Monitoring and Testing

### Performance Tools
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Chrome DevTools Lighthouse

### Continuous Monitoring
- Set up performance budgets
- Monitor Core Web Vitals
- Track real user metrics
- Implement performance alerts

## Best Practices

### Mobile Optimization
- Prioritize mobile performance
- Optimize for touch interactions
- Consider network conditions
- Implement progressive enhancement

### Progressive Web Apps
- Service workers for caching
- Offline functionality
- App-like experience
- Push notifications

## Conclusion

Web performance optimization is an ongoing process that requires attention to detail and continuous monitoring. By implementing these techniques, you can create faster, more efficient websites that provide excellent user experiences.`,
    readTime: '8 min read',
    category: 'Development',
    image: '/images/blog-post-5.jpg',
    featured: true,
    tags: ['development', 'seo', 'tutorials'],
    authorId: 'anisul-kibria'
  },
  {
    id: 'content-marketing-strategy',
    title: 'Building a Successful Content Marketing Strategy',
    excerpt: 'Discover how to create and execute a content marketing strategy that drives results and engages your audience.',
    content: `## Building a Successful Content Marketing Strategy

Content marketing is one of the most effective ways to attract and engage your target audience. This guide will help you build a strategy that delivers real results.

## Understanding Content Marketing

### What is Content Marketing?
Content marketing is the creation and distribution of valuable, relevant content to attract and retain a clearly defined audience.

### Why It Works
- Builds trust and credibility
- Establishes authority in your niche
- Drives organic traffic
- Supports customer journey
- Cost-effective compared to traditional marketing

## Strategy Development

### 1. Define Your Goals
- Increase brand awareness
- Generate leads
- Drive sales
- Build community
- Educate customers

### 2. Know Your Audience
- Create detailed buyer personas
- Understand pain points
- Research their interests
- Identify preferred content formats
- Map their customer journey

### 3. Content Planning
- Perform keyword research
- Analyze competitor content
- Identify content gaps
- Create content pillars
- Develop a content calendar

## Content Types and Formats

### Blog Content
- How-to guides
- Listicles
- Case studies
- Interviews
- Industry news

### Visual Content
- Infographics
- Videos
- Podcasts
- Webinars
- Interactive content

### Gated Content
- Ebooks
- Whitepapers
- Templates
- Checklists
- Courses

## Content Creation Process

### Research and Planning
- Keyword analysis
- Topic validation
- Outline creation
- Resource gathering
- Timeline setting

### Production
- Writing and editing
- Design and formatting
- Multimedia creation
- Quality assurance
- SEO optimization

### Distribution
- Social media promotion
- Email marketing
- Influencer outreach
- Content syndication
- Paid promotion

## Measurement and Optimization

### Key Metrics
- Traffic and engagement
- Lead generation
- Conversion rates
- Social shares
- Brand mentions

### Tools and Analytics
- Google Analytics
- Social media analytics
- Email marketing metrics
- SEO tools
- CRM data

### Optimization Strategies
- A/B testing
- Content performance analysis
- Audience feedback
- Trend monitoring
- Strategy refinement

## Common Mistakes to Avoid

### Lack of Strategy
- Publishing without purpose
- Inconsistent messaging
- No clear target audience
- Random content creation

### Quality Issues
- Poor writing quality
- Lack of originality
- Inadequate research
- No editing process

### Distribution Problems
- Creating but not promoting
- Wrong channels
- Inconsistent posting
- No engagement with audience

## Advanced Techniques

### Content Repurposing
- Turn blog posts into videos
- Create infographics from data
- Compile guides into ebooks
- Extract quotes for social media
- Develop podcast episodes

### SEO Integration
- Keyword optimization
- Internal linking
- Meta descriptions
- Schema markup
- Local SEO

### Automation and Scaling
- Content management systems
- Social media scheduling
- Email automation
- Analytics dashboards
- Team collaboration tools

## Conclusion

A successful content marketing strategy requires planning, consistency, and continuous optimization. By following these guidelines, you can create content that resonates with your audience and drives business results.`,
    readTime: '10 min read',
    category: 'Marketing',
    image: '/images/blog-post-1.jpg',
    featured: false,
    tags: ['marketing', 'tutorials'],
    authorId: 'anisul-kibria'
  },
  {
    id: 'responsive-web-design',
    title: 'Responsive Web Design: Best Practices and Techniques',
    excerpt: 'Master the art of creating websites that work perfectly across all devices and screen sizes.',
    content: `## Responsive Web Design: Best Practices and Techniques

Responsive web design is essential in today's multi-device world. Learn the best practices and techniques to create websites that adapt seamlessly to any screen size.

## The Foundation of Responsive Design

### What is Responsive Design?
Responsive web design is an approach that makes web pages render well on a variety of devices and window sizes.

### Why It's Crucial
- Mobile-first browsing dominates
- Single codebase for all devices
- Better SEO performance
- Improved user experience
- Lower maintenance costs

## Core Principles

### 1. Fluid Grids
- Use relative units (percentages, em, rem)
- Flexible layouts that adapt to screen size
- CSS Grid and Flexbox for modern layouts
- Breakpoint-based design adjustments

### 2. Flexible Images
- Max-width: 100% for images
- Responsive image techniques
- Picture element for art direction
- Srcset for resolution switching

### 3. Media Queries
- Breakpoint strategy
- Mobile-first vs desktop-first
- Common breakpoint patterns
- Progressive enhancement

## Modern CSS Techniques

### CSS Grid
- Two-dimensional layout system
- Responsive grid templates
- Auto-fit and auto-fill
- Grid areas for complex layouts

### Flexbox
- One-dimensional layout
- Flexible containers and items
- Alignment and distribution
- Responsive navigation patterns

### Container Queries
- Component-based responsiveness
- Query containers instead of viewport
- Better encapsulation
- Future of responsive design

## Mobile-First Approach

### Why Mobile-First?
- Forces focus on essential content
- Better performance on mobile
- Progressive enhancement
- Aligns with user behavior

### Implementation Strategy
- Design for smallest screen first
- Add complexity for larger screens
- Touch-friendly interfaces
- Optimized performance

## Typography and Readability

### Responsive Typography
- Fluid typography with clamp()
- Relative font sizes
- Line height optimization
- Readable text columns

### Accessibility Considerations
- Sufficient contrast ratios
- Scalable text
- Touch target sizes
- Screen reader compatibility

## Performance Optimization

### Image Optimization
- Responsive images with srcset
- Modern image formats (WebP, AVIF)
- Lazy loading implementation
- Critical image loading

### CSS Optimization
- Critical CSS inlining
- Unused CSS removal
- Media query optimization
- Efficient selectors

### JavaScript Considerations
- Conditional loading
- Touch event optimization
- Performance monitoring
- Bundle size optimization

## Common Patterns and Components

### Navigation
- Hamburger menus
- Tab navigation
- Off-canvas menus
- Sticky headers

### Layout Patterns
- Card layouts
- Grid systems
- Masonry layouts
- Full-width sections

### Forms
- Responsive form layouts
- Touch-friendly inputs
- Mobile keyboards
- Validation and feedback

## Testing and Debugging

### Device Testing
- Real device testing
- Browser developer tools
- Online testing tools
- Emulator limitations

### Debugging Techniques
- Responsive design mode
- Breakpoint debugging
- Performance profiling
- Cross-browser compatibility

## Advanced Techniques

### Progressive Web Apps
- Responsive app-like experiences
- Offline functionality
- Service workers
- App manifests

### CSS Custom Properties
- Dynamic theming
- Responsive variables
- Component customization
- Maintainable code

### JavaScript Frameworks
- React responsive patterns
- Vue.js responsive components
- Angular responsive utilities
- Framework-specific best practices

## Future Trends

### New Technologies
- Container queries adoption
- Subgrid for nested layouts
- Cascade layers for organization
- New viewport units

### Design Systems
- Responsive design tokens
- Component libraries
- Pattern libraries
- Documentation standards

## Best Practices Summary

### Planning
- Content-first approach
- Device research
- Performance budgeting
- Accessibility planning

### Implementation
- Semantic HTML structure
- Progressive enhancement
- Performance optimization
- Cross-browser testing

### Maintenance
- Regular testing
- Performance monitoring
- User feedback collection
- Continuous improvement

## Conclusion

Responsive web design is no longer optional—it's essential. By following these best practices and techniques, you can create websites that provide excellent experiences across all devices while maintaining performance and accessibility standards.`,
    readTime: '9 min read',
    category: 'Development',
    image: '/images/blog-post-2.jpg',
    featured: false,
    tags: ['development', 'design', 'tutorials'],
    authorId: 'anisul-kibria'
  },
  {
    id: 'ghost-theme-development',
    title: 'Getting Started with Ghost Theme Development',
    excerpt: 'Learn how to create custom Ghost themes from scratch with this comprehensive guide.',
    content: `## Getting Started with Ghost Theme Development

Ghost theme development combines modern web technologies with a powerful CMS. This guide will help you create beautiful, functional Ghost themes.

## Understanding Ghost Themes

### What are Ghost Themes?
Ghost themes are the visual layer of a Ghost publication, controlling how content is displayed to visitors.

### Theme Structure
- Handlebars templating engine
- CSS and JavaScript assets
- Theme configuration files
- Localization support

## Development Environment Setup

### Prerequisites
- Node.js and npm
- Ghost CLI
- Code editor
- Design tools (Figma, Sketch)
- Version control (Git)

### Local Development
- Install Ghost locally
- Set up development instance
- Configure theme testing
- Enable development mode

## Theme Architecture

### File Structure
The basic Ghost theme structure includes:
- assets/ folder for CSS, JS, and images
- locales/ for translation files
- partials/ for reusable template components
- routes.yaml for custom routing
- package.json for theme metadata
- default.hbs as the main template file

### Core Templates
- default.hbs (base template)
- index.hbs (blog listing)
- post.hbs (single post)
- page.hbs (static page)
- tag.hbs (tag archive)
- author.hbs (author archive)

## Handlebars Templating

### Basic Syntax
- \{\{\{variable\}\}\} - Unescaped output
- \{\{variable\}\} - Escaped output
- \{\#if condition\}\} - Conditional blocks
- \{\#each items\}\} - Loop iteration

### Ghost Helpers
- \{\{@posts\}\} - Post collection
- \{\{@img\}\} - Image helper
- \{\{@url\}\} - URL generation
- \{\{@excerpt\}\} - Content excerpt

### Custom Helpers
- Register helpers in package.json
- Create helper functions
- Pass parameters
- Return formatted content

## Styling and Design

### CSS Organization
- Component-based structure
- CSS custom properties
- Responsive design patterns
- Performance optimization

### Design Systems
- Color palettes
- Typography scales
- Spacing systems
- Component libraries

### Modern CSS Techniques
- CSS Grid and Flexbox
- Custom properties
- Container queries
- CSS-in-JS options

## JavaScript Integration

### Theme JavaScript
- ES6+ features
- Module organization
- Performance optimization
- Browser compatibility

### Common Functionality
- Navigation menus
- Image galleries
- Search functionality
- Social sharing

### Third-party Integrations
- Analytics tools
- Comment systems
- Newsletter forms
- Payment processors

## Advanced Features

### Custom Routes
- routes.yaml configuration
- Dynamic routing
- Template selection
- URL customization

### Content Structuring
- Custom post templates
- Dynamic content blocks
- Card transformations
- Data relationships

### Member Features
- Membership integration
- Paid content gates
- Member-only content
- Subscription forms

## Performance Optimization

### Image Optimization
- Responsive images
- Lazy loading
- Format optimization
- CDN integration

### Code Optimization
- CSS minification
- JavaScript bundling
- Critical CSS
- Asset compression

### Loading Strategies
- Progressive enhancement
- Above-the-fold optimization
- Resource hints
- Service workers

## Testing and Debugging

### Theme Validation
- Ghost CLI validation
- Syntax checking
- Template testing
- Asset verification

### Cross-browser Testing
- Browser compatibility
- Device testing
- Responsive design testing
- Performance testing

### Debugging Tools
- Browser developer tools
- Ghost debug mode
- Handlebars debugging
- Performance profiling

## Deployment and Distribution

### Theme Package
- File organization
- Documentation
- Version control
- Package validation

### Distribution Channels
- Ghost Marketplace
- Direct sales
- Theme bundles
- Open source release

### Updates and Maintenance
- Version management
- Update strategies
- Backward compatibility
- Support documentation

## Best Practices

### Code Quality
- Semantic HTML
- Accessible markup
- Clean CSS architecture
- Maintainable JavaScript

### Performance
- Optimized assets
- Minimal dependencies
- Efficient loading
- Core Web Vitals

### User Experience
- Intuitive navigation
- Fast loading
- Mobile optimization
- Accessibility compliance

## Resources and Community

### Official Documentation
- Ghost.org documentation
- API references
- Theme guides
- Best practices

### Community Resources
- Ghost forums
- Theme repositories
- Developer communities
- Tutorial platforms

### Tools and Utilities
- Theme generators
- Code validators
- Performance tools
- Design resources

## Conclusion

Ghost theme development offers a powerful way to create unique, performant publishing platforms. By following these guidelines and best practices, you can build themes that delight users and showcase content effectively.`,
    readTime: '12 min read',
    category: 'Development',
    image: '/images/blog-post-3.jpg',
    featured: true,
    tags: ['development', 'tutorials', 'technology'],
    authorId: 'anisul-kibria'
  }
];

const themeDocumentation = [
  {
    id: 'factum-docs',
    title: 'Factum Documentation',
    description: 'Complete documentation for Factum Ghost theme, including installation, configuration, and customization guides.',
    content: `## Factum Theme Documentation

Factum is a sophisticated magazine theme designed for modern journalism and content-heavy publications. With its clean typography and thoughtful layout, Factum provides an exceptional reading experience across all devices.

## Installation

1. Download the Factum theme ZIP file
2. Log in to your Ghost admin panel
3. Navigate to Settings → Design → Change theme
4. Click "Upload theme" and select the factum.zip file
5. Click Activate to make it live

## Configuration

### Navigation Setup
- Go to Settings → Navigation
- Add your primary navigation items
- Configure secondary navigation if needed

### Memberships
Factum fully supports Ghost memberships:
- Set up membership tiers in Settings → Memberships
- Customize signup forms
- Configure paid access levels

### Customization Options
- Access theme settings in Settings → Design
- Customize colors and typography
- Configure layout options
- Set up featured posts display

## Features

- **Responsive Design**: Works perfectly on all devices
- **Multiple Layout Options**: Choose from different content layouts
- **SEO Optimized**: Built with structured data and meta tags
- **Social Integration**: Easy sharing and social media links
- **Newsletter Ready**: Integrated newsletter signup forms
- **Related Posts**: Automatic related content suggestions
- **Author Profiles**: Detailed author information sections

## Troubleshooting

### Images Not Loading
- Check image URLs in your content
- Ensure images are optimized for web
- Verify CDN settings if using external hosting

### Navigation Issues
- Clear your site cache
- Check navigation label URLs
- Ensure menu items are properly configured

### Membership Problems
- Verify Stripe integration if using paid tiers
- Check email delivery settings
- Test signup flow with different browsers

## Support

For additional support with Factum theme:
- Check our knowledge base for common issues
- Contact our support team through the help center
- Join our community forum for tips and tricks`,
    slug: 'factum'
  },
  {
    id: 'robotical-docs',
    title: 'Robotical Documentation',
    description: 'Complete documentation for Robotical Ghost theme, perfect for tech blogs and innovation hubs.',
    content: `## Robotical Theme Documentation

Robotical is a cutting-edge theme perfect for tech blogs, innovation hubs, and forward-thinking publications. With its bold design and dark mode support, Robotical makes your content stand out.

## Installation

1. Download the Robotical theme ZIP file
2. Log in to your Ghost admin panel
3. Navigate to Settings → Design → Change theme
4. Click "Upload theme" and select the robotical.zip file
5. Click Activate to make it live

## Configuration

### Dark Mode Setup
Robotical includes automatic dark mode:
- Users can toggle between light and dark themes
- System preference is respected by default
- Manual override available in navigation

### Code Highlighting
Perfect for technical content:
- Syntax highlighting for multiple languages
- Copy code functionality
- Line numbers and highlighting options

### Tech-Focused Features
- Portfolio showcase capabilities
- Project galleries
- Tech stack displays
- Integration with GitHub and other platforms

## Features

- **Dark and Light Mode**: Seamless theme switching
- **Code Syntax Highlighting**: Perfect for technical tutorials
- **Portfolio Layouts**: Showcase projects and work
- **Performance Optimized**: Built for speed and efficiency
- **Mobile-First Responsive**: Works on all devices
- **Social Media Integration**: Connect with tech platforms
- **Custom Animations**: Smooth transitions and effects

## Customization

### Color Schemes
- Primary and secondary color options
- Dark mode specific color adjustments
- Accent colors for links and highlights

### Typography
- Tech-friendly font choices
- Monospace fonts for code
- Adjustable font sizes and line heights

## Troubleshooting

### Dark Mode Issues
- Check CSS custom properties
- Verify JavaScript is loading correctly
- Test in different browsers

### Code Highlighting Problems
- Ensure Prism.js is loading
- Check language identifiers in code blocks
- Verify CSS for syntax highlighting

## Support

For additional support with Robotical theme:
- Visit our documentation site
- Check our GitHub repository for issues
- Contact our technical support team`,
    slug: 'robotical'
  },
  {
    id: 'writer-docs',
    title: 'Writer Documentation',
    description: 'Complete documentation for Writer Ghost theme, designed for authors and bloggers who prioritize content.',
    content: `## Writer Theme Documentation

Writer is a minimalist theme designed for authors and bloggers who want their content to take center stage. With its clean typography and distraction-free design, Writer provides the perfect reading experience.

## Installation

1. Download the Writer theme ZIP file
2. Log in to your Ghost admin panel
3. Navigate to Settings → Design → Change theme
4. Click "Upload theme" and select the writer.zip file
5. Click Activate to make it live

## Configuration

### Typography Settings
Writer focuses on readability:
- Choose from multiple font pairings
- Adjust font sizes and line heights
- Configure reading width for optimal experience

### Minimalist Layout
- Clean, distraction-free design
- Focus on content presentation
- Optional sidebar elements
- Simple navigation structure

### Author Features
- Enhanced author profiles
- Bio sections and social links
- Author pages with post collections
- Byline customization options

## Features

- **Minimalist Design**: Clean and focused on content
- **Typography Excellence**: Optimized for reading
- **Distraction-Free**: No unnecessary elements
- **Author Focused**: Enhanced author profiles and bios
- **Newsletter Integration**: Easy email list building
- **Social Sharing**: Simple sharing options
- **Search Functionality**: Built-in search capabilities
- **Tag Organization**: Content categorization system

## Customization

### Reading Experience
- Adjustable content width
- Font size controls for readers
- Reading time estimates
- Progress indicators for long articles

### Author Customization
- Custom author bios
- Social media links
- Author photo options
- Byline styling options

## Troubleshooting

### Typography Issues
- Check font loading in browser console
- Verify CSS custom properties
- Test with different content types

### Author Profile Problems
- Ensure author data is complete in Ghost admin
- Check social media link formats
- Verify image uploads for author avatars

## Support

For additional support with Writer theme:
- Browse our author-focused guides
- Check typography customization tips
- Contact our content strategy team`,
    slug: 'writer'
  },
  {
    id: 'ylogger-docs',
    title: 'Ylogger Documentation',
    description: 'Complete documentation for Ylogger Ghost theme, combining familiar blog layouts with modern design.',
    content: `## Ylogger Theme Documentation

Ylogger combines the familiarity of traditional blog layouts with modern design principles. Perfect for personal blogs and small publications looking for a clean, professional appearance.

## Installation

1. Download the Ylogger theme ZIP file
2. Log in to your Ghost admin panel
3. Navigate to Settings → Design → Change theme
4. Click "Upload theme" and select the ylogger.zip file
5. Click Activate to make it live

## Configuration

### Blog Layout Options
Ylogger offers multiple blog layouts:
- Classic blog post listing
- Grid layout options
- Masonry style arrangements
- Featured post highlighting

### Sidebar Configuration
- Widget-ready areas
- Custom HTML widgets
- Recent posts display
- Category and tag clouds
- Author information sections

### Post Formats
- Standard blog posts
- Image-focused posts
- Quote and link formats
- Video post support

## Features

- **Familiar Layout**: Traditional blog structure
- **Multiple Post Formats**: Support for various content types
- **Widget Ready**: Customizable sidebar areas
- **Social Integration**: Built-in sharing and following
- **Newsletter Signup**: Email list building
- **Related Posts**: Automatic content suggestions
- **Author Profiles**: Detailed author information
- **Mobile Responsive**: Works on all devices

## Customization

### Layout Options
- Choose between different blog layouts
- Configure sidebar position and content
- Set featured post display options
- Customize post metadata display

### Color and Typography
- Multiple color schemes available
- Font pairing options
- Custom accent colors
- Link and button styling

## Troubleshooting

### Layout Issues
- Check responsive breakpoints
- Verify CSS grid and flexbox usage
- Test with different content lengths

### Sidebar Problems
- Ensure widget content is valid HTML
- Check for JavaScript conflicts
- Test with different widget combinations

## Support

For additional support with Ylogger theme:
- Check our layout configuration guides
- Browse widget customization tutorials
- Contact our blog design specialists`,
    slug: 'ylogger'
  },
  {
    id: 'bloggie-docs',
    title: 'Bloggie Documentation',
    description: 'Complete documentation for Bloggie Ghost theme, optimized for speed and performance.',
    content: `## Bloggie Theme Documentation

Bloggie is optimized for speed and performance while maintaining a beautiful, modern appearance. Perfect for bloggers who prioritize both aesthetics and loading times.

## Installation

1. Download the Bloggie theme ZIP file
2. Log in to your Ghost admin panel
3. Navigate to Settings → Design → Change theme
4. Click "Upload theme" and select the bloggie.zip file
5. Click Activate to make it live

## Performance Optimization

### Image Optimization
Bloggie includes advanced image optimization:
- Automatic image resizing
- Lazy loading for all images
- WebP format support
- Responsive image serving

### Code Optimization
- Minified CSS and JavaScript
- Critical CSS inlining
- Optimized font loading
- Efficient DOM structure

### Caching Strategy
- Browser cache headers
- Static asset optimization
- CDN-ready structure
- Minimal HTTP requests

## Features

- **Lightning Fast**: Optimized for maximum speed
- **Performance Focused**: Built with speed in mind
- **SEO Optimized**: Search engine friendly structure
- **Modern Design**: Clean and contemporary appearance
- **Mobile First**: Responsive and touch-friendly
- **Schema Markup**: Rich snippets for search engines
- **Google Fonts**: Optimized font loading
- **CDN Ready**: Easy to deploy with CDN

## Customization

### Performance Settings
- Toggle features for optimal speed
- Configure image optimization settings
- Adjust loading priorities
- Set up caching headers

### Design Options
- Multiple color schemes
- Typography choices
- Layout variations
- Animation controls

## Troubleshooting

### Speed Issues
- Check Google PageSpeed Insights
- Verify image optimization is working
- Test with different content types
- Monitor Core Web Vitals

### Loading Problems
- Check browser console for errors
- Verify all assets are loading correctly
- Test with slow network connections
- Monitor resource loading order

## Support

For additional support with Bloggie theme:
- Check our performance optimization guides
- Browse speed improvement tutorials
- Contact our performance specialists`,
    slug: 'bloggie'
  },
  {
    id: 'icelog-docs',
    title: 'Icelog Documentation',
    description: 'Complete documentation for Icelog Ghost theme, bringing minimal and calm design to your content.',
    content: `## Icelog Theme Documentation

Icelog brings a sense of calm and focus to your content with its minimal design and soothing color palette. Ideal for personal blogs and thoughtful writing.

## Installation

1. Download the Icelog theme ZIP file
2. Log in to your Ghost admin panel
3. Navigate to Settings → Design → Change theme
4. Click "Upload theme" and select the icelog.zip file
5. Click Activate to make it live

## Minimal Design Philosophy

### Calming Color Palette
Icelog uses soothing colors:
- Soft, muted color schemes
- High contrast for readability
- Gentle accent colors
- Eye-friendly color combinations

### Clean Typography
- Readable font choices
- Generous white space
- Optimal line heights
- Comfortable reading experience

### Focused Layout
- Distraction-free design
- Minimal navigation elements
- Content-first approach
- Simple, intuitive structure

## Features

- **Minimal Design**: Clean and uncluttered interface
- **Calming Colors**: Soothing color palette
- **Focus on Readability**: Optimized for comfortable reading
- **Distraction-Free**: No unnecessary elements
- **Mobile Responsive**: Works beautifully on all devices
- **Easy Customization**: Simple customization options
- **Social Sharing**: Minimal sharing options
- **Search Functionality**: Built-in search capabilities

## Customization

### Color Options
- Multiple calming color schemes
- Custom accent colors
- Dark mode support with soothing colors
- High contrast accessibility options

### Typography Settings
- Reading-focused font choices
- Adjustable font sizes
- Line height optimization
- Comfortable text spacing

## Troubleshooting

### Readability Issues
- Check color contrast ratios
- Verify font loading
- Test with different screen sizes
- Ensure adequate white space

### Customization Problems
- Clear browser cache after changes
- Check CSS custom properties
- Test with different content types
- Verify responsive behavior

## Support

For additional support with Icelog theme:
- Browse our minimal design guides
- Check readability optimization tips
- Contact our design philosophy team`,
    slug: 'icelog'
  },
  {
    id: 'beguni-docs',
    title: 'Beguni Documentation',
    description: 'Complete documentation for Beguni Ghost theme, perfect for creative professionals and photographers.',
    content: `## Beguni Theme Documentation

Beguni is a bold and vibrant theme perfect for creative professionals, photographers, and artists who want their work to make a strong impression.

## Installation

1. Download the Beguni theme ZIP file
2. Log in to your Ghost admin panel
3. Navigate to Settings → Design → Change theme
4. Click "Upload theme" and select the beguni.zip file
5. Click Activate to make it live

## Creative Design Features

### Bold Color Schemes
Beguni stands out with vibrant colors:
- Rich, saturated color palettes
- Bold accent colors
- High-impact color combinations
- Custom color scheme options

### Photography Focus
- Gallery layouts for images
- Full-width image displays
- Image optimization for quality
- Multiple gallery styles

### Portfolio Capabilities
- Project showcase layouts
- Portfolio organization
- Work categorization
- Client presentation features

## Features

- **Bold Design**: Vibrant and eye-catching appearance
- **Photography Focused**: Optimized for visual content
- **Gallery Support**: Multiple gallery layouts
- **Portfolio Showcase**: Professional work presentation
- **High-Resolution Images**: Support for large images
- **Creative Typography**: Bold font choices
- **Social Media Integration**: Connect with creative platforms
- **Mobile Responsive**: Works beautifully on all devices

## Customization

### Color Customization
- Multiple vibrant color schemes
- Custom accent color options
- Gradient backgrounds
- Bold color combinations

### Gallery Options
- Different gallery layouts
- Image hover effects
- Lightbox functionality
- Image metadata display

## Troubleshooting

### Image Display Issues
- Check image file sizes and formats
- Verify gallery configuration
- Test with different image types
- Optimize images for web performance

### Color Problems
- Ensure color contrast meets accessibility standards
- Test color schemes on different devices
- Check CSS custom properties
- Verify color consistency across pages

## Support

For additional support with Beguni theme:
- Browse our photography guides
- Check gallery customization tutorials
- Contact our creative design specialists`,
    slug: 'beguni'
  },
  {
    id: 'acceler-docs',
    title: 'Acceler Documentation',
    description: 'Complete documentation for Acceler Ghost theme, combining Bootstrap with Ghost CMS.',
    content: `## Acceler Theme Documentation

Acceler combines the power of Bootstrap with Ghost CMS to create a flexible and customizable theme perfect for portfolios and business websites.

## Installation

1. Download the Acceler theme ZIP file
2. Log in to your Ghost admin panel
3. Navigate to Settings → Design → Change theme
4. Click "Upload theme" and select the acceler.zip file
5. Click Activate to make it live

## Bootstrap Integration

### Bootstrap Components
Acceler includes Bootstrap 5 components:
- Navigation bars and menus
- Cards and content containers
- Buttons and form elements
- Modal dialogs and alerts
- Carousel and slideshow features

### Grid System
- Responsive 12-column grid
- Flexible layout options
- Breakpoint-specific configurations
- Offset and alignment utilities

### Utility Classes
- Spacing utilities
- Color and background classes
- Display and positioning
- Flexbox utilities

## Features

- **Bootstrap 5 Framework**: Modern component library
- **Highly Customizable**: Easy to modify and extend
- **Portfolio Layouts**: Professional work presentation
- **Business Friendly**: Corporate design elements
- **Multiple Color Schemes**: Bootstrap color system
- **Component Based**: Modular structure
- **Cross-browser Compatible**: Works everywhere
- **SEO Optimized**: Search engine friendly

## Customization

### Bootstrap Customization
- Override Bootstrap variables
- Custom component styles
- Theme color customization
- Component configuration options

### Business Features
- Service showcase sections
- Team member displays
- Testimonial layouts
- Contact form integration

## Troubleshooting

### Bootstrap Issues
- Check Bootstrap CSS and JS loading
- Verify component initialization
- Test responsive breakpoints
- Check for CSS conflicts

### Customization Problems
- Ensure proper SCSS compilation
- Check Bootstrap variable overrides
- Test custom component styles
- Verify responsive behavior

## Support

For additional support with Acceler theme:
- Check Bootstrap documentation
- Browse our component guides
- Contact our Bootstrap specialists`,
    slug: 'acceler'
  },
  {
    id: 'asahi-docs',
    title: 'Asahi Documentation',
    description: 'Complete documentation for Asahi Ghost theme, built with Tailwind CSS for maximum performance.',
    content: `## Asahi Theme Documentation

Asahi is built with Tailwind CSS for maximum performance and customization. Perfect for modern magazines and publications that need speed and flexibility.

## Installation

1. Download the Asahi theme ZIP file
2. Log in to your Ghost admin panel
3. Navigate to Settings → Design → Change theme
4. Click "Upload theme" and select the asahi.zip file
5. Click Activate to make it live

## Tailwind CSS Integration

### Utility-First Approach
Asahi uses Tailwind's utility classes:
- Consistent design system
- Rapid development workflow
- Small CSS bundle size
- Easy customization

### Performance Benefits
- Purged CSS in production
- Minimal CSS overhead
- Optimized loading
- Fast rendering times

### Customization Options
- Tailwind configuration file
- Custom utility classes
- Component abstractions
- Design token system

## Features

- **Tailwind CSS**: Modern utility-first framework
- **Ultra-Fast Performance**: Optimized for speed
- **Highly Customizable**: Easy to modify
- **Modern Design**: Contemporary appearance
- **Mobile-First**: Responsive design principles
- **SEO Optimized**: Search engine friendly
- **Clean Code**: Well-structured and maintainable
- **Production Ready**: Battle-tested and reliable

## Customization

### Tailwind Configuration
- Custom color palettes
- Font family customization
- Spacing and sizing systems
- Breakpoint adjustments

### Design System
- Consistent design tokens
- Reusable component styles
- Custom utility combinations
- Theme variations

## Troubleshooting

### Tailwind Issues
- Check Tailwind CSS compilation
- Verify utility class usage
- Test responsive utilities
- Check CSS purging configuration

### Performance Problems
- Monitor CSS bundle size
- Check unused CSS removal
- Test loading performance
- Verify utility optimization

## Support

For additional support with Asahi theme:
- Check Tailwind CSS documentation
- Browse our utility class guides
- Contact our Tailwind specialists`,
    slug: 'asahi'
  }
];

const pages = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    slug: 'privacy',
    description: 'Your privacy is important to us. It is Ghost Theme\'s policy to respect your privacy regarding any information we may collect from you.',
    content: `<p>
      Your privacy is important to us. It is Ghost Theme's policy to respect your privacy regarding any
      information we may collect from you across our website, <a href="#">https://ghost-theme.com</a>, and
      other sites we own and operate.
    </p>

    <h2>1. Information We Collect</h2>
    <p>
      We only ask for personal information when we truly need it to provide a service to you. We collect it by
      fair
      and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how
      it
      will be used.
    </p>

    <h2>2. How We Use Information</h2>
    <p>
      We only retain collected information for as long as necessary to provide you with your requested
      service.
      What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as
      well as
      unauthorized access, disclosure, copying, use, or modification.
    </p>
    <ul>
      <li>To provide and maintain our Service</li>
      <li>To notify you about changes to our Service</li>
      <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
      <li>To provide customer support</li>
    </ul>

    <h2>3. Security</h2>
    <p>
      We don't share any personally identifying information publicly or with third-parties, except when
      required
      to by law.
    </p>
    <p>
      Our website may link to external sites that are not operated by us. Please be aware that we have no
      control over the content and practices of these sites, and cannot accept responsibility or liability for
      their respective privacy policies.
    </p>

    <h2>4. Changes to This Policy</h2>
    <p>
      We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
      Privacy Policy on this page.
    </p>
    <p>
      You are free to refuse our request for your personal information, with the understanding that we may be
      unable to provide you with some of your desired services.
    </p>
    <p>
      Your continued use of our website will be regarded as acceptance of our practices around privacy and
      personal information. If you have any questions about how we handle user data and personal information,
      feel free to contact us.
    </p>`,
    published: true
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    slug: 'terms',
    description: 'Terms and conditions for using Ghost Theme products and services.',
    content: `<h1>Terms of Service</h1>
    
    <p>Last updated: December 12, 2024</p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>
      By accessing and using Ghost Theme, you accept and agree to be bound by the terms and provision of this agreement.
    </p>
    
    <h2>2. Use License</h2>
    <p>
      Permission is granted to temporarily download one copy of the materials on Ghost Theme for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
    </p>
    
    <h2>3. Disclaimer</h2>
    <p>
      The materials on Ghost Theme are provided on an 'as is' basis. Ghost Theme makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
    </p>
    
    <h2>4. Limitations</h2>
    <p>
      In no event shall Ghost Theme or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ghost Theme.
    </p>
    
    <h2>5. Revisions and Errata</h2>
    <p>
      The materials appearing on Ghost Theme could include technical, typographical, or photographic errors. Ghost Theme does not warrant that any of the materials on its website are accurate, complete, or current.
    </p>
    
    <h2>6. Governing Law</h2>
    <p>
      These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
    </p>`,
    published: true
  },
  {
    id: 'about',
    title: 'About Us',
    slug: 'about',
    description: 'Learn more about Ghost Theme and our mission to create beautiful, functional themes for publishers.',
    content: `<h1>About Ghost Theme</h1>
    
    <p>
      Welcome to Ghost Theme, where we create beautiful, functional, and high-performance themes for the Ghost CMS platform. Our mission is to help publishers, bloggers, and content creators present their work in the most engaging way possible.
    </p>
    
    <h2>Our Story</h2>
    <p>
      Founded in 2020, Ghost Theme started as a small team of passionate developers and designers who saw the need for high-quality themes that combine aesthetics with performance. We believe that great content deserves great presentation.
    </p>
    
    <h2>What We Do</h2>
    <p>
      We specialize in creating premium Ghost themes that are:
    </p>
    <ul>
      <li><strong>Beautifully Designed</strong> - Modern, clean, and professional designs</li>
      <li><strong>Performance Optimized</strong> - Fast loading and Core Web Vitals compliant</li>
      <li><strong>Feature Rich</strong> - Packed with useful features for publishers</li>
      <li><strong>Easy to Customize</strong> - Flexible and customizable to match your brand</li>
      <li><strong>SEO Friendly</strong> - Built with best practices for search engine optimization</li>
    </ul>
    
    <h2>Our Values</h2>
    <p>
      Everything we do is guided by these core values:
    </p>
    <ul>
      <li><strong>Quality</strong> - We never compromise on quality</li>
      <li><strong>Performance</strong> - Speed and efficiency are paramount</li>
      <li><strong>Design</strong> - Beautiful, functional design matters</li>
      <li><strong>Support</strong> - We're here to help our customers succeed</li>
      <li><strong>Innovation</strong> - Always improving and pushing boundaries</li>
    </ul>
    
    <h2>Meet the Team</h2>
    <p>
      Our team consists of experienced developers, designers, and content strategists who are passionate about the web and committed to creating the best possible themes for our customers.
    </p>
    
    <h2>Contact Us</h2>
    <p>
      Have questions or feedback? We'd love to hear from you. Reach out to us at <a href="mailto:hello@ghost-theme.com">hello@ghost-theme.com</a>.
    </p>`,
    published: true
  },
  {
    id: 'contact',
    title: 'Contact Us',
    slug: 'contact',
    description: 'Get in touch with the Ghost Theme team for support, inquiries, or collaboration opportunities.',
    content: `<h1>Contact Us</h1>
    
    <p>
      We're here to help! Whether you have questions about our themes, need support, or want to discuss custom projects, don't hesitate to reach out.
    </p>
    
    <h2>Get in Touch</h2>
    <p>
      You can reach us through any of the following channels:
    </p>
    
    <h3>Email</h3>
    <p>
      <strong>General Inquiries:</strong> <a href="mailto:hello@ghost-theme.com">hello@ghost-theme.com</a><br>
      <strong>Support:</strong> <a href="mailto:support@ghost-theme.com">support@ghost-theme.com</a><br>
      <strong>Custom Projects:</strong> <a href="mailto:projects@ghost-theme.com">projects@ghost-theme.com</a>
    </p>
    
    <h3>Social Media</h3>
    <p>
      Follow us on social media for updates, tips, and news:
    </p>
    <ul>
      <li><strong>Twitter:</strong> <a href="https://twitter.com/ghosttheme">@ghosttheme</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/ghost-theme">ghost-theme</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/company/ghost-theme">Ghost Theme</a></li>
    </ul>
    
    <h2>Support</h2>
    <p>
      For theme support, please include:
    </p>
    <ul>
      <li>Your theme name and version</li>
      <li>Your Ghost CMS version</li>
      <li>A detailed description of the issue</li>
      <li>Any error messages you're seeing</li>
      <li>Screenshots if applicable</li>
    </ul>
    
    <h2>Business Hours</h2>
    <p>
      Our support team is available:
    </p>
    <ul>
      <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
      <li>Saturday - Sunday: Limited support</li>
    </ul>
    
    <p>
      We typically respond to inquiries within 24-48 hours during business days.
    </p>
    
    <h2>Office Location</h2>
    <p>
      Ghost Theme<br>
      123 Web Street<br>
      Tech City, TC 12345<br>
      United States
    </p>`,
    published: true
  },
  {
    id: 'faqs',
    title: 'Frequently Asked Questions',
    slug: 'faqs',
    description: 'Find answers to commonly asked questions about Ghost Theme products and services.',
    content: `<h1>Frequently Asked Questions</h1>
    
    <p>
      Welcome to our FAQ section. Here you'll find answers to common questions about our Ghost themes, licensing, support, and more.
    </p>
    
    <h2>General Questions</h2>
    
    <h3>What is Ghost CMS?</h3>
    <p>
      Ghost is a modern, open-source publishing platform built on Node.js. It's designed to be simple, fast, and focused on creating and publishing content. Ghost is perfect for bloggers, journalists, and publishers who want a powerful yet easy-to-use platform.
    </p>
    
    <h3>What are Ghost themes?</h3>
    <p>
      Ghost themes are templates that control how your Ghost site looks and functions. They determine the layout, design, and user experience of your publication. Our themes are professionally designed and optimized for performance and SEO.
    </p>
    
    <h2>Purchasing & Licensing</h2>
    
    <h3>How do I purchase a theme?</h3>
    <p>
      Simply browse our collection of themes, select the one you like, and click the purchase button. You'll be redirected to our secure checkout where you can complete your purchase using various payment methods.
    </p>
    
    <h3>What license do I get with my purchase?</h3>
    <p>
      Each theme purchase includes a single-site license. This allows you to use the theme on one Ghost installation. If you need to use the theme on multiple sites, please contact us for multi-site licensing options.
    </p>
    
    <h3>Can I use the theme on multiple sites?</h3>
    <p>
      The standard license is for single-site use only. If you need to use the theme on multiple sites, you'll need to purchase additional licenses or contact us for a multi-site license at a discounted rate.
    </p>
    
    <h2>Installation & Setup</h2>
    
    <h3>How do I install a Ghost theme?</h3>
    <p>
      Installing a Ghost theme is simple:
    </p>
    <ol>
      <li>Download the theme ZIP file after purchase</li>
      <li>Log in to your Ghost admin panel</li>
      <li>Navigate to Settings → Design → Change theme</li>
      <li>Click "Upload theme" and select the ZIP file</li>
      <li>Click Activate to make it live</li>
    </ol>
    
    <h3>Do I need coding skills to use these themes?</h3>
    <p>
      No! Our themes are designed to be user-friendly and work out of the box. However, if you want to customize the theme further, basic knowledge of HTML, CSS, and Handlebars (Ghost's templating language) would be helpful.
    </p>
    
    <h3>What version of Ghost do I need?</h3>
    <p>
      Our themes are compatible with Ghost 5.0 and above. We regularly update our themes to ensure compatibility with the latest Ghost releases.
    </p>
    
    <h2>Customization & Support</h2>
    
    <h3>Can I customize the theme?</h3>
    <p>
      Yes! All our themes are fully customizable. You can modify colors, fonts, layouts, and more. We provide documentation to help you with customization. For advanced customizations, you can also hire our team for custom development services.
    </p>
    
    <h3>Do you provide support?</h3>
    <p>
      Absolutely! We provide comprehensive support for all our themes. This includes:
    </p>
    <ul>
      <li>Documentation and setup guides</li>
      <li>Email support for technical issues</li>
      <li>Video tutorials</li>
      <li>Community forum</li>
    </ul>
    
    <h3>What if I find a bug or issue?</h3>
    <p>
      If you encounter any issues with our themes, please contact our support team with details about the problem. We'll work to resolve it as quickly as possible. Bug fixes and updates are provided free of charge.
    </p>
    
    <h2>Updates & Refunds</h2>
    
    <h3>Do I get free updates?</h3>
    <p>
      Yes! All theme purchases include free updates for the life of the theme. We regularly release updates to add new features, fix bugs, and ensure compatibility with the latest Ghost version.
    </p>
    
    <h3>What is your refund policy?</h3>
    <p>
      We offer a 14-day money-back guarantee on all theme purchases. If you're not satisfied with your purchase, contact us within 14 days for a full refund. No questions asked.
    </p>
    
    <h3>How do I receive updates?</h3>
    <p>
      When we release updates, you'll receive an email notification. You can download the latest version from your account dashboard or from the email link. Simply upload the new version to your Ghost site to update.
    </p>
    
    <h2>Still Have Questions?</h2>
    <p>
      Can't find the answer you're looking for? Don't hesitate to reach out to us:
    </p>
    <ul>
      <li><strong>Email:</strong> <a href="mailto:support@ghost-theme.com">support@ghost-theme.com</a></li>
      <li><strong>Twitter:</strong> <a href="https://twitter.com/ghosttheme">@ghosttheme</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/ghost-theme">ghost-theme</a></li>
    </ul>
    <p>
      We typically respond to inquiries within 24-48 hours during business days.
    </p>`,
    published: true
  }
];

async function main() {
  console.log('Start seeding...');
  
  // Seed themes
  for (const theme of themes) {
    const createdTheme = await prisma.theme.upsert({
      where: { id: theme.id },
      update: theme,
      create: theme,
    });
    console.log(`Upserted theme with id: ${createdTheme.id}`);
  }
  
  // Seed authors
  for (const author of authors) {
    const createdAuthor = await prisma.author.upsert({
      where: { id: author.id },
      update: author,
      create: author,
    });
    console.log(`Upserted author with id: ${createdAuthor.id}`);
  }
  
  // Seed tags
  for (const tag of tags) {
    const createdTag = await prisma.tag.upsert({
      where: { id: tag.id },
      update: tag,
      create: tag,
    });
    console.log(`Upserted tag with id: ${createdTag.id}`);
  }
  
  // Seed blog posts
  for (const post of blogPosts) {
    const createdPost = await prisma.blogPost.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
    console.log(`Upserted blog post with id: ${createdPost.id}`);
  }
  
  // Seed theme documentation
  for (const doc of themeDocumentation) {
    const createdDoc = await prisma.documentation.upsert({
      where: { id: doc.id },
      update: doc,
      create: doc,
    });
    console.log(`Upserted theme documentation with id: ${createdDoc.id}`);
  }
  
  // Seed pages
  for (const page of pages) {
    const createdPage = await prisma.page.upsert({
      where: { id: page.id },
      update: page,
      create: page,
    });
    console.log(`Upserted page with id: ${createdPage.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });