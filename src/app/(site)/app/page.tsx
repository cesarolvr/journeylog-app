"use client";

// Hooks
import {
  useUser as useSupaUser,
  useSessionContext,
} from "@supabase/auth-helpers-react";

// Components
import Editor from "@/components/Editor";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const App = () => {
  const user = useSupaUser();
  const { session, isLoading } = useSessionContext();
  const accessToken = session?.access_token ?? null;
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  console.log(theme)

  const value = {
    accessToken,
    user,
    isLoading,
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.push("/");
    }
  }, [isLoading, user]);

  return (
    <main
      className={`w-[100vw] ${theme}`}
      suppressHydrationWarning={true}
    >
      {!!user && <Editor {...value} />}
    </main>
  );
};

export default App;
