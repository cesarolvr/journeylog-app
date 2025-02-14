import { useState } from "react";

const useLanding = () => {
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

  return {
    strings,
    state: {
      formContent, setFormContent,
      isWhatsapp, setIsWhatsapp,
      buttonFormText, setButtonFormText,
      isLoading, setIsLoading
    }
  };
};

export default useLanding;
