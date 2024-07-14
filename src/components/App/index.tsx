import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const App = () => {
  const supabaseClient = useSupabaseClient();
  const handleCreateJourney = async (e: any) => {
    const { error } = await supabaseClient.from("journey").insert({
      name: "Testing",
      status: "IN PROGRESS",
      icon: "",
      type: "",
      isPublic: false,
      seasonality: 24,
    });

    console.log(error);
  };

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    supabaseClient.from("journey").select();
  }, []);
  return (
    <div className="w-full h-[93vh] flex items-center justify-center flex-col text-center relative overflow-hidden gap-6 pt-[500px]">
      <button onClick={handleCreateJourney}>create a journey</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
