"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookies } from "@/utils";

export default function NavbarComp({ status, setStatus }) {
  const { push } = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    if (status === "Logout") {
      deleteCookies("auth");
      window.alert("Logged out successfully!");
      setStatus("Login");
      push("/");
    } else {
      push("/login");
    }
  };
  return (
    <div className="flex px-5 py-5">
      <h2>
        <Link href="/">My Logo</Link>
      </h2>
      <div className="ml-auto">
        {status === "Logout" ? (
          <>
            <Link href="/about" className="mr-8">
              About
            </Link>
          </>
        ) : (
          <></>
        )}
        <button type="button" onClick={handleClick}>
          {status}
        </button>
      </div>
    </div>
  );
}
