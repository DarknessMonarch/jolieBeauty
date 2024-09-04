"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BackButton from "@/app/components/backButton";
import Image from "next/image";
import styles from "@/app/style/appointment.module.css";

export default function AppointmentPage({ params }) {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;
  const categorySlug = params.slug.replace("%20", " ");

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

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.category === categorySlug
  );

  const handleCategoryClick = (category) => {
    router.push(`/page/booking/${category}`);
  };

  if (loading) return <><loading/></>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.appointmentMain}>
      <div className={styles.appointmentHeader}>
        <BackButton />
        <h1>Choose an appointment</h1>
      </div>
      <h2>{categorySlug}</h2>
      <div className={styles.appointmentContainer}>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((data, index) => (
            <div className={styles.appointment} key={index}>
              <Image
                src={data.categoryImage}
                height={200}
                width={200}
                alt={data.category}
                priority="true"
                className={styles.appointmentImg}
              />
              <h1>{data.description}</h1>
              <p>{data.categoryTime}</p>
              <button
                className={styles.appointmentBtn}
                onClick={() => handleCategoryClick(data._id)}
              >
                Choose
              </button>
            </div>
          ))
        ) : (
          <p>No appointments available for this category.</p>
        )}
      </div>
    </div>
  );
}
