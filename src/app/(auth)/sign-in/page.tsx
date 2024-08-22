"use client";

import { Auth } from "@supabase/auth-ui-react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/Link";

import { Reenie_Beanie } from "next/font/google";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

// Styles
import "./auth.css";
import { ChevronLeft } from "lucide-react";

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
      <Link className="fixed top-[30px] left-[30px] flex" href="/">
        <ChevronLeft />
        Home
      </Link>
      <div className="w-[320px] auth flex items-center">
        <h1 className={`text-white ${reenie.className} text-[60px] mb-5`}>
          Journeylog
        </h1>
        <Auth
          supabaseClient={supabaseClient}
          providers={["google"]}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email",
                email_input_placeholder: "johnvonneumann@gmail.com",
                button_label: "Continue",
                loading_button_label: "Signing in",
                password_label: "Password",
                password_input_placeholder: "••••••••••••",
                link_text: `DDon't have an account? <span>Sign Up<span>`,
              },
            },
          }}
          
          theme="default"
          appearance={{
            className: {
              anchor: "link",
              button: "button",
              container: "container",
              label: "label",
              message: "message",
              divider: "divider",
              input: "input",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
