import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Check, Smartphone, ShoppingBag, Globe, Star } from "lucide-react";
import logo from "@assets/mobile_logo_1764606641304.png";

export default function BookLanding() {
  return (
    <div className="min-h-screen bg-white text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Mobile Store Logo" className="h-8 w-auto" />
            <div className="font-serif font-bold text-xl text-gray-900 tracking-tight">
              Mobile Store
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#overview" className="hover:text-primary transition-colors">Overview</a>
            <a href="#chapters" className="hover:text-primary transition-colors">Chapters</a>
            <a href="#author" className="hover:text-primary transition-colors">Author</a>
          </div>
          <button className="bg-primary text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer">
            Get the Book
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50/30 to-white">
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-xs font-bold tracking-wider uppercase mb-6">
              <Star className="w-3 h-3 fill-current" />
              Best Seller 2025
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
              Redefining <br />
              <span className="text-primary">Mobile Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
              "Where Innovation Meets Reliability." <br/>
              <span className="text-gray-400 text-base">Discover the future of digital retail with a platform designed for perfection.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="cursor-pointer flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl active:scale-95">
                Purchase Copy
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="cursor-pointer flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all">
                View Preview
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                  ))}
                </div>
                <span>Trusted by 10k+ readers</span>
              </div>
            </div>
          </motion.div>

          {/* CSS 3D Book Implementation */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative perspective-1000 flex justify-center md:justify-end"
          >
            <div className="relative w-[300px] h-[460px] transition-transform duration-500 hover:scale-105 preserve-3d group cursor-pointer">
               {/* Shadow */}
               <div className="absolute bottom-0 left-0 w-full h-10 bg-black/20 blur-xl rounded-[100%] transform translate-y-8 scale-x-90 group-hover:scale-x-100 transition-transform duration-500" />
               
               {/* Book Body (Front Cover) */}
               <div className="absolute inset-0 bg-white rounded-r-2xl rounded-l-sm shadow-2xl transform-style-3d rotate-y-[-15deg] group-hover:rotate-y-[-5deg] transition-transform duration-700 origin-left border border-gray-200 overflow-hidden">
                  
                  {/* Spine Highlight */}
                  <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-gray-300/50 to-transparent z-20" />
                  
                  {/* Cover Design */}
                  <div className="h-full w-full bg-white flex flex-col relative">
                    {/* Top Section - Blue */}
                    <div className="h-2/3 w-full bg-primary relative flex items-center justify-center overflow-hidden">
                        {/* Abstract Geometric Shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full translate-y-1/4 -translate-x-1/4 blur-xl" />
                        
                        {/* The Logo */}
                        <div className="relative z-10 flex flex-col items-center gap-4 p-8">
                          <div className="bg-white p-6 rounded-3xl shadow-2xl">
                             <img src={logo} alt="Logo" className="w-24 h-auto object-contain" />
                          </div>
                          <h2 className="text-white font-serif font-bold text-2xl tracking-wide text-center mt-4">Mobile Store</h2>
                        </div>
                    </div>
                    
                    {/* Bottom Section - White */}
                    <div className="h-1/3 w-full bg-white p-8 flex flex-col justify-between">
                        <div>
                          <div className="h-1 w-12 bg-primary mb-4" />
                          <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-medium">The Official Guide</p>
                          <p className="text-gray-900 font-serif italic mt-2">Edition 2025</p>
                        </div>
                        <div className="flex justify-between items-end">
                           <div className="text-primary font-bold text-lg">Vol. 1</div>
                        </div>
                    </div>
                  </div>
               </div>

               {/* Book Pages (Side/Thickness) */}
               <div className="absolute top-1 bottom-1 right-2 w-12 bg-gray-100 transform rotate-y-90 translate-x-6 translate-z-[-2px] rounded-r border-r border-gray-200">
                  {/* Page lines */}
                  <div className="h-full w-full flex flex-col gap-[2px] py-2 overflow-hidden opacity-50">
                     {Array.from({ length: 20 }).map((_, i) => (
                       <div key={i} className="h-px w-full bg-gray-300" />
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's Inside The Book?</h2>
            <p className="text-gray-600">Everything you need to know about creating a successful mobile marketplace.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="w-6 h-6 text-primary" />,
                title: "Mobile-First Design",
                desc: "Learn the principles of creating interfaces that work perfectly on any device."
              },
              {
                icon: <ShoppingBag className="w-6 h-6 text-primary" />,
                title: "E-Commerce Strategy",
                desc: "Deep dive into conversion optimization and user journey mapping for retail."
              },
              {
                icon: <Globe className="w-6 h-6 text-primary" />,
                title: "Global Scaling",
                desc: "Strategies for taking your local mobile store to an international audience."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Breakdown */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 bg-gray-100 rounded-3xl p-12 min-h-[400px] relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl font-serif font-bold text-gray-200 select-none">2025</div>
             </div>
             <div className="relative z-10">
               <div className="bg-white p-6 rounded-xl shadow-sm max-w-xs ml-auto mb-4 transform rotate-3 hover:-rotate-0 transition-transform duration-300">
                  <div className="h-2 w-12 bg-gray-200 rounded mb-4" />
                  <div className="h-2 w-full bg-gray-100 rounded mb-2" />
                  <div className="h-2 w-3/4 bg-gray-100 rounded" />
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm max-w-xs transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <img src={logo} className="w-4 h-4 opacity-50" alt="mini logo" />
                    </div>
                    <div className="h-2 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded mb-2" />
                  <div className="h-2 w-5/6 bg-gray-100 rounded" />
               </div>
             </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Professional Design Meets <br/> 
              <span className="text-primary">Technical Excellence</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              The "Mobile Store" book isn't just about theory. It's a practical blueprint for building high-conversion mobile interfaces that look stunning and perform flawlessly.
            </p>
            
            <ul className="space-y-4">
              {[
                "Mastering the 8-point grid system",
                "Typography scales for small screens",
                "Color psychology in e-commerce",
                "Animation and micro-interactions guide"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-gray-800 pb-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <img src={logo} alt="Logo" className="h-8 w-auto brightness-0 invert" />
                <h3 className="font-serif text-2xl font-bold">Mobile Store</h3>
            </div>
            <p className="text-gray-400 max-w-sm">
              The definitive resource for mobile e-commerce design and development. 
              Simplicity meets professionalism.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Design System</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          © 2025 Mobile Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
