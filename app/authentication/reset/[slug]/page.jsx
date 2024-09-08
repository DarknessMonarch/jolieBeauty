"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import Logo from "@/public/assets/logo.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loading";
import styles from "@/app/style/auth.module.css";
import {
  KeyIcon as PasswordIcon,
  EyeIcon as ShowPasswordIcon,
  EyeSlashIcon as HidePasswordIcon,
} from "@heroicons/react/24/outline";

export default function Reset({ params }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const router = useRouter();
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;
  

  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    router.push("login", { scroll: false });
  };

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("Password");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${SERVER_API}/auth/reset/${params.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Password reset successful. You can now log in.");
        router.push("/authentication/login", { scroll: false });
      } else {
        toast.error(result.error || "Password reset failed.");
      }
    } catch (error) {
      // console.error("Password reset error:", error);
      // console.log(params)
      toast.error("An error occurred while resetting your password.");
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
              <h1>Reset Password</h1>
              <p>Enter your new password</p>
            </div>
            <Image
              src={Logo}
              alt="logo"
              height={100}
              priority={true}
              className={styles.logo}
            />
          </div>
          {/* New Password */}
          <div className={styles.authInput}>
            <PasswordIcon className={styles.authIcon} alt="password icon" width={24} height={24} />
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              id="Password"
              placeholder="New Password"
              required
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={toggleShowPassword}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <ShowPasswordIcon className={styles.authIcon} width={24} height={24} /> : <HidePasswordIcon className={styles.authIcon} width={24} height={24} />}
            </button>
          </div>
          {/* Confirm Password */}
          <div className={styles.authInput}>
            <PasswordIcon className={styles.authIcon} alt="confirm password" width={24} height={24} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={toggleConfirmPassword}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? <ShowPasswordIcon className={styles.authIcon} width={24} height={24} /> : <HidePasswordIcon className={styles.authIcon} width={24} height={24} />}
            </button>
          </div>
          <button type="submit" disabled={isLoading} className={styles.formAuthButton}>
            {isLoading ? <Loader /> : "Reset"}
          </button>
          {/* Login */}
          <h3>
            Remember your password?{" "}
            <div className={styles.btnLoginContainer} onClick={handleLogin}>
              Login
            </div>
          </h3>
        </form>
      </div>
    </div>
  );
}
