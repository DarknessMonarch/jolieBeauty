import Image from "next/image";
import styles from "@/app/style/loading.module.css";

export default function Loading() {
  return <span className={styles.loader}></span>;
}
