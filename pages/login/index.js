import Link from "next/link";
import Form from "./Form";
import styles from "./styles.module.css";
import "../../app/globals.css";
import Navbar from "../Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles["form-container"]}>
          <Form />
        </div>
        <button className={styles.backBtn}>
          <Link href="/">Back to home</Link>
        </button>
      </div>
    </>
  );
}
