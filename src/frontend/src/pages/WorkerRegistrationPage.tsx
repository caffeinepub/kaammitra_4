import { ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

interface WorkerRegProps {
  navigate: (page: Page) => void;
}

const categories = [
  "Plumber",
  "Doctor",
  "Teacher",
  "Electrician",
  "Carpenter",
  "Driver",
  "Chef",
  "Painter",
];
const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Pune",
  "Hyderabad",
  "Ahmedabad",
  "Kolkata",
];

export default function WorkerRegistrationPage({ navigate }: WorkerRegProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    location: "",
    experience: "",
    priceHourly: "",
    priceDaily: "",
    priceMonthly: "",
    skills: "",
    bio: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.category) e.category = "Select a category";
    if (!form.location) e.location = "Select your location";
    if (!form.experience || Number(form.experience) < 0)
      e.experience = "Enter years of experience";
    if (!form.priceHourly || Number(form.priceHourly) <= 0)
      e.priceHourly = "Enter hourly price";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const set =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: "" }));
    };

  if (submitted) {
    return (
      <div className="bg-[#F5F8FF] min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-[#E5E7EB] max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#2F6FDB]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F2F57] mb-3">
            Registration Submitted!
          </h1>
          <p className="text-gray-500 mb-6">
            Your profile has been submitted for review. Our team will verify
            your details and approve your profile within 24-48 hours.
          </p>
          <div className="bg-[#F5F8FF] rounded-xl p-4 text-left mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Name:</span> {form.name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Category:</span> {form.category}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span> {form.location}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Status:</span>{" "}
              <span className="text-yellow-600 font-medium">
                Pending Approval
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("home")}
            className="w-full bg-[#2F6FDB] text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F8FF] min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2F6FDB] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
          <div className="bg-gradient-to-r from-[#0F2F57] to-[#2F6FDB] px-8 py-8 text-white">
            <h1 className="text-2xl font-bold mb-2">
              Register as a Professional
            </h1>
            <p className="text-blue-200 text-sm">
              Join KAAMMITRA and start getting bookings from thousands of
              customers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="reg-name"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Full Name *
                </label>
                <input
                  id="reg-name"
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Rajesh Kumar"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${errors.name ? "border-red-400" : "border-[#E5E7EB] focus:border-[#2F6FDB]"}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="reg-email"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Email Address *
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@example.com"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${errors.email ? "border-red-400" : "border-[#E5E7EB] focus:border-[#2F6FDB]"}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="reg-phone"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Phone Number *
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 98765 43210"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${errors.phone ? "border-red-400" : "border-[#E5E7EB] focus:border-[#2F6FDB]"}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="reg-category"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Category *
                </label>
                <select
                  id="reg-category"
                  value={form.category}
                  onChange={set("category")}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none ${errors.category ? "border-red-400" : "border-[#E5E7EB] focus:border-[#2F6FDB]"}`}
                >
                  <option value="">Select a service category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="reg-location"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Location *
                </label>
                <select
                  id="reg-location"
                  value={form.location}
                  onChange={set("location")}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none ${errors.location ? "border-red-400" : "border-[#E5E7EB] focus:border-[#2F6FDB]"}`}
                >
                  <option value="">Select your city</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="reg-exp"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Years of Experience *
                </label>
                <input
                  id="reg-exp"
                  type="number"
                  value={form.experience}
                  onChange={set("experience")}
                  placeholder="e.g. 5"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${errors.experience ? "border-red-400" : "border-[#E5E7EB] focus:border-[#2F6FDB]"}`}
                />
                {errors.experience && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="reg-hourly"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Hourly Rate (&#8377;) *
                </label>
                <input
                  id="reg-hourly"
                  type="number"
                  value={form.priceHourly}
                  onChange={set("priceHourly")}
                  placeholder="350"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${errors.priceHourly ? "border-red-400" : "border-[#E5E7EB] focus:border-[#2F6FDB]"}`}
                />
                {errors.priceHourly && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.priceHourly}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="reg-daily"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Daily Rate (&#8377;)
                </label>
                <input
                  id="reg-daily"
                  type="number"
                  value={form.priceDaily}
                  onChange={set("priceDaily")}
                  placeholder="2500"
                  className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6FDB]"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-monthly"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Monthly Rate (&#8377;)
                </label>
                <input
                  id="reg-monthly"
                  type="number"
                  value={form.priceMonthly}
                  onChange={set("priceMonthly")}
                  placeholder="18000"
                  className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6FDB]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="reg-skills"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Skills (comma-separated)
              </label>
              <input
                id="reg-skills"
                type="text"
                value={form.skills}
                onChange={set("skills")}
                placeholder="Pipe Fitting, Leak Repair, Installation"
                className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6FDB]"
              />
            </div>

            <div>
              <label
                htmlFor="reg-bio"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Bio / About You
              </label>
              <textarea
                id="reg-bio"
                value={form.bio}
                onChange={set("bio")}
                rows={4}
                placeholder="Tell customers about your experience, specializations, and why they should hire you..."
                className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6FDB] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2F6FDB] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-base"
            >
              Submit for Approval
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
