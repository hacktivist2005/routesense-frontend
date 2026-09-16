import React from "react";
import {
  Activity,
  Gauge,
  Route,
  ShieldCheck,
} from "lucide-react";

const HealthScoreCard = ({ healthMetrics }) => {
  const metrics = healthMetrics || {};

  const overall = metrics.overall ?? 0;
  const connectivity = metrics.connectivity ?? 0;
  const latency = metrics.latency ?? 0;
  const routeStability = metrics.route_stability ?? 0;

  const getHealthLabel = (score) => {
    if (score >= 90) return "Excellent Network Health";
    if (score >= 75) return "Healthy Network";
    if (score >= 60) return "Moderate Network Health";
    if (score >= 40) return "Network Issues Detected";

    return "Poor Network Health";
  };

  const MetricBar = ({
    icon,
    label,
    value,
  }) => {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
              {icon}
            </div>

            <span className="text-sm font-medium text-white/70">
              {label}
            </span>

          </div>

          <span className="text-sm font-bold text-white">
            {value}
          </span>

        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">

          <div
            className="h-full rounded-full bg-white transition-all duration-700"
            style={{
              width: `${value}%`,
            }}
          />

        </div>

      </div>
    );
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0b0f19]/80 p-6 shadow-2xl md:p-8">

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
              <Activity className="h-5 w-5 text-white" />
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Network Health
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Composite network performance analysis
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
          Live Analysis
        </div>

      </div>

      {/* Overall Score */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">

        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.025] p-7">

          <div className="relative flex h-40 w-40 items-center justify-center">

  {/* Background Ring */}
  <svg
    className="absolute h-40 w-40 -rotate-90"
    viewBox="0 0 120 120"
  >
    <circle
      cx="60"
      cy="60"
      r="52"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      className="text-white/[0.07]"
    />

    {/* Dynamic Health Ring */}
    <circle
      cx="60"
      cy="60"
      r="52"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
      className="text-white transition-all duration-1000"
      strokeDasharray={`${2 * Math.PI * 52}`}
      strokeDashoffset={`${2 * Math.PI * 52 * (1 - overall / 100)}`}
    />
  </svg>

  {/* Score */}
  <div className="relative z-10 text-center">

    <div className="text-5xl font-black tracking-tight text-white">
      {overall}
    </div>

    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
      / 100
    </div>

  </div>

</div>

          <h3 className="mt-5 text-center text-sm font-semibold text-white">
            {getHealthLabel(overall)}
          </h3>

        </div>

        {/* Metrics */}
        <div className="grid gap-4">

          <MetricBar
            icon={<ShieldCheck className="h-4 w-4 text-white" />}
            label="Connectivity"
            value={connectivity}
          />

          <MetricBar
            icon={<Gauge className="h-4 w-4 text-white" />}
            label="Latency"
            value={latency}
          />

          <MetricBar
            icon={<Route className="h-4 w-4 text-white" />}
            label="Route Stability"
            value={routeStability}
          />

        </div>

      </div>

      {/* Formula */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">

        <p className="text-xs leading-relaxed text-white/35">
          Health score combines connectivity, latency and route
          stability to provide a unified network performance
          assessment.
        </p>

      </div>

    </section>
  );
};

export default HealthScoreCard;