import { useEffect, useState } from "react";
import {
  analyzeTarget,
  checkLocalAgent,
} from "../../services/api";
import {
  ArrowRight,
  Activity,
  Globe,
  GitCompare,
  Loader2,
  Server,
  ShieldCheck,
  AlertTriangle,
  XCircle,
} from "lucide-react";

function RouteComparison() {
  const [targetA, setTargetA] = useState("");
  const [targetB, setTargetB] = useState("");

  const [status, setStatus] = useState("idle");
  const [comparison, setComparison] = useState(null);
  const [error, setError] = useState("");
  const [agentConnected, setAgentConnected] = useState(false);

  useEffect(() => {
  const checkAgent = async () => {
    const agent = await checkLocalAgent();
    setAgentConnected(agent.connected);
  };

  checkAgent();

  const interval = setInterval(checkAgent, 5000);

  return () => clearInterval(interval);
}, []);

  const handleCompare = async () => {
    if (!targetA.trim() || !targetB.trim()) {
      setError("Please enter both network targets.");
      return;
    }

    if (
      targetA.trim().toLowerCase() ===
      targetB.trim().toLowerCase()
    ) {
      setError("Please enter two different targets.");
      return;
    }

    setStatus("comparing");
    setComparison(null);
    setError("");

    try {
      const [resultA, resultB] = await Promise.all([
        analyzeTarget(targetA),
        analyzeTarget(targetB),
      ]);

      setComparison({
        targetA: resultA,
        targetB: resultB,
      });

      setStatus("result");
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to compare network routes."
      );

      setStatus("error");
    }
  };

  return (
    <section className="relative px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-white/[0.025] p-6 shadow-2xl backdrop-blur-xl md:p-10">

          {/* Background Glow */}

          <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/[0.06] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-blue-500/[0.05] blur-[100px]" />

          {/* Header */}

          <div className="relative mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
  <div className="flex items-center gap-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
      <GitCompare size={16} />
    </div>

    <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
      Route Comparison
    </span>
  </div>

  <span
  className={`rounded-full border px-3 py-1 text-[10px] font-semibold ${
    agentConnected
      ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400"
      : "border-red-400/20 bg-red-400/[0.06] text-red-400"
  }`}
>
  {agentConnected
    ? "Local Agent Connected"
    : "Local Agent Offline"}
</span>
</div>

            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Compare Network Paths
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Compare latency, packet loss, route length and
              network health between two destinations.
            </p>
          </div>

          {/* INPUTS */}

          <div className="relative grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">

            {/* Target A */}

            <TargetInput
              label="Target A"
              value={targetA}
              onChange={(value) => {
                setTargetA(value);
                setError("");
              }}
              placeholder="google.com"
            />

            {/* VS */}

            <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/[0.07] bg-black/20 text-xs font-bold text-slate-600 md:flex">
              VS
            </div>

            {/* Target B */}

            <TargetInput
              label="Target B"
              value={targetB}
              onChange={(value) => {
                setTargetB(value);
                setError("");
              }}
              placeholder="cloudflare.com"
            />
          </div>

          {/* Compare Button */}

          <div className="mt-5 flex justify-center md:justify-end">
            <button
              onClick={handleCompare}
              disabled={status === "comparing"}
              className="group flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "comparing" ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Comparing Routes...
                </>
              ) : (
                <>
                  Compare Routes

                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </div>

          {/* ERROR */}

          {status === "error" && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-400/10 bg-red-400/[0.04] p-5">
              <XCircle
                size={20}
                className="mt-0.5 shrink-0 text-red-400"
              />

              <div>
                <p className="text-sm font-semibold text-red-300">
                  Comparison Failed
                </p>

                <p className="mt-1 text-xs text-red-300/60">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* LOADING */}

          {status === "comparing" && (
            <div className="mt-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-6">
              <div className="flex items-center gap-3">
                <Loader2
                  size={20}
                  className="animate-spin text-cyan-400"
                />

                <div>
                  <p className="text-sm font-semibold text-white">
                    Comparing network paths
                  </p>

                  <p className="text-xs text-slate-600">
                    Analyzing both destinations...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* RESULTS */}

          {status === "result" && comparison && (
            <ComparisonResult comparison={comparison} />
          )}
        </div>
      </div>
    </section>
  );
}


/* -------------------------------- */
/* Target Input                     */
/* -------------------------------- */

