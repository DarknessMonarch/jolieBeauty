"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/app/style/category.module.css";

export default function CategoryPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${SERVER_API}/appointment`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [SERVER_API]);

  const goToCatgory = (category) => {
    router.push(`page/category/${category}`);
  };

  return (
    <div className={styles.categoryMain}>
      <h1>Select Category</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.categoryContainer}>
        {appointments.map((data, index) => (
          <div className={styles.category} key={index}>
            <h1>{data.category}</h1>
            <button
              className={styles.categoryBtn}
              onClick={() => goToCatgory(data.category)}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
