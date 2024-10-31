// Providers
import SupabaseProvider from "@/providers/SupabaseProvider";
import NextUIProvider from "@/providers/NextUIProvider";
import { Nunito_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "900"] });

// Styles
import "./globals.scss";
import "./editor.scss";
import Script from "next/script";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.className} w-full h-full overflow-scroll dark`}
    >
      <title>Journeylog</title>
      <meta name="theme-color" content="#171717" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <Script
        src="https://app.termly.io/resource-blocker/e75a858e-67fd-4b97-aace-63f842fce17c?autoBlock=on"
        type="text/javascript"
      />
      <body className="min-h-[100svh]">
        <SupabaseProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              {children}
            </NextThemesProvider>
          </NextUIProvider>
        </SupabaseProvider>
      </body>
      <GoogleTagManager gtmId={process.env.GA_ID} />
    </html>
  );
}
