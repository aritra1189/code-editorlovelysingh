import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code2, Users, Zap, Globe, Github, Terminal, Sparkles, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const codeLines = [
    { type: 'const', name: 'editor', value: 'new CodeCollab();' },
    { type: 'const', name: 'team', value: "['you', 'me', 'everyone'];"},
    { type: 'await', name: 'editor', value: 'connect(team);' },
    { type: '// Let the', name: 'magic', value: 'begin! ✨' }
  ];

  useEffect(() => {
    if (currentLine < codeLines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentLine]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="container mx-auto px-6 py-4 relative">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <Code2 className="w-8 h-8 text-blue-400 group-hover:animate-float transition-transform" />
            <span className="text-xl font-bold group-hover:text-blue-400 transition-colors">CodeCollab</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Mobile Menu */}
          <div className={`
            fixed inset-0 bg-gray-900 bg-opacity-95 md:hidden transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <a href="#features" className="text-2xl hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
              <Link to="/pricing" className="text-2xl hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Pricing
              </Link>
              <a href="#docs" className="text-2xl hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Documentation</a>
              <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-xl transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            
            <Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link>
            <Link to="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link>
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all hover:scale-105">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="opacity-0 slide-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Code Together,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-glow">
              Build Faster
            </span>
          </h1>
        </div>
        <div className="opacity-0 slide-in-delay-1">
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A powerful, real-time collaborative code editor that helps teams write, review, and ship code faster than ever before.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 opacity-0 slide-in-delay-2">
        <button 
          onClick={() => navigate("/editor")} 
          className="group bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
         >
          <Terminal className="w-5 h-5 group-hover:animate-float" />
          Try Editor
           </button>
          <button className="group bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30 flex items-center justify-center gap-2">
            <Github className="w-5 h-5 group-hover:animate-float" />
            View on GitHub
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 opacity-0 slide-in">Why Choose CodeCollab?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="w-6 h-6 text-blue-400" />,
              title: "Real-time Collaboration",
              description: "Code together with your team in real-time. See changes as they happen and collaborate seamlessly."
            },
            {
              icon: <Zap className="w-6 h-6 text-blue-400" />,
              title: "Lightning Fast",
              description: "Built for speed with instant updates and zero lag, powered by WebSocket technology."
            },
            {
              icon: <Globe className="w-6 h-6 text-blue-400" />,
              title: "Work From Anywhere",
              description: "Access your projects from any device, anywhere in the world. Your workspace follows you."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="opacity-0 slide-in-delay-1"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isHovered={hoveredFeature === index}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Preview Section */}
      <section className="container mx-auto px-6 py-20">
      <motion.div
        className="bg-gray-900/80 backdrop-blur-lg rounded-xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/50 border border-gray-700 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="bg-gray-950 rounded-lg overflow-hidden shadow-lg">
          {/* Top bar with buttons */}
          <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500 shadow-red-500/50"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
            <motion.div
              className="w-3 h-3 rounded-full bg-yellow-500 shadow-yellow-500/50"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            ></motion.div>
            <motion.div
              className="w-3 h-3 rounded-full bg-green-500 shadow-green-500/50"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            ></motion.div>
          </div>

          {/* Code content */}
          <div className="p-6 font-mono text-sm space-y-4 text-gray-200">
            {codeLines.slice(0, currentLine + 1).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.3 }}
                className="flex space-x-2"
              >
                <span className="text-purple-400 font-bold">{line.type}</span>
                <span className="text-blue-400 font-semibold">{line.name}</span>
                <span className="text-white"> = </span>
                <span className="text-green-400 italic">{line.value}</span>
              </motion.div>
            ))}

            {/* Sparkle animation when typing completes */}
            {isTypingComplete && (
              <motion.div
                className="h-32 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-white opacity-80 animate-float" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Coding Together?</h2>
          <p className="text-lg mb-8 text-gray-100">
            Join thousands of developers who are already using CodeCollab to build amazing things.
          </p>
          <button
  onClick={() => (window.location.href = "https://jattdontcare.vercel.app")}
  className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold transition-all hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
>
  Start Collab Now
</button>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 group">
              <Code2 className="w-6 h-6 text-blue-400 group-hover:animate-float" />
              <span className="font-bold group-hover:text-blue-400 transition-colors">CodeCollab</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors hover:scale-105 transform inline-block">Terms</a>
              <a href="#" className="hover:text-white transition-colors hover:scale-105 transform inline-block">Privacy</a>
              <a href="#" className="hover:text-white transition-colors hover:scale-105 transform inline-block">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  isHovered 
}) {
  return (
    <div className={`
      bg-gray-800 p-6 rounded-xl transition-all duration-300
      ${isHovered ? 'transform scale-105 shadow-lg shadow-blue-500/20' : ''}
    `}>
      <div className={`mb-4 transition-transform duration-300 ${isHovered ? 'animate-float' : ''}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default Home;
