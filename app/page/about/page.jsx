"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import Service from "@/public/assets/service.png";
import styles from "@/app/style/about.module.css";
import {
  ShieldCheckIcon as Medical,
  BanknotesIcon as MoneyIcon,
  CalendarDaysIcon as CalendarDay,
  ArchiveBoxXMarkIcon as CancelIcon,
} from "@heroicons/react/24/outline";

export default function About() {
  const scheduleData = [
    { day: "Monday", time: "9:00 AM - 12:00 PM" },
    { day: "Tuesday", time: "available" },
    { day: "Wednesday", time: "Not available" },
    { day: "Thursday", time: "9:00 AM - 12:00 PM" },
    { day: "Friday", time: "Not available" },
    { day: "Saturday", time: "Not available" },
  ];

  const termsData = [
    {
      icon: MoneyIcon,
      title: "Payment",
      about: [
        { point: "Payment is due upon receipt." },
        { point: "We accept cash, credit cards, and mobile payments." },
      ],
    },
    {
      icon: Medical,
      title: "Medical",
      about: [{ point: "We are not responsible for any medical issues." }],
    },
    {
      icon: CalendarDay,
      title: "Lateness",
      about: [
        { point: "Please arrive on time to ensure full service." },
        { point: "Late arrivals may result in reduced treatment time." },
      ],
    },
    {
      icon: CancelIcon,
      title: "Cancellation/no show",
      about: [
        { point: "Cancellations must be made 24 hours in advance." },
        { point: "No-shows will be charged 50% of the service cost." },
      ],
    },
  ];

  const rows = [];
  for (let i = 0; i < scheduleData.length; i += 2) {
    rows.push([scheduleData[i], scheduleData[i + 1]]);
  }

  return (
    <div className={styles.aboutMain}>
      <div className={styles.aboutWrap}>
        <div className={styles.aboutContent}>
          <h2>About us</h2>
          <h1>
            We are the leading salon agency around, specializing in nails, hair,
            and skincare
          </h1>
          <p>
            Our expert nail technicians offer a wide range of manicures and
            pedicures, while our skilled hairstylists provide chic cuts, vibrant
            coloring, and luxurious treatments. Our experienced aestheticians
            use premium products and advanced techniques to give your skin a
            radiant glow with refreshing facials and custom skincare regimens.
          </p>
          <p>
            Step into our salon for personalized services tailored to your
            unique style and preferences, and experience the ultimate in
            pampering and rejuvenation.
          </p>
        </div>
        <div className={styles.aboutImageContainer}>
        <Image
          src={Service}
          layout="fill"
          objectFit="contain"
          alt="Service"
          className={styles.aboutImage}
          priority={true}

        />
        <div className={styles.aboutLogoContainer}>
        <Image
          src={Logo}
          height={100}
          alt="logo"
          priority={true}

          className={styles.aboutLogo}
        />
        <h1>Thank you for choosing Jolies House Beauty</h1>
        </div>
      
        </div>
        <div className={styles.scheduleTable}>
          <h2>Our schedule</h2>

          <table>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="2">
                    <span>No schedule available</span>
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      {row[0] && (
                        <div className={styles.columnData}>
                          {row[0].day}
                          <span>({row[0].time})</span>
                        </div>
                      )}
                    </td>
                    <td>
                      {row[1] && (
                        <div className={styles.columnData}>
                          {row[1].day}
                          <span>({row[1].time})</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.aboutDown}>
        <h1>Terms and Conditions</h1>

        <div className={styles.cardWrapper}>
          {termsData.map((data, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardTop}>
                <data.icon height={20} className={styles.cardIcons} />
                <h2>{data.title}</h2>
              </div>
              <div className={styles.cardBottom}>
                {data.about.map((item, itemIndex) => (
                  <ul key={itemIndex}>
                    <li>{item.point}</li>
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.importantDetails}>
          <h1>Important information</h1>
        <div className={styles.importantContainer}>

          <div className={styles.content}>
            <p>
           <span>1.</span> Come with healthy bare nails or book a soack off which is $15, Failure results in cancellation
            </p>
            <p><span>2.</span> Refill must be the same color acrylic or gel</p>
          </div>
          <div className={styles.content}>
            <p>
              <span>3. </span>
              Book the service you want as that is what will be provided.
              Contact if you want any change or book an additional service
            </p>
            <p>
              <span>4.</span>
              Use correct phone number and email in order to recieve our address
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
