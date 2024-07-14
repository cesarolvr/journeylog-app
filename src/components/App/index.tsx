"use client";

import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

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
    // supabaseClient.from("journey").select();
  }, []);

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit underline">ACME</p>
      </NavbarBrand>
      <NavbarContent className="" justify="center">
        <NavbarItem>
          <Button onClick={handleCreateJourney} color="primary">
            create a journey
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="">
          <Button onClick={handleLogout}>Logout</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default App;
