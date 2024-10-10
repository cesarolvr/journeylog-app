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

const App = () => {
  const user = useSupaUser();
  const supabaseClient = useSupabaseClient();
  const { session, isLoading } = useSessionContext();
  const accessToken = session?.access_token ?? null;
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [subscriptionInfo, setSubscriptionInfo] = useState({});
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

  const { subscription }: any = subscriptionInfo;
  const isPro = subscription === "habit_creator";

  return (
    <main className={`w-[100vw] ${theme}`} suppressHydrationWarning={true}>
      <ProfileModal
        isOpen={isOpen}
        isPro={isPro}
        onOpenChange={onOpenChange}
        userInfo={user?.user_metadata}
      />
      {!!user && (
        <Editor
          {...value}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </main>
  );
};

export default App;
