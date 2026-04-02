import {
  Briefcase,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import type { Page } from "../App";

interface FooterProps {
  navigate: (page: Page, options?: { category?: string }) => void;
}

function FooterLink({
  href,
  children,
}: { href?: string; children: React.ReactNode }) {
  if (href) {
    return (
      <li>
        <a
          href={href}
          rel="noopener noreferrer"
          className="hover:text-[#2F6FDB] transition-colors"
        >
          {children}
        </a>
      </li>
    );
  }
  return <li>{children}</li>;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-[#F0F4FF] border-t border-[#E5E7EB] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#2F6FDB] flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0F2F57] tracking-tight">
                KAAMMITRA
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Hire trusted professionals for every need — fast, reliable, and
              affordable. Connecting skilled experts with people who need them.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#2F6FDB]" /> Priyanshu Jangir
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2F6FDB]" /> +91 9057601551
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2F6FDB]" />{" "}
                priyansh14j@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2F6FDB]" /> Kuchaman City,
                Rajasthan 341519, India
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-[#0F2F57] mb-4">About</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              <FooterLink>
                <button
                  type="button"
                  onClick={() => navigate("home")}
                  className="hover:text-[#2F6FDB] transition-colors"
                >
                  About Us
                </button>
              </FooterLink>
              <FooterLink href="https://kaammitra.in/careers">
                Careers
              </FooterLink>
              <FooterLink href="https://kaammitra.in/blog">Blog</FooterLink>
              <FooterLink href="https://kaammitra.in/press">Press</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[#0F2F57] mb-4">Services</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {["Plumber", "Doctor", "Teacher", "Electrician"].map((c) => (
                <FooterLink key={c}>
                  <button
                    type="button"
                    onClick={() => navigate("search", { category: c })}
                    className="hover:text-[#2F6FDB] transition-colors"
                  >
                    {c}
                  </button>
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-[#0F2F57] mb-4">Support</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              <FooterLink href="https://kaammitra.in/help">
                Help Center
              </FooterLink>
              <FooterLink href="https://kaammitra.in/safety">Safety</FooterLink>
              <FooterLink href="https://kaammitra.in/terms">
                Terms of Service
              </FooterLink>
              <FooterLink href="https://kaammitra.in/privacy">
                Privacy Policy
              </FooterLink>
              <FooterLink>
                <button
                  type="button"
                  onClick={() => navigate("worker-register")}
                  className="hover:text-[#2F6FDB] transition-colors"
                >
                  Register as Pro
                </button>
              </FooterLink>
            </ul>
          </div>
        </div>

        {/* Social + Copyright */}
        <div className="border-t border-[#E5E7EB] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2024 KAAMMITRA. Owner: Priyanshu Jangir. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              {
                Icon: Facebook,
                label: "Facebook",
                href: "https://facebook.com",
              },
              { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
              {
                Icon: Instagram,
                label: "Instagram",
                href: "https://instagram.com",
              },
              { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-gray-500 hover:text-[#2F6FDB] hover:border-[#2F6FDB] transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
