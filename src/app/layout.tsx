// Providers
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import NextUIProvider from "@/providers/NextUIProvider";

// Styles
import "./globals.css";

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
          <UserProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
