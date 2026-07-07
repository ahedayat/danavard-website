import type { Metadata } from 'next';
import { Inter, Vazirmatn } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import ThemeLangSync from '@/components/providers/ThemeLangSync';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const vazirmatn = Vazirmatn({
  variable: '--font-vazirmatn',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Danavard — AI-First Software Engineering',
  description:
    'Danavard combines artificial intelligence, software engineering, automation, and product design to build intelligent solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`light ${inter.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ReactQueryProvider>
          <ThemeLangSync />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
