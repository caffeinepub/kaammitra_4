import { Briefcase, ChevronDown, LogOut, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Page } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface NavbarProps {
  currentPage: Page;
  navigate: (
    page: Page,
    options?: { profId?: number; category?: string },
  ) => void;
}

export default function Navbar({ navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { identity, login, clear } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("search", { category: searchQuery });
    setSearchQuery("");
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("home")}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2F6FDB] flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0F2F57] tracking-tight group-hover:text-[#2F6FDB] transition-colors">
              KAAMMITRA
            </span>
          </button>

          {/* Search Bar - hidden on mobile */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl"
          >
            <div className="flex w-full rounded-full border border-[#E5E7EB] overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for any service or professional…"
                className="flex-1 px-5 py-2 text-sm text-gray-700 outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2F6FDB] text-white hover:bg-blue-700 transition-colors rounded-r-full"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("search")}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#2F6FDB] px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Services <ChevronDown className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => navigate("worker-register")}
              className="text-sm text-gray-600 hover:text-[#2F6FDB] px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Register as Pro
            </button>
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate("admin")}
                  className="text-sm text-gray-600 hover:text-[#2F6FDB] px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={login}
                  className="text-sm border border-[#2F6FDB] text-[#2F6FDB] px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => navigate("search")}
                  className="text-sm bg-[#2F6FDB] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Book Now
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="flex w-full rounded-full border border-[#E5E7EB] overflow-hidden bg-white shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services…"
              className="flex-1 px-4 py-2 text-sm text-gray-700 outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-[#2F6FDB] text-white">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              navigate("search");
              setMenuOpen(false);
            }}
            className="text-left text-sm text-gray-700 py-2 hover:text-[#2F6FDB]"
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("worker-register");
              setMenuOpen(false);
            }}
            className="text-left text-sm text-gray-700 py-2 hover:text-[#2F6FDB]"
          >
            Register as Pro
          </button>
          {isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={() => {
                  navigate("admin");
                  setMenuOpen(false);
                }}
                className="text-left text-sm text-gray-700 py-2 hover:text-[#2F6FDB]"
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  clear();
                  setMenuOpen(false);
                }}
                className="text-left text-sm text-red-500 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                login();
                setMenuOpen(false);
              }}
              className="text-sm bg-[#2F6FDB] text-white px-4 py-2 rounded-lg w-full"
            >
              Login with Internet Identity
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