function TargetInput({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
        {label}
      </label>

      <div className="relative">
        <Globe
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/[0.08] bg-black/20 py-4 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40 focus:bg-cyan-400/[0.02]"
        />
      </div>
    </div>
  );
}


/* -------------------------------- */
/* Comparison Result                */
/* -------------------------------- */

function ComparisonResult({ comparison }) {
  const a = comparison.targetA;
  const b = comparison.targetB;

  const metricsA = getMetrics(a);
  const metricsB = getMetrics(b);

  return (
    <div className="mt-8">

      {/* Result Header */}

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
          <ShieldCheck size={16} />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            Comparison Complete
          </p>

          <p className="text-xs text-slate-600">
            Network performance comparison
          </p>
        </div>
      </div>

      {/* Target Cards */}

      <div className="grid gap-4 md:grid-cols-2">
        <TargetSummary
          target={a}
          label="Target A"
          metrics={metricsA}
        />

        <TargetSummary
          target={b}
          label="Target B"
          metrics={metricsB}
        />
      </div>

      {/* Metric Comparison */}

      <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">

        <div className="mb-5 flex items-center gap-2">
          <Activity
            size={17}
            className="text-cyan-400"
          />

          <h4 className="text-sm font-semibold text-white">
            Performance Comparison
          </h4>
        </div>

        <div className="space-y-3">

          <ComparisonRow
            label="Average Latency"
            valueA={`${metricsA.latency} ms`}
            valueB={`${metricsB.latency} ms`}
            better={
              metricsA.latency < metricsB.latency
                ? "A"
                : metricsB.latency < metricsA.latency
                ? "B"
                : null
            }
          />

          <ComparisonRow
            label="Packet Loss"
            valueA={`${metricsA.packetLoss}%`}
            valueB={`${metricsB.packetLoss}%`}
            better={
              metricsA.packetLoss < metricsB.packetLoss
                ? "A"
                : metricsB.packetLoss < metricsA.packetLoss
                ? "B"
                : null
            }
          />

          <ComparisonRow
            label="Network Hops"
            valueA={metricsA.hops}
            valueB={metricsB.hops}
            better={
              metricsA.hops < metricsB.hops
                ? "A"
                : metricsB.hops < metricsA.hops
                ? "B"
                : null
            }
          />

          <ComparisonRow
            label="Health Score"
            valueA={`${metricsA.health}/100`}
            valueB={`${metricsB.health}/100`}
            better={
              metricsA.health > metricsB.health
                ? "A"
                : metricsB.health > metricsA.health
                ? "B"
                : null
            }
          />

        </div>
      </div>

      {/* Route Difference */}

      <RouteDifference
        targetA={a}
        targetB={b}
      />

    </div>
  );
}


/* -------------------------------- */
/* Target Summary                   */
/* -------------------------------- */

function TargetSummary({
  target,
  label,
  metrics,
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">

      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-600">
            {label}
          </p>

          <h3 className="mt-1 text-lg font-bold text-white">
            {target.target}
          </h3>
        </div>

        <span className="rounded-md border border-cyan-400/10 bg-cyan-400/[0.04] px-2 py-1 font-mono text-xs text-cyan-400">
          {target.dns?.ip_address || "--"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <SmallMetric
          label="Latency"
          value={`${metrics.latency} ms`}
        />

        <SmallMetric
          label="Packet Loss"
          value={`${metrics.packetLoss}%`}
        />

        <SmallMetric
          label="Hops"
          value={metrics.hops}
        />

        <SmallMetric
          label="Health"
          value={`${metrics.health}/100`}
        />

      </div>
    </div>
  );
}


/* -------------------------------- */
/* Small Metric                     */
/* -------------------------------- */

function SmallMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
      <p className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-300">
        {value}
      </p>
    </div>
  );
}


/* -------------------------------- */
/* Comparison Row                   */
/* -------------------------------- */

function ComparisonRow({
  label,
  valueA,
  valueB,
  better,
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-xl border border-white/[0.05] bg-black/20 p-4">

      <div className="text-right">
        <span
          className={`text-sm font-semibold ${
            better === "A"
              ? "text-emerald-400"
              : "text-slate-300"
          }`}
        >
          {valueA}
        </span>
      </div>

      <div className="min-w-[100px] text-center">
        <p className="text-[9px] uppercase tracking-wider text-slate-600">
          {label}
        </p>
      </div>

      <div>
        <span
          className={`text-sm font-semibold ${
            better === "B"
              ? "text-emerald-400"
              : "text-slate-300"
          }`}
        >
          {valueB}
        </span>
      </div>

    </div>
  );
}


