'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavigationItem } from '@/types';

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation: NavigationItem[] = [
    { name: 'Themes', href: '/themes' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold font-serif text-xl tracking-tight">Ghost Theme</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                currentPath === item.href
                  ? 'text-brand-primary'
                  : 'text-slate-600 hover:text-brand-primary'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/all-access-pass"
            className="px-4 py-2 text-sm font-medium text-white bg-brand-dark rounded-full hover:bg-slate-800 transition-colors"
          >
            All Access Pass
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg px-4 py-8 flex flex-col gap-6">
          <nav className="flex flex-col gap-6 text-center">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium transition-colors ${
                  currentPath === item.href
                    ? 'text-brand-primary'
                    : 'text-slate-600 hover:text-brand-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/all-access-pass"
              className="px-4 py-3 text-lg font-medium text-white bg-brand-dark rounded-full hover:bg-slate-800 transition-colors inline-block w-full"
            >
              All Access Pass
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}