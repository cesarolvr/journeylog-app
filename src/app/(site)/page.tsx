"use client";

// Hooks
import { useUser } from "@/hooks/useUser";

// Components
import Landing from "@/components/Landing";
import App from "@/components/App";

const Home = () => {
  const { user } = useUser();

  const isAuthenticated = !!user;

  return <main className="dark text-foreground bg-background w-[100vw] h-[100vh]">{isAuthenticated ? <App user={user} /> : <Landing />}</main>;
};

export default Home;
