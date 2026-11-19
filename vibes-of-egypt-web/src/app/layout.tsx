import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Vibes of Egypt — Curated Luxury Travel & Private Tours',
  description: 'Experience Egypt your way with Vibes of Egypt. Bespoke private tours, luxury Nile Dahabiya cruises, desert safaris, and licensed Egyptologists.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 80px)' }}>
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
