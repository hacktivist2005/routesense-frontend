import { useState } from "react";
import { analyzeTarget } from "../../services/api";
import RouteVisualization from "./RouteVisualization";
import HealthScoreCard from "./HealthScoreCard";
import DiagnosticsPanel from "./DiagnosticsPanel";
import PerformanceMetrics from "./PerformanceMetrics";
import {
  Activity,
  ArrowRight,
  Globe,
  Loader2,
  Search,
  Server,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Terminal,
  Wifi,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function NetworkAnalyzer() {
  const [target, setTarget] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!target.trim()) {
      setError("Please enter a valid domain or IP address.");
      return;
    }

    setStatus("analyzing");
    setResult(null);
    setError("");

    try {
      const data = await analyzeTarget(target);

      setResult(data);
      setStatus("result");
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Unable to connect to RouteSense diagnostic backend."
      );
      setStatus("error");
    }
  };

  const getInsightIcon = (type) => {
    if (type === "success") return <ShieldCheck size={16} className="text-emerald-400" />;
    if (type === "warning") return <AlertTriangle size={16} className="text-amber-400" />;
    if (type === "critical") return <XCircle size={16} className="text-rose-400" />;
    return <Activity size={16} className="text-cyan-400" />;
  };

  return (
    <section className="relative px-4 pb-16 pt-4 md:px-6 md:pb-24">
      <div className="mx-auto max-w-6xl">

        {/* MAIN GLASS PANEL */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/40 p-5 backdrop-blur-2xl shadow-2xl shadow-cyan-500/5 md:p-8">

          {/* Ambient Decorative Glows */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

          {/* PANEL HEADER */}
          <div className="relative mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-300">
                <Terminal size={13} className="text-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Live Diagnostics Command
                </span>
              </div>

              <h2 className="text-xl font-black text-white md:text-3xl">
                Analyze Network Target
              </h2>

              <p className="mt-1 max-w-lg text-xs text-slate-400">
                Discover hop routing paths, round-trip latency, packet drop rates, and real-time DNS resolution.
              </p>
            </div>

            {/* STATUS BADGE */}
            <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                Engine Ready
              </span>
            </div>
          </div>

          {/* INPUT COMMAND BAR */}
          <div className="relative">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={target}
                  onChange={(e) => {
                    setTarget(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAnalyze();
                  }}
                  placeholder="Enter hostname or IPv4/IPv6 address (e.g. google.com, 8.8.8.8)"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 py-3.5 pl-11 pr-4 font-mono text-xs text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400 focus:bg-slate-950 focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={status === "analyzing"}
                className="group flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "analyzing" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    Run Analysis
                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>

            {/* PRESET QUICK-TARGET CHIPS */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-[11px] text-slate-500">Fast Presets:</span>
              {["google.com", "cloudflare.com", "1.1.1.1", "8.8.8.8"].map(
                (example) => (
                  <button
                    key={example}
                    onClick={() => {
                      setTarget(example);
                      setError("");
                    }}
                    className="rounded-lg border border-white/5 bg-slate-900/60 px-2.5 py-1 font-mono text-[11px] text-slate-400 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {example}
                  </button>
                )
              )}
            </div>
          </div>

          {/* ERROR ALERT */}
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 backdrop-blur-xl"
              >
                <XCircle size={18} className="mt-0.5 shrink-0 text-rose-400" />
                <div>
                  <p className="text-xs font-bold text-rose-200">
                    Telemetry Scan Error
                  </p>
                  <p className="mt-0.5 text-xs text-rose-300/80">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ANALYZING SKELETON LOADER */}
          <AnimatePresence>
            {status === "analyzing" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0 }}
                className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Loader2 size={18} className="animate-spin text-cyan-400" />
                  <div>
                    <p className="text-xs font-bold text-white">
                      Probing Target: <span className="font-mono text-cyan-300">{target}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Executing ICMP traceroute and DNS queries...
                    </p>
                  </div>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-3">
                  {[
                    [Globe, "DNS Query"],
                    [Wifi, "Latency Check"],
                    [Server, "Hop Discovery"],
                  ].map(([Icon, label]) => (
                    <div
                      key={label}
                      className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-slate-950/60 p-3"
                    >
                      <Icon size={15} className="text-cyan-400" />
                      <span className="text-xs font-medium text-slate-300">{label}</span>
                      <Loader2
                        size={12}
                        className="ml-auto animate-spin text-slate-600"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* REAL TELEMETRY RESULT DISPLAY */}
          {status === "result" && result && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              {/* RESULT HEADER CARD */}
              <div className="flex flex-col justify-between gap-3 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                    SCAN COMPLETE
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-black text-white">
                      {result.target}
                    </h3>
                    <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-cyan-300">
                      {result.dns?.ip_address || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <ShieldCheck size={16} />
                  Diagnostics Validated
                </div>
              </div>

              {/* PERFORMANCE METRICS COMPONENT */}
              <PerformanceMetrics result={result} />

              <HealthScoreCard
  healthMetrics={result.analysis?.health_metrics}
/>

              {/* DNS RESOLUTION CARD */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2 text-cyan-300">
                  <Globe size={16} />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    DNS Resolution Details
                  </h4>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoItem label="Resolved Hostname" value={result.dns?.hostname} />
                  <InfoItem label="Target IP Address" value={result.dns?.ip_address} />
                </div>
              </div>

              {/* INSIGHTS LIST */}
              {result.analysis?.insights?.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 backdrop-blur-xl">
                  <div className="mb-3 flex items-center gap-2 text-cyan-300">
                    <Sparkles size={16} />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Network Intelligence Insights
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {result.analysis.insights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/60 p-3"
                      >
                        <div className="mt-0.5 shrink-0">
                          {getInsightIcon(insight.type)}
                        </div>
                        <p className="text-xs leading-relaxed text-slate-300">
                          {insight.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DIAGNOSTICS & VISUALIZATION COMPONENTS */}
              <DiagnosticsPanel diagnostics={result.diagnostics} />

              <RouteVisualization
  hops={result?.traceroute?.hops || []}
  tracerouteSuccess={result?.traceroute?.success || false}
/>

              {/* HOPS TABLE */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Server size={16} />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Intermediate Route Hops
                    </h4>
                  </div>

                  <span className="font-mono text-xs font-bold text-slate-400">
                    {result.traceroute?.hop_count ?? 0} Total Hops
                  </span>
                </div>

                {result.traceroute?.hops?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-slate-500">
                          <th className="py-2.5 px-3">Hop</th>
                          <th className="py-2.5 px-3">Node Address</th>
                          <th className="py-2.5 px-3">Round-Trip Latency</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {result.traceroute.hops.map((hop) => (
                          <tr key={hop.hop} className="hover:bg-slate-900/50 transition-colors">
                            <td className="py-2.5 px-3 font-bold text-cyan-400">
                              #{hop.hop}
                            </td>
                            <td className="py-2.5 px-3 text-slate-300">
                              {hop.ip_address}
                            </td>
                            <td className="py-2.5 px-3">
                              {hop.latency !== null ? (
                                <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-cyan-300">
                                  {hop.latency} ms
                                </span>
                              ) : (
                                <span className="rounded bg-rose-500/10 px-2 py-0.5 text-rose-400">
                                  Timeout / Packet Drop
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4 text-center text-xs text-slate-500">
                    No active intermediate hops recorded for this route.
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}

/* Reusable Info Item Component */
function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/60 p-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-all font-mono text-xs font-semibold text-slate-200">
        {value || "Not Available"}
      </p>
    </div>
  );
}

export default NetworkAnalyzer;