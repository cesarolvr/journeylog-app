"use client";

// Hooks
import { useUser as useSupaUser } from "@supabase/auth-helpers-react";

// Components
import Landing from "@/components/Landing";
import { useEffect } from "react";

const Home = () => {
  const user = useSupaUser();

  // useEffect(() => {
  //   if (!!user) {
  //     router.push("/app");
  //   }
  // }, [user]);

  return <Landing user={user} />;
};

export default Home;
