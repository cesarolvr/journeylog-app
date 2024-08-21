"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Reenie_Beanie } from "next/font/google";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

// Styles
import "./auth.css";

const SignIn = () => {
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="p-8 flex justify-center items-center w-[100svw] h-[100svh] bg-[#171717]">
      <div className="max-w-[300px] auth">
        <h1 className={`text-white ${reenie.className} text-[60px]`}>Journeylog</h1>
        <Auth
          supabaseClient={supabaseClient}
          providers={["google"]}
          // magicLink={true}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#0D121F",
                },
              },
            },
          }}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default SignIn;
