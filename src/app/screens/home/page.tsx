"use client";

import Link from 'next/link';
import { useState, useEffect, FC } from 'react';
import {
  Users,
  Code,
  GitBranch,
  MessageSquare,
  Star,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Rocket,
  Coffee,
  Activity,
  Terminal,
  Twitter,
  Github,
  Linkedin
} from 'lucide-react';
import Image from 'next/image';

interface Particle {
  id: number;
  background: string;
  left: string;
  top: string;
  animation: string;
  animationDelay: string;
  opacity: number;
}

interface Quote {
  text: string;
  author: string;
}

interface Opportunity {
  title: string;
  projects: number;
  difficulty: string;
  color: string;
}

interface Stat {
  label: string;
  value: string;
  icon: FC<{ className?: string }>;
  color: 'cyan' | 'purple' | 'pink';
}

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentQuote, setCurrentQuote] = useState(0);

  // Particle generation
  useEffect(() => {
    const generatedParticles = [...Array(30)].map((_, i) => ({
      id: i,
      background: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#6366F1',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: 0.6
    }));
    setParticles(generatedParticles);
  }, []);

  // Quote rotation
  const quotes: Quote[] = [
    { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
    { text: 'Code is like humor. When you have to explain it, it’s bad.', author: 'Cory House' },
    { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
    { text: 'Learning to code is learning to create and innovate.', author: 'Salman Khan' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats: Stat[] = [
    { label: 'Active Projects', value: '2,847', icon: Code, color: 'cyan' },
    { label: 'Expert Mentors', value: '1,234', icon: Users, color: 'purple' },
    { label: 'Contributors', value: '8,592', icon: GitBranch, color: 'pink' },
  ];

  const opportunities: Opportunity[] = [
    { title: 'Web Development', projects: 234, difficulty: 'Beginner-Friendly', color: 'from-blue-500 to-cyan-500' },
    { title: 'Machine Learning', projects: 156, difficulty: 'Intermediate', color: 'from-purple-500 to-pink-500' },
    { title: 'Mobile Apps', projects: 189, difficulty: 'All Levels', color: 'from-green-500 to-emerald-500' },
    { title: 'DevOps', projects: 98, difficulty: 'Advanced', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-purple-950 opacity-50"></div>

      {/* Background grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Gradient blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '5s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '6s' }}></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div key={p.id} className="absolute w-1 h-1 rounded-full" style={{
            background: p.background,
            left: p.left,
            top: p.top,
            animation: p.animation,
            animationDelay: p.animationDelay,
            opacity: p.opacity
          }} />
        ))}
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-xl border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50">
              <Image src="/connect.png" alt="Logo" width={40} height={40} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connect Sphere</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <Link href="/screens/dashboard" className="text-gray-400 hover:text-gray-300 transition-colors">Mentors</Link>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">About</a>
            <button className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden group cursor-pointer">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/5 backdrop-blur-xl border border-white/10">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-gray-300">Your Journey Starts Here</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-white">
          Find Your Perfect<br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Open Source Mentor</span>
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-400">
          Connect with experienced devs who'll guide you through your open source journey. No gatekeeping, just real mentorship 🚀
        </p>

        {/* Quote Section */}
        <div className="max-w-2xl mx-auto mb-12 p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-500">
          <div className="flex items-start gap-4">
            <Coffee className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
            <div className="text-left">
              <p className="text-lg text-white italic mb-3 leading-relaxed">
                “{quotes[currentQuote].text}”
              </p>
              <p className="text-sm text-blue-400 font-medium">— {quotes[currentQuote].author}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            {quotes.map((_, idx) => (
              <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentQuote ? 'w-8 bg-blue-400' : 'w-1 bg-white/30'}`} />
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-500/30 flex items-center gap-3">
            <Rocket className="w-5 h-5" />
            Explore Opportunities
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-semibold text-lg transition-all">
            Find a Mentor
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <Icon className="w-8 h-8 text-blue-400 mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Trending Open Source Opportunities</h2>
          <p className="text-gray-400 text-lg">Find projects that match your skills and interests</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((opp, idx) => (
            <div key={idx} className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:scale-105">
              <div className={`w-12 h-12 bg-gradient-to-r ${opp.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{opp.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{opp.projects} active projects</p>
              <div className="inline-block px-3 py-1 bg-blue-400/10 border border-blue-400/20 rounded-full text-blue-400 text-xs font-medium">
                {opp.difficulty}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative backdrop-blur-xl border-t border-white/5 mt-20 z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/connect.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connect Sphere</span>
          </div>
          <div className="flex gap-6 text-gray-400">
            <a href="#"><Twitter className="w-5 h-5 hover:text-blue-400 transition-colors" /></a>
            <a href="#"><Github className="w-5 h-5 hover:text-gray-200 transition-colors" /></a>
            <a href="#"><Linkedin className="w-5 h-5 hover:text-blue-600 transition-colors" /></a>
          </div>
          <p className="text-gray-500 text-sm text-center md:text-right mt-4 md:mt-0">© 2025 Connect Sphere. Built with 💙 for Open Source.</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}
