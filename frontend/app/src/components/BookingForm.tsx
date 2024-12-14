"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";


export default function BookingForm() {
  const [formData, setFormData] = useState({
    doctor_name: "",
    service: "",
    date: "",
    start_time: "",
    end_time: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      console.log(formData)
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorData = await response.json();
        setErrors(
          errorData.errors || ["An error occurred while creating the booking"]
        );
      }
    } catch (error) {
      setErrors(["An error occurred while creating the booking"]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="doctor_name" className="block">
          Doctor Name
        </label>
        <input
          type="text"
          id="doctor_name"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleInputChange}
          required
          className="w-full border text-black bg-white p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="service" className="block">
          Service
        </label>
        <input
          type="text"
          id="service"
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          required
          className="w-full border text-black bg-white p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="date" className="block">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="w-full border text-black bg-white p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="start_time" className="block">
          Start Time
        </label>
        <input
          type="time"
          id="start_time"
          name="start_time"
          value={formData.start_time}
          onChange={handleInputChange}
          required
          className="w-full border text-black bg-white p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="end_time" className="block">
          End Time
        </label>
        <input
          type="time"
          id="end_time"
          name="end_time"
          value={formData.end_time}
          onChange={handleInputChange}
          required
          className="w-full border text-black bg-white p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Booking
      </button>
      {errors.length > 0 && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Errors:</strong>
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
