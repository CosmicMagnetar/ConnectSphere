"use client";

import React, { useState, useEffect, FC } from 'react';
import { supabase } from "../../supabaseClient";  // ✅ Make sure this path exists
// Note: Next.js components are replaced with standard HTML tags for this environment.
const Image = (props: any) => <img {...props} />;
const Link = ({ href, ...props }: any) => <a href={href} {...props} />;


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
  CheckCircle,
  MessageSquare,
  X,
} from "lucide-react";
import ChatbotPopup from '@/app/components/ChatbotPopup';

// Interfaces for new data structures
interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  skills: string[];
  avatar: string;
  rating: number;
  mentees: number;
}

interface Opportunity {
  id: number;
  title: string;
  org: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  deadline: string;
}

interface Meeting {
    id: number;
    title: string;
    date: string;
    time: string;
    type: "mentor" | "workshop" | "review";
}


export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userSkills, setUserSkills] = useState<string[]>(["React", "Node.js"]);
  const [newSkill, setNewSkill] = useState("");
  const [currentMentor, setCurrentMentor] = useState<any>(null);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [requestSent, setRequestSent] = useState<number[]>([]);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("No logged in user:", userError);
          // In a real app, you would redirect: window.location.href = "/screens/login";
          return;
        }

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
  }, []);

  // Skill Handlers
  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (skill && !userSkills.includes(skill)) {
      setUserSkills([...userSkills, skill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setUserSkills(userSkills.filter((s) => s !== skill));
  };

  // Request Mentor
  const handleRequestMentor = (mentor: any) => {
    setRequestSent([...requestSent, mentor.id]);
    setTimeout(() => {
      setCurrentMentor(mentor);
      setShowMentorModal(false);
    }, 1500);
  };

  // Difficulty Styling
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "Advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  // Hardcoded data
  const availableMentors: Mentor[] = [
    { id: 1, name: "Sarah Chen", role: "Senior Engineer", company: "Google", skills: ["React", "TypeScript"], avatar: "👩‍💻", rating: 4.9, mentees: 12 },
    { id: 2, name: "Raj Kumar", role: "Backend Lead", company: "Amazon", skills: ["Node.js", "Databases"], avatar: "👨‍💻", rating: 4.8, mentees: 8 },
    { id: 3, name: "Priya Sharma", role: "ML Engineer", company: "Microsoft", skills: ["Python", "AI"], avatar: "👩‍🔬", rating: 5.0, mentees: 15 },
  ];

  const upcomingMeetings: Meeting[] = [
    { id: 1, title: "Weekly Sync", date: "Oct 6, 2025", time: "3:00 PM", type: 'mentor' },
    { id: 2, title: "React Workshop", date: "Oct 8, 2025", time: "1:00 PM", type: 'workshop' },
  ];
  
  const opportunities: Opportunity[] = [
      { id: 1, title: 'React Native Mobile App', org: 'Mozilla Foundation', difficulty: 'Intermediate', tags: ['React', 'Mobile'], deadline: '15 Oct 2025' },
      { id: 2, title: 'API Documentation Improvement', org: 'TensorFlow', difficulty: 'Beginner', tags: ['Documentation', 'Python'], deadline: '20 Oct 2025' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-purple-950 opacity-50"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

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
              <input type="text" placeholder="Search mentors..." className="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 w-64 focus:outline-none focus:border-blue-500"/>
            </div>
            <button className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <Link href="/screens/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold">
              {profile?.name?.charAt(0) ?? "?"}
            </Link>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 py-8 z-10">
        <h1 className="text-4xl font-bold mb-2 text-white">Welcome back, {profile?.name ?? "Mentee"} 👋</h1>
        <p className="text-gray-400 mb-8">Here's what's happening with your mentorship journey</p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-cyan-400" />Your Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {userSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                    {skill}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-400" onClick={() => handleRemoveSkill(skill)} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Add a new skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} className="flex-1 bg-slate-900/50 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                <button onClick={handleAddSkill} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity">Add</button>
              </div>
            </div>

            {/* Opportunities */}
             <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-cyan-400" />Open Source Opportunities</h2>
              <div className="space-y-3">
                {opportunities.map((op) => (
                  <div key={op.id} className="bg-slate-900/50 rounded-xl p-4 hover:bg-slate-900/70 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-cyan-400">{op.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(op.difficulty)}`}>{op.difficulty}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{op.org}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {op.tags.map((tag, idx) => (<span key={idx} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">{tag}</span>))}
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{op.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
             {/* Mentor Section */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2"><Users className="w-5 h-5 text-cyan-400" />Your Mentor</h2>
                {!currentMentor && (<button onClick={() => setShowMentorModal(true)} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm hover:opacity-90">Find a Mentor</button>)}
              </div>
              {currentMentor ? (
                <div className="flex items-start gap-4 bg-slate-900/50 rounded-xl p-4">
                  <div className="text-5xl">{currentMentor.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-cyan-400">{currentMentor.name}</h3>
                    <p className="text-slate-400 text-sm mb-2">{currentMentor.role} at {currentMentor.company}</p>
                    <div className="flex flex-wrap gap-2">
                      {currentMentor.skills.map((skill:string, idx:number) => (<span key={idx} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs">{skill}</span>))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400"><Users className="w-16 h-16 mx-auto mb-3 opacity-50" /><p>No mentor assigned yet.</p></div>
              )}
            </div>

            {/* Upcoming Meetings */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-cyan-400" />Upcoming Meetings</h2>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="bg-slate-900/50 rounded-lg p-3 hover:bg-slate-900/70 transition-colors flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold text-sm mb-1">{meeting.title}</h3>
                        <p className="text-xs text-slate-400">{meeting.date} at {meeting.time}</p>
                    </div>
                    <button className="px-3 py-1 bg-blue-600/50 text-blue-300 text-xs rounded-md hover:bg-blue-600/80">Join</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Modal */}
        {showMentorModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
              <div className="sticky top-0 bg-slate-800 p-6 border-b border-slate-700 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400">Find Your Mentor</h2>
                  <p className="text-slate-400 text-sm">Connect with experts matching your skills</p>
                </div>
                <button onClick={() => setShowMentorModal(false)} className="p-2 hover:bg-slate-700 rounded-lg"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableMentors.map((mentor) => (
                  <div key={mentor.id} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                    <div className="text-5xl mb-3">{mentor.avatar}</div>
                    <h3 className="text-lg font-semibold text-cyan-400">{mentor.name}</h3>
                    <p className="text-slate-400 text-sm mb-2">{mentor.role} at {mentor.company}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mentor.skills.map((skill, idx) => (<span key={idx} className="px-2 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">{skill}</span>))}
                    </div>
                    <button disabled={requestSent.includes(mentor.id)} onClick={() => handleRequestMentor(mentor)} className={`w-full py-2 rounded-lg text-sm transition-colors ${requestSent.includes(mentor.id) ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"}`}>
                      {requestSent.includes(mentor.id) ? "Request Sent..." : "Request Mentor"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <ChatbotPopup />
    </div>
  );
}

