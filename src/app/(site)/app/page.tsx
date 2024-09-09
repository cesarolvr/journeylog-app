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

const App = () => {
  const user = useSupaUser();
  const { session, isLoading } = useSessionContext();
  const accessToken = session?.access_token ?? null;
  const router = useRouter()

  const value = {
    accessToken,
    user,
    isLoading,
  };

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, []);

  return (
    <main
      className="dark text-foreground w-[100vw]"
      suppressHydrationWarning={true}
    >
      {!!user && <Editor {...value} />}
    </main>
  );
};

export default App;
