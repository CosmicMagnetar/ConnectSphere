"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Code, Users, MessageCircle, Star, Bell, Search, Calendar, Video, BookOpen, TrendingUp, Award, Clock, Send, MoreVertical, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const upcomingSessions = [
    { mentor: 'Sarah Chen', time: 'Today, 3:00 PM', topic: 'React Hooks Deep Dive', type: 'video' },
    { mentor: 'Raj Kumar', time: 'Tomorrow, 10:00 AM', topic: 'Backend Architecture', type: 'chat' },
    { mentor: 'Emma Wilson', time: 'Wed, 2:00 PM', topic: 'ML Basics', type: 'video' }
  ];

  const recentMessages = [
    { mentor: 'Sarah Chen', msg: 'Great progress on your PR!', time: '2m ago', unread: true },
    { mentor: 'Alex Martinez', msg: 'Check out this resource...', time: '1h ago', unread: true },
    { mentor: 'Emma Wilson', msg: 'See you tomorrow!', time: '3h ago', unread: false }
  ];

  const stats = [
    { label: 'Sessions', value: '12', change: '+3', icon: Video, color: '#3B82F6' },
    { label: 'Mentors', value: '4', change: '+1', icon: Users, color: '#8B5CF6' },
    { label: 'Hours', value: '24', change: '+8', icon: Clock, color: '#6366F1' },
    { label: 'Projects', value: '6', change: '+2', icon: BookOpen, color: '#3B82F6' }
  ];

  const learningPath = [
    { title: 'Git Basics', progress: 100, status: 'completed' },
    { title: 'React Fundamentals', progress: 75, status: 'in-progress' },
    { title: 'Node.js Backend', progress: 30, status: 'in-progress' },
    { title: 'Docker & DevOps', progress: 0, status: 'upcoming' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-purple-950 opacity-50"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '5s' }}></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '6s' }}></div>

      <header className="relative backdrop-blur-xl border-b border-white/5 top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50">
                <Image src="/connect.png" alt="Logo" width={40} height={40}/>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connect Sphere</span>
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
            <Link href="/screens/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
              J
            </Link>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, John! 👋</h1>
          <p className="text-gray-400">Here's what's happening with your mentorship journey</p>
        </div>

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
                  borderColor: hoveredCard === `stat-${idx}` ? stat.color : 'rgba(255,255,255,0.1)',
                  boxShadow: hoveredCard === `stat-${idx}` ? `0 20px 40px ${stat.color}30` : 'none'
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${stat.color}10` }}></div>
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

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  Upcoming Sessions
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
              </div>

              <div className="space-y-4">
                {upcomingSessions.map((session, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {session.mentor.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{session.topic}</h3>
                      <p className="text-sm text-gray-400">{session.mentor} • {session.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.type === 'video' ? (
                        <Video className="w-5 h-5 text-blue-400" />
                      ) : (
                        <MessageCircle className="w-5 h-5 text-purple-400" />
                      )}
                      <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  Learning Path
                </h2>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">Customize</button>
              </div>

              <div className="space-y-4">
                {learningPath.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.status === 'completed' ? 'bg-green-500/20' :
                          item.status === 'in-progress' ? 'bg-blue-500/20' : 'bg-gray-500/20'
                        }`}>
                          {item.status === 'completed' ? (
                            <Award className="w-4 h-4 text-green-400" />
                          ) : item.status === 'in-progress' ? (
                            <Zap className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <span className="text-white font-medium">{item.title}</span>
                      </div>
                      <span className="text-sm text-gray-400">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.progress}%`,
                          background: item.status === 'completed' ? '#10B981' :
                                    item.status === 'in-progress' ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : '#6B7280'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  Messages
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">All</button>
              </div>

              <div className="space-y-3">
                {recentMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group border border-transparent hover:border-blue-500/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {msg.mentor.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium text-sm">{msg.mentor}</span>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-400 truncate">{msg.msg}</p>
                      </div>
                      {msg.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group">
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                New Message
              </button>
            </div>

            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-purple-600/30 transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Find New Mentor</span>
                  </div>
                </button>
                <button className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-indigo-600/30 transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Schedule Session</span>
                  </div>
                </button>
                <button className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border border-indigo-500/30 text-white hover:bg-gradient-to-r hover:from-indigo-600/30 hover:to-blue-600/30 transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Browse Resources</span>
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