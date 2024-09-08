"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import { usePathname } from "next/navigation";
import styles from "@/app/style/sidenav.module.css";
import { UserIcon, FolderIcon } from "@heroicons/react/24/solid";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className={styles.sidenav}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logoNav}
          src={Logo}
          alt="Logo image"
          width={50}
          height={50}
          priority={true}
        />
      </div>

      <div className={styles.LinkContainer}>
        <Link
          href="/dashboard"
          className={`${styles.sideNavLinkContainer} ${
            pathname === "/dashboard" ? styles.activesideNav : ""
          }`}
        >
          <UserIcon
            height={24}
            width={24}
            alt="User icon"
            className={styles.sideNavIcon}
          />
          <h1>Users</h1>
        </Link>
        <Link
          href="/dashboard/add"
          className={`${styles.sideNavLinkContainer} ${
            pathname === "/dashboard/add" ? styles.activesideNav : ""
          }`}
        >
          <FolderIcon
            height={24}
            width={24}
            alt="add icon"
            className={styles.sideNavIcon}
          />
          <h1>Add Details</h1>
        </Link>


        
      </div>
    
    </div>
  );
}
