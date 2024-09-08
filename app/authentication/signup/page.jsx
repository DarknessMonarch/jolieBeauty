"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Logo from "@/public/assets/logo.png";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loading";
import styles from "@/app/style/auth.module.css";

import {
  KeyIcon as PasswordIcon,
  UserIcon as UserNameIcon,
  EnvelopeIcon as EmailIcon,
  EyeIcon as ShowPasswordIcon,
  EyeSlashIcon as HidePasswordIcon,
} from "@heroicons/react/24/outline";

export default function SignUp() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  const router = useRouter();
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;


  const handleTermsChange = (event) => {
    setTerms(event.target.checked);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const forgotPassword = () => {
    router.push("forgot", { scroll: false });
  };

  const Login = () => {
    router.push("login", { scroll: false });
  };

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("Email");
    const password = formData.get("Password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${SERVER_API}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", email);

        toast.success("Account created successfully!");

        if (result.isAdmin) {
          router.push("/dashboard", { scroll: false });
        } else {
          router.push("/", { scroll: false });
        }
      } else {
        toast.error(result.error || "Signup failed");
      }
    } catch (error) {
      // console.error(error);
      toast.error("An error occurred during signup");
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
              <h1>Sign up</h1>
              <p>Welcome</p>
            </div>
            <Image
              src={Logo}
              alt="logo"
              height={100}
              priority={true}
              className={styles.logo}
            />
          </div>
          {/* Email */}
          <div className={styles.authInput}>
            <EmailIcon className={styles.authIcon} width={24} height={24} />
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="Email"
              required
            />
          </div>
          {/* Password */}
          <div className={styles.authInput}>
            <PasswordIcon className={styles.authIcon} width={24} height={24} />
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              id="Password"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={toggleShowPassword}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <ShowPasswordIcon
                  className={styles.authIcon}
                  width={24}
                  height={24}
                />
              ) : (
                <HidePasswordIcon
                  className={styles.authIcon}
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className={styles.authInput}>
            <PasswordIcon className={styles.authIcon} width={24} height={24} />
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
              {showConfirmPassword ? (
                <ShowPasswordIcon
                  className={styles.authIcon}
                  width={24}
                  height={24}
                />
              ) : (
                <HidePasswordIcon
                  className={styles.authIcon}
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>

          {/* Terms and Forgot Password */}
          <div className={styles.formChange}>
            <div className={styles.termsContainer}>
              <input
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={handleTermsChange}
                required
              />
              <label htmlFor="terms">Accept terms and conditions</label>
            </div>
            <span onClick={forgotPassword}>Forgot Password</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={styles.formAuthButton}
          >
            {isLoading ? <Loader /> : "Sign up"}
          </button>

          {/* Login */}
          <h3>
            Already have an account?{" "}
            <div className={styles.btnLoginContainer} onClick={Login}>
              Login
            </div>
          </h3>
        </form>
      </div>
    </div>
  );
}