/* -------------------------------- */
/* Route Difference                 */
/* -------------------------------- */

function RouteDifference({
  targetA,
  targetB,
}) {
  const hopsA = targetA.traceroute?.hops || [];
  const hopsB = targetB.traceroute?.hops || [];

  const commonLength = Math.min(
    hopsA.length,
    hopsB.length
  );

  const differentRoutes = [];

  for (let i = 0; i < commonLength; i++) {
    const ipA = hopsA[i]?.ip_address;
    const ipB = hopsB[i]?.ip_address;

    // Both hops have no responding IP.
    // This is not considered a route difference.
    if (!ipA && !ipB) {
      continue;
    }

    // Different IP addresses or one side has no hop.
    if (ipA !== ipB) {
      differentRoutes.push({
        hop: i + 1,
        ipA: ipA || "No Hop",
        ipB: ipB || "No Hop",
      });
    }
  }

  // Compare additional hops when route lengths differ.
  if (hopsA.length !== hopsB.length) {
    const longerHops = Math.max(
      hopsA.length,
      hopsB.length
    );

    for (
      let i = commonLength;
      i < longerHops;
      i++
    ) {
      const ipA = hopsA[i]?.ip_address;
      const ipB = hopsB[i]?.ip_address;

      // Ignore positions where both sides have nothing.
      if (!ipA && !ipB) {
        continue;
      }

      differentRoutes.push({
        hop: i + 1,
        ipA: ipA || "No Hop",
        ipB: ipB || "No Hop",
      });
    }
  }

  const differentHops = differentRoutes.length;

  return (
    <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">

      {/* Header */}

      <div className="mb-5 flex items-center gap-2">
        <Server
          size={17}
          className="text-cyan-400"
        />

        <h4 className="text-sm font-semibold text-white">
          Route Difference
        </h4>
      </div>

      {/* Route Summary */}

      <div className="grid gap-3 sm:grid-cols-3">

        <SmallMetric
          label={`${targetA.target} Hops`}
          value={hopsA.length}
        />

        <SmallMetric
          label="Different Route Positions"
          value={differentHops}
        />

        <SmallMetric
          label={`${targetB.target} Hops`}
          value={hopsB.length}
        />

      </div>

      {/* Different Routes */}

      {differentRoutes.length > 0 && (
        <div className="mt-4 space-y-2">

          {differentRoutes.map((route) => (
            <div
              key={route.hop}
              className="grid gap-2 rounded-xl border border-white/[0.05] bg-black/20 p-3 sm:grid-cols-[80px_1fr_1fr]"
            >

              {/* Hop */}

              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  Hop
                </p>

                <p className="mt-1 text-sm font-semibold text-amber-400">
                  {route.hop}
                </p>
              </div>

              {/* Target A */}

              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  {targetA.target}
                </p>

                <p className="mt-1 break-all font-mono text-xs text-slate-300">
                  {route.ipA}
                </p>
              </div>

              {/* Target B */}

              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  {targetB.target}
                </p>

                <p className="mt-1 break-all font-mono text-xs text-slate-300">
                  {route.ipB}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* Route Status */}

      {differentHops > 0 ? (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-4">

          <AlertTriangle
            size={16}
            className="mt-0.5 shrink-0 text-amber-400"
          />

          <p className="text-xs leading-5 text-slate-400">
            The two destinations follow different
            network paths at one or more hop positions.
          </p>

        </div>
      ) : (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">

          <ShieldCheck
            size={16}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <p className="text-xs leading-5 text-slate-400">
            The analyzed route positions are consistent
            between both destinations.
          </p>

        </div>
      )}

    </div>
  );
}


/* -------------------------------- */
/* Extract Metrics                  */
/* -------------------------------- */

function getMetrics(result) {
  return {
    latency:
      result.ping?.average_latency ?? "--",

    packetLoss:
      result.ping?.packet_loss ?? "--",

    hops:
      result.traceroute?.hop_count ?? 0,

    health:
      result.analysis?.health_score ??
      result.analysis?.health_metrics?.overall ??
      0,
  };
}

export default RouteComparison;