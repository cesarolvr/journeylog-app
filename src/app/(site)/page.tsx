"use client";

// Hooks
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
} from "@supabase/auth-helpers-react";

// Components
import Landing from "@/components/Landing";
import App from "@/components/App";

const Home = () => {
  const user = useSupaUser();
  const { session, isLoading } = useSessionContext();
  const accessToken = session?.access_token ?? null;

  const value = {
    accessToken,
    user,
    isLoading,
  };

  return (
    <main className="dark text-foreground bg-background w-[100vw] h-[100vh]">
      {!!user ? <App {...value} /> : <Landing />}
    </main>
  );
};

export default Home;
