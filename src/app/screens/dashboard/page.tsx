"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";

import {
  Code,
  Users,
  MessageCircle,
  Star,
  Bell,
  Search,
  Calendar,
  Video,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Send,
  Zap,
} from "lucide-react";

// ✅ 1. Import the new ChatbotPopup component
import ChatbotPopup from "../../components/ChatbotPopup"; // ❗ Adjust this path if you saved the file elsewhere

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // ... (all your existing useEffect, stats, and other variables remain unchanged) ...
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Step 1: get the user session
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("No logged in user:", userError);
          router.push("/screens/login"); // redirect if not logged in
          return;
        }

        // Step 2: fetch their profile row
        const { data: profiles, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", user.email)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          return;
        }

        setProfile(profiles);
      } catch (err) {
        console.error("Unexpected error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // Dummy stats
  const stats = [
    { label: "Sessions", value: "12", change: "+3", icon: Video, color: "#3B82F6" },
    { label: "Mentors", value: "4", change: "+1", icon: Users, color: "#8B5CF6" },
    { label: "Hours", value: "24", change: "+8", icon: Clock, color: "#6366F1" },
    { label: "Projects", value: "6", change: "+2", icon: BookOpen, color: "#3B82F6" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-purple-950 opacity-50"></div>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Header */}
      <header className="relative backdrop-blur-xl border-b border-white/5 top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50">
              <Image src="/connect.png" alt="Logo" width={40} height={40} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect Sphere
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search mentors, sessions..."
                className="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all w-64"
              />
            </div>
            <button className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <Link
              href="/screens/profile"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold"
            >
              {profile?.name?.charAt(0) ?? "?"}
            </Link>
          </div>
        </div>
      </header>
      
      {/* Welcome */}
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {profile?.name || "Mentee"} 👋
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your mentorship journey
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(`stat-${idx}`)}
                onMouseLeave={() => setHoveredCard(null)}
                className="backdrop-blur-xl rounded-2xl p-6 bg-white/5 border border-white/10 transition-all hover:scale-105 cursor-pointer relative overflow-hidden group"
                style={{
                  borderColor:
                    hoveredCard === `stat-${idx}` ? stat.color : "rgba(255,255,255,0.1)",
                  boxShadow:
                    hoveredCard === `stat-${idx}` ? `0 20px 40px ${stat.color}30` : "none",
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                    <span className="text-xs font-semibold text-green-400">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ 2. Add the ChatbotPopup component to your page */}
      <ChatbotPopup />
    </div>
  );
}