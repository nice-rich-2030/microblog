import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'My Tech Blog',
    template: '%s | My Tech Blog',
  },
  description: 'A personal technical blog built with Next.js 15, featuring articles on web development, TypeScript, React, and more.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  keywords: ['blog', 'tech', 'web development', 'Next.js', 'TypeScript', 'React'],
  authors: [{ name: 'Tech Blogger' }],
  creator: 'Tech Blogger',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'My Tech Blog',
    description: 'A personal technical blog built with Next.js 15, featuring articles on web development, TypeScript, React, and more.',
    siteName: 'My Tech Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Tech Blog',
    description: 'A personal technical blog built with Next.js 15',
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
