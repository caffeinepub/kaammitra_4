import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import HomePage from "./pages/HomePage";
import ProfessionalDetailPage from "./pages/ProfessionalDetailPage";
import SearchPage from "./pages/SearchPage";
import WorkerRegistrationPage from "./pages/WorkerRegistrationPage";

export type Page =
  | "home"
  | "search"
  | "professional"
  | "booking-confirm"
  | "worker-register"
  | "admin";

export interface BookingDetails {
  professionalId: number;
  professionalName: string;
  bookingType: "Hourly" | "Daily" | "Monthly";
  date: string;
  customerName: string;
  totalPrice: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProfId, setSelectedProfId] = useState<number | null>(null);
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null,
  );

  const navigate = (
    page: Page,
    options?: { profId?: number; category?: string; booking?: BookingDetails },
  ) => {
    if (options?.profId !== undefined) setSelectedProfId(options.profId);
    if (options?.category !== undefined) setSearchCategory(options.category);
    if (options?.booking !== undefined) setBookingDetails(options.booking);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F5F8FF]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main className="flex-1">
        {currentPage === "home" && <HomePage navigate={navigate} />}
        {currentPage === "search" && (
          <SearchPage navigate={navigate} initialCategory={searchCategory} />
        )}
        {currentPage === "professional" && selectedProfId !== null && (
          <ProfessionalDetailPage profId={selectedProfId} navigate={navigate} />
        )}
        {currentPage === "booking-confirm" && bookingDetails && (
          <BookingConfirmationPage
            booking={bookingDetails}
            navigate={navigate}
          />
        )}
        {currentPage === "worker-register" && (
          <WorkerRegistrationPage navigate={navigate} />
        )}
        {currentPage === "admin" && <AdminDashboardPage navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
