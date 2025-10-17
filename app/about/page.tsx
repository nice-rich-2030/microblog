import { Metadata } from 'next';
import { Container } from '@/components/Layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Twitter, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'このブログについて、プロフィール、お問い合わせ情報',
  openGraph: {
    title: 'About - My Tech Blog',
    description: 'このブログについて、プロフィール、お問い合わせ情報',
  },
};

export default function AboutPage() {
  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* ページタイトル */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">About</h1>
          <p className="text-lg text-muted-foreground">
            このブログについて
          </p>
        </div>

        {/* プロフィール */}
        <Card>
          <CardHeader>
            <CardTitle>プロフィール</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Web開発者として、主にフロントエンド技術を中心に学習と実践を行っています。
              このブログでは、日々の学びや技術的な発見、プロジェクトでの経験などを記録しています。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Next.js、React、TypeScript などのモダンな Web 技術に興味があり、
              より良いユーザー体験を提供するためのフロントエンド開発に取り組んでいます。
            </p>
          </CardContent>
        </Card>

        {/* このブログについて */}
        <Card>
          <CardHeader>
            <CardTitle>このブログについて</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              このブログは Next.js 15 の App Router を使用して構築されています。
              Markdown ファイルからコンテンツを生成し、シンタックスハイライトや
              レスポンシブデザインを実装しています。
            </p>
            <div className="pt-2">
              <h3 className="font-semibold mb-2">主な技術スタック</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Next.js 15 (App Router)</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>shadcn/ui</li>
                <li>Markdown (gray-matter, remark, rehype)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* お問い合わせ */}
        <Card>
          <CardHeader>
            <CardTitle>お問い合わせ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                ご質問やご意見がありましたら、以下のリンクからお気軽にご連絡ください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://twitter.com/yourtwitterhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
