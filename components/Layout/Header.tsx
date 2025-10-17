import Link from 'next/link';
import { Container } from './Container';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
            My Tech Blog
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/tags"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Tags
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Search
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </nav>
      </Container>
    </header>
  );
}
