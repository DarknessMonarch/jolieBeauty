"use client";

import Image from "next/image";
import Loader from "@/app/components/Loading";
import styles from "@/app/style/addForm.module.css";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import {
  CameraIcon,
  CalendarIcon,
  PlusIcon as AddIcon,
  ClockIcon as TimeIcon,
  TagIcon as CategoryIcon,
  TrashIcon as RemoveIcon,
  BookmarkIcon as AddsonIcon,
} from "@heroicons/react/24/solid";

export default function Add() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryImage: null,
    category: "",
    description: "",
    categoryTime: "",
    addsOn: [{ title: "", time: "" }],
    availableDate: [""],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);

  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const ImageInput = ({ onChange, imagePreview }) => {
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
      fileInputRef.current.click();
    };

    return (
      <div
        className={`${styles.formChangeUpload} ${
          imagePreview === null ? styles.dottenImage : ""
        }`}
        onClick={handleIconClick}
      >
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <div className={styles.adsSection}>
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Uploaded Image"
              className={styles.idImage}
              layout="fill"
              quality={100}
              objectFit="cover"
              priority={true}

            />
          ) : (
            <CameraIcon className={styles.CameraIcon} width={30} height={30} />
          )}
        </div>
      </div>
    );
  };

  const handleChange = (e, index, field, subfield) => {
    if (subfield) {
      const updatedAddsOn = [...formData.addsOn];
      updatedAddsOn[index][subfield] = e.target.value;
      setFormData({
        ...formData,
        addsOn: updatedAddsOn.filter((addOn) => addOn.title || addOn.time),
      });
    } else if (field === "availableDate") {
      const updatedDates = [...formData.availableDate];
      updatedDates[index] = e.target.value;
      setFormData({
        ...formData,
        availableDate: updatedDates.filter((date) => date),
      });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, categoryImage: file });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAddOn = () => {
    if (formData.addsOn.length > 0) {
      const lastAddOn = formData.addsOn[formData.addsOn.length - 1];
      if (lastAddOn.title && lastAddOn.time) {
        setFormData({
          ...formData,
          addsOn: [...formData.addsOn, { title: "", time: "" }],
        });
      } else {
        toast.warning("No empty fields are allowed");
      }
    } else {
      setFormData({
        ...formData,
        addsOn: [{ title: "", time: "" }],
      });
    }
  };

  const removeAddOn = (index) => {
    setFormData({
      ...formData,
      addsOn: formData.addsOn.filter((_, i) => i !== index),
    });
  };

  const addAvailableDate = () => {
    if (formData.availableDate.length > 0) {
      const lastDate =
        formData.availableDate[formData.availableDate.length - 1];
      if (lastDate) {
        setFormData({
          ...formData,
          availableDate: [...formData.availableDate, ""],
        });
      } else {
        toast.warning("No empty fields are allowed");
      }
    } else {
      setFormData({
        ...formData,
        availableDate: [""],
      });
    }
  };

  const removeAvailableDate = (index) => {
    setFormData({
      ...formData,
      availableDate: formData.availableDate.filter((_, i) => i !== index),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const formDataToSend = new FormData();
        formDataToSend.append("categoryImage", formData.categoryImage);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("categoryTime", formData.categoryTime);

        const validAddsOn = formData.addsOn.filter(addOn => addOn.title && addOn.time);
        formDataToSend.append("addsOn", JSON.stringify(validAddsOn));

        // Convert availableDate to valid ISO date strings
        const validAvailableDates = formData.availableDate.map(dateStr => {
            const date = new Date(dateStr);
            return isNaN(date.getTime()) ? null : date.toISOString();
        }).filter(date => date);

        formDataToSend.append("availableDate", JSON.stringify(validAvailableDates));

        const response = await fetch(`${SERVER_API}/appointment/create`, {
            method: "POST",
            body: formDataToSend,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        toast.success("Form submitted successfully");
        setFormData({
            categoryImage: null,
            category: "",
            description: "",
            categoryTime: "",
            addsOn: [{ title: "", time: "" }],
            availableDate: [""],
        });
        setImagePreview(null);
    } catch (error) {
        console.error("Form submission error:", error);
        toast.error("Failed to submit form");
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div className={styles.formWrapper}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <ImageInput onChange={handleImageUpload} imagePreview={imagePreview} />
        <div className={styles.inputContainer}>
          <label>Category</label>
          <div className={styles.inputWithIcon}>
            <input
              type="text"
              required
              placeholder="Basic set"
              value={formData.category}
              onChange={(e) => handleChange(e, null, "category")}
            />
            <CategoryIcon height={20} className={styles.icon} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>Description</label>
          <div className={styles.inputWithIcon}>
            <input
              type="text"
              required
              placeholder="Short Full Set with Claw's Outlet"
              value={formData.description}
              onChange={(e) => handleChange(e, null, "description")}
            />
            <CategoryIcon height={20} className={styles.icon} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>Category Time</label>
          <div className={styles.inputWithIcon}>
            <input
              type="text"
              required
              value={formData.categoryTime}
              placeholder="2 hours @ $70.00"
              onChange={(e) => handleChange(e, null, "categoryTime")}
            />
            <TimeIcon height={20} className={styles.icon} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.addOnsList}>
            <label>Add-Ons</label>
            {formData.addsOn.map((addOn, index) =>
              addOn.title || addOn.time ? (
                <div key={index} className={styles.addOnItem}>
                  <div className={styles.addOnItemContainer}>
                    <AddsonIcon height={20} className={styles.addonIcon} />
                    <span>{addOn.title}</span>
                    <span>{addOn.time}</span>
                  </div>
                  <RemoveIcon
                    onClick={() => removeAddOn(index)}
                    height={20}
                    className={styles.addonIcon}
                  />
                </div>
              ) : null
            )}
          </div>
          <div className={styles.addOnInputContainer}>
            <div className={styles.addOnInput}>
              <input
                type="text"
                placeholder="Acrylic bbl"
                value={formData.addsOn[formData.addsOn.length - 1]?.title || ""}
                onChange={(e) =>
                  handleChange(e, formData.addsOn.length - 1, "addsOn", "title")
                }
              />
              <input
                type="text"
                placeholder="45 minutes @ $35.00"
                value={formData.addsOn[formData.addsOn.length - 1]?.time || ""}
                onChange={(e) =>
                  handleChange(e, formData.addsOn.length - 1, "addsOn", "time")
                }
              />
            </div>
            <button
              type="button"
              className={styles.addButton}
              onClick={addAddOn}
            >
              <AddIcon height={30} width={30} className={styles.addBtnIcon} />
            </button>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.addOnsList}>
            <label>Available Dates</label>
            {formData.availableDate.map((date, index) =>
              date ? (
                <div key={index} className={styles.addOnItem}>
                  <div className={styles.addOnItemContainer}>
                    <CalendarIcon height={20} className={styles.addonIcon} />
                    <span>{date}</span>
                  </div>
                  <RemoveIcon
                    height={20}
                    onClick={() => removeAvailableDate(index)}
                    className={styles.addonIcon}
                  />
                </div>
              ) : null
            )}
          </div>
          <div className={styles.inputWithIcon}>
            <input
              type="date"
              required
              onChange={(e) =>
                handleChange(
                  e,
                  formData.availableDate.length - 1,
                  "availableDate"
                )
              }
            />
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={addAvailableDate}
          >
            <AddIcon height={30} width={30} className={styles.addBtnIcon} />
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
