'use client';

import React, { useEffect, useState, useMemo } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from markdown content using useMemo for performance
  const headings = useMemo(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const extractedHeadings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-'); // Replace spaces with hyphens

      extractedHeadings.push({
        id,
        text,
        level
      });
    }

    return extractedHeadings;
  }, [content]);


  useEffect(() => {
    if (headings.length === 0) return;

    // Add IDs to headings in the DOM
    const addIdsToHeadings = () => {
      const articleHeadings = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
      
      articleHeadings.forEach((heading, index) => {
        if (headings[index]) {
          heading.id = headings[index].id;
        }
      });
    };

    // Small delay to ensure DOM is rendered
    const timeoutId = setTimeout(addIdsToHeadings, 100);

    // Set up intersection observer for active heading tracking
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all headings after they have IDs
    const observerTimeoutId = setTimeout(() => {
      const headingsToObserve = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
      headingsToObserve.forEach((heading) => observer.observe(heading));
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(observerTimeoutId);
      observer.disconnect();
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`${className}`}>
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">On this page</h4>
      <ul className="flex flex-col gap-2 border-l-2 border-slate-100">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const paddingLeft = `${(heading.level - 1) * 1 + 1}rem`;
          
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block py-1 text-sm transition-all duration-200
                  ${isActive
                    ? 'text-brand-primary font-medium border-l-2 border-brand-primary -ml-0.5'
                    : 'text-slate-600 hover:text-brand-primary hover:border-l-2 hover:border-brand-primary hover:-ml-0.5'
                  }
                `}
                style={{ paddingLeft }}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}