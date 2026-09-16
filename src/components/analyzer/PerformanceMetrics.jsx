import {
  Activity,
  Clock3,
  Gauge,
  Route,
  Wifi,
} from "lucide-react";

function PerformanceMetrics({ result }) {
  const healthMetrics = result?.analysis?.health_metrics;

  const metrics = [
    {
      label: "Connectivity",
      value: healthMetrics?.connectivity ?? "--",
      unit: "/ 100",
      icon: Wifi,
    },
    {
      label: "Latency",
      value: healthMetrics?.latency ?? "--",
      unit: "/ 100",
      icon: Clock3,
    },
    {
      label: "Route Stability",
      value: healthMetrics?.route_stability ?? "--",
      unit: "/ 100",
      icon: Route,
    },
    {
      label: "Average Latency",
      value: result?.ping?.average_latency ?? "--",
      unit: "ms",
      icon: Gauge,
    },
    {
      label: "Packet Loss",
      value: result?.ping?.packet_loss ?? "--",
      unit: "%",
      icon: Activity,
    },
    {
      label: "Network Hops",
      value: result?.traceroute?.hop_count ?? "--",
      unit: "",
      icon: Route,
    },
  ];

  return (
    <div className="mt-6">

      {/* Section Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
          <Activity size={16} />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">
            Performance Metrics
          </h4>

          <p className="text-[10px] text-slate-600">
            Detailed network performance indicators
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.025]"
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Icon size={17} />
                </div>

                <span className="text-[10px] uppercase tracking-wider text-slate-700">
                  Live
                </span>
              </div>

              {/* Value */}
              <div className="mt-5 flex items-end gap-1">
                <span className="text-2xl font-bold text-white">
                  {metric.value}
                </span>

                {metric.unit && (
                  <span className="mb-1 text-xs text-cyan-400">
                    {metric.unit}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-slate-600">
                {metric.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PerformanceMetrics;