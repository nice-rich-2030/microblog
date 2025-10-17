import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-12">
      <Container>
        <div className="py-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} My Tech Blog. All rights reserved.</p>
          <p className="mt-2">
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline"
            >
              Next.js
            </a>
            ,{' '}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline"
            >
              Tailwind CSS
            </a>
            , and{' '}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline"
            >
              shadcn/ui
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
