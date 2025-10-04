"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Code,
  Mail,
  MapPin,
  Calendar,
  Award,
  Star,
  BookOpen,
  Users,
  Edit,
  Settings,
  Save,
  Github,
  Linkedin,
  Globe,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

const skills = [
    { name: 'React', level: 'Advanced', color: '#3B82F6' },
    { name: 'Node.js', level: 'Advanced', color: '#8B5CF6' },
    { name: 'Python', level: 'Intermediate', color: '#6366F1' },
    { name: 'Docker', level: 'Beginner', color: '#10B981' },
    { name: 'JavaScript', level: 'Advanced', color: '#F59E0B' },
    { name: 'TypeScript', level: 'Intermediate', color: '#3B82F6' },
    { name: 'MongoDB', level: 'Beginner', color: '#10B981' },
    { name: 'PostgreSQL', level: 'Intermediate', color: '#6366F1' },
    { name: 'Git', level: 'Advanced', color: '#8B5CF6' },
    { name: 'REST APIs', level: 'Intermediate', color: '#3B82F6' },
    { name: 'GraphQL', level: 'Beginner', color: '#10B981' }, 
    { name: 'AWS', level: 'Intermediate', color: '#F59E0B' },
    { name: 'Tailwind CSS', level: 'Advanced', color: '#06B6D4' },
    { name: 'Next.js', level: 'Intermediate', color: '#000000' },
    { name: 'Express', level: 'Advanced', color: '#8B5CF6' },
    { name: 'Redux', level: 'Beginner', color: '#10B981' }
];

  const achievements = [
    {
      icon: Award,
      title: "First PR Merged",
      date: "Mar 2025",
      color: "#3B82F6",
    },
    {
      icon: Star,
      title: "10 Sessions Done",
      date: "Feb 2025",
      color: "#8B5CF6",
    },
    { icon: Target, title: "Fast Learner", date: "Jan 2025", color: "#6366F1" },
    { icon: Zap, title: "Early Adopter", date: "Dec 2024", color: "#3B82F6" },
  ];

  const mentors = [
    { name: "Sarah Chen", role: "React Expert", sessions: 8, img: "👩‍💻" },
    { name: "Raj Kumar", role: "Backend Dev", sessions: 6, img: "👨‍💻" },
    { name: "Emma Wilson", role: "ML Engineer", sessions: 4, img: "👩‍🔬" },
  ];

  const recentActivity = [
    {
      action: "Completed session",
      detail: "React Hooks with Sarah",
      time: "2h ago",
    },
    {
      action: "Updated profile",
      detail: "Added new skill: Docker",
      time: "1d ago",
    },
    {
      action: "Started learning",
      detail: "Backend Architecture path",
      time: "3d ago",
    },
    {
      action: "Earned badge",
      detail: "Fast Learner achievement",
      time: "5d ago",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Advanced":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Intermediate":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Beginner":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
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
          <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="backdrop-blur-xl rounded-3xl p-8 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 mb-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-blue-500/50">
                J
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-all shadow-lg">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    John Doe
                  </h1>
                  <p className="text-gray-400 mb-4">
                    Aspiring Full-Stack Developer 🚀
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 group/btn"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  john@example.com
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  Joined Dec 2024
                </div>
              </div>

              <div className="flex gap-3">
                <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group">
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </button>
                <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group">
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </button>
                <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group">
                  <Globe className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
              {isEditing ? (
                <textarea
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  defaultValue="Computer Science student passionate about open source. Currently learning web development and looking to contribute to cool projects. Love building things that make a difference!"
                />
              ) : (
                <p className="text-gray-400 leading-relaxed">
                  Computer Science student passionate about open source.
                  Currently learning web development and looking to contribute
                  to cool projects. Love building things that make a difference!
                </p>
              )}
            </div>

            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-400" />
                  Skills & Technologies
                </h2>
                {isEditing && (
                  <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                    <span>+ Add Skill</span>
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className={`group relative px-4 py-2 rounded-full border transition-all cursor-pointer hover:scale-105 ${getLevelColor(
                      skill.level
                    )}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-xs opacity-75">{skill.level}</span>
                    </div>
                    {isEditing && (
                      <button className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs">×</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-400">Expert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-400">Advanced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-gray-400">Intermediate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-gray-400">Beginner</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-400" />
                Achievements
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, idx) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all cursor-pointer group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all"
                        style={{ background: `${achievement.color}20` }}
                      >
                        <Icon
                          className="w-6 h-6 group-hover:scale-110 transition-transform"
                          style={{ color: achievement.color }}
                        />
                      </div>
                      <h3 className="text-white font-semibold mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {achievement.date}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-medium">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-400">
                            {activity.detail}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">18</div>
                      <div className="text-xs text-gray-400">Sessions</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">3</div>
                      <div className="text-xs text-gray-400">Mentors</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">4</div>
                      <div className="text-xs text-gray-400">Badges</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">My Mentors</h2>
              <div className="space-y-4">
                {mentors.map((mentor, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="text-3xl">{mentor.img}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-gray-400">{mentor.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">
                        {mentor.sessions}
                      </div>
                      <div className="text-xs text-gray-500">sessions</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/screens/dashboard"
                  className="block w-full p-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-purple-600/30 transition-all text-sm font-medium text-center"
                >
                  View Dashboard
                </Link>
                <button className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-indigo-600/30 transition-all text-sm font-medium">
                  Find Mentors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
