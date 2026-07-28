"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axiosInstance";

const CATEGORIES = [
  "Restaurants & Cafes",
  "Electricians & Plumbers",
  "Doctors & Clinics",
  "Home Repair",
  "Grocery & Daily Needs",
  "Salons & Spas",
  "Real Estate",
  "Education & Tutors",
  "Automotive",
  "Fitness & Gyms",
  "Event Planners",
  "Legal & Finance",
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type FormState = {
  title: string;
  category: string;
  city: string;
  phone: string;
  whatsapp: string;
  description: string;
  address: string;
  pin: string;
  rating: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
  title: "",
  category: "",
  city: "",
  phone: "",
  whatsapp: "",
  description: "",
  address: "",
  pin: "",
  rating: "0",
};

export default function ListBusinessPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>, slot: 1 | 2) {
    const file = e.target.files?.[0] || null;

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setImageError("Images must be JPG, PNG, or WEBP.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Each image must be under 5MB.");
        return;
      }
    }

    setImageError("");
    if (slot === 1) setImage1(file);
    else setImage2(file);
  }

  function validate(): boolean {
    const next: FormErrors = {};

    if (!form.title.trim()) next.title = "Business name is required.";
    else if (form.title.trim().length < 3)
      next.title = "Business name must be at least 3 characters.";

    if (!form.category) next.category = "Please select a category.";

    if (!form.city.trim()) next.city = "City is required.";

    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      next.phone = "Enter a valid 10-digit Indian mobile number.";

    if (form.whatsapp.trim() && !/^[6-9]\d{9}$/.test(form.whatsapp.trim()))
      next.whatsapp = "Enter a valid 10-digit WhatsApp number.";

    if (!form.description.trim()) next.description = "Description is required.";
    else if (form.description.trim().length < 20)
      next.description = "Description must be at least 20 characters.";

    if (!form.address.trim()) next.address = "Address is required.";

    if (!form.pin) next.pin = "A PIN is required to secure your listing.";
    else if (!/^\d{4,6}$/.test(form.pin)) next.pin = "PIN must be 4-6 digits.";

    const ratingNum = Number(form.rating);
    if (form.rating === "" || Number.isNaN(ratingNum))
      next.rating = "Rating is required.";
    else if (ratingNum < 0 || ratingNum > 5)
      next.rating = "Rating must be between 0 and 5.";

    setErrors(next);

    let imagesOk = true;
    if (!image1 || !image2) {
      setImageError("Both business images are required.");
      imagesOk = false;
    }

    return Object.keys(next).length === 0 && imagesOk;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("category", form.category);
      formData.append("city", form.city.trim());
      formData.append("phone", form.phone.trim());
      formData.append("whatsapp", form.whatsapp.trim());
      formData.append("description", form.description.trim());
      formData.append("address", form.address.trim());
      formData.append("pin", form.pin);
      formData.append("rating", form.rating);
      if (image1) formData.append("images", image1);
      if (image2) formData.append("images", image2);

      // Axios automatically sets 'multipart/form-data' header with correct boundary when passing FormData
      const response = await axiosInstance.post("/api/business/new", formData);
      console.log(response)
      setStatus({
        type: "success",
        message:
          response.data?.message ||
          "Your business has been listed successfully.",
      });
      setForm(INITIAL_STATE);
      setImage1(null);
      setImage2(null);
    } catch (err) {
      let errorMessage = "Could not submit your listing. Please try again.";

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-paper px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-tez-orange uppercase mb-4">
          For Business
        </p>
        <h1 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight text-ink">
          List your business on TezDial.
        </h1>
        <p className="mt-4 text-ink/60 max-w-lg">
          Fill in the details below. Your listing goes live after a quick
          verification — usually within a few hours.
        </p>

        {status && (
          <div
            className={`mt-8 rounded-xl px-5 py-4 text-sm font-medium ${
              status.type === "success"
                ? "bg-tez-forest/10 text-tez-forest"
                : "bg-tez-orange/10 text-tez-orange-dim"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
          <Field label="Business Name" error={errors.title}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Sharma Electricals"
              className={inputClass(!!errors.title)}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Category" error={errors.category}>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass(!!errors.category)}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="City" error={errors.city}>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Chandrapur"
                className={inputClass(!!errors.city)}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Phone Number" error={errors.phone}>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                inputMode="numeric"
                maxLength={10}
                className={inputClass(!!errors.phone)}
              />
            </Field>

            <Field label="WhatsApp Number" error={errors.whatsapp} optional>
              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="If different from phone"
                inputMode="numeric"
                maxLength={10}
                className={inputClass(!!errors.whatsapp)}
              />
            </Field>
          </div>

          <Field label="Description" error={errors.description}>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What does your business offer? (min 20 characters)"
              rows={4}
              className={inputClass(!!errors.description)}
            />
          </Field>

          <Field label="Address" error={errors.address}>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Full business address"
              className={inputClass(!!errors.address)}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field
              label="Security PIN"
              error={errors.pin}
              hint="4-6 digits, used to manage your listing later"
            >
              <input
                name="pin"
                type="password"
                value={form.pin}
                onChange={handleChange}
                placeholder="••••"
                inputMode="numeric"
                maxLength={6}
                className={inputClass(!!errors.pin)}
              />
            </Field>

            <Field label="Starting Rating" error={errors.rating}>
              <input
                name="rating"
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={handleChange}
                className={inputClass(!!errors.rating)}
              />
            </Field>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Business Photos{" "}
              <span className="text-ink/40 font-normal">
                (2 required, max 5MB each)
              </span>
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              <ImageInput
                label="Photo 1"
                file={image1}
                onChange={(e) => handleImageChange(e, 1)}
              />
              <ImageInput
                label="Photo 2"
                file={image2}
                onChange={(e) => handleImageChange(e, 2)}
              />
            </div>
            {imageError && (
              <p className="mt-2 text-xs text-tez-orange-dim">{imageError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink text-paper px-8 py-4 rounded-full font-semibold text-sm hover:bg-tez-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "List My Business"}
          </button>
        </form>
      </div>
    </main>
  );
}

function inputClass(hasError: boolean) {
  return `w-full bg-mist/40 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none border transition-colors ${
    hasError ? "border-tez-orange" : "border-transparent focus:border-ink/20"
  }`;
}

function Field({
  label,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-2">
        {label}{" "}
        {optional && (
          <span className="text-ink/40 font-normal">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink/40">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-tez-orange-dim">{error}</p>}
    </div>
  );
}

function ImageInput({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="relative flex flex-col items-center justify-center gap-2 bg-mist/40 border border-dashed border-ink/20 rounded-xl px-4 py-6 cursor-pointer hover:border-tez-orange transition-colors text-center">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <span className="text-xs font-mono text-ink/50">
        {file ? file.name : `Upload ${label}`}
      </span>
    </label>
  );
}
