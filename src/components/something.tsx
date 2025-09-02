'use client'

import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Sparkles, Zap, Star, Github, Twitter, Linkedin } from 'lucide-react';

const WondrrComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-black"></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-500/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-blue-500/30 rotate-12 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 md:p-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Wondrr
            </span>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Main Hero Section */}
        <main className="flex-1 flex flex-col justify-center items-center px-6 py-12 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-300 mb-8 animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
            We're building something amazing
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Something</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Extraordinary
            </span>
            <span className="block">is Coming</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
            We're crafting an experience that will redefine how you think about digital innovation. 
            Join the waitlist to be among the first to witness the revolution.
          </p>

          {/* Email Signup */}
          <div className="w-full max-w-md mb-12">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email address"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg sm:rounded-r-none px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitted || !email}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-4 rounded-lg sm:rounded-l-none font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[140px]"
              >
                {isSubmitted ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Welcome!</span>
                  </>
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              No spam, unsubscribe anytime. Be the first to get early access.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Blazing performance that exceeds expectations"
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Meticulously crafted with attention to detail"
              },
              {
                icon: Sparkles,
                title: "Innovation First",
                description: "Cutting-edge technology meets intuitive design"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>© 2024 Team Wondrr</span>
              <span>•</span>
              <a href="#" className="hover:text-gray-300 transition-colors duration-200">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300 transition-colors duration-200">Terms</a>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Status: Building</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default WondrrComingSoon;