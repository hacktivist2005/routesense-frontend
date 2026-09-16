import React, { useState } from "react";
import NetworkAnalyzer from "../components/analyzer/NetworkAnalyzer";
import RouteComparison from "../components/comparison/RouteComparison";
import RealTimeMonitoring from "../components/monitoring/RealTimeMonitoring";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Network,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
  Search,
  GitCompare,
  Radio
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function Home() {
  // Tab State: 'analyzer' | 'comparison' | 'monitoring'
  const [activeTab, setActiveTab] = useState("analyzer");

  const tabs = [
    { id: "analyzer", label: "Live Trace & Analyzer", icon: Search, badge: "Core Tool" },
    { id: "comparison", label: "Route Comparison", icon: GitCompare, badge: "Analysis" },
    { id: "monitoring", label: "Real-Time Health", icon: Radio, badge: "Live Metrics" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white selection:bg-cyan-500 selection:text-black">

      {/* Dynamic Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/[0.08] blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[450px] w-[450px] rounded-full bg-indigo-600/[0.08] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative px-4 pb-6 pt-16 md:px-6 md:pb-8 md:pt-20">
        <div className="mx-auto max-w-6xl">
          
          {/* Header Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 backdrop-blur-xl">
              <Sparkles size={12} className="animate-pulse text-cyan-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                Real-Time Telemetry Suite
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl md:text-6xl">
              See the path.{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                Understand the network.
              </span>
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm">
              Instantly trace network routes, compare hop topographies, and monitor telemetry bottlenecks in real-time.
            </p>
          </motion.div>

          {/* Trust Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-400">
            {[
              "No Database Required",
              "Real-Time Diagnostics",
              "Built For Engineers",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-[11px] font-medium"
              >
                <CheckCircle2 size={13} className="text-cyan-400" />
                {item}
              </div>
            ))}
          </div>

          {/* TAB SWITCHER CONTROL */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex w-full max-w-xl items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 p-1.5 backdrop-blur-xl sm:w-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all sm:flex-none sm:px-5 ${
                      isActive
                        ? "text-cyan-300 shadow-lg shadow-cyan-500/10"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute inset-0 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-indigo-500/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon size={15} className={`relative z-10 ${isActive ? "text-cyan-400" : ""}`} />
                    <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                    <span className="relative z-10 sm:hidden">{tab.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE TOOL PANEL WITH ANIMATED TRANSITION */}
          <div className="mt-6 min-h-[420px]">
            <AnimatePresence mode="wait">
              {activeTab === "analyzer" && (
                <motion.div
                  key="analyzer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <NetworkAnalyzer />
                </motion.div>
              )}

              {activeTab === "comparison" && (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <RouteComparison />
                </motion.div>
              )}

              {activeTab === "monitoring" && (
                <motion.div
                  key="monitoring"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <RealTimeMonitoring />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="border-t border-white/[0.08] bg-slate-950/30 px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center md:text-left">
            <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
              Core Intelligence
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">
              Everything you need to analyze network paths.
            </h2>
          </div>

          <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe2,
                title: "DNS Intelligence",
                text: "Resolve domain records and target IP addresses seamlessly before launching telemetry analysis.",
              },
              {
                icon: Route,
                title: "Path Discovery",
                text: "Visualize the entire network travel path from origin client to remote endpoint hop-by-hop.",
              },
              {
                icon: Activity,
                title: "Latency Analytics",
                text: "Accurately measure round-trip ping latency times and identify jitter variations instantly.",
              },
              {
                icon: Radar,
                title: "Bottleneck Detection",
                text: "Highlight network degradation and anomalous packet loss points across transit hops.",
              },
              {
                icon: Network,
                title: "Route Comparison",
                text: "Compare historical routing topologies and identify performance changes over time.",
              },
              {
                icon: ShieldCheck,
                title: "Network Health Score",
                text: "Synthesize complex telemetry parameters into a unified, actionable health score.",
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group relative rounded-xl border border-white/[0.08] bg-slate-900/40 p-4 backdrop-blur-xl transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-900/70"
                >
                  <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-colors group-hover:bg-cyan-400 group-hover:text-slate-950">
                    <Icon size={16} />
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PIPELINE STEPS */}
      <section className="border-y border-white/[0.08] bg-slate-950/60 px-4 py-8 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            ["01", "DNS Resolution", "Resolve destinations instantly"],
            ["02", "Route Discovery", "Map network paths in real-time"],
            ["03", "Hop Diagnostics", "Inspect intermediate nodes"],
            ["04", "Smart Diagnosis", "Identify bottlenecks automatically"],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-lg border border-white/5 bg-slate-900/20 p-3 sm:border-none sm:bg-transparent"
            >
              <p className="font-mono text-[11px] font-bold text-cyan-400">
                {number}
              </p>
              <h3 className="mt-1 text-xs font-bold text-white">{title}</h3>
              <p className="mt-0.5 text-[10px] text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-slate-900/50 to-slate-950 p-6 backdrop-blur-2xl md:p-8">
          <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="mb-1.5 inline-flex items-center gap-1.5 text-cyan-300">
                <Zap size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Diagnostic Engine
                </span>
              </div>

              <h2 className="text-xl font-extrabold md:text-2xl">
                Stop guessing where the bottleneck is.
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Trace routing paths, detect packet drops, and optimize infrastructure latency in seconds.
              </p>
            </div>

            <Link
              to="/features"
              className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:bg-cyan-300"
            >
              Learn More
              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;