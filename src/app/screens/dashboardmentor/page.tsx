"use client";
// screens/mentor-dashboard/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  Clock,
  Video,
  Star,
  Award,
  CheckCircle,
  AlertCircle,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Plus,
  UserCheck,
  BookOpen,
  Zap,
  Target,
  Eye,
  Edit,
} from "lucide-react";

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);

  // Mentor's stats
  const mentorStats = [
    {
      label: "Active Students",
      value: "12",
      change: "+3",
      icon: Users,
      color: "#3B82F6",
    },
    {
      label: "Hours This Month",
      value: "28",
      change: "+8",
      icon: Clock,
      color: "#8B5CF6",
    },
    {
      label: "Avg Rating",
      value: "4.9",
      change: "+0.1",
      icon: Star,
      color: "#F59E0B",
    },
    {
      label: "Sessions Done",
      value: "156",
      change: "+12",
      icon: Video,
      color: "#10B981",
    },
  ];

  // Pending mentorship requests (matching algorithm results)
  const mentorshipRequests = [
    {
      id: 1,
      student: "Alex Kumar",
      skills: ["React", "JavaScript", "Git"],
      matchScore: 95,
      reason: "Strong match in React & Frontend Development",
      bio: "CS student looking to contribute to React ecosystem",
      avatar: "👨‍💻",
      requestedAt: "2h ago",
      goals: [
        "Learn React Hooks",
        "Build first PR",
        "Understand component patterns",
      ],
    },
    {
      id: 2,
      student: "Maya Chen",
      skills: ["Python", "Django", "APIs"],
      matchScore: 88,
      reason: "Interested in backend development path",
      bio: "Bootcamp grad transitioning to open source",
      avatar: "👩‍💻",
      requestedAt: "5h ago",
      goals: ["Backend architecture", "REST APIs", "Database design"],
    },
    {
      id: 3,
      student: "Jordan Lee",
      skills: ["Node.js", "Express", "MongoDB"],
      matchScore: 82,
      reason: "Backend focus aligns with your expertise",
      bio: "Self-taught developer, passionate about backend",
      avatar: "🧑‍💻",
      requestedAt: "1d ago",
      goals: ["Scalable systems", "Best practices", "Code review skills"],
    },
  ];

  // Current mentees
  const activeMentees = [
    {
      name: "Sarah Johnson",
      progress: 75,
      sessions: 8,
      nextSession: "Today, 3 PM",
      avatar: "👩‍🎓",
      status: "On track",
    },
    {
      name: "Mike Chen",
      progress: 45,
      sessions: 5,
      nextSession: "Tomorrow, 10 AM",
      avatar: "👨‍🎓",
      status: "Needs support",
    },
    {
      name: "Emma Davis",
      progress: 90,
      sessions: 12,
      nextSession: "Wed, 2 PM",
      avatar: "👩‍💼",
      status: "Excellent",
    },
    {
      name: "Raj Patel",
      progress: 60,
      sessions: 7,
      nextSession: "Thu, 4 PM",
      avatar: "👨‍💼",
      status: "On track",
    },
  ];

  // Group mentorship sessions (one-to-many)
  const groupSessions = [
    {
      title: "React Fundamentals Bootcamp",
      students: 8,
      nextSession: "Today, 5 PM",
      duration: "90 min",
      topic: "Custom Hooks Deep Dive",
      recurring: "Weekly",
    },
    {
      title: "Open Source Contribution Workshop",
      students: 12,
      nextSession: "Fri, 6 PM",
      duration: "2 hours",
      topic: "Finding & Claiming Issues",
      recurring: "Bi-weekly",
    },
    {
      title: "Backend Architecture Series",
      students: 6,
      nextSession: "Sat, 11 AM",
      duration: "2 hours",
      topic: "Microservices Patterns",
      recurring: "Monthly",
    },
  ];

  // Upcoming sessions
  const upcomingSessions = [
    {
      student: "Sarah Johnson",
      time: "Today, 3:00 PM",
      topic: "Code Review: PR #234",
      type: "video",
    },
    {
      student: "React Bootcamp (Group)",
      time: "Today, 5:00 PM",
      topic: "Custom Hooks",
      type: "video",
      isGroup: true,
    },
    {
      student: "Mike Chen",
      time: "Tomorrow, 10:00 AM",
      topic: "Debugging Session",
      type: "chat",
    },
  ];

  // Recent activity
  const recentActivity = [
    {
      action: "Completed session",
      detail: "Code review with Sarah",
      time: "2h ago",
      type: "success",
    },
    {
      action: "New request",
      detail: "Alex Kumar wants mentorship",
      time: "2h ago",
      type: "info",
    },
    {
      action: "Session feedback",
      detail: "Emma rated 5 stars ⭐",
      time: "5h ago",
      type: "success",
    },
    {
      action: "Milestone achieved",
      detail: "Mike completed first PR!",
      time: "1d ago",
      type: "achievement",
    },
  ];

    function getStatusColor(status: string) {
      switch (status) {
        case "On track":
          return "bg-green-500/20 text-green-400 border-green-400/30";
        case "Needs support":
          return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
        case "Excellent":
          return "bg-blue-500/20 text-blue-400 border-blue-400/30";
        default:
          return "bg-gray-500/20 text-gray-400 border-gray-400/30";
      }
    }
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-purple-950 opacity-50"></div>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div
        className="absolute top-20 right-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10 animate-pulse"
        style={{ animationDuration: "5s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse"
        style={{ animationDuration: "6s" }}
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
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all w-64"
              />
            </div>
            <button className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link
              href="/screens/profile"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold"
            >
              S
            </Link>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-gray-400">
            You have 3 new mentorship requests and 2 sessions today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {mentorStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="backdrop-blur-xl rounded-2xl p-6 bg-white/5 border border-white/10 transition-all hover:scale-105 cursor-pointer relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `${stat.color}10` }}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                    <span className="text-xs font-semibold text-green-400">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* New Mentorship Requests */}
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-blue-400" />
                  New Mentorship Requests
                  <span className="ml-2 px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                    {mentorshipRequests.length}
                  </span>
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>

              <div className="space-y-4">
                {mentorshipRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group cursor-pointer"
                    onClick={() =>
                      setSelectedRequest(
                        selectedRequest === request.id ? null : request.id
                      )
                    }
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{request.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                              {request.student}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {request.requestedAt}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                            <Target className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-bold text-green-400">
                              {request.matchScore}% Match
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-400 mb-3">
                          {request.bio}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {request.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <Zap className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 font-medium">
                            {request.reason}
                          </span>
                        </div>

                        {selectedRequest === request.id && (
                          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 animate-fadeIn">
                            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                              <Target className="w-4 h-4 text-blue-400" />
                              Learning Goals:
                            </h4>
                            <ul className="space-y-2 mb-4">
                              {request.goals.map((goal, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2 text-sm text-gray-400"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                  {goal}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex gap-3 mt-4">
                          <button className="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              setSelectedRequest(
                                selectedRequest === request.id
                                  ? null
                                  : request.id
                              )
                            }
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                          >
                            {selectedRequest === request.id
                              ? "Hide"
                              : "View Details"}
                          </button>
                          <button className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all">
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Mentees */}
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-400" />
                  Active Mentees
                </h2>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {activeMentees.map((mentee, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-3xl">{mentee.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold">
                            {mentee.name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              mentee.status
                            )}`}
                          >
                            {mentee.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {mentee.sessions} sessions • Next:{" "}
                          {mentee.nextSession}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white font-semibold">
                          {mentee.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                          style={{ width: `${mentee.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Group Sessions (One-to-Many) */}
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-400" />
                  Group Mentorship Sessions
                </h2>
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Group
                </button>
              </div>

              <div className="space-y-4">
                {groupSessions.map((session, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 hover:border-green-500/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-green-400 transition-colors">
                          {session.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {session.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.duration}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                            {session.recurring}
                          </span>
                        </div>
                      </div>
                      <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 mb-3">
                      <p className="text-sm text-gray-400 mb-1">Next Topic:</p>
                      <p className="text-white font-medium">{session.topic}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {session.nextSession}
                      </span>
                      <button className="px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Start Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Today
                </h2>
              </div>

              <div className="space-y-3">
                {upcomingSessions.map((session, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-blue-500/30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {session.type === "video" ? (
                        <Video className="w-4 h-4 text-blue-400" />
                      ) : (
                        <MessageCircle className="w-4 h-4 text-purple-400" />
                      )}
                      <span className="text-white font-medium text-sm">
                        {session.student}
                      </span>
                      {"isGroup" in session && session.isGroup && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                          Group
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{session.time}</p>
                    <p className="text-sm text-gray-300">{session.topic}</p>
                    <button className="w-full mt-2 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold hover:shadow-lg transition-all">
                      Join Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 pb-3 border-b border-white/5 last:border-0"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "info"
                          ? "bg-blue-500"
                          : activity.type === "achievement"
                          ? "bg-purple-500"
                          : "bg-gray-500"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-400">{activity.detail}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-purple-600/30 transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <Edit className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Update Availability</span>
                  </div>
                </button>
                <button className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-indigo-600/30 transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Message All Students</span>
                  </div>
                </button>
                <button className="w-full p-4 rounded-xl bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 text-white hover:bg-gradient-to-r hover:from-green-600/30 hover:to-blue-600/30 transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">View Analytics</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
