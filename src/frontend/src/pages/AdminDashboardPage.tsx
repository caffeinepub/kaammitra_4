import {
  ArrowLeft,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";
import { professionals } from "../data/professionals";

interface AdminProps {
  navigate: (page: Page) => void;
}

type ApprovalStatus = "pending" | "approved" | "rejected";

interface WorkerEntry {
  id: number;
  name: string;
  category: string;
  location: string;
  experience: number;
  status: ApprovalStatus;
  avatar: string;
  submittedDate: string;
}

const initialWorkers: WorkerEntry[] = [
  {
    id: 101,
    name: "Deepak Nair",
    category: "Plumber",
    location: "Kochi",
    experience: 3,
    status: "pending",
    avatar: "https://i.pravatar.cc/80?img=11",
    submittedDate: "2024-12-01",
  },
  {
    id: 102,
    name: "Kavitha Reddy",
    category: "Teacher",
    location: "Hyderabad",
    experience: 4,
    status: "pending",
    avatar: "https://i.pravatar.cc/80?img=23",
    submittedDate: "2024-12-02",
  },
  {
    id: 103,
    name: "Mohan Yadav",
    category: "Electrician",
    location: "Jaipur",
    experience: 6,
    status: "pending",
    avatar: "https://i.pravatar.cc/80?img=37",
    submittedDate: "2024-12-03",
  },
  {
    id: 104,
    name: "Sanjana Iyer",
    category: "Chef",
    location: "Bangalore",
    experience: 7,
    status: "approved",
    avatar: "https://i.pravatar.cc/80?img=44",
    submittedDate: "2024-11-28",
  },
  {
    id: 105,
    name: "Ravi Shankar",
    category: "Painter",
    location: "Surat",
    experience: 5,
    status: "rejected",
    avatar: "https://i.pravatar.cc/80?img=55",
    submittedDate: "2024-11-25",
  },
];

const statusColor: Record<ApprovalStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabel: Record<ApprovalStatus, string> = {
  pending: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
};

export default function AdminDashboardPage({ navigate }: AdminProps) {
  const [workers, setWorkers] = useState<WorkerEntry[]>(initialWorkers);
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const setStatus = (id: number, status: ApprovalStatus) => {
    setWorkers((w) => w.map((wk) => (wk.id === id ? { ...wk, status } : wk)));
  };

  const filtered = workers.filter(
    (w) => activeTab === "all" || w.status === activeTab,
  );

  const stats = {
    total: professionals.length + workers.length,
    pending: workers.filter((w) => w.status === "pending").length,
    approved: workers.filter((w) => w.status === "approved").length,
  };

  return (
    <div className="bg-[#F5F8FF] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2F6FDB] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0F2F57]">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Manage professionals and bookings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Professionals",
              value: stats.total,
              icon: Users,
              color: "text-[#2F6FDB]",
              bg: "bg-blue-50",
            },
            {
              label: "Pending Review",
              value: stats.pending,
              icon: Clock,
              color: "text-yellow-600",
              bg: "bg-yellow-50",
            },
            {
              label: "Approved",
              value: stats.approved,
              icon: CheckCircle,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              label: "Active Services",
              value: 8,
              icon: TrendingUp,
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-5"
            >
              <div
                className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-[#0F2F57]">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          <div className="flex border-b border-[#E5E7EB]">
            {(["all", "pending", "approved", "rejected"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-sm font-medium py-4 capitalize transition-colors ${
                    activeTab === tab
                      ? "text-[#2F6FDB] border-b-2 border-[#2F6FDB] bg-blue-50"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}{" "}
                  {tab !== "all" &&
                    `(${workers.filter((w) => w.status === tab).length})`}
                </button>
              ),
            )}
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No workers in this category.
              </div>
            ) : (
              filtered.map((w) => (
                <div
                  key={w.id}
                  className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={w.avatar}
                    alt={w.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#0F2F57]">{w.name}</p>
                    <p className="text-sm text-gray-500">
                      {w.category} &bull; {w.location} &bull; {w.experience} yrs
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Submitted: {w.submittedDate}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor[w.status]}`}
                  >
                    {statusLabel[w.status]}
                  </span>
                  {w.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStatus(w.id, "approved")}
                        className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-sm px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus(w.id, "rejected")}
                        className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-sm px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  )}
                  {w.status !== "pending" && (
                    <button
                      type="button"
                      onClick={() => setStatus(w.id, "pending")}
                      className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="font-semibold text-[#0F2F57]">
              Active Professionals
            </h2>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {professionals.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-5">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-semibold text-[#0F2F57] text-sm">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {p.category} &bull; {p.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#2F6FDB]">
                    &#8377;{p.priceHourly}/hr
                  </p>
                  <p className="text-xs text-gray-400">{p.reviews} reviews</p>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
