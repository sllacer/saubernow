import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/", "/(de|en)/:path*"],
};
