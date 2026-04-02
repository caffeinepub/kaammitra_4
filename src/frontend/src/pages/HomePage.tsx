import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CalendarCheck,
  Car,
  CheckCircle,
  ChefHat,
  Hammer,
  Heart,
  MapPin,
  Paintbrush2,
  Search,
  Star,
  Stethoscope,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { Page } from "../App";
import { categories, professionals, reviews } from "../data/professionals";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Wrench,
  Stethoscope,
  BookOpen,
  Zap,
  Hammer,
  Car,
  ChefHat,
  Paintbrush2,
};

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_POSITIONS.map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.floor(rating)
              ? "fill-[#FBBF24] text-[#FBBF24]"
              : i - 0.5 <= rating
                ? "fill-[#FBBF24] text-[#FBBF24] opacity-60"
                : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="ml-auto flex items-center gap-1">
      {STAR_POSITIONS.filter((n) => n <= rating).map((n) => (
        <Star key={n} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
      ))}
    </div>
  );
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-6");
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

interface HomePageProps {
  navigate: (
    page: Page,
    options?: { profId?: number; category?: string },
  ) => void;
}

export default function HomePage({ navigate }: HomePageProps) {
  const heroRef = useFadeIn();
  const categoriesRef = useFadeIn();
  const profsRef = useFadeIn();
  const howRef = useFadeIn();
  const reviewsRef = useFadeIn();

  return (
    <div>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div
            ref={heroRef}
            className="flex flex-col lg:flex-row items-center gap-12 opacity-0 translate-y-6 transition-all duration-700"
          >
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2F6FDB] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                <Award className="w-3.5 h-3.5" /> India's Most Trusted Service
                Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2F57] leading-tight uppercase tracking-tight mb-6">
                Your Work,
                <br />
                <span className="text-[#2F6FDB]">Our Experts.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl">
                Hire trusted professionals for every need — fast, reliable, and
                affordable. From plumbers to doctors, we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <button
                  type="button"
                  onClick={() => navigate("search")}
                  className="flex items-center gap-2 bg-[#2F6FDB] text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Explore Services <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("worker-register")}
                  className="flex items-center gap-2 border-2 border-[#2F6FDB] text-[#2F6FDB] px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all"
                >
                  Register as Pro
                </button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                {[
                  { icon: Users, value: "500+", label: "Professionals" },
                  { icon: Briefcase, value: "50+", label: "Services" },
                  { icon: Award, value: "10K+", label: "Happy Customers" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Icon className="w-4 h-4 text-[#2F6FDB]" />
                      <span className="text-xl font-bold text-[#0F2F57]">
                        {value}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-gradient-to-br from-[#EAF2FF] to-[#EEF0FF] rounded-3xl p-6 lg:p-8">
                <p className="text-sm font-semibold text-[#2F6FDB] mb-4 text-center">
                  Top-Rated Professionals Near You
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {professionals.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => navigate("professional", { profId: p.id })}
                      className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
                    >
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#0F2F57] truncate group-hover:text-[#2F6FDB]">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-500">{p.category}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                          <span className="text-xs font-medium text-gray-700">
                            {p.rating}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[#F5F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={categoriesRef}
            className="opacity-0 translate-y-6 transition-all duration-700"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0F2F57] mb-2">
                Explore Top Categories
              </h2>
              <p className="text-gray-500">
                Find the right professional for every job
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {categories.map((cat) => {
                const Icon = iconMap[cat.icon];
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => navigate("search", { category: cat.name })}
                    className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-blue-100"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-[#2F6FDB] transition-colors">
                      {Icon && (
                        <Icon className="w-7 h-7 text-[#2F6FDB] group-hover:text-white transition-colors" />
                      )}
                    </div>
                    <h3 className="font-semibold text-[#0F2F57] mb-1 group-hover:text-[#2F6FDB] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={profsRef}
            className="opacity-0 translate-y-6 transition-all duration-700"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-[#0F2F57] mb-2">
                  Featured Professionals
                </h2>
                <p className="text-gray-500">
                  Handpicked experts with top ratings
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("search")}
                className="hidden sm:flex items-center gap-2 text-[#2F6FDB] font-medium hover:underline"
              >
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {professionals.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#E5E7EB] overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      aria-label="Save to favourites"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                    >
                      <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-[#2F6FDB] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#0F2F57] mb-1 group-hover:text-[#2F6FDB] transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={p.rating} />
                      <span className="text-sm font-medium text-gray-700">
                        {p.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({p.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" /> {p.location}
                      </div>
                      <span className="text-sm font-bold text-[#2F6FDB]">
                        &#8377;{p.priceHourly}/hr
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.skills.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate("professional", { profId: p.id })}
                      className="w-full bg-[#2F6FDB] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#F5F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={howRef}
            className="opacity-0 translate-y-6 transition-all duration-700"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0F2F57] mb-2">
                How it Works
              </h2>
              <p className="text-gray-500">Get started in 3 simple steps</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  Icon: Search,
                  step: "01",
                  title: "Search & Browse",
                  desc: "Search for any service or browse by category. Filter by rating, experience, and price to find your perfect match.",
                },
                {
                  Icon: CalendarCheck,
                  step: "02",
                  title: "Book an Expert",
                  desc: "Choose hourly, daily, or monthly plans. Pick a convenient time slot and confirm your booking in seconds.",
                },
                {
                  Icon: CheckCircle,
                  step: "03",
                  title: "Get Work Done",
                  desc: "Your professional arrives on time, completes the job, and you pay only after you're satisfied with the service.",
                },
              ].map(({ Icon, step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#2F6FDB] flex items-center justify-center mx-auto shadow-lg">
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0F2F57] text-white text-xs font-bold flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F2F57] mb-3">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={reviewsRef}
            className="opacity-0 translate-y-6 transition-all duration-700"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0F2F57] mb-2">
                What Our Customers Say
              </h2>
              <p className="text-gray-500">Real stories from real customers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl shadow-md p-6 border border-[#E5E7EB] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#0F2F57]">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.location}</p>
                    </div>
                    <ReviewStars rating={r.rating} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#0F2F57] to-[#2F6FDB]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-200 mb-8">
            Join thousands of satisfied customers who hire professionals on
            KAAMMITRA every day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => navigate("search")}
              className="bg-white text-[#2F6FDB] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Find a Professional
            </button>
            <button
              type="button"
              onClick={() => navigate("worker-register")}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              Join as Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
