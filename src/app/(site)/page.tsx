"use client";

// Hooks
import {
  useSupabaseClient,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

// Components
import Landing from "@/components/Landing";
import { useEffect, useState } from "react";

const Home = () => {
  const [subscriptionInfo, setSubscriptionInfo] = useState({});
  const user = useSupaUser();
  const supabaseClient = useSupabaseClient();

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

  return <Landing user={user} subscriptionInfo={subscriptionInfo} />;
};

export default Home;
