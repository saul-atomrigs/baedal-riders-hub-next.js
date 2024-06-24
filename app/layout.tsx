import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';
import SessionProvider from '@/components/providers/SessionProvider';

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
      <body>
        <SessionProvider>
          <ThemeProvider attribute='class'>
            <ModalProvider />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
