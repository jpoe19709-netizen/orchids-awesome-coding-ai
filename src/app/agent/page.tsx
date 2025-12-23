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
  Layers,
  FolderTree,
  MessageSquare,
  Cpu,
  Monitor,
  Database,
  Shield,
  Activity,
  Github,
  Maximize2,
  ExternalLink,
  ChevronDown,
  Scale,
  ShieldAlert
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
import { cn } from "@/lib/utils";

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "Ready to build. What are we working on?",
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
  const [activeSidebar, setActiveSidebar] = useState("chat");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoHideSidebar, setAutoHideSidebar] = useState(false);
  const [showEthics, setShowEthics] = useState(true);

  const ETHICS_RULES = [
    { title: "Concise Communication", description: "Minimal text, high density information. Avoid preambles and summaries.", icon: <Zap className="w-3 h-3" /> },
    { title: "Technical Precision", description: "Code is primary. Explanations are secondary and only when requested.", icon: <Code2 className="w-3 h-3" /> },
    { title: "Zero Hallucination", description: "If unknown, use Web_Search. Never guess API signatures or library versions.", icon: <Search className="w-3 h-3" /> },
    { title: "Security First", description: "Proactive vulnerability scanning. No plain-text secrets or insecure patterns.", icon: <ShieldCheck className="w-3 h-3" /> },
    { title: "Performance MCP", description: "Optimized Model Context Protocol for low-latency, context-aware reasoning.", icon: <Cpu className="w-3 h-3" /> },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsBuilding(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Analyzing your request. I'll scaffold the components and set up the routes for you.`,
        isGenerating: true 
      }]);
      
      setTimeout(() => {
        setIsBuilding(false);
        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, isGenerating: false, content: "Deployment successful. You can now view the changes in the preview panel." }];
        });
      }, 2000);
    }, 600);
  };

  return (
    <div className="h-screen bg-[#050505] text-zinc-400 overflow-hidden flex flex-col font-sans antialiased selection:bg-zinc-800">
      {/* Top Navigation Bar */}
      <header className="h-11 border-b border-zinc-900 flex items-center justify-between px-3 bg-[#050505] z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
              <Box className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="font-semibold text-white tracking-tight text-xs">Orchids</span>
          </div>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-zinc-900 transition-colors cursor-pointer group">
            <span className="text-[11px] font-medium text-zinc-500 group-hover:text-zinc-300">Project / My App</span>
            <ChevronDown className="w-2.5 h-2.5 text-zinc-700" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-zinc-900/50 border border-zinc-800/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Live</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-white hover:bg-zinc-900">
              <Github className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-white hover:bg-zinc-900">
              <Settings className="w-3.5 h-3.5" />
            </Button>
          </div>
          <Button className="bg-white text-black hover:bg-zinc-200 h-7 px-3 rounded-md text-[11px] font-bold transition-all shadow-sm">
            Deploy
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Leftmost Icon Bar */}
        <aside className="w-11 border-r border-zinc-900 bg-[#050505] flex flex-col items-center py-4 gap-4 z-30">
          <div 
            onClick={() => setActiveSidebar("chat")}
            className={cn(
              "w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors",
              activeSidebar === "chat" ? "bg-white text-black" : "text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400"
            )}
          >
            <MessageSquare className="w-4 h-4" />
          </div>
          <div 
            onClick={() => setActiveSidebar("files")}
            className={cn(
              "w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors",
              activeSidebar === "files" ? "bg-white text-black" : "text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400"
            )}
          >
            <FolderTree className="w-4 h-4" />
          </div>
          <div 
            onClick={() => setActiveSidebar("ethics")}
            className={cn(
              "w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors",
              activeSidebar === "ethics" ? "bg-white text-black" : "text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400"
            )}
          >
            <Scale className="w-4 h-4" />
          </div>
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-600 cursor-pointer hover:bg-zinc-900 hover:text-zinc-400 transition-colors">
            <Database className="w-4 h-4" />
          </div>
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-600 cursor-pointer hover:bg-zinc-900 hover:text-zinc-400 transition-colors">
            <Shield className="w-4 h-4" />
          </div>
          <div className="mt-auto mb-2">
            <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 cursor-pointer hover:text-white transition-colors">
              <User className="w-3.5 h-3.5" />
            </div>
          </div>
        </aside>

        {/* Main Resizable Panes */}
        <main className="flex-1 overflow-hidden relative">
          <ResizablePanelGroup direction="horizontal">
            {/* Explorer Panel */}
            {!sidebarCollapsed && (
              <ResizablePanel defaultSize={15} minSize={12} maxSize={20} className="border-r border-zinc-900 bg-[#050505]">
                <div className="flex flex-col h-full">
                  <div className="h-9 px-3 flex items-center justify-between border-b border-zinc-900/50">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.1em]">
                      {activeSidebar === "files" ? "Files" : activeSidebar === "ethics" ? "Ethics MCP" : "Explorer"}
                    </span>
                    <Plus className="w-3 h-3 text-zinc-600 hover:text-zinc-400 cursor-pointer" />
                  </div>
                  <div className="flex-1 overflow-auto p-2">
                    {activeSidebar === "files" ? (
                      <div className="space-y-0.5">
                        {MOCK_FILES.map(file => (
                          <div 
                            key={file.name} 
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-900 group cursor-pointer transition-colors"
                          >
                            {file.icon}
                            <span className="text-[12px] text-zinc-500 group-hover:text-zinc-300 truncate font-medium">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : activeSidebar === "ethics" ? (
                      <div className="space-y-4 p-2">
                        {ETHICS_RULES.map((rule, i) => (
                          <div key={i} className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                                {rule.icon}
                              </div>
                              <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-tight">{rule.title}</span>
                            </div>
                            <p className="text-[10px] text-zinc-600 leading-relaxed pl-7">
                              {rule.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <Bot className="w-8 h-8 text-zinc-800 mb-2" />
                        <span className="text-[10px] text-zinc-600 font-medium italic">Active Context: {activeSidebar}</span>
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            )}

            <ResizableHandle className="w-[1px] bg-zinc-900 hover:bg-zinc-700 transition-colors" />

            {/* Chat Panel */}
            <ResizablePanel defaultSize={35}>
              <div className="flex flex-col h-full bg-[#050505]">
                <div className="h-9 px-4 flex items-center border-b border-zinc-900/50 bg-[#080808]">
                  <Bot className="w-3.5 h-3.5 mr-2 text-zinc-500" />
                  <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">Agent</span>
                  <div className="ml-auto flex items-center gap-2">
                     <span className="text-[9px] font-medium text-zinc-600 uppercase tracking-tighter bg-zinc-900 px-1.5 py-0.5 rounded">Gpt-4o</span>
                  </div>
                </div>

                <ScrollArea className="flex-1 px-6">
                  <div className="max-w-xl mx-auto py-8 space-y-10">
                    {messages.map((msg, i) => (
                      <div key={i} className="group relative">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "w-5 h-5 mt-0.5 rounded flex items-center justify-center shrink-0 border transition-all",
                            msg.role === "assistant" 
                              ? "bg-white border-white" 
                              : "bg-zinc-900 border-zinc-800"
                          )}>
                            {msg.role === "assistant" 
                              ? <Box className="w-3 h-3 text-black" />
                              : <User className="w-3 h-3 text-zinc-400" />
                            }
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                {msg.role === "assistant" ? "Orchids" : "You"}
                              </span>
                              <span className="text-[9px] text-zinc-700 font-medium">10:3{i} AM</span>
                            </div>
                            <div className="text-[13px] leading-relaxed text-zinc-300 antialiased">
                              {msg.content}
                              {msg.isGenerating && (
                                <div className="flex gap-1.5 mt-4">
                                  <div className="w-1 h-1 rounded-full bg-zinc-700 animate-pulse" />
                                  <div className="w-1 h-1 rounded-full bg-zinc-700 animate-pulse delay-75" />
                                  <div className="w-1 h-1 rounded-full bg-zinc-700 animate-pulse delay-150" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-zinc-900/50 bg-[#050505]">
                  <div className="max-w-xl mx-auto relative">
                    <div className="relative bg-[#0a0a0a] border border-zinc-900 rounded-xl overflow-hidden shadow-2xl transition-all focus-within:border-zinc-700">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        placeholder="Ask Orchids to build..."
                        className="w-full bg-transparent border-none focus:ring-0 text-[13px] text-zinc-200 placeholder:text-zinc-700 resize-none px-4 py-3 min-h-[50px] max-h-[200px]"
                      />
                      <div className="flex items-center justify-between px-3 pb-2">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-600 hover:text-zinc-300">
                            <Plus className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-600 hover:text-zinc-300">
                            <Globe className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <Button 
                          onClick={handleSend}
                          disabled={!input.trim() || isBuilding}
                          className="h-6 px-3 rounded bg-zinc-100 text-black hover:bg-white disabled:opacity-20 transition-all font-bold text-[10px] uppercase tracking-wider"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle className="w-[1px] bg-zinc-900 hover:bg-zinc-700 transition-colors" />

            {/* Preview/Editor Panel */}
            <ResizablePanel defaultSize={50}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={70} className="bg-black flex flex-col">
                  <div className="h-9 border-b border-zinc-900 flex items-center justify-between px-3 bg-[#080808]">
                    <div className="flex items-center gap-1 bg-zinc-900/50 p-0.5 rounded-lg border border-zinc-800/50">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setActiveTab("preview")}
                        className={cn(
                          "h-6 px-3 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                          activeTab === "preview" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                        )}
                      >
                        Preview
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setActiveTab("code")}
                        className={cn(
                          "h-6 px-3 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                          activeTab === "code" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                        )}
                      >
                        Code
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                         <span className="text-[10px] font-medium text-zinc-500">localhost:3000</span>
                         <ExternalLink className="w-2.5 h-2.5 text-zinc-700" />
                       </div>
                       <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-white">
                         <Maximize2 className="w-3 h-3" />
                       </Button>
                    </div>
                  </div>

                  <div className="flex-1 bg-[#0a0a0a] relative overflow-hidden flex flex-col">
                    {activeTab === "preview" ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                        <div className="relative mb-6">
                           <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full" />
                           <div className="relative w-12 h-12 border border-zinc-800 rounded-xl flex items-center justify-center bg-[#050505]">
                             <Monitor className="w-6 h-6 text-zinc-600" />
                           </div>
                        </div>
                        <h3 className="text-zinc-200 text-sm font-medium mb-1">Previewing Project</h3>
                        <p className="text-zinc-500 text-[11px] max-w-[200px] leading-relaxed">
                          Your changes will appear here as soon as they are compiled.
                        </p>
                      </div>
                    ) : (
                      <div className="w-full h-full p-6 font-mono text-[12px] leading-relaxed overflow-auto bg-[#050505]">
                        <pre className="text-zinc-500 space-y-1">
                          <code>
                            <span className="text-zinc-700 italic">// src/app/page.tsx</span>{"\n"}
                            <span className="text-blue-400">import</span> React <span className="text-blue-400">from</span> <span className="text-emerald-400">'react'</span>;{"\n"}
                            {"\n"}
                            <span className="text-blue-400">export default function</span> <span className="text-yellow-200">App</span>() {"{"}{"\n"}
                            {"  "}<span className="text-blue-400">return</span> ({"\n"}
                            {"    "}&lt;<span className="text-blue-300">div</span> <span className="text-zinc-300">className</span>=<span className="text-emerald-400">"min-h-screen bg-black text-white p-8"</span>&gt;{"\n"}
                            {"      "}&lt;<span className="text-blue-300">h1</span> <span className="text-zinc-300">className</span>=<span className="text-emerald-400">"text-2xl font-bold"</span>&gt;Hello World&lt;/<span className="text-blue-300">h1</span>&gt;{"\n"}
                            {"    "}&lt;/<span className="text-blue-300">div</span>&gt;{"\n"}
                            {"  "});{"\n"}
                            {"}"}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>
                </ResizablePanel>

                <ResizableHandle className="h-[1px] bg-zinc-900 hover:bg-zinc-700 transition-colors" />

                {/* Console Panel */}
                <ResizablePanel defaultSize={30} className="bg-[#050505]">
                  <div className="flex flex-col h-full">
                    <div className="h-8 px-3 flex items-center gap-4 border-b border-zinc-900 bg-[#080808]">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-zinc-600" />
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Console</span>
                      </div>
                      <div className="flex items-center gap-1.5 ml-4">
                        <Activity className="w-3 h-3 text-emerald-600" />
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Process Running</span>
                      </div>
                    </div>
                    <div className="flex-1 p-3 font-mono text-[10px] text-zinc-600 overflow-auto">
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <span className="text-zinc-800">orchids@cloud:</span>
                          <span className="text-emerald-900/50 italic">~ (next dev)</span>
                        </div>
                        <div className="text-zinc-700">✓ Ready in 2.1s</div>
                        <div className="text-zinc-700">○ Compiling /page...</div>
                        {isBuilding && (
                           <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-blue-900/50 italic"
                           >
                            &gt; Updating server components...
                           </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-6 border-t border-zinc-900 bg-[#050505] flex items-center justify-between px-3 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Rocket className="w-3 h-3 text-emerald-500" />
            <span className="text-[9px] font-medium text-zinc-500">v1.2.4-stable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-zinc-700" />
            <span className="text-[9px] font-medium text-zinc-600">Region: us-east-1</span>
          </div>
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            <Scale className="w-2.5 h-2.5 text-emerald-500" />
            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">MCP Active</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
             <span className="text-[9px] font-medium text-zinc-600">UTF-8</span>
           </div>
           <div className="flex items-center gap-1.5">
             <span className="text-[9px] font-medium text-zinc-600">TypeScript</span>
             <ShieldCheck className="w-3 h-3 text-zinc-700" />
           </div>
        </div>
      </footer>
    </div>
  );
}
