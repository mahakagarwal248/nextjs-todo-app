import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className="title grid grid-flow-col gap-x-10 place-content-center">
        <Link href="/register" className={styles.button}>
          Register
        </Link>
        <Link href="/login" className={styles.button}>
          Login
        </Link>
      </div>
    </div>
  );
}
