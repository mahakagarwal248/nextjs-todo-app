"use client";
import { getCookies } from "@/utils";
import NavbarComp from "@/components/navbar";
import { useState, useEffect } from "react";

export default function Navbar(props) {
  const isLoggedIn = getCookies("auth");
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      setStatus("Logout");
    } else {
      setStatus("Login");
    }
  }, [status]);

  return (
    <>
      <NavbarComp status={status} setStatus={setStatus} />
    </>
  );
}
