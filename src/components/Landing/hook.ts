import { useState } from "react";

const useLanding = ({ subscribeAction, router, unsubscribeAction, subscriptionInfo, supabaseClient }: any) => {
  const [formContent, setFormContent] = useState("");
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [buttonFormText, setButtonFormText] = useState("Send");
  const [isLoading, setIsLoading] = useState(false);
  const strings = [
    "journeys",
    "goals",
    "categories",
    "notes",
    `"folders"`,
    "records",
    "subjects",
    "objectives",
    "milestones",
    "plans",
    "schedules",
    "archives",
    "topics",
    "disciplines",
    "themes",
  ]

  // Handlers
  const handleChoosePlan = async (id: string, plan: string) => {
    const { subscription_key } = subscriptionInfo
    const isPro = plan === "habit_creator";
    if (isPro) {
      const url = await subscribeAction({ userId: id });

      if (url) {
        router.push(url);
      } else {
        console.error("Failed to create subscription");
      }
    } else {
      const res = await unsubscribeAction({ userId: id, subscriptionInfo });

      console.log(res);
    }
  };

  const handleSuggestionForm = (value: any) => {
    const max = 150;
    const currentLength = value?.length;
    if (currentLength <= max) {
      setFormContent(value);
    }
  };

  const submitForm = async () => {
    if (formContent && formContent?.length > 5) {
      setIsLoading(true);

      await supabaseClient.from("feedback").insert({
        content: formContent,
      });

      setIsLoading(false);
      setButtonFormText("Sent 👍🏾");
      setFormContent("");
    }
  };

  return {
    strings,
    state: {
      formContent,
      isWhatsapp, setIsWhatsapp,
      buttonFormText,
      isLoading
    },
    handlers: {
      submitForm,
      handleSuggestionForm,
      handleChoosePlan
    }
  };
};

export default useLanding;
