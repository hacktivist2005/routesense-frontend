import React, { useState, useEffect } from "react";
import { Network, X, Shield, FileText, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

// Custom Social SVG Icons
const GithubIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function Footer() {
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | null
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position to show/hide "Scroll To Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#020617] px-6 pt-12 pb-8 text-white selection:bg-cyan-500 selection:text-black">
      {/* Background Glow Overlay */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-64 w-[600px] -translate-x-1/2 bg-cyan-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-inner shadow-cyan-500/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-cyan-400 group-hover:text-slate-950">
                <Network size={20} />
              </div>

              <div>
                <p className="font-extrabold text-lg tracking-tight">
                  Route<span className="text-cyan-400">Sense</span>
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  Network Intelligence
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400">
              Intelligent network path analysis designed to simplify complex telemetry diagnostics and make infrastructure monitoring effortless.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-900/50 text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-900/50 text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Navigation
            </h3>

            <ul className="mt-4 space-y-2.5">
              {[
                ["Home", "/"],
                ["About Platform", "/about"],
                ["Core Features", "/features"],
                ["Contact Support", "/contact"],
              ].map(([name, path]) => (
                <li key={name}>
                  <Link
                    to={path}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:translate-x-1 hover:text-cyan-300"
                  >
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status Widget */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Telemetry Status
            </h3>

            <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="relative mt-0.5 flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-emerald-300">
                      All Systems Operational
                    </p>
                  </div>

                  <p className="mt-1 text-[11px] leading-tight text-slate-400">
                    Routing Nodes & Diagnostics Engine working at 100% capacity.
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-emerald-500/10 pt-2.5 text-[10px] text-slate-500">
                <span>Latency: 12ms</span>
                <span className="font-mono text-emerald-400/80">99.98% Uptime</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row text-[11px] text-slate-500">
          <p>© 2026 RouteSense Inc. Built for smarter network diagnostics.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal("terms")}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>

      {/* DYNAMIC MODAL POPUP */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 text-white shadow-2xl shadow-cyan-500/10">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5 text-cyan-400">
                {activeModal === "privacy" ? <Shield size={20} /> : <FileText size={20} />}
                <h2 className="text-base font-bold text-white">
                  {activeModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
                </h2>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 text-xs leading-relaxed text-slate-300 space-y-3">
              {activeModal === "privacy" ? (
                <>
                  <p>
                    <strong className="text-cyan-300">Data Collection:</strong> RouteSense does not store diagnostic targets, IP addresses, or network telemetry in persistent databases.
                  </p>
                  <p>
                    <strong className="text-cyan-300">Client Privacy:</strong> All telemetry tests are processed ephemerally within server memory to provide real-time hop analysis.
                  </p>
                  <p>
                    <strong className="text-cyan-300">Third-Party Services:</strong> External DNS resolvers are queried solely for domain resolution during user-initiated diagnostics.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong className="text-cyan-300">Acceptable Use:</strong> RouteSense is designed for authorized network testing and infrastructure diagnostics.
                  </p>
                  <p>
                    <strong className="text-cyan-300">Limitation of Liability:</strong> Metrics provided are generated in real-time for diagnostic estimation purposes.
                  </p>
                  <p>
                    <strong className="text-cyan-300">Service Availability:</strong> We strive for continuous availability of public tracing nodes without guaranteed latency SLA guarantees.
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-xl bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SCROLL TO TOP FLOATING BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-slate-900/80 text-cyan-300 shadow-xl shadow-cyan-500/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-cyan-400 hover:text-slate-950 active:scale-95"
        >
          <ArrowUp size={18} />
        </button>
      )}

    </footer>
  );
}

export default Footer;