"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/app/components/navbar";
import Loading from "@/app/components/Loading";
import NotFoundImage from "@/public/icons/404.svg";
import BackButton from "@/app/components/backButton";
import styles from "@/app/style/notfound.module.css";

export default function NotFound() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkClick = () => {
    setIsLoading(true);
  };

  return (
    <div className={styles.notFound}>
      <Navbar />

      <Image
        className={styles.notFoundImg}
        src={NotFoundImage}
        height={240}
        alt="Not found image"
        priority
      />

      <Link
        href="/"
        className={styles.notFoundBtn}
        onClick={handleLinkClick}
      >
        {isLoading ? <Loading /> : "Return home >>"}
      </Link>
    </div>
  );
}
