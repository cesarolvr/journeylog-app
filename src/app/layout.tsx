// Providers
import SupabaseProvider from "@/providers/SupabaseProvider";
import NextUIProvider from "@/providers/NextUIProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Bounce, ToastContainer } from "react-toastify";
import FacebookPixel from "@/components/Fbpixel";

import Script from "next/script";

import { Nunito_Sans } from "next/font/google";
const nunito = Nunito_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "900"],
  display: "swap",
  variable: "--font-nunito"
});

// Styles
import "./globals.scss";
import "./styles/overrides.scss";
import "./styles/editor.scss";
import "./styles/themes.scss";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      translate="no"
      className={`${nunito.variable} w-full h-full overflow-scroll dark`}
      suppressHydrationWarning
    >
      <head>
        <title>
          Journeylog | Transform Your Habits and Goals into a Consistent Journey
        </title>
        <meta
          name="description"
          content="Track your habits, goals, and daily routines effortlessly. Stay consistent, gain insights, and get reminders to keep you on track. Start your journey today!"
        />
        <meta name="google" content="notranslate" />
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
      </head>
      <body className="min-h-[100svh]">
        <SupabaseProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              {children}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
                className={`!w-[400px] cursor-pointer !max-w-[100%] px-4 left-auto right-auto md:right-0 top-8`}
                toastClassName={`${nunito.className} text-[18px] !w-full !rounded-[15px] overflow-hidden`}
              />
            </NextThemesProvider>
          </NextUIProvider>
        </SupabaseProvider>
        <FacebookPixel />
      </body>
      <GoogleAnalytics gaId="G-SPDYZC1QPJ" />
    </html>
  );
}
