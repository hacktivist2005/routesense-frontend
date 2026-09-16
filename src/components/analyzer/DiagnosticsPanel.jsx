import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  BrainCircuit,
} from "lucide-react";

function DiagnosticsPanel({ diagnostics }) {

  if (!diagnostics) {
    return null;
  }

  const getIcon = (type) => {

    if (type === "success") {
      return (
        <CheckCircle2
          size={18}
          className="text-emerald-400"
        />
      );
    }

    if (type === "warning") {
      return (
        <AlertTriangle
          size={18}
          className="text-amber-400"
        />
      );
    }

    if (type === "critical") {
      return (
        <XCircle
          size={18}
          className="text-red-400"
        />
      );
    }

    return (
      <Info
        size={18}
        className="text-cyan-400"
      />
    );
  };

  return (
    <div className="mt-6 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5 md:p-6">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05]">

          <BrainCircuit
            size={19}
            className="text-cyan-400"
          />

        </div>

        <div>

          <h4 className="text-sm font-semibold text-white">
            Network Diagnostics
          </h4>

          <p className="mt-1 text-xs text-slate-600">
            Automated route and connectivity assessment
          </p>

        </div>

      </div>

      {/* Summary */}

      <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-5">

        <div className="flex items-center gap-2">

          <span
            className={`h-2 w-2 rounded-full ${
              diagnostics.status === "healthy"
                ? "bg-emerald-400"
                : diagnostics.status === "degraded"
                ? "bg-amber-400"
                : "bg-red-400"
            }`}
          />

          <span className="text-xs font-bold uppercase tracking-wider text-white/60">
            {diagnostics.status}
          </span>

        </div>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          {diagnostics.summary}
        </p>

      </div>

      {/* Checks */}

      <div className="mt-4 space-y-3">

        {diagnostics.checks?.map(
          (check, index) => (

            <div
              key={index}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.05] bg-black/20 p-4"
            >

              <div className="mt-0.5">
                {getIcon(check.type)}
              </div>

              <div>

                <p className="text-sm font-semibold text-white">
                  {check.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {check.message}
                </p>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default DiagnosticsPanel;