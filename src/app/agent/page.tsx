"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Code2, 
  Files, 
  Play, 
  Plus, 
  Send, 
  Settings, 
  ChevronRight, 
  Layout, 
  History,
  Bot,
  User,
  Sparkles,
  Command,
  Search,
  Globe,
  Rocket,
  ShieldCheck,
  Zap
} from "lucide-react";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the demonstration
const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "Hello! I'm Dyad, your AI coding agent. What would you like to build today?",
  }
];

const MOCK_FILES = [
  { name: "package.json", icon: <Code2 className="w-4 h-4 text-blue-400" /> },
  { name: "src/app/page.tsx", icon: <Layout className="w-4 h-4 text-purple-400" /> },
  { name: "src/components/ui/button.tsx", icon: <Zap className="w-4 h-4 text-yellow-400" /> },
  { name: "public/logo.svg", icon: <Globe className="w-4 h-4 text-green-400" /> },
];

export default function AgentPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsBuilding(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `I've analyzed your request: "${input}". I'm now generating the necessary components and logic.`,
        isGenerating: true 
      }]);
      
      setTimeout(() => {
        setIsBuilding(false);
        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, isGenerating: false, content: "Done! I've updated the project files. You can see the changes in the preview panel." }];
        });
      }, 2000);
    }, 800);
  };

  return (
    <div className="h-screen bg-[#050505] text-zinc-300 overflow-hidden flex flex-col font-sans selection:bg-blue-500/30">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-zinc-900 flex items-center justify-between px-4 bg-[#0a0a0a]/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">Dyad Agent</span>
          </div>
          <Separator orientation="vertical" className="h-6 bg-zinc-800" />
          <div className="flex items-center gap-2 px-2 py-1 bg-zinc-900/50 rounded-md border border-zinc-800">
            <Rocket className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-medium text-zinc-400">My Awesome Project</span>
            <ChevronRight className="w-3 h-3 text-zinc-600" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">Live Preview</span>
          </div>
          <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hover:bg-zinc-900">
            <History className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hover:bg-zinc-900">
            <Settings className="w-4 h-4" />
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 h-8 px-4 rounded-full text-xs font-bold transition-all shadow-lg shadow-white/5">
            Deploy
          </Button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 overflow-hidden relative">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar: Navigation & Files */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r border-zinc-900 bg-[#0a0a0a]/30">
            <div className="flex flex-col h-full">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                  <Input 
                    placeholder="Search files..." 
                    className="h-8 pl-8 bg-zinc-900/50 border-zinc-800 text-xs focus:ring-1 focus:ring-blue-500/50"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-auto px-2">
                <div className="mb-4">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Files</span>
                    <Plus className="w-3.5 h-3.5 text-zinc-500 hover:text-white cursor-pointer" />
                  </div>
                  <div className="space-y-0.5">
                    {MOCK_FILES.map(file => (
                      <div 
                        key={file.name} 
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-900/80 cursor-pointer group transition-colors"
                      >
                        {file.icon}
                        <span className="text-sm text-zinc-400 group-hover:text-zinc-200 truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">History</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-900/80 cursor-pointer group transition-colors">
                      <History className="w-3.5 h-3.5 text-zinc-600" />
                      <span className="text-sm text-zinc-500 group-hover:text-zinc-400">Initial Setup</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-zinc-900">
                <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-medium text-zinc-300 truncate">Developer</span>
                    <span className="text-[10px] text-zinc-600 truncate">Pro Plan</span>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-transparent hover:bg-blue-500/20 transition-colors" />

          {/* Center: Chat & Editor Area */}
          <ResizablePanel defaultSize={45}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} className="bg-[#050505]">
                <div className="flex flex-col h-full">
                  <ScrollArea className="flex-1 p-6">
                    <div className="max-w-3xl mx-auto space-y-6 pb-20">
                      <AnimatePresence>
                        {messages.map((msg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              msg.role === "assistant" 
                              ? "bg-blue-600/20 text-blue-400 border border-blue-600/30" 
                              : "bg-zinc-800 text-zinc-400"
                            }`}>
                              {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>
                            <div className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : ""}`}>
                              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                msg.role === "assistant" 
                                ? "bg-zinc-900/50 text-zinc-300 border border-zinc-800" 
                                : "bg-blue-600 text-white"
                              }`}>
                                {msg.content}
                                {msg.isGenerating && (
                                  <div className="flex gap-1 mt-3">
                                    <motion.div 
                                      animate={{ scale: [1, 1.2, 1] }} 
                                      transition={{ repeat: Infinity, duration: 1 }} 
                                      className="w-1.5 h-1.5 rounded-full bg-blue-500" 
                                    />
                                    <motion.div 
                                      animate={{ scale: [1, 1.2, 1] }} 
                                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} 
                                      className="w-1.5 h-1.5 rounded-full bg-blue-500" 
                                    />
                                    <motion.div 
                                      animate={{ scale: [1, 1.2, 1] }} 
                                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} 
                                      className="w-1.5 h-1.5 rounded-full bg-blue-500" 
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 relative">
                    <div className="max-w-3xl mx-auto">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-focus-within:opacity-100 opacity-0 transition-opacity" />
                        <div className="relative bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-2 focus-within:border-zinc-700 transition-all shadow-2xl">
                          <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                              }
                            }}
                            placeholder="What do you want to build?"
                            className="w-full bg-transparent border-none focus:ring-0 text-sm text-zinc-200 placeholder:text-zinc-600 resize-none px-3 py-2 min-h-[60px]"
                          />
                          <div className="flex items-center justify-between mt-2 px-2 pb-1">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                                <Command className="w-4 h-4" />
                              </Button>
                            </div>
                            <Button 
                              onClick={handleSend}
                              disabled={!input.trim() || isBuilding}
                              className="h-8 w-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white p-0 flex items-center justify-center shadow-lg shadow-blue-500/20 disabled:bg-zinc-800 disabled:text-zinc-600"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-4 mt-3">
                        <p className="text-[10px] text-zinc-600 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Built with local privacy in mind
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle className="h-1 bg-transparent hover:bg-blue-500/20 transition-colors" />

              {/* Console/Terminal */}
              <ResizablePanel defaultSize={30} className="bg-[#020202] border-t border-zinc-900">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 px-4 h-10 border-b border-zinc-900/50">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Terminal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layout className="w-3.5 h-3.5 text-zinc-700" />
                      <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider">Output</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 font-mono text-xs text-zinc-500 overflow-auto">
                    <div className="flex gap-2 mb-1">
                      <span className="text-blue-500">➜</span>
                      <span className="text-zinc-400">~/my-awesome-project</span>
                      <span className="text-zinc-600">git:(main)</span>
                    </div>
                    <div className="text-zinc-600">Ready to build...</div>
                    {isBuilding && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-zinc-400">Compiling components...</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                          <span className="text-zinc-400">Updating tailwind configuration...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-transparent hover:bg-blue-500/20 transition-colors" />

          {/* Right Panel: Preview / Code */}
          <ResizablePanel defaultSize={35} className="bg-[#0a0a0a]/50">
            <div className="flex flex-col h-full">
              <div className="h-10 border-b border-zinc-900 flex items-center justify-between px-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="h-full bg-transparent border-none gap-4">
                    <TabsTrigger value="preview" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent text-xs font-bold uppercase tracking-widest text-zinc-500 data-[state=active]:text-white">
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent text-xs font-bold uppercase tracking-widest text-zinc-500 data-[state=active]:text-white">
                      Code
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-white">
                    <Globe className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-white">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 p-0 overflow-hidden relative">
                {activeTab === "preview" ? (
                  <div className="w-full h-full bg-white rounded-tl-xl overflow-hidden m-2 border border-zinc-800 flex items-center justify-center text-zinc-400 font-medium italic">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-6 h-6 text-zinc-300 fill-zinc-300" />
                      </div>
                      <p className="text-zinc-500 text-sm">App preview will appear here</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full p-6 font-mono text-sm overflow-auto">
                    <pre className="text-zinc-400">
                      <code>{`import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="p-6 flex justify-between">
        <div className="font-bold text-xl">BRAND</div>
        <button className="bg-white text-black px-4 py-2 rounded">
          Get Started
        </button>
      </nav>
      <main className="max-w-4xl mx-auto mt-20 text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          Build faster with AI
        </h1>
      </main>
    </div>
  );
}`}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}

function ExternalLink(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
