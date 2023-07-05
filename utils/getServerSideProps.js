import React from "react";
import { nextLocalStorage } from ".";
import { NextResponse, NextRequest } from "next/server";

import Navbar from "../components/navbar/page";

export async function getServerSideProps(context) {
  const { req, res } = context;
  console.log("============", req);
  // Fetch client-side data here
  //   const clientData = await fetchData(); // Replace with your data fetching logic
  const authCookieValue = await middleware(req);
  const clientData = nextLocalStorage().getItem("Profile");
  return {
    props: {
      authCookieValue,
      clientData,
    },
  };
}

function NavComp(props) {
  return (
    <div>
      <Navbar data={props} />
    </div>
  );
}
export function middleware(request) {
  // Get a cookie
  request.cookies.get("auth")?.value;

  //   // Get all cookies
  //   request.cookies.getAll();

  //   // To change a cookie, first create a response
  //   const response = NextResponse.next();

  //   // Set a cookie
  //   response.cookies.set("myCookieName", "some-value");

  // Setting a cookie with additional options
  //   response.cookies.set({
  //     name: "myCookieName",
  //     value: "some-value",
  //     httpOnly: true,
  //   });

  // Delete a cookie
  //   response.cookies.delete("myCookieName");

  return response;
}

export default NavComp;
