"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import Logo from "@/public/icons/logo.svg";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loading";
import styles from "@/app/style/auth.module.css";
import { EnvelopeIcon as EmailIcon } from "@heroicons/react/24/outline";

export default function Forgot() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

  const Login = () => {
    router.push("login", { scroll: false });
  };

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const email = e.currentTarget.Email.value;

    try {
      const response = await fetch(`${SERVER_API}/auth/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Check your email for a reset link.");
      } else {
        toast.error(result.error || "Failed to send reset link.");
      }
    } catch (error) {
      // console.error(error);
      toast.error("An error occurred while requesting the reset link.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.authComponent}>
      <div className={styles.authWrapper}>
        <form onSubmit={onSubmit} className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.authDetails}>
              <h1>Forgot Password</h1>
              <p>Enter your email to receive a password reset link.</p>
            </div>
            <Image
              src={Logo}
              alt="logo"
              width={60}
              height={60}
              className={styles.logo}
            />
          </div>
          {/* Email */}
          <div className={styles.authInput}>
            <EmailIcon
              className={styles.authIcon}
              alt="Email icon"
              width={20}
              height={20}
            />
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="Email"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.formAuthButton}
          >
            {isLoading ? <Loader /> : "Get Link"}
          </button>
          <h3>
            Remember your password?{" "}
            <div className={styles.btnLoginContainer} onClick={Login}>
              Login
            </div>
          </h3>
        </form>
      </div>
    </div>
  );
}
