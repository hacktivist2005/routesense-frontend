import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  BarChart3,
  Globe2,
  Network,
  Radar,
  Route,
  ShieldCheck,
  Zap,
  X,
  ArrowRight,
  Terminal,
  Cpu,
  Sparkles,
} from "lucide-react";

// Framer Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Features() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const features = [
    {
      icon: Globe2,
      number: "01",
      title: "DNS Intelligence",
      description:
        "Resolve domains, inspect destination addressing and prepare targets for deeper network analysis.",
      modalData: {
        tagline: "Ultra-Fast Resolution Layer",
        overview:
          "Executes concurrent DNS queries across multi-region resolver pools to analyze propagation speeds and record integrity.",
        bullets: [
          "A, AAAA, MX, CNAME, and TXT record resolution",
          "EDNS client subnet parsing for edge location analysis",
          "Sub-millisecond resolver query timing metrics",
        ],
        logs: [
          "[DNS]: Querying target domain example.com...",
          "[RESOLVER]: 1.1.1.1 replied in 0.38ms (A -> 93.184.216.34)",
          "[EDNS]: Subnet geo-located: Frankfurt, DE",
        ],
      },
    },
    {
      icon: Route,
      number: "02",
      title: "Traceroute Analysis",
      description:
        "Discover the sequence of network hops between your system and the target destination.",
      modalData: {
        tagline: "Multipath Hop Mapping",
        overview:
          "Sends variable TTL UDP and ICMP packet sequences to uncover complex topology routes and hidden gateway transitions.",
        bullets: [
          "Granular hop-by-hop IP identification",
          "Autonomous System (AS) number and organization mapping",
          "Multipath BGP route discovery",
        ],
        logs: [
          "[TRACEROUTE]: Max TTL set to 30, probe interval 10ms",
          "[HOP 01]: 192.168.1.1 (Gateway) - 0.2ms",
          "[HOP 04]: 80.81.192.1 (DE-CIX IXP) - 11.4ms",
        ],
      },
    },
    {
      icon: Activity,
      number: "03",
      title: "Latency Analytics",
      description:
        "Measure round-trip time and visualize how response performance changes across the route.",
      modalData: {
        tagline: "Real-time RTT Profiler",
        overview:
          "Continuously streams micro-burst probes to build real-time latency heatmaps and uncover periodic response spikes.",
        bullets: [
          "Sub-millisecond RTT jitter tracking",
          "Historical latency baseline comparisons",
          "Statistical percentile calculation (p50, p95, p99)",
        ],
        logs: [
          "[LATENCY]: Initiating 100-packet RTT stream",
          "[STATS]: min=8.2ms, avg=9.1ms, max=22.4ms",
          "[PERC]: p95 confidence interval established",
        ],
      },
    },
    {
      icon: Network,
      number: "04",
      title: "Hop Intelligence",
      description:
        "Inspect every hop individually to understand how traffic behaves throughout the path.",
      modalData: {
        tagline: "Deep Node Telemetry",
        overview:
          "Isolates individual router interfaces along the path to evaluate localized queuing delays and bufferbloat.",
        bullets: [
          "Reverse DNS lookup for router hostnames",
          "GeoIP lookup per intermediary gateway node",
          "Localized packet loss vs downstream degradation isolation",
        ],
        logs: [
          "[NODE]: Inspecting Hop 06 (core-router.net.internal)",
          "[STATUS]: Packet loss at hop: 0.0%, RTT stability: 99.8%",
          "[GEO]: Frankfurt am Main, Germany",
        ],
      },
    },
    {
      icon: Radar,
      number: "05",
      title: "Bottleneck Detection",
      description:
        "Identify significant latency increases and potential degradation points automatically.",
      modalData: {
        tagline: "Automated Path Diagnostics",
        overview:
          "Uses heuristic comparison to flag severe latency steps between adjacent nodes and pinpoint congested backbones.",
        bullets: [
          "Automatic delta latency threshold alerts",
          "Congestion identification across peering points",
          "Silent packet drop isolation algorithms",
        ],
        logs: [
          "[SCAN]: Analyzing hop-to-hop latency deltas",
          "[WARN]: Latency jumped +45ms between Hop 04 and Hop 05",
          "[DIAGNOSIS]: Congested transatlantic link detected",
        ],
      },
    },
    {
      icon: BarChart3,
      number: "06",
      title: "Route Comparison",
      description:
        "Compare network paths and performance metrics to understand routing differences.",
      modalData: {
        tagline: "Dual-Path Differential Analyzer",
        overview:
          "Executes side-by-side path evaluations to compare primary vs backup network provider routing efficiency.",
        bullets: [
          "Side-by-side traceroute path alignment",
          "Delta analysis on total hop count and overall RTT",
          "Route flapping and path stability score",
        ],
        logs: [
          "[COMPARE]: Evaluating Route A (ISP1) vs Route B (ISP2)",
          "[PATH A]: 9 hops, 14ms total RTT",
          "[PATH B]: 12 hops, 28ms total RTT -> Route A optimal",
        ],
      },
    },
    {
      icon: ShieldCheck,
      number: "07",
      title: "Network Health",
      description:
        "Combine multiple network metrics into a clear and understandable health assessment.",
      modalData: {
        tagline: "Unified System Score Engine",
        overview:
          "Synthesizes raw telemetry metrics into a unified 0-100 network health index with automated incident reporting.",
        bullets: [
          "Combined score derived from RTT, loss, and jitter",
          "Automated severity grading (Healthy, Degraded, Critical)",
          "Exportable diagnostic health reports",
        ],
        logs: [
          "[HEALTH]: Aggregating global telemetry inputs",
          "[SCORE]: Network Health Index: 98/100 (Optimal)",
          "[SUMMARY]: Zero critical path issues detected",
        ],
      },
    },
    {
      icon: Zap,
      number: "08",
      title: "Real-Time Monitoring",
      description:
        "Observe network behaviour continuously and detect changes as they happen.",
      modalData: {
        tagline: "Continuous Telemetry Daemon",
        overview:
          "Runs background diagnostic daemons that alert on instant path shifts, unexpected BGP rerouting, or degradation events.",
        bullets: [
          "Configurable polling frequencies (down to 1s intervals)",
          "Instant route anomaly push notifications",
          "Real-time WebSocket event stream",
        ],
        logs: [
          "[DAEMON]: Live socket monitoring active",
          "[EVENT]: Network path unchanged across 3,600 probes",
          "[SYNC]: WebSocket broadcast connected",
        ],
      },
    },
  ];

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#020617] px-6 py-24 text-white selection:bg-cyan-500 selection:text-black"
    >
      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 40%)`,
        }}
      />

      {/* Ambient Radial Background Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan-300 backdrop-blur-xl">
            <Sparkles size={14} className="animate-pulse text-cyan-400" />
            <span>PLATFORM CAPABILITIES</span>
          </div>

          <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
            Network visibility,{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              reimagined.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
            A complete toolkit for discovering, measuring, and understanding
            network paths without drowning in raw terminal output.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerStagger}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setActiveFeature(feature)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-500/40 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-inner shadow-cyan-500/20 transition-colors duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-black">
                      <Icon size={22} />
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-600 group-hover:text-cyan-400 transition-colors">
                      {feature.number}
                    </span>
                  </div>

                  <h2 className="mt-8 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-300">
                    {feature.title}
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                    {feature.description}
                  </p>

                  <div className="mt-7 h-px w-full bg-white/5" />

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-cyan-400">
                    <span>Explore capability</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Interactive Modal Inspection Box */}
      <AnimatePresence>
        {activeFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#070d1e] p-6 text-slate-100 shadow-2xl shadow-cyan-500/20 md:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                    <activeFeature.icon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                      CAPABILITY #{activeFeature.number}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {activeFeature.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveFeature(null)}
                  className="rounded-full border border-white/10 bg-slate-800/80 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Subtitle & Overview */}
              <div className="mt-5 space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  <Cpu size={16} />
                  <span>{activeFeature.modalData.tagline}</span>
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {activeFeature.modalData.overview}
                </p>
              </div>

              {/* Specifications List */}
              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Technical Specifications:
                </span>
                <div className="space-y-2">
                  {activeFeature.modalData.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-200"
                    >
                      <div className="flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Terminal Output Drawer */}
              <div className="mt-6 rounded-xl border border-cyan-500/20 bg-slate-950 p-4 font-mono text-xs text-cyan-300/90 shadow-inner">
                <div className="mb-2.5 flex items-center gap-2 text-[10px] text-slate-500">
                  <Terminal size={12} className="text-cyan-400" />
                  <span>CAPABILITY TELEMETRY SIMULATOR</span>
                </div>
                <div className="space-y-1">
                  {activeFeature.modalData.logs.map((log, idx) => (
                    <p key={idx} className="opacity-90">
                      {log}
                    </p>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setActiveFeature(null)}
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

export default Features;