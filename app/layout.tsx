import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Baedal Riders Hub',
  description: 'The Hub for Baedal Riders in Korea',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider attribute='class'>
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
