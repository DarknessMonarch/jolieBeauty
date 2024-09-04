"use client";

import About from "@/app/page/about/page";
import Navbar from "@/app/components/navbar";
import Category from "@/app/page/category/page";
import styles from "@/app/style/app.module.css";

export default function App() {
  return (
    <main className={styles.mainApp}>
      <Navbar />
      <About />
      <Category />
    </main>
  );
}
