import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { AuthProvider } from '@/contexts/AuthContext';
import '../globals.css'

const locales = ['de', 'en'];

export const metadata: Metadata = {
  title: 'SauberNow - Vertrauensvolle Reinigungskräfte in Salzburg',
  description: 'Buchen Sie verifizierte lokale Reinigungskräfte mit transparenter Preisgestaltung in Salzburg und Umgebung.',
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2563eb',
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}