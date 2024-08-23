"use client";

import { Auth } from "@supabase/auth-ui-react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LOGO from "../../../icons/logo.svg";

import { Reenie_Beanie } from "next/font/google";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

// Styles
import "./auth.scss";
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
      <div className="w-[300px] max-w-[80%] auth flex items-center">
        <h1 className={`text-white ${reenie.className} text-[45px] md:text-[60px] mb-2 md:mb-3 flex`}>
          Journeylog
          <Image src={LOGO} alt="" className="mt-[-30px] md:mt-[-40px] w-[30px] md:w-[60px] ml-3" />
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
                link_text: "Already have an account? Sign In",
                social_provider_text: "Or try with Google",
              },
              sign_up: {
                email_label: "New email",
                email_input_placeholder: "aaronswartz@gmail.com",
                button_label: "Create an account",
                loading_button_label: "Signing in",
                password_label: "Create an password",
                password_input_placeholder: "••••••••••••",
                link_text: "Already have an account? Sign In",
                social_provider_text: "Or try with Google",
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
