"use client";

import Image from "next/image";
import Logo from "@/public/icons/logo.svg";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/app/style/navbar.module.css";
import {
  UserIcon,
  ArrowLeftEndOnRectangleIcon as LogoutIcon,
  RectangleStackIcon as DashboardIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("email");
    const storedAdmin = localStorage.getItem("admin") === "true";

    setToken(storedToken);
    setUser(storedUser);
    setAdmin(storedAdmin);
  }, []);

  const username = user ? user.split("@")[0] : "";

  const login = () => {
    router.push("/authentication/login", { scroll: false });
  };

  const home = () => {
    router.push("/", { scroll: false });
  };

  const dashboard = () => {
    router.push("/dashboard", { scroll: false });
  };

  const logout = () => {
    toast.success("Logout successful");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("admin"); 
    setToken(null);
    setUser(null);
    setAdmin(false); 
  };

  return (
    <>
      <div className={styles.navbarMain}>
        <div className={styles.navLogo}>
          <Image
            src={Logo}
            alt="logo"
            width={50}
            height={50}
            priority={true}
            onClick={() => home()}
            className={styles.logo}
          />
        </div>
        <div className={styles.btnContainer}>
          {token === null ? (
            <button className={styles.navBtn} onClick={() => login()}>
              Login
            </button>
          ) : (
            <div className={styles.navProfile}>
              <UserIcon height={24} width={24} className={styles.userIcon} />
              <h1>{username}</h1>
              <h1>{admin}</h1>

              <LogoutIcon
                onClick={() => logout()}
                height={24}
                width={24}
                className={styles.logoutIcon}
              />
              
              {admin ? (
                <DashboardIcon
                  onClick={() => dashboard()}
                  height={24}
                  width={24}
                  className={styles.dashIcon}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
