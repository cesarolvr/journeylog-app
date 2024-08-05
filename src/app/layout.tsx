// Providers
import SupabaseProvider from "@/providers/SupabaseProvider";
import NextUIProvider from "@/providers/NextUIProvider";

// Styles
import "./globals.css";
import "./editor.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Journeylog</title>
      <body>
        <SupabaseProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
