"use client";

import Image from "next/image";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import styles from "@/app/style/book.module.css";
import BackButton from "@/app/components/backButton";
import {
  BookmarkIcon,
  PlusIcon as AddIcon,
  MinusIcon as RemoveIcon,
} from "@heroicons/react/24/solid";

export default function BookingPage({ params }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [extra, setExtra] = useState([]);
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;
  const categoryID = params.slug;

  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    setUser(storedUser);

    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${SERVER_API}/appointment/single/${categoryID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();

        const transformDate = (dateStr) => {
          const date = new Date(dateStr);
          return date.toLocaleDateString("en-GB");
        };

        const transformedAppointments = (
          Array.isArray(data) ? data : [data]
        ).map((appointment) => ({
          ...appointment,
          availableDate: appointment.availableDate.map(transformDate),
        }));

        setAppointments(transformedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [SERVER_API, categoryID]);

  const username = user ? user.split("@")[0] : "";

  const onDateChange = (newDate) => {
    const formattedDate = newDate.toLocaleDateString("en-GB");
    if (appointments[0]?.availableDate.includes(formattedDate)) {
      setSelectedDate(formattedDate);
    } else {
      setSelectedDate(null); // Reset the date if it's not available
    }
  };

  const toggleExtra = (adds) => {
    setExtra((prevExtra) => {
      if (prevExtra.includes(adds)) {
        return prevExtra.filter((item) => item !== adds);
      } else {
        return [...prevExtra, adds];
      }
    });
  };

  const tileDisabled = ({ date, view }) => {
    const formattedDate = date.toLocaleDateString("en-GB");
    return (
      view === "month" &&
      !appointments[0]?.availableDate.includes(formattedDate)
    );
  };

  const bookAppointment = async () => {
    if (!selectedDate) {
      toast.error("Please choose a date to book.");
      return;
    }
  
    if (extra.length === 0) {
      toast.error("Please select at least one add-on.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const formattedDate = new Date(selectedDate.split("/").reverse().join("-"))
        .toISOString()
        .split("T")[0];
  
      const bookingData = {
        category: appointments[0]?.category,
        description: appointments[0]?.description,
        categoryTime: appointments[0]?.categoryTime,
        addsOn: extra.map((item) => {
          const parts = item.split(" ");
          const title = parts[0];
          const time = parts.length > 1 ? parts.slice(1).join(" ") : "";
          return { title, time };
        }),
        dateBooked: formattedDate, 
        email: user,
      };
  
      const response = await fetch(`${SERVER_API}/booking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.error}`);
      }
  
      toast.success("Appointment booked successfully!");
      window.open("https://cash.app/$JoelieNdorleh", "_blank");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.bookingMain}>
      <div className={styles.bookingHeader}>
        <BackButton />
        <h1>Booking</h1>
      </div>
      <h2>Date and time</h2>
      {appointments.length > 0 ? (
        appointments.map((booking, index) => (
          <div className={styles.bookingWrapper} key={index}>
            <div className={styles.bookingContainer}>
              <div className={styles.bookingTop}>
                <div className={styles.bookingTopHeader}>
                  <h1>{booking.category}</h1>
                  <p>{booking.categoryTime}</p>
                  <p>{booking.description}</p>
                </div>

                <Image
                  src={booking.categoryImage}
                  height={300}
                  width={400}
                  alt={booking.category}
                  priority={true}
                  className={styles.bookingImg}
                />
              </div>
              <div className={styles.bookingBottom}>
                {extra.map((data, index) => (
                  <ul key={index}>
                    <BookmarkIcon
                      className={styles.listIcon}
                      height={30}
                      width={30}
                    />
                    <li>{data}</li>
                  </ul>
                ))}
              </div>
            </div>

            <h1>Add-ons</h1>
            <div className={styles.addsOnContainer}>
              {booking.addsOn.map((adds, index) => (
                <div className={styles.addsOn} key={index}>
                  <button
                    className={`${styles.addsOnButton} ${
                      extra.includes(`${adds.title} ${adds.time}`)
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => toggleExtra(`${adds.title} ${adds.time}`)}
                  >
                    {extra.includes(`${adds.title} ${adds.time}`) ? (
                      <RemoveIcon
                        className={styles.iconExtra}
                        height={24}
                        width={24}
                      />
                    ) : (
                      <AddIcon
                        className={styles.iconExtra}
                        height={24}
                        width={24}
                      />
                    )}
                  </button>
                  <div className={styles.addPie}>
                    <h2>{adds.title}</h2>
                    <p>{adds.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <h1>Select a Date</h1>
            <div className={styles.availableContainer}>
              <div className={styles.calenderContainer}>
                <Calendar
                  onChange={onDateChange}
                  value={
                    selectedDate
                      ? new Date(selectedDate.split("/").reverse().join("-"))
                      : null
                  }
                  tileDisabled={tileDisabled}
                  className={styles.calendar}
                  tileClassName={({ date }) =>
                    booking.availableDate.includes(
                      date.toLocaleDateString("en-GB")
                    )
                      ? styles.availableDate
                      : null
                  }
                />
                <button
                  onClick={bookAppointment}
                  className={styles.applyButton}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No appointments available for this category.</p>
      )}
    </div>
  );
}
