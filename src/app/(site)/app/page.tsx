"use client";

// Hooks
import {
  useUser as useSupaUser,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

// Components
import Editor from "@/components/Editor";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import ProfileModal from "@/components/ProfileModal";
import { useDisclosure } from "@nextui-org/react";
import { debounce } from "lodash";
import { subscribeAction, unsubscribeAction } from "@/services/stripe";
import AnimatedLoader from "@/components/AnimatedLoader";

const App = () => {
  const user = useSupaUser();
  const supabaseClient = useSupabaseClient();
  const { session, isLoading } = useSessionContext();
  const accessToken = session?.access_token ?? null;
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [subscriptionInfo, setSubscriptionInfo] = useState({});
  const [defaultPanel, setDefaultPanel] = useState("profile");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (!!user) {
      const retrieveSubscriptionInfo = async () => {
        const { data, error } = await supabaseClient
          .from("users")
          .select()
          .eq("id", user?.id);

        if (data) {
          setSubscriptionInfo(data[0]);
        }
      };

      retrieveSubscriptionInfo();
    }
  }, [user]);

  const value = {
    accessToken,
    user,
    subscriptionInfo,
    isLoading,
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.push("/");
    }
  }, [isLoading, user]);

  const handleLogout = debounce(async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return console.log(error);
    }

    router.push("/");
  }, 500);

  const { subscription, subscription_key }: any = subscriptionInfo;
  const isPro = subscription === "habit_creator";

  const handleChoosePlan = async (id: string, plan: string) => {
    const isPro = plan === "habit_creator";
    if (isPro) {
      const url = await subscribeAction({ userId: id });

      if (url) {
        router.push(url);
      } else {
        console.error("Failed to create subscription");
      }
    } else {
      await unsubscribeAction({ userId: id, subscription_key });
    }
  };

  return (
    <main className={`w-[100vw] ${theme}`} suppressHydrationWarning={true}>
      <AnimatedLoader/>
      <ProfileModal
        isOpen={isOpen}
        defaultPanel={defaultPanel}
        isPro={isPro}
        onOpenChange={onOpenChange}
        userInfo={user?.user_metadata}
        handleLogout={handleLogout}
        user={user}
        handleChoosePlan={handleChoosePlan}
        subscriptionInfo={subscriptionInfo}
      />
      {!!user && (
        <Editor
          {...value}
          handleLogout={handleLogout}
          setDefaultPanel={setDefaultPanel}
          isOpen={isOpen}
          onOpen={onOpen}
          setTheme={setTheme}
          onOpenChange={onOpenChange}
        />
      )}
    </main>
  );
};

export default App;
