"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Code2, 
  Terminal, 
  Cpu, 
  Layers, 
  Zap, 
  ExternalLink, 
  Github,
  Sparkles,
  Blocks,
  Bot,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CATEGORIES = [
  { id: "all", label: "All Tools", icon: <Layers className="w-4 h-4" /> },
  { id: "ide", label: "AI IDEs", icon: <Code2 className="w-4 h-4" /> },
  { id: "agent", label: "Agents", icon: <Bot className="w-4 h-4" /> },
  { id: "cli", label: "CLI Tools", icon: <Terminal className="w-4 h-4" /> },
  { id: "builder", label: "App Builders", icon: <Blocks className="w-4 h-4" /> },
  { id: "model", label: "Models", icon: <Cpu className="w-4 h-4" /> },
];

const TOOLS = [
  {
    name: "Cursor",
    description: "The AI-native code editor. Built on VS Code, it features advanced code completion and natural language editing.",
    category: "ide",
    url: "https://cursor.com",
    tags: ["Popular", "VS Code"],
    icon: <Code2 className="text-blue-500" />
  },
  {
    name: "Windsurf",
    description: "The first agentic IDE. Combines deep context with agentic capabilities for seamless development.",
    category: "ide",
    url: "https://codeium.com/windsurf",
    tags: ["Agentic", "Context-Aware"],
    icon: <Zap className="text-orange-500" />
  },
  {
    name: "Cline",
    description: "An open-source AI assistant for VS Code that can use your CLI, read/write files, and more.",
    category: "agent",
    url: "https://github.com/cline/cline",
    tags: ["Open Source", "VS Code"],
    icon: <Github className="text-zinc-400" />
  },
  {
    name: "GitHub Copilot",
    description: "The world's most widely used AI developer tool, integrated directly into your editor.",
    category: "agent",
    url: "https://github.com/features/copilot",
    tags: ["Enterprise", "Cloud"],
    icon: <Github className="text-blue-400" />
  },
  {
    name: "Claude Code",
    description: "An agentic CLI tool that lives in your terminal and helps you build, test, and ship code.",
    category: "cli",
    url: "https://claude.ai",
    tags: ["CLI", "Anthropic"],
    icon: <Terminal className="text-purple-500" />
  },
  {
    name: "v0.dev",
    description: "Generative UI system by Vercel. Build high-quality React components from natural language.",
    category: "builder",
    url: "https://v0.dev",
    tags: ["UI", "Vercel"],
    icon: <Blocks className="text-zinc-100" />
  },
  {
    name: "Lovable",
    description: "A full-stack app builder that creates production-ready apps from your descriptions.",
    category: "builder",
    url: "https://lovable.dev",
    tags: ["Fullstack", "No-code"],
    icon: <Wand2 className="text-pink-500" />
  },
  {
    name: "Devin",
    description: "The first AI software engineer. Capable of planning and executing complex engineering tasks autonomously.",
    category: "agent",
    url: "https://cognition.ai",
    tags: ["Autonomous", "Async"],
    icon: <Bot className="text-green-500" />
  },
  {
    name: "Trae",
    description: "An adaptive AI IDE from ByteDance that transforms the way developers build software.",
    category: "ide",
    url: "https://trae.sh",
    tags: ["Adaptive", "New"],
    icon: <Sparkles className="text-yellow-500" />
  },
  {
    name: "Roo Code",
    description: "A fork of Cline focusing on community-driven features and advanced agentic capabilities.",
    category: "agent",
    url: "https://github.com/RooCode/Roo-Code",
    tags: ["Open Source", "Community"],
    icon: <Github className="text-zinc-500" />
  },
  {
    name: "Bolt.new",
    description: "A full-stack web development agent in the browser, powered by StackBlitz.",
    category: "builder",
    url: "https://bolt.new",
    tags: ["Browser-based", "Fast"],
    icon: <Zap className="text-yellow-400" />
  }
];

export default function AwesomeCodingAI() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-zinc-100 selection:text-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 border-zinc-800 text-zinc-400 font-mono tracking-wider">
              CURATED LIST • 2025
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Awesome Coding AI
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Tracking the rapidly evolving landscape of AI-native development tools, agents, and IDEs.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Search tools, descriptions..." 
                className="pl-10 bg-zinc-900/50 border-zinc-800 focus:ring-1 focus:ring-zinc-700 h-12 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-12 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl px-6">
              <Github className="w-4 h-4 mr-2" />
              Star on GitHub
            </Button>
          </motion.div>
        </header>

        {/* Categories Navigation */}
        <nav className="mb-12 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id 
                ? "bg-zinc-100 text-black" 
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, index) => (
              <motion.div
                layout
                key={tool.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card className="h-full bg-zinc-900/40 border-zinc-800 backdrop-blur-sm hover:border-zinc-700 transition-colors group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                        {React.cloneElement(tool.icon as React.ReactElement, { className: "w-6 h-6" })}
                      </div>
                      <div className="flex gap-2">
                        {tool.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-zinc-800/50 text-zinc-400 border-none text-[10px] uppercase tracking-widest">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-zinc-400 text-sm leading-relaxed mt-2 min-h-[60px]">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <a 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-zinc-500 hover:text-white transition-colors group/link"
                    >
                      Visit Website 
                      <ExternalLink className="w-3 h-3 ml-1 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No tools found matching your search.</p>
            <Button 
              variant="link" 
              className="mt-2 text-blue-500"
              onClick={() => {setSearchQuery(""); setActiveCategory("all");}}
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-zinc-900 text-center">
          <p className="text-zinc-500 text-sm">
            Curated by the community. Based on <a href="https://github.com/ohong/awesome-coding-ai" className="text-zinc-300 hover:underline">awesome-coding-ai</a>.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-400 transition-colors">Twitter</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 transition-colors">Discord</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 transition-colors">Newsletter</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
