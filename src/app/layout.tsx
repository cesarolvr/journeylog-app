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
    <html lang="en" className={`${nunito.className}`}>
      <title>Journeylog</title>
      <body>
        <SupabaseProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
