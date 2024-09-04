"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import Logo from "@/public/icons/logo.svg";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loading";
import styles from "@/app/style/auth.module.css";

import {
  KeyIcon as PasswordIcon,
  UserIcon as UserNameIcon,
  EyeIcon as ShowPasswordIcon,
  EyeSlashIcon as HidePasswordIcon,
} from "@heroicons/react/24/outline";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  const router = useRouter();
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

  const handleTermsChange = (event) => {
    setTerms(event.target.checked);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const policy = () => {
    router.push("/page/policy", { scroll: false });
  };

  const readTerms = () => {
    router.push("/page/terms", { scroll: false });
  };

  const SignUp = () => {
    router.push("signup", { scroll: false });
  };

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(`${SERVER_API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        toast.success("Welcome back!");

        // Redirect to the dashboard or home page
        if (data.isAdmin) {
          router.push("/dashboard", { scroll: false });
          localStorage.setItem("admin", data.isAdmin.toString());
        
        } else {
          router.push("/", { scroll: false });
        }
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
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
              <h1>Login</h1>
              <p>Enter your account details</p>
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
            <UserNameIcon
              className={styles.authIcon}
              alt="Email icon"
              width={20}
              height={20}
            />
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="Email"
              required
            />
          </div>
          {/* Password */}
          <div className={styles.authInput}>
            <PasswordIcon
              className={styles.authIcon}
              alt="password icon"
              width={20}
              height={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <ShowPasswordIcon
                  className={styles.authIcon}
                  width={20}
                  height={20}
                />
              ) : (
                <HidePasswordIcon
                  className={styles.authIcon}
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>
          <div className={styles.termsContainer}>
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              required
              onChange={handleTermsChange}
            />
            <label htmlFor="terms">Accept terms and conditions</label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.formAuthButton}
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
          <h3>
            Don’t have an account?{" "}
            <div className={styles.btnLoginContainer} onClick={SignUp}>
              Sign up
            </div>
          </h3>
        </form>
      </div>
    </div>
  );
}
