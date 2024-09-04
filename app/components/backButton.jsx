"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/style/backButton.module.css";
import { ChevronDoubleLeftIcon as BackIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
  const router = useRouter();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
      <button className={styles.navBtn} onClick={goBack}>
        <BackIcon
          className={styles.navBack}
          alt="back icon"
          width={20}
          height={20}
        />
      </button>
  );
}
