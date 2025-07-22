import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['de', 'en'];

export default getRequestConfig(async ({locale}) => {
  if (!locale || !locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../src/locales/${locale}.json`)).default
  };
});