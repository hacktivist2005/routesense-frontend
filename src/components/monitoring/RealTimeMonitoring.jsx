import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Loader2,
  Play,
  Radio,
  Square,
  Wifi,
  XCircle,
} from "lucide-react";

import { checkLocalAgent } from "../../services/api";

const API_URL = "http://127.0.0.1:5000/api/analyze";

function RealTimeMonitoring() {
  const [target, setTarget] = useState("");
  const [intervalSeconds, setIntervalSeconds] = useState(5);

  const [monitoring, setMonitoring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agentConnected, setAgentConnected] = useState(false);

  const [currentData, setCurrentData] = useState(null);
  const [history, setHistory] = useState([]);
  const [events, setEvents] = useState([]);

  const [error, setError] = useState("");

  const intervalRef = useRef(null);
  const previousDataRef = useRef(null);

  // -----------------------------------------
  // Run Network Check
  // -----------------------------------------

  const runCheck = async () => {
  if (!target.trim()) {
    setError("Please enter a domain or IP address.");
    return false;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: target.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || "Network monitoring check failed."
      );
    }

    const now = new Date();

    const check = {
      time: now.toLocaleTimeString(),
      timestamp: now.getTime(),
      latency: data.ping?.average_latency ?? null,
      packetLoss: data.ping?.packet_loss ?? null,
      hops: data.traceroute?.hop_count ?? null,
      health:
        data.analysis?.health_metrics?.overall ?? null,
    };

    setCurrentData(data);

    setHistory((previous) => {
      const updated = [check, ...previous];

      return updated.slice(0, 10);
    });

    detectChanges(data);

    return true;

  } catch (err) {
    console.error(err);

    setError(
      err.message ||
        "Unable to connect to RouteSense backend."
    );

    addEvent(
      "critical",
      "Monitoring check failed."
    );

    return false;

  } finally {
    setLoading(false);
  }
};

  // -----------------------------------------
  // Detect Network Changes
  // -----------------------------------------

  const detectChanges = (data) => {
    const previous = previousDataRef.current;

    if (!previous) {
      addEvent(
        "success",
        "Initial network state captured."
      );

      previousDataRef.current = data;
      return;
    }

    const previousLatency =
      previous.ping?.average_latency;

    const currentLatency =
      data.ping?.average_latency;

    const previousLoss =
      previous.ping?.packet_loss ?? 0;

    const currentLoss =
      data.ping?.packet_loss ?? 0;

    const previousHops =
      previous.traceroute?.hop_count;

    const currentHops =
      data.traceroute?.hop_count;

    // Latency change

    if (
      previousLatency !== null &&
      currentLatency !== null &&
      previousLatency !== undefined &&
      currentLatency !== undefined
    ) {
      const difference =
        currentLatency - previousLatency;

      if (difference >= 10) {
        addEvent(
          "warning",
          `Latency increased by ${difference.toFixed(
            2
          )} ms.`
        );
      } else if (difference <= -10) {
        addEvent(
          "success",
          `Latency improved by ${Math.abs(
            difference
          ).toFixed(2)} ms.`
        );
      }
    }

    // Packet loss

    if (
      currentLoss > 0 &&
      previousLoss === 0
    ) {
      addEvent(
        "warning",
        `Packet loss detected: ${currentLoss}%.`
      );
    }

    if (
      currentLoss === 0 &&
      previousLoss > 0
    ) {
      addEvent(
        "success",
        "Packet loss returned to 0%."
      );
    }

    // Route change

const previousRoute =
  previous.traceroute?.hops || [];

const currentRoute =
  data.traceroute?.hops || [];

const maxRouteLength = Math.max(
  previousRoute.length,
  currentRoute.length
);

let routeChanged = false;

for (let i = 0; i < maxRouteLength; i++) {
  const previousHop =
    previousRoute[i]?.ip_address || null;

  const currentHop =
    currentRoute[i]?.ip_address || null;

  if (previousHop !== currentHop) {
    routeChanged = true;
    break;
  }
}

if (routeChanged) {
  addEvent(
    "info",
    "Network route changed. One or more hop addresses differ from the previous check."
  );
}

    // Route stability

    if (
      data.analysis?.health_metrics
        ?.route_stability !== undefined &&
      previous.analysis?.health_metrics
        ?.route_stability !== undefined
    ) {
      const previousStability =
        previous.analysis.health_metrics
          .route_stability;

      const currentStability =
        data.analysis.health_metrics
          .route_stability;

      if (
        currentStability <
        previousStability
      ) {
        addEvent(
          "warning",
          "Route stability decreased."
        );
      }
    }

    previousDataRef.current = data;
  };

  // -----------------------------------------
  // Add Event
  // -----------------------------------------

  const addEvent = (type, message) => {
    const event = {
      type,
      message,
      time: new Date().toLocaleTimeString(),
    };

    setEvents((previous) => {
      return [event, ...previous].slice(0, 8);
    });
  };

  // -----------------------------------------
  // Start Monitoring
  // -----------------------------------------

  const startMonitoring = async () => {
  if (!target.trim()) {
    setError("Please enter a domain or IP address.");
    return;
  }

  clearInterval(intervalRef.current);
  intervalRef.current = null;

  setMonitoring(true);
  setHistory([]);
  setEvents([]);
  setCurrentData(null);
  previousDataRef.current = null;

  await runCheck();
};

  // -----------------------------------------
  // Stop Monitoring
  // -----------------------------------------

  const stopMonitoring = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setMonitoring(false);

    addEvent(
      "info",
      "Real-time monitoring stopped."
    );
  };

  // -----------------------------------------
