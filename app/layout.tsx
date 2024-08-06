import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import {
  AuthProvider,
  QueryProvider,
  ModalProvider,
  ThemeProvider,
} from '@/components/providers';

export const metadata: Metadata = {
  title: 'Baedal Riders Hub',
  description: 'The Hub for Baedal Riders in Korea',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider attribute='class'>
              <ModalProvider />
              {children}
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
