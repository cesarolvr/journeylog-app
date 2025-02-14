import { useState } from "react";
import { useTheme } from "next-themes";

const useArtboardOptions = () => {
  const when = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
  ];

  const whatTime = [
    { key: "0-key", label: "12 AM" },
    { key: "1-key", label: "1 AM" },
    { key: "2-key", label: "2 AM" },
    { key: "3-key", label: "3 AM" },
    { key: "4-key", label: "4 AM" },
    { key: "5-key", label: "5 AM" },
    { key: "6-key", label: "6 AM" },
    { key: "7-key", label: "7 AM" },
    { key: "8-key", label: "8 AM" },
    { key: "9-key", label: "9 AM" },
    { key: "10-key", label: "10 AM" },
    { key: "11-key", label: "11 AM" },
    { key: "12-key", label: "12 PM" },
    { key: "13-key", label: "01 PM" },
    { key: "14-key", label: "02 PM" },
    { key: "15-key", label: "03 PM" },
    { key: "16-key", label: "04 PM" },
    { key: "17-key", label: "05 PM" },
    { key: "18-key", label: "06 PM" },
    { key: "19-key", label: "07 PM" },
    { key: "20-key", label: "08 PM" },
    { key: "21-key", label: "09 PM" },
    { key: "22-key", label: "10 PM" },
    { key: "23-key", label: "11 PM" },
  ];
  const where = [
    { key: "email", label: "Email" },
    { key: "whatsapp", label: "Whatsapp" },
    { key: "sms", label: "SMS" },
  ];

  const [fontSelected, setFontSelected]: any = useState("default");
  const { theme, setTheme } = useTheme();

  return {
    when,
    whatTime,
    where,
    fontSelected,
    setFontSelected,
    theme,
    setTheme,
  };
};

export default useArtboardOptions;
