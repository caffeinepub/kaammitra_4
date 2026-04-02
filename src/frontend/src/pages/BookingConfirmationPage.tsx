import { ArrowRight, Calendar, CheckCircle, User } from "lucide-react";
import type { BookingDetails, Page } from "../App";

interface BookingConfirmProps {
  booking: BookingDetails;
  navigate: (page: Page) => void;
}

export default function BookingConfirmationPage({
  booking,
  navigate,
}: BookingConfirmProps) {
  const bookingId = `KM${Date.now().toString().slice(-6)}`;

  return (
    <div className="bg-[#F5F8FF] min-h-screen flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl shadow-lg border border-[#E5E7EB] max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-[#0F2F57] mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 mb-8">
          Your booking has been successfully placed. The professional will
          contact you shortly.
        </p>

        <div className="bg-[#F5F8FF] rounded-2xl p-5 text-left mb-8 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Booking ID</span>
            <span className="text-sm font-semibold text-[#0F2F57]">
              #{bookingId}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Professional</span>
            <span className="text-sm font-semibold text-[#0F2F57]">
              {booking.professionalName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Booking Type</span>
            <span className="text-sm font-semibold text-[#2F6FDB]">
              {booking.bookingType}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-4 h-4" /> Date
            </div>
            <span className="text-sm font-semibold text-[#0F2F57]">
              {booking.date}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <User className="w-4 h-4" /> Customer
            </div>
            <span className="text-sm font-semibold text-[#0F2F57]">
              {booking.customerName}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3">
            <span className="text-sm font-semibold text-gray-700">
              Total Amount
            </span>
            <span className="text-lg font-bold text-[#2F6FDB]">
              &#8377;{booking.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="w-full bg-[#2F6FDB] text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Go to Home <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => navigate("search")}
            className="w-full border border-[#E5E7EB] text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Book Another Professional
          </button>
        </div>
      </div>
    </div>
  );
}
