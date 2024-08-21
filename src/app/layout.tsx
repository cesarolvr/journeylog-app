// Providers
import SupabaseProvider from "@/providers/SupabaseProvider";
import NextUIProvider from "@/providers/NextUIProvider";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({ subsets: ["latin"], weight: "400" });

// Styles
import "./globals.css";
import "./editor.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.className} bg-[#171717] min-h-[100svh]`}
    >
      <title>Journeylog</title>
      <meta name="theme-color" content="#171717"/>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <body className="min-h-[100svh]">
        <SupabaseProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
