"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import styles from "@/app/style/dashboard.module.css";
import {
  ArchiveBoxIcon as BookingIcon,
  UserIcon,
  CalendarIcon,
  BookmarkIcon,
  ClockIcon as TimeIcon,
  TrashIcon as DeleteIcon,
  EnvelopeIcon as EmailIcon,
  QueueListIcon as AppointmentsIcon,
} from "@heroicons/react/24/solid";
export default function DashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("appointments");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;
  const [token, setToken] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${SERVER_API}/appointment`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${SERVER_API}/auth/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${SERVER_API}/booking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchAppointments();
    fetchBookings();
    fetchUsers();
  }, [SERVER_API]);

  const handleDelete = async (id, category) => {
    try {
      const response = await fetch(`${SERVER_API}/${category}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error(`Failed to delete `);
        return;
      }

      if (category === "appointments") {
        setAppointments((prev) => prev.filter((item) => item._id !== id));
      } else if (category === "users") {
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } else if (category === "bookings") {
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
      }
      toast.success(`Successfully deleted ${category}`);
      fetchAppointments();
      fetchBookings();
      fetchUsers();
    } catch (error) {
      console.error(`Error deleting ${category}:`, error);
      setError(error.message);
    }
  };

  const renderContent = () => {
    switch (selectedCategory) {
      case "appointments":
        return appointments.map((appointment) => (
          <div key={appointment._id} className={styles.cardItem}>
            <Image
              src={appointment.categoryImage}
              height={250}
              width={300}
              alt={appointment.category}
              priority={true}
              className={styles.categoryImage}
            />
            <button
              className={styles.bookingBtnDelete}
              onClick={() => handleDelete(appointment._id, "appointment")}
            >
              <DeleteIcon
                height={16}
                width={16}
                className={styles.buttonDeleteIcon}
              />
            </button>
            <div className={styles.bookingSide}>
              <div className={styles.bookingTopHeader}>
                <h1>{appointment.category}</h1>
                <p>{appointment.categoryTime}</p>
                <p>{appointment.description}</p>
              </div>
              <div className={styles.bookingBottom}>
                {appointment.addsOn.map((data, index) => (
                  <div className={styles.bookingList} key={index}>
                    <div className={styles.listBoostItem}>
                      <BookmarkIcon
                        className={styles.listIcon}
                        height={24}
                        width={24}
                      />

                      <p>{data.title}</p>
                    </div>
                    <div className={styles.listBoostItem}>
                      <TimeIcon
                        className={styles.listIcon}
                        height={24}
                        width={24}
                      />
                      <p>${data.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ));
      case "users":
        return users.map((user) => (
          <div key={user._id} className={styles.cardUserItem}>
            <div className={styles.cardEmail}>
              <EmailIcon height={16} width={16} className={styles.emailIcon} />
              <h1>{user.email.split("@")[0]}</h1>
            </div>
            <button
              onClick={() => handleDelete(user._id, "auth")}
              className={styles.userBtnDelete}
            >
              <DeleteIcon
                height={16}
                width={16}
                className={styles.buttonDeleteIcon}
              />
            </button>
          </div>
        ));
      case "bookings":
        return bookings.map((booking) => (
          <div key={booking._id} className={styles.cardItemBooking}>
            <div className={styles.userContainer}>
              <div className={styles.userEmailContainer}>
                <EmailIcon
                  height={24}
                  width={24}
                  className={styles.emailuserIcon}
                />
              </div>
              <h1>{booking.email}</h1>
            </div>
            <div className={styles.cardItemLine}>
              <h1>{booking.category}</h1>
              <p>{booking.categoryTime}</p>
              <p>{booking.description}</p>
              {booking.addsOn.map((data, index) => (
                <div className={styles.cardItemP} key={index}>
                  <h6>Title: {data.title}</h6>
                  <h6>Time: {data.time}</h6>
                </div>
              ))}
              <button
                className={styles.cardItemBookingBtn}
                onClick={() => handleDelete(booking._id, "booking")}
              >
                <DeleteIcon
                  height={14}
                  width={14}
                  className={styles.buttonCaredDeleteIcon}
                />
              </button>
            </div>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashBoardContainer}>
      <div className={styles.dashTop}>
        <div
          className={`${styles.card} ${
            selectedCategory === "appointments" ? styles.active : ""
          }`}
          onClick={() => setSelectedCategory("appointments")}
        >
          <div className={styles.circlecard}>
            <AppointmentsIcon
              height={20}
              width={20}
              className={styles.cardIcons}
            />
            <h2>{appointments.length}</h2>
          </div>

          <h1>Appointments</h1>
        </div>
        <div
          className={`${styles.card} ${
            selectedCategory === "users" ? styles.active : ""
          }`}
          onClick={() => setSelectedCategory("users")}
        >
          <div className={styles.circlecard}>
            <UserIcon height={20} width={20} className={styles.cardIcons} />
            <h2>{users.length}</h2>
          </div>

          <h1>Users</h1>
        </div>
        <div
          className={`${styles.card} ${
            selectedCategory === "bookings" ? styles.active : ""
          }`}
          onClick={() => setSelectedCategory("bookings")}
        >
          <div className={styles.circlecard}>
            <BookingIcon height={20} width={20} className={styles.cardIcons} />
            <h2>{bookings.length}</h2>
          </div>

          <h1>Bookings</h1>
        </div>
      </div>
      <div className={styles.dashBoardContent}>
        {loading ? <p>Loading...</p> : renderContent()}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
