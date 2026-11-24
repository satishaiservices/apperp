import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';

export const metadata: Metadata = {
  title: 'VYHIR CivilERP — Operations Control Center',
  description: 'Enterprise Civil Construction ERP & Linear Telemetry Control Center',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFC]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
