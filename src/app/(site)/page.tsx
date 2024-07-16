"use client";

// Hooks
import { useUser } from "@/hooks/useUser";

// Components
import Landing from "@/components/Landing";
import App from "@/components/App";

const Home = () => {
  const { user } = useUser();

  const isAuthenticated = !!user;

  return <main className="dark text-foreground bg-background">{isAuthenticated ? <App user={user} /> : <Landing />}</main>;
};

export default Home;
