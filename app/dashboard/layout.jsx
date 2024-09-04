"use client";

import { useRouter } from "next/navigation";
import SideNav from "@/app/components/sideNav";
import { HomeIcon } from "@heroicons/react/24/solid";
import styles from "@/app/style/dashboardLayout.module.css";

export default function PageLayout({ children }) {
  const router = useRouter();
  const home = () => {
    router.push("/", { scroll: false });
  };

  return (
    <div className={styles.dashLayout}>
      <SideNav />
      <div className={styles.footerContainer} onClick={() => home()}>
        <HomeIcon
          height={24}
          width={24}
          alt="home icon"
          className={styles.sideHomeIcon}
        />
      </div>
      <div className={styles.dashContentLayout}>{children}</div>
    </div>
  );
}
