"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Code2, 
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
  Zap,
  Box,
  Layers
} from "lucide-react";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "I'm Dyad. What are we building today?",
  }
];

const MOCK_FILES = [
  { name: "package.json", icon: <Code2 className="w-3.5 h-3.5 text-zinc-500" /> },
  { name: "src/app/page.tsx", icon: <Layout className="w-3.5 h-3.5 text-zinc-500" /> },
  { name: "src/components/ui/button.tsx", icon: <Zap className="w-3.5 h-3.5 text-zinc-500" /> },
  { name: "public/logo.svg", icon: <Globe className="w-3.5 h-3.5 text-zinc-500" /> },
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

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Analyzing "${input}"... I'll start by scaffolding the core components.`,
        isGenerating: true 
      }]);
      
      setTimeout(() => {
        setIsBuilding(false);
        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, isGenerating: false, content: "Update complete. The changes are now live in the preview." }];
        });
      }, 2000);
    }, 600);
  };

  return (
    <div className="h-screen bg-black text-zinc-400 overflow-hidden flex flex-col font-sans antialiased selection:bg-white/10 selection:text-white">
      {/* Sleek Header */}
      <header className="h-12 border-b border-zinc-900 flex items-center justify-between px-4 bg-black z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <Box className="w-4 h-4 text-black" />
            </div>
            <span className="font-semibold text-white tracking-tight text-sm">Dyad</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900/30">
            <Rocket className="w-3 h-3 text-zinc-500" />
            <span className="text-[11px] font-medium text-zinc-500">v0.1.0</span>
            <ChevronRight className="w-2.5 h-2.5 text-zinc-700" />
            <span className="text-[11px] font-medium text-zinc-300">Main</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-zinc-600">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Connected
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-900">
              <History className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-900">
              <Settings className="w-3.5 h-3.5" />
            </Button>
          </div>
          <Button className="bg-white text-black hover:bg-zinc-200 h-7 px-3 rounded text-[11px] font-bold transition-all">
            Publish
          </Button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 overflow-hidden relative">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={18} minSize={15} maxSize={25} className="border-r border-zinc-900 bg-black">
            <div className="flex flex-col h-full">
              <div className="p-3">
                <div className="relative group">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
                  <Input 
                    placeholder="Find files..." 
                    className="h-7 pl-8 bg-zinc-900/20 border-zinc-900 text-[11px] placeholder:text-zinc-700 focus:border-zinc-700 transition-all rounded-sm"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="px-2 py-1">
                  <div className="flex items-center justify-between px-2 py-1 mb-1">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Explorer</span>
                    <Plus className="w-3 h-3 text-zinc-600 hover:text-zinc-400 cursor-pointer" />
                  </div>
                  <div className="space-y-0.5">
                    {MOCK_FILES.map(file => (
                      <div 
                        key={file.name} 
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-sm hover:bg-zinc-900/50 cursor-pointer group transition-colors"
                      >
                        {file.icon}
                        <span className="text-[12px] text-zinc-500 group-hover:text-zinc-300 truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-2 py-4">
                  <div className="flex items-center gap-2 px-2 py-1 mb-1">
                    <Layers className="w-3 h-3 text-zinc-600" />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Components</span>
                  </div>
                  <div className="px-2 py-1 text-[11px] text-zinc-700 italic">No custom components yet</div>
                </div>
              </div>

              <div className="p-3 border-t border-zinc-900">
                <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-zinc-900/30 transition-colors cursor-pointer">
                  <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center">
                    <User className="w-3 h-3 text-zinc-400" />
                  </div>
                  <span className="text-[11px] font-medium text-zinc-500">Workspace</span>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-[1px] bg-zinc-900 hover:bg-zinc-700 transition-colors" />

          {/* Center: Chat Area */}
          <ResizablePanel defaultSize={42}>
            <div className="flex flex-col h-full bg-[#050505]">
              <ScrollArea className="flex-1">
                <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="w-3.5 h-3.5 text-zinc-400" />
                          </div>
                        )}
                        <div className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : ""}`}>
                          <div className={`text-[13px] leading-relaxed ${
                            msg.role === "assistant" 
                            ? "text-zinc-300" 
                            : "bg-zinc-900 text-white px-3 py-2 rounded-lg border border-zinc-800"
                          }`}>
                            {msg.content}
                            {msg.isGenerating && (
                              <div className="flex gap-1.5 mt-3">
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-1 rounded-full bg-zinc-500" />
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1 h-1 rounded-full bg-zinc-500" />
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1 h-1 rounded-full bg-zinc-500" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-zinc-900/50 bg-[#050505]">
                <div className="max-w-2xl mx-auto relative group">
                  <div className="relative bg-zinc-900/40 border border-zinc-900 rounded-lg p-2 focus-within:border-zinc-800 transition-all">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Ask Dyad to build something..."
                      className="w-full bg-transparent border-none focus:ring-0 text-[13px] text-zinc-200 placeholder:text-zinc-700 resize-none px-2 py-1 min-h-[40px] max-h-[200px]"
                    />
                    <div className="flex items-center justify-between mt-1 px-1">
                      <div className="flex items-center gap-0.5">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-white hover:bg-zinc-800">
                          <Plus className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-white hover:bg-zinc-800">
                          <Command className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <Button 
                        onClick={handleSend}
                        disabled={!input.trim() || isBuilding}
                        className="h-7 w-7 rounded bg-white text-black hover:bg-zinc-200 p-0 flex items-center justify-center disabled:opacity-20 disabled:hover:bg-white"
                      >
                        <Send className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-center mt-3">
                    <p className="text-[10px] text-zinc-700 flex items-center gap-1.5 uppercase tracking-tighter font-medium">
                      <ShieldCheck className="w-3 h-3" /> Secure development environment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-[1px] bg-zinc-900 hover:bg-zinc-700 transition-colors" />

          {/* Right Panel: Preview & Terminal */}
          <ResizablePanel defaultSize={40}>
            <ResizablePanelGroup direction="vertical">
              {/* Preview */}
              <ResizablePanel defaultSize={65} className="bg-black flex flex-col">
                <div className="h-9 border-b border-zinc-900 flex items-center justify-between px-3">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                    <TabsList className="h-full bg-transparent border-none gap-4">
                      <TabsTrigger value="preview" className="h-full rounded-none border-b border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent text-[10px] font-bold uppercase tracking-wider text-zinc-600 data-[state=active]:text-white transition-none">
                        Preview
                      </TabsTrigger>
                      <TabsTrigger value="code" className="h-full rounded-none border-b border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent text-[10px] font-bold uppercase tracking-wider text-zinc-600 data-[state=active]:text-white transition-none">
                        Editor
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-600 hover:text-white">
                      <Globe className="w-3 h-3" />
                    </Button>
                    <div className="w-[1px] h-3 bg-zinc-800 mx-1" />
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-600 hover:text-white">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">
                  {activeTab === "preview" ? (
                    <div className="text-center group">
                      <div className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:border-zinc-700 transition-colors">
                        <Play className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 fill-zinc-900" />
                      </div>
                      <p className="text-zinc-700 text-[11px] font-medium uppercase tracking-widest">Awaiting project build</p>
                    </div>
                  ) : (
                    <div className="w-full h-full p-4 font-mono text-[12px] leading-relaxed overflow-auto selection:bg-white/5">
                      <pre className="text-zinc-500">
                        <code>{`import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  );
}`}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </ResizablePanel>

              <ResizableHandle className="h-[1px] bg-zinc-900 hover:bg-zinc-700 transition-colors" />

              {/* Terminal */}
              <ResizablePanel defaultSize={35} className="bg-black">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 px-3 h-8 border-b border-zinc-900 bg-zinc-900/10">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-zinc-600" />
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Logs</span>
                    </div>
                  </div>
                  <div className="flex-1 p-3 font-mono text-[11px] text-zinc-600 overflow-auto">
                    <div className="flex gap-2 mb-1">
                      <span className="text-zinc-800">dyad@workspace:</span>
                      <span className="text-zinc-500">~/app</span>
                    </div>
                    {isBuilding && (
                      <div className="space-y-0.5 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-900">info</span>
                          <span className="text-zinc-500 italic text-[10px]">Processing request...</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-900">done</span>
                          <span className="text-zinc-500 italic text-[10px]">Files synchronized.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
