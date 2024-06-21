import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ModalProvider } from '@/components/providers/ModalProvider';

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
        <ThemeProvider attribute='class'>
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
