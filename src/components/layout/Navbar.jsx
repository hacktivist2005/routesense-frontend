import { NavLink } from "react-router-dom";
import { Activity, Menu, Network, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-3 md:px-8">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#030712]/80 px-6 backdrop-blur-2xl transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <div className="flex h-16 items-center justify-between">

          {/* Logo Section */}
          <NavLink to="/" className="group flex items-center gap-3.5">
            <div className="relative">
              {/* Outer Ambient Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-cyan-500/30 blur-md transition-all duration-500 group-hover:bg-cyan-400/60 group-hover:blur-lg" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/20 to-indigo-500/10 text-cyan-300 shadow-inner">
                <Network className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" size={22} />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white">
                Route<span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Sense</span>
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Network Intelligence
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links with Smooth Animated Active Pill */}
          <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-slate-900/60 p-1.5 backdrop-blur-xl md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-cyan-300"
                      : "text-slate-400 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.name}</span>

                    {/* Smooth Sliding Pill Effect */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 z-0 rounded-full border border-cyan-500/30 bg-cyan-500/15 shadow-lg shadow-cyan-500/10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Status Indicator */}
          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>System Ready</span>
            </div>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 text-slate-300 transition hover:border-cyan-400/40 hover:text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Animated Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="space-y-1.5 py-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                          isActive
                            ? "border border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      <span>{item.name}</span>
                      <Activity size={16} className="text-cyan-400/50" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Status Indicator */}
              <div className="mb-4 flex items-center justify-between border-t border-white/10 pt-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">System Ready</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;