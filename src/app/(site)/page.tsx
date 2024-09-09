"use client";

// Hooks
import { useUser as useSupaUser } from "@supabase/auth-helpers-react";

// Components
import Landing from "@/components/Landing";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const user = useSupaUser();
  const router = useRouter();

  useEffect(() => {
    if (!!user) {
      router.push("/app");
    }
  }, [user]);

  return <Landing />;
};

export default Home;
