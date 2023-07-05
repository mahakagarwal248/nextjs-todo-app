"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [securityQues, setSecurityQues] = useState("");
  const [securityAns, setSecurityAns] = useState("");

  const { push } = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !mobile || !securityQues || !securityAns) {
      window.alert("Please fill all details!");
    } else {
      const obj = {
        name,
        email,
        password,
        mobile,
        securityQues,
        securityAns,
      };
      let res = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        body: JSON.stringify(obj),
      });
      res = await res.json();
      window.alert(res.message);
      push("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Mobile Number:
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Security Question:
        <select
          value={securityQues}
          onChange={(e) => setSecurityQues(e.target.value)}
        >
          <option value="" hidden>
            select
          </option>
          <option value="What is the name of street you live in?">
            What is the name of street you live in?
          </option>
          <option value="What is your favourite color?">
            What is your favourite color?
          </option>
        </select>
      </label>
      <label>
        Security Answer:
        <input
          type="text"
          value={securityAns}
          onChange={(e) => setSecurityAns(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
