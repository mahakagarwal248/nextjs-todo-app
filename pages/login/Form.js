"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookies } from "@/utils";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      email,
      password,
    };
    let res = await fetch(
      `http://localhost:3000/api/user?email=${email}&password=${password}`,
      {
        method: "GET",
      }
    );
    res = await res.json();
    if (res?.message === "Logged In Successfully!") {
      setCookies("auth", true, 36000, { secure: true });
      window.alert(res?.message);
      push("/");
    } else {
      window.alert(res?.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
