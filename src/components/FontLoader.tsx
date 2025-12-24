'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Force font loading with high priority
    const loadFont = (fontUrl: string, fontFamily: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontUrl;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);

      // Create a font face to ensure it's loaded
      const font = new FontFace(fontFamily, `url(${fontUrl})`);
      font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        console.log(`Font ${fontFamily} loaded successfully`);
      }).catch((error) => {
        console.warn(`Failed to load font ${fontFamily}:`, error);
      });

      return link;
    };

    console.log('Loading fonts...');
    const csLink = loadFont('/fonts/cs.woff2', 'CS');
    const asvLink = loadFont('/fonts/asv.woff2', 'ASV');

    // Force a repaint to ensure fonts are applied
    setTimeout(() => {
      document.body.style.fontFamily = 'CS, Inter, sans-serif';
      console.log('Font family applied to body');
    }, 100);

    return () => {
      // Cleanup if needed
      if (document.head.contains(csLink)) {
        document.head.removeChild(csLink);
      }
      if (document.head.contains(asvLink)) {
        document.head.removeChild(asvLink);
      }
    };
  }, []);

  return null;
}