import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import '../globals.css'

const locales = ['de', 'en'];

export const metadata: Metadata = {
  title: 'SauberNow - Vertrauensvolle Reinigungskräfte in Salzburg',
  description: 'Buchen Sie verifizierte lokale Reinigungskräfte mit transparenter Preisgestaltung in Salzburg und Umgebung.',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}