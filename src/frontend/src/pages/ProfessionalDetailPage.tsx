import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { useState } from "react";
import type { BookingDetails, Page } from "../App";
import { professionals } from "../data/professionals";

interface ProfDetailProps {
  profId: number;
  navigate: (
    page: Page,
    options?: { profId?: number; booking?: BookingDetails },
  ) => void;
}

export default function ProfessionalDetailPage({
  profId,
  navigate,
}: ProfDetailProps) {
  const prof = professionals.find((p) => p.id === profId);
  const [bookingType, setBookingType] = useState<
    "Hourly" | "Daily" | "Monthly"
  >("Hourly");
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!prof)
    return <div className="text-center py-20">Professional not found.</div>;

  const price =
    bookingType === "Hourly"
      ? prof.priceHourly
      : bookingType === "Daily"
        ? prof.priceDaily
        : prof.priceMonthly;
  const priceLabel =
    bookingType === "Hourly"
      ? "/hr"
      : bookingType === "Daily"
        ? "/day"
        : "/month";

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !customerName || !phone) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    const booking: BookingDetails = {
      professionalId: prof.id,
      professionalName: prof.name,
      bookingType,
      date,
      customerName,
      totalPrice: price,
    };
    navigate("booking-confirm", { booking });
  };

  return (
    <div className="bg-[#F5F8FF] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("search")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2F6FDB] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Profile */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-[#EAF2FF] to-[#2F6FDB] relative">
                <img
                  src={prof.avatar}
                  alt={prof.name}
                  className="absolute bottom-0 left-6 w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="px-6 pt-6 pb-6 ml-36">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h1 className="text-2xl font-bold text-[#0F2F57]">
                      {prof.name}
                    </h1>
                    <span className="inline-block mt-1 bg-blue-50 text-[#2F6FDB] text-sm font-medium px-3 py-1 rounded-full">
                      {prof.category}
                    </span>
                  </div>
                  <a
                    href={`tel:${prof.phone}`}
                    className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Contact
                  </a>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                    <span className="font-semibold text-gray-800">
                      {prof.rating}
                    </span>
                    <span className="text-gray-400">
                      ({prof.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#2F6FDB]" />
                    {prof.experience} years experience
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#2F6FDB]" />
                    {prof.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#2F6FDB]" />
                    {prof.phone}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {prof.bio}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
              <h2 className="font-semibold text-[#0F2F57] mb-4">
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {prof.skills.map((s) => (
                  <span
                    key={s}
                    className="bg-blue-50 text-[#2F6FDB] text-sm px-3 py-1.5 rounded-full font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
              <h2 className="font-semibold text-[#0F2F57] mb-4">
                Pricing Plans
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    type: "Hourly",
                    price: prof.priceHourly,
                    unit: "/hr",
                    icon: Clock,
                  },
                  {
                    type: "Daily",
                    price: prof.priceDaily,
                    unit: "/day",
                    icon: Calendar,
                  },
                  {
                    type: "Monthly",
                    price: prof.priceMonthly,
                    unit: "/month",
                    icon: CheckCircle,
                  },
                ].map(({ type, price: p, unit, icon: Icon }) => (
                  <div
                    key={type}
                    className="text-center bg-[#F5F8FF] rounded-xl p-4"
                  >
                    <Icon className="w-5 h-5 text-[#2F6FDB] mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">{type}</p>
                    <p className="text-xl font-bold text-[#2F6FDB]">
                      &#8377;{p.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">{unit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 sticky top-20">
              <h2 className="font-semibold text-[#0F2F57] text-lg mb-5">
                Book Now
              </h2>
              <form onSubmit={handleBooking} className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Booking Type</p>
                  <div className="flex rounded-xl border border-[#E5E7EB] overflow-hidden">
                    {(["Hourly", "Daily", "Monthly"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setBookingType(t)}
                        className={`flex-1 text-sm py-2 font-medium transition-colors ${
                          bookingType === t
                            ? "bg-[#2F6FDB] text-white"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <span className="text-2xl font-bold text-[#2F6FDB]">
                    &#8377;{price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">{priceLabel}</span>
                </div>

                <div>
                  <label
                    htmlFor="booking-date"
                    className="text-sm text-gray-600 mb-1.5 block"
                  >
                    Start Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2F6FDB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-name"
                    className="text-sm text-gray-600 mb-1.5 block"
                  >
                    Your Name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2F6FDB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="text-sm text-gray-600 mb-1.5 block"
                  >
                    Phone Number
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2F6FDB]"
                  />
                </div>

                {error && <p className="text-red-500 text-xs">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-[#2F6FDB] text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