// Local Agent Connection
// -----------------------------------------

useEffect(() => {
  const checkAgent = async () => {
    const agent = await checkLocalAgent();
    setAgentConnected(agent.connected);
  };

  checkAgent();

  const interval = setInterval(checkAgent, 5000);

  return () => clearInterval(interval);
}, []);


  // -----------------------------------------
  // Cleanup
  // -----------------------------------------

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // -----------------------------------------
  // Restart interval when changed
  // -----------------------------------------

  useEffect(() => {
  if (!monitoring) {
    return;
  }

  let cancelled = false;
  let timeoutId = null;

  const scheduleNextCheck = async () => {
    if (cancelled) {
      return;
    }

    await runCheck();

    if (cancelled) {
      return;
    }

    timeoutId = setTimeout(
      scheduleNextCheck,
      intervalSeconds * 1000
    );
  };

  timeoutId = setTimeout(
    scheduleNextCheck,
    intervalSeconds * 1000
  );

  return () => {
    cancelled = true;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = null;
  };
}, [monitoring, intervalSeconds]);

  // -----------------------------------------
  // Helpers
  // -----------------------------------------

  const getEventIcon = (type) => {
    if (type === "success") {
      return (
        <CheckCircle2
          size={15}
          className="text-emerald-400"
        />
      );
    }

    if (type === "warning") {
      return (
        <AlertTriangle
          size={15}
          className="text-amber-400"
        />
      );
    }

    if (type === "critical") {
      return (
        <XCircle
          size={15}
          className="text-red-400"
        />
      );
    }

    return (
      <Activity
        size={15}
        className="text-cyan-400"
      />
    );
  };

  const getHealthLabel = (score) => {
    if (score === null || score === undefined) {
      return "--";
    }

    if (score >= 90) {
      return "Excellent";
    }

    if (score >= 70) {
      return "Good";
    }

    if (score >= 50) {
      return "Degraded";
    }

    return "Critical";
  };

  return (
    <section className="relative px-6 pb-24">
      <div className="mx-auto max-w-6xl">

        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-white/[0.025] p-6 shadow-2xl backdrop-blur-xl md:p-10">

          {/* Background Glow */}

          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]" />

          {/* Header */}

          <div className="relative mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                  <Radio
                    size={16}
                    className={
                      monitoring
                        ? "animate-pulse"
                        : ""
                    }
                  />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Real-Time Monitoring
                </span>

              </div>

              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Monitor Network Behaviour
              </h2>

              <p className="mt-2 max-w-xl text-sm text-slate-500">
                Continuously observe latency, packet loss,
                route changes and network health.
              </p>

            </div>

            <div
              className={`flex w-fit items-center gap-2 rounded-full border px-3 py-2 ${
                monitoring
                  ? "border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-300"
                  : "border-white/[0.08] bg-white/[0.02] text-slate-500"
              }`}
            >

              <div className="flex flex-wrap items-center gap-3">

  {/* Local Agent Status */}

  <div
    className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 ${
      agentConnected
        ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400"
        : "border-red-400/20 bg-red-400/[0.06] text-red-400"
    }`}
  >
    <span
      className={`h-2.5 w-2.5 rounded-full ${
        agentConnected
          ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
          : "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]"
      }`}
    />

    <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
      {agentConnected
        ? "Local Agent Connected"
        : "Local Agent Offline"}
    </span>
  </div>

  {/* Monitoring Status */}

  <div
    className={`flex w-fit items-center gap-2 rounded-full border px-3 py-2 ${
      monitoring
        ? "border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-300"
        : "border-white/[0.08] bg-white/[0.02] text-slate-500"
    }`}
  >
    <span
      className={`h-2 w-2 rounded-full ${
        monitoring
          ? "animate-pulse bg-emerald-400"
          : "bg-slate-600"
      }`}
    />

    <span className="text-xs font-medium">
      {monitoring
        ? "Monitoring Active"
        : "Monitoring Stopped"}
    </span>
  </div>

</div>

            </div>

          </div>

          {/* Controls */}

          <div className="relative rounded-2xl border border-white/[0.07] bg-black/20 p-5">

            <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">

              {/* Target */}

              <div>

                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Target
                </label>

                <input
                  type="text"
                  value={target}
                  onChange={(e) => {
                    setTarget(e.target.value);
                    setError("");
                  }}
                  disabled={monitoring}
                  placeholder="Enter domain or IP address..."
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>

              {/* Interval */}

              <div>

                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Interval
                </label>

                <select
                  value={intervalSeconds}
                  onChange={(e) =>
                    setIntervalSeconds(
                      Number(e.target.value)
                    )
                  }
                  disabled={monitoring}
                  className="h-[46px] rounded-xl border border-white/[0.08] bg-slate-950/70 px-4 text-sm text-slate-300 outline-none focus:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value={5}>
                    5 seconds
                  </option>
                  <option value={10}>
                    10 seconds
                  </option>
                  <option value={15}>
                    15 seconds
                  </option>
                  <option value={30}>
                    30 seconds
                  </option>
                </select>

              </div>

              {/* Button */}

              <div className="flex items-end">

                {!monitoring ? (
                  <button
                    onClick={startMonitoring}
                    disabled={loading}
                    className="flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                  >
                    {loading ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <Play size={16} />
                    )}

                    Start Monitoring
                  </button>
                ) : (
                  <button
                    onClick={stopMonitoring}
                    className="flex h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.05] px-6 text-sm font-bold text-red-300 transition hover:bg-red-400/10 md:w-auto"
                  >
                    <Square size={15} />

                    Stop Monitoring
                  </button>
                )}

              </div>

            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-400/10 bg-red-400/[0.04] p-3">

                <XCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <p className="text-xs text-red-300/70">
                  {error}
                </p>

              </div>
            )}

          </div>

          {/* Current Metrics */}

          {currentData && (
            <div className="relative mt-6">

              <div className="mb-4 flex items-center justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                    Current Network State
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-white">
                    {currentData.target}
                  </h3>

                </div>

                {loading && (
                  <Loader2
                    size={17}
                    className="animate-spin text-cyan-400"
                  />
                )}

              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <MonitoringMetric
                  icon={Clock3}
                  label="Latency"
                  value={
                    currentData.ping
                      ?.average_latency ?? "--"
                  }
                  unit="ms"
                />

                <MonitoringMetric
                  icon={Wifi}
                  label="Packet Loss"
                  value={
                    currentData.ping
                      ?.packet_loss ?? "--"
                  }
                  unit="%"
                />

                <MonitoringMetric
                  icon={RouteIcon}
                  label="Route Hops"
                  value={
                    currentData.traceroute
                      ?.hop_count ?? "--"
                  }
                  unit=""
                />

                <MonitoringMetric
                  icon={Activity}
                  label="Health"
                  value={
                    currentData.analysis
                      ?.health_metrics
                      ?.overall ?? "--"
                  }
                  unit="/100"
                  subtitle={getHealthLabel(
                    currentData.analysis
                      ?.health_metrics
                      ?.overall
                  )}
                />

              </div>

            </div>
          )}

          {/* History */}

          {history.length > 0 && (
            <div className="relative mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Activity
                    size={17}
                    className="text-cyan-400"
                  />

                  <h4 className="text-sm font-semibold text-white">
                    Monitoring History
                  </h4>

                </div>

                <span className="text-[10px] text-slate-600">
                  {history.length} checks
                </span>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>
                    <tr className="border-b border-white/[0.06]">

                      <th className="px-3 py-3 text-[10px] uppercase tracking-wider text-slate-600">
                        Time
                      </th>

                      <th className="px-3 py-3 text-[10px] uppercase tracking-wider text-slate-600">
                        Latency
                      </th>

                      <th className="px-3 py-3 text-[10px] uppercase tracking-wider text-slate-600">
                        Loss
                      </th>

                      <th className="px-3 py-3 text-[10px] uppercase tracking-wider text-slate-600">
                        Hops
                      </th>

                      <th className="px-3 py-3 text-[10px] uppercase tracking-wider text-slate-600">
                        Health
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {history.map((item) => (
                      <tr
                        key={item.timestamp}
                        className="border-b border-white/[0.04] last:border-0"
                      >

                        <td className="px-3 py-3 font-mono text-xs text-slate-500">
                          {item.time}
                        </td>

                        <td className="px-3 py-3 text-xs text-slate-300">
                          {item.latency !== null
                            ? `${item.latency} ms`
                            : "--"}
                        </td>

                        <td className="px-3 py-3 text-xs text-slate-300">
                          {item.packetLoss !== null
                            ? `${item.packetLoss}%`
                            : "--"}
                        </td>

                        <td className="px-3 py-3 text-xs text-slate-300">
                          {item.hops ?? "--"}
                        </td>

                        <td className="px-3 py-3 text-xs font-semibold text-cyan-400">
                          {item.health !== null
                            ? `${item.health}/100`
                            : "--"}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* Events */}

          {events.length > 0 && (
            <div className="relative mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">

              <div className="mb-4 flex items-center gap-2">

                <AlertTriangle
                  size={17}
                  className="text-cyan-400"
                />

                <h4 className="text-sm font-semibold text-white">
                  Monitoring Events
                </h4>

              </div>

              <div className="space-y-2">

                {events.map((event, index) => (
                  <div
                    key={`${event.time}-${index}`}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-black/20 p-3"
                  >

                    <div className="mt-0.5">
                      {getEventIcon(event.type)}
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-xs text-slate-300">
                        {event.message}
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-slate-600">
                        {event.time}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          )}

          {/* Empty State */}

          {!currentData &&
            !monitoring &&
            history.length === 0 && (
              <div className="relative mt-6 rounded-2xl border border-white/[0.06] bg-black/20 p-10 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
                  <Radio size={22} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white">
                  Monitoring Ready
                </h3>

                <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-600">
                  Enter a domain or IP address and start
                  monitoring to continuously observe
                  network behaviour.
                </p>

              </div>
            )}

        </div>
      </div>
    </section>
  );
}

// -----------------------------------------
// Monitoring Metric
// -----------------------------------------

function MonitoringMetric({
  icon: Icon,
  label,
  value,
  unit,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-cyan-400/10">

      <div className="flex items-center gap-2">

        <Icon
          size={16}
          className="text-cyan-400"
        />

        <span className="text-[10px] uppercase tracking-wider text-slate-600">
          {label}
        </span>

      </div>

      <div className="mt-3 flex items-end gap-1">

        <span className="text-2xl font-bold text-white">
          {value}
        </span>

        <span className="mb-1 text-xs text-cyan-400">
          {unit}
        </span>

      </div>

      {subtitle && (
        <p className="mt-1 text-[10px] text-slate-500">
          {subtitle}
        </p>
      )}

    </div>
  );
}

// -----------------------------------------
// Route Icon Alias
// -----------------------------------------

function RouteIcon(props) {
  return (
    <Activity {...props} />
  );
}

export default RealTimeMonitoring;