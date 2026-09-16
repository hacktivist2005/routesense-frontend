import React from "react";
import {
  Router,
  CircleCheck,
  CircleAlert,
  Zap,
  Server,
  Globe,
} from "lucide-react";

const RouteVisualization = ({ hops = [], tracerouteSuccess = false }) => {
  if (!hops || hops.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <Router className="mx-auto mb-4 h-10 w-10 text-white/30" />

        <h3 className="text-lg font-semibold text-white">
          Route Visualization
        </h3>

        <p className="mt-2 text-sm text-white/40">
          No route data available.
        </p>
      </div>
    );
  }

  const getHopStatus = (hop, index) => {
  if (hop.status === "timeout") {
    return "timeout";
  }

  let previousResponsiveLatency = null;

  for (let i = index - 1; i >= 0; i--) {
    if (
      hops[i]?.latency !== null &&
      hops[i]?.latency !== undefined
    ) {
      previousResponsiveLatency = hops[i].latency;
      break;
    }
  }

  if (
    previousResponsiveLatency !== null &&
    hop.latency !== null &&
    hop.latency !== undefined
  ) {
    const increase =
      hop.latency - previousResponsiveLatency;

    if (increase >= 10) {
      return "spike";
    }
  }

  return "success";
};

  const getStatusIcon = (status) => {
    if (status === "timeout") {
      return <CircleAlert className="h-5 w-5" />;
    }

    if (status === "spike") {
      return <Zap className="h-5 w-5" />;
    }

    return <CircleCheck className="h-5 w-5" />;
  };

  const getStatusText = (status) => {
    if (status === "timeout") {
      return "NO RESPONSE";
    }

    if (status === "spike") {
      return "LATENCY SPIKE";
    }

    return "RESPONSIVE";
  };

  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f19]/80 shadow-2xl">

      {/* Header */}
      <div className="border-b border-white/10 px-6 py-6 md:px-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06] border border-white/10">
                <Router className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Route Visualization
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Hop-by-hop network path analysis
                </p>
              </div>

            </div>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60">
            {hops.length} Hops
          </div>

        </div>
      </div>

      {/* Route */}
      <div className="px-6 py-8 md:px-10">

        {/* Source */}
        <div className="relative flex gap-5">

          <div className="flex flex-col items-center">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.08]">
              <Server className="h-5 w-5 text-white" />
            </div>

            <div className="w-px flex-1 bg-gradient-to-b from-white/30 to-white/10" />

          </div>

          <div className="pb-8">

            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
              Source
            </div>

            <h3 className="mt-1 text-base font-semibold text-white">
              Your Device
            </h3>

            <p className="mt-1 text-sm text-white/40">
              Route origin
            </p>

          </div>

        </div>

        {/* Hops */}
        {hops.map((hop, index) => {

          const status = getHopStatus(
            hop,
            index
          );

          const nextHop = hops[index + 1];

          let latencyIncrease = null;

if (
  status === "spike" &&
  hop.latency !== null &&
  hop.latency !== undefined
) {
  let previousResponsiveLatency = null;

  for (let i = index - 1; i >= 0; i--) {
    if (
      hops[i]?.latency !== null &&
      hops[i]?.latency !== undefined
    ) {
      previousResponsiveLatency = hops[i].latency;
      break;
    }
  }

  if (previousResponsiveLatency !== null) {
    latencyIncrease = (
      hop.latency - previousResponsiveLatency
    ).toFixed(2);
  }
}

          return (
            <div
              key={hop.hop}
              className="relative flex gap-5"
            >

              {/* Timeline */}
              <div className="flex flex-col items-center">

                <div
                  className={`
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-full border transition-all duration-300
                    ${
                      status === "timeout"
                        ? "border-white/20 bg-white/[0.04] text-white/40"
                        : status === "spike"
                        ? "border-white/40 bg-white/[0.12] text-white"
                        : "border-white/20 bg-white/[0.07] text-white"
                    }
                  `}
                >
                  {getStatusIcon(status)}
                </div>

                {nextHop && (
                  <div className="w-px flex-1 bg-gradient-to-b from-white/20 to-white/10" />
                )}

              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pb-8">

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:bg-white/[0.05]">

                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
                          Hop {String(hop.hop).padStart(2, "0")}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/50">
                          {getStatusText(status)}
                        </span>

                      </div>

                      <div className="mt-2">

                        {hop.ip_address ? (
                          <code className="break-all text-sm text-white/80">
                            {hop.ip_address}
                          </code>
                        ) : (
                          <span className="text-sm italic text-white/35">
                            No response from this hop
                          </span>
                        )}

                      </div>

                    </div>

                    <div className="text-left md:text-right">

                      {hop.latency !== null ? (
                        <>
                          <div className="text-lg font-bold text-white">
                            {hop.latency} ms
                          </div>

                          <div className="text-[11px] uppercase tracking-wider text-white/30">
                            Latency
                          </div>
                        </>
                      ) : (
                        <div className="text-sm font-medium text-white/35">
                          Timeout
                        </div>
                      )}

                    </div>

                  </div>

                  {/* Spike Information */}
                  {status === "spike" && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">

                      <div className="flex items-center gap-2">

                        <Zap className="h-4 w-4 text-white" />

                        <span className="text-xs font-semibold text-white">
                          Latency increase detected
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-white/40">
                        Latency increased by{" "}
                        <span className="font-semibold text-white/70">
                          +{latencyIncrease} ms
                        </span>{" "}
                        compared with the previous responsive hop.
                      </p>

                    </div>
                  )}

                  {/* Timeout Information */}
                  {status === "timeout" && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">

                      <p className="text-xs leading-relaxed text-white/40">
                        This hop did not respond to traceroute
                        probes. It does not necessarily indicate
                        a network failure because subsequent hops
                        may still be reachable.
                      </p>

                    </div>
                  )}

                </div>

              </div>

            </div>
          );
        })}

        {/* Destination */}
        <div className="relative flex gap-5">

          <div className="flex flex-col items-center">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/[0.1]">
              <Globe className="h-5 w-5 text-white" />
            </div>

          </div>

          <div>

            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
              Destination
            </div>

            <h3 className="mt-1 text-base font-semibold text-white">
  {tracerouteSuccess ? "Target Reached" : "Destination Not Confirmed"}
</h3>

<p className="mt-1 text-sm text-white/40">
  {tracerouteSuccess
    ? "Final reachable endpoint"
    : "The destination was not confirmed by traceroute"}
</p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default RouteVisualization;