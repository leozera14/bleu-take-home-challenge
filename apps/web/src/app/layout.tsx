import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/providers';
import Header from '@/components/header/header';

const rubik = Rubik({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bleu NFT Test',
  description: 'Technical test developed by Leonardo Faleiros!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(rubik.className, 'bg-background text-foreground px-2 md:px-5')}>
        <Providers>
          <div className='flex items-center py-6 w-full'>
            <Header />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
