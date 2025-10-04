"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Code, Users, MessageCircle, Star, Sparkles, ArrowRight, Zap, Target, Globe } from 'lucide-react';
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

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [particles, setParticles] = useState<Particle[]>([]);

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

  const stats = [
    { number: '500+', label: 'Mentors', icon: Users },
    { number: '2K+', label: 'Students', icon: Target },
    { number: '5K+', label: 'Connections', icon: MessageCircle },
    { number: '4.8', label: 'Avg Rating', icon: Star }
  ];

  const features = [
    { icon: Zap, title: 'Smart Matching', desc: 'AI-powered algo matches you with perfect mentors based on skills & goals', color: '#8B5CF6' },
    { icon: MessageCircle, title: 'Instant Chat', desc: 'Direct messaging with mentors. No waiting, no approvals needed', color: '#3B82F6' },
    { icon: Users, title: 'Group Sessions', desc: 'Join 1-to-many mentorship circles & learn with peers', color: '#6366F1' }
  ];

  const mentors = [
    { name: 'Sarah', role: 'React Expert', img: '👩‍💻', rating: 4.9 },
    { name: 'Raj', role: 'Backend Dev', img: '👨‍💻', rating: 4.8 },
    { name: 'Emma', role: 'ML Engineer', img: '👩‍🔬', rating: 4.9 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* ... other background elements ... */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-purple-950 opacity-50"></div>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 3. Map over the 'particles' state array to render them */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: p.background,
              left: p.left,
              top: p.top,
              animation: p.animation,
              animationDelay: p.animationDelay,
              opacity: p.opacity
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-xl border-b border-white/5">
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
      <section className="relative max-w-7xl mx-auto px-6 py-20 text-center">
         {/* ... hero section JSX ... */}
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="cursor-pointer px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden group shadow-lg shadow-blue-500/50">
            <Link href="/screens/dashboard" className="relative z-10 flex items-center gap-2">Find Mentors<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></Link>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
          </button>
          <button className="px-8 cursor-pointer py-4 rounded-full font-bold text-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white relative overflow-hidden group">
            <Link href="/screens/dashboardmentor" className="relative z-10">Become a Mentor</Link>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="backdrop-blur-xl rounded-2xl p-6 bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                <Icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className="text-3xl font-bold mb-1 text-white">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Why Connect Sphere?</h2>
          <p className="text-lg text-gray-400">Everything you need to kickstart your open source journey</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon; // Icon rendering fix
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="backdrop-blur-xl rounded-3xl p-8 bg-white/5 border transition-all hover:scale-105"
                style={{ borderColor: hoveredCard === idx ? feature.color : 'rgba(255,255,255,0.1)', boxShadow: hoveredCard === idx ? `0 20px 40px ${feature.color}30` : 'none' }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all" style={{ background: hoveredCard === idx ? `${feature.color}20` : 'rgba(255,255,255,0.05)' }}>
                  <Icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Mentors & other sections... */}
      {/* ... the rest of your JSX ... */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Meet Top Mentors</h2>
          <p className="text-lg text-gray-400">Connect with experienced developers ready to help</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {mentors.map((mentor, idx) => (
            <div key={idx} className="backdrop-blur-xl rounded-3xl p-8 bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 text-center group">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">{mentor.img}</div>
              <h3 className="text-xl font-bold mb-1 text-white">{mentor.name}</h3>
              <p className="mb-4 text-gray-400">{mentor.role}</p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
                <span className="font-semibold text-white">{mentor.rating}</span>
              </div>
              <button className="w-full cursor-pointer py-3 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden group/btn">
                <span className="relative z-10">Connect Now</span>
                <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left"></div>
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="relative max-w-5xl mx-auto px-6 py-20">
        <div className="backdrop-blur-xl rounded-3xl p-12 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Globe className="w-16 h-16 mx-auto mb-6 text-blue-400 relative z-10" />
          <h2 className="text-4xl font-bold mb-4 text-white relative z-10">Ready to Start?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400 relative z-10">Join thousands of developers already learning & growing together</p>
          <button className="px-10 py-4 cursor-pointer rounded-full font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden group/cta shadow-2xl shadow-blue-500/50 z-10">
            <span className="relative z-10">Get Started Free 🎉</span>
            <div className="absolute inset-0 bg-white/20 scale-0 group-hover/cta:scale-150 transition-transform duration-700 rounded-full"></div>
          </button>
        </div>
      </section>
      <footer className="relative backdrop-blur-xl border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-500">© 2025 Connect Sphere. Built with 💙 for open source</p>
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