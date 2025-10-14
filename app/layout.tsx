import './globals.css';
import type { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Nat & Ya Solutions',
  description: 'You have some projects, we have Solutions!',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
