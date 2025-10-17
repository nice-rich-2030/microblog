'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/tags', label: 'Tags' },
  { href: '/search', label: 'Search' },
  { href: '/about', label: 'About' },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-foreground hover:text-primary transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed top-[57px] right-0 bottom-0 w-64 bg-background border-l z-50 shadow-lg">
            <nav className="flex flex-col p-6 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
