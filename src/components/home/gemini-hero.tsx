"use client";

import { motion } from "framer-motion";
import { Sparkles, Search, ArrowRight, Image as ImageIcon, Code, FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";

export default function GeminiHero() {
  const [greeting, setGreeting] = useState("Hello, Human");
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const suggestions = [
    {
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
      text: "What is Gemini 3?",
      href: "/gemini-3",
      color: "hover:bg-blue-500/10 hover:border-blue-500/30"
    },
    {
      icon: <ImageIcon className="w-4 h-4 text-purple-400" />,
      text: "Create AI Images",
      href: "https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=hero_chip&utm_campaign=gemini3_seo",
      external: true,
      color: "hover:bg-purple-500/10 hover:border-purple-500/30"
    },
    {
      icon: <Code className="w-4 h-4 text-green-400" />,
      text: "Gemini 3.0 Features",
      href: "/gemini-3-0",
      color: "hover:bg-green-500/10 hover:border-green-500/30"
    },
    {
      icon: <FileText className="w-4 h-4 text-orange-400" />,
      text: "Prompt Library",
      href: "/prompts",
      color: "hover:bg-orange-500/10 hover:border-orange-500/30"
    }
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 w-full max-w-4xl mx-auto text-center">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl -z-10" />
      
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {greeting}
          </span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground/80 font-light">
          How can I help you explore <span className="font-medium text-foreground">Gemini 3</span> today?
        </p>
      </motion.div>

      {/* Fake Input Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-2xl relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
        <div className="relative flex items-center bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-card/80">
          <div className="p-2 bg-muted/50 rounded-lg mr-4">
            <Sparkles className="w-6 h-6 text-foreground/70" />
          </div>
          <input
            type="text"
            placeholder="Ask about Gemini 3, Nano Banana Pro, or image generation..."
            className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground/50 h-12"
            readOnly
          />
          <div className="flex items-center gap-2">
             <Link 
              href="/gemini-3"
              className="p-2 hover:bg-muted rounded-full transition-colors"
              title="Search"
            >
              <ArrowRight className="w-5 h-5 text-foreground/50" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Suggestions Chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        {suggestions.map((item, index) => (
          item.external ? (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-white/5 text-sm font-medium transition-all duration-300 hover:scale-105 ${item.color}`}
            >
              {item.icon}
              {item.text}
            </a>
          ) : (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-white/5 text-sm font-medium transition-all duration-300 hover:scale-105 ${item.color}`}
            >
              {item.icon}
              {item.text}
            </Link>
          )
        ))}
      </motion.div>
      
      {/* Nano Banana Pro Promo */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 0.8 }}
         className="mt-16 text-sm text-muted-foreground/60"
      >
        Looking for the best Gemini-powered image generator? <a href="https://www.gempix2.site/?utm_source=gemini.studio&utm_medium=hero_footer&utm_campaign=gemini3_seo" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-purple-400 underline underline-offset-4 transition-colors">Try Nano Banana Pro</a>
      </motion.div>
    </section>
  );
}
