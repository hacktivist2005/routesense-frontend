import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  Network,
  Target,
  Sparkles,
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe2,
  X,
  Terminal,
  Cpu,
} from "lucide-react";

// Animation Variants Setup
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeModal, setActiveModal] = useState(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const conceptsData = [
    {
      id: "tcp-ip",
      icon: Network,
      tag: "CORE PROTOCOL",
      title: "TCP / IP Telemetry",
      text: "Deep analysis of payload traversal across interconnected routing layers and autonomous systems.",
      details: {
        subtitle: "Low-Level Packet Analysis Engine",
        overview:
          "Processes ingress and egress packets directly via raw socket layer inspection, bypasses network driver overhead, and visualizes transport dynamics.",
        bullets: [
          "SYN/ACK handshakes sub-millisecond measurement",
          "Autonomous System (AS) boundary mapping",
          "Zero-copy socket buffers reading payload metadata",
        ],
        terminalLogs: [
          "[TRACE]: Socket binded on eth0 interface",
          "[PROBE]: SYN sent to Target (104.21.55.2)",
          "[ACK]: Response received in 0.42ms",
          "[TELEMETRY]: Zero-loss packet pipeline sustained",
        ],
      },
    },
    {
      id: "icmp-rtt",
      icon: Activity,
      tag: "HIGH PRECISION",
      title: "ICMP & RTT Tracking",
      text: "Sub-millisecond resolution of reachability metrics, round-trip dynamics, and localized packet drops.",
      details: {
        subtitle: "High Frequency Probe Synthesizer",
        overview:
          "Executes micro-burst ICMP echo requests to pinpoint packet loss locations, link jitter variations, and routing loops instantly.",
        bullets: [
          "Nanosecond-level precision timer hooks",
          "Multipath hop-by-hop latency breakdown",
          "Automatic detection of silent packet drops",
        ],
        terminalLogs: [
          "[ICMP]: Echo probe burst #1024 dispatched",
          "[HOP 01]: 192.168.1.1 — 0.18ms",
          "[HOP 02]: 10.240.0.1 — 1.12ms",
          "[ALERT]: Hop 03 latency jitter +14ms anomaly flagged",
        ],
      },
    },
    {
      id: "algo-engine",
      icon: BrainCircuit,
      tag: "SMART ENGINE",
      title: "Algorithmic Analysis",
      text: "Automated pattern recognition turning raw, multi-hop traceroute data into concise diagnostic actions.",
      details: {
        subtitle: "Heuristic Anomaly Detector",
        overview:
          "Runs machine-learned path routing heuristics on real-time data streams to separate routine network noise from critical link failures.",
        bullets: [
          "Dynamic SLA threshold violation alerts",
          "Automated route flap correlation algorithms",
          "Human-readable root-cause diagnostic reports",
        ],
        terminalLogs: [
          "[ENGINE]: Ingesting multi-hop telemetry stream",
          "[EVAL]: Comparing current path vs 24h baseline",
          "[MATCH]: BGP route change pattern detected",
          "[STATUS]: Diagnostic synthesis complete — 0 issues blocking",
        ],
      },
    },
  ];

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#020617] px-6 py-24 text-slate-100 selection:bg-cyan-500 selection:text-black"
    >
      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 40%)`,
        }}
      />

      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[140px]" />

      {/* Grid Mesh Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Top Badges Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan-300 backdrop-blur-xl">
            <Sparkles size={14} className="animate-pulse text-cyan-400" />
            <span>ABOUT ROUTESENSE</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            System Engine Active
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-8 max-w-4xl"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Turning network complexity into{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              clarity.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-lg leading-relaxed text-slate-400 md:text-2xl"
          >
            RouteSense bridges the gap between raw networking diagnostics and
            actionable visual intelligence, providing real-time visibility across
            distributed infrastructures.
          </motion.p>
        </motion.div>

        {/* Live Metrics Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-slate-900/30 p-6 backdrop-blur-md md:grid-cols-4"
        >
          {[
            { label: "Route Precision", value: "99.9%", icon: Target },
            { label: "Analysis Latency", value: "<1ms", icon: Zap },
            { label: "Global Nodes", value: "120+", icon: Globe2 },
            { label: "Diagnostic Accuracy", value: "Zero-Loss", icon: ShieldCheck },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-2"
              >
                <div className="flex items-center gap-2 text-slate-400">
                  <Icon size={16} className="text-cyan-400" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <div className="mt-2 text-2xl font-black tracking-tight text-white md:text-3xl">
                  {stat.value}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Split Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
          className="group relative mt-16 grid overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 lg:grid-cols-2"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Problem Card */}
          <div className="relative border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-inner shadow-cyan-500/20 backdrop-blur-xl"
            >
              <Target size={26} />
            </motion.div>

            <h2 className="text-3xl font-bold tracking-tight text-white">
              The Problem
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-400">
              Traditional networking utilities often dump raw technical output.
              Translating verbose logs into operational insights requires deep domain
              knowledge and exhausting manual triage.
            </p>

            <p className="mt-4 text-base leading-relaxed text-slate-400">
              When latency spikes occur or packets vanish, pinpointing the exact hop
              causing degradation under operational pressure becomes a frustrating bottleneck.
            </p>
          </div>

          {/* Approach Card */}
          <div className="relative p-8 md:p-12">
            <motion.div
              whileHover={{ rotate: -12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-inner shadow-cyan-500/20 backdrop-blur-xl"
            >
              <BrainCircuit size={26} />
            </motion.div>

            <h2 className="text-3xl font-bold tracking-tight text-white">
              Our Approach
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-400">
              RouteSense continuously evaluates network topology hop-by-hop, converting 
              unstructured telemetry into dynamic visual narratives and instant alerts.
            </p>

            <div className="mt-8 space-y-3.5">
              {[
                "Map complex topology paths dynamically",
                "Track granular hop-by-hop latency and loss",
                "Automatically flag anomaly spikes & degradations",
                "Synthesize clear, human-readable insights",
              ].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 text-sm font-medium text-slate-200"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                    <CheckCircle2 size={16} />
                  </div>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Concepts Cards Section */}
        <section className="mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Under The Hood
              </p>
              <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Engineering beneath the surface.
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              Built on low-level socket abstractions and custom analytical heuristics to deliver sub-millisecond route diagnostics.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3"
          >
            {conceptsData.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => setActiveModal(item)}
                  className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/30 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-500/50 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-cyan-500/20"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 transition-colors duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-black">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full border border-white/5 bg-slate-800/80 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-slate-400">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {item.text}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-cyan-400">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      Learn architecture
                    </span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </div>

      {/* Interactive Modal Drawer */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#070d1e] p-6 text-slate-100 shadow-2xl shadow-cyan-500/20 md:p-8"
            >
              {/* Top Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                    <activeModal.icon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                      {activeModal.tag}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {activeModal.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="rounded-full border border-white/10 bg-slate-800/80 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Subtitle & Overview */}
              <div className="mt-5 space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Cpu size={16} />
                  <span>{activeModal.details.subtitle}</span>
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {activeModal.details.overview}
                </p>
              </div>

              {/* Key Architecture Highlights */}
              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Architecture Specifications:
                </span>
                <div className="space-y-2">
                  {activeModal.details.bullets.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-200"
                    >
                      <CheckCircle2 size={15} className="text-cyan-400" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Terminal Output Box */}
              <div className="mt-6 rounded-xl border border-cyan-500/20 bg-slate-950 p-4 font-mono text-xs text-cyan-300/90 shadow-inner">
                <div className="mb-2.5 flex items-center gap-2 text-[10px] text-slate-500">
                  <Terminal size={12} className="text-cyan-400" />
                  <span>LIVE ARCHITECTURE ENGINE SIMULATOR</span>
                </div>
                <div className="space-y-1">
                  {activeModal.details.terminalLogs.map((log, idx) => (
                    <p key={idx} className="opacity-90">
                      {log}
                    </p>
                  ))}
                </div>
              </div>

              {/* Close Action CTA */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default About;