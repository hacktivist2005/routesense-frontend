// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Mail,
//   MessageSquare,
//   Send,
//   Sparkles,
//   CheckCircle2,
//   Loader2,
//   ArrowUpRight,
//   ShieldCheck,
// } from "lucide-react";

// // Custom GitHub SVG Icon
// const GithubIcon = ({ size = 18 }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
//     <path d="M9 18c-4.51 2-5-2-7-2" />
//   </svg>
// );

// // Custom LinkedIn SVG Icon
// const LinkedinIcon = ({ size = 18 }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//     <rect x="2" y="9" width="4" height="12" />
//     <circle cx="4" cy="4" r="2" />
//   </svg>
// );

// // Framer Motion Variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//     },
//   },
// };

// function Contact() {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setMousePos({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSubmitted(true);
//     }, 1500);
//   };

//   const contactLinks = [
//     {
//       icon: Mail,
//       title: "Direct Email",
//       text: "hello@routesense.dev",
//       href: "mailto:hello@routesense.dev",
//       isExternal: false,
//     },
//     {
//       icon: GithubIcon,
//       title: "GitHub Repository",
//       text: "github.com/routesense",
//       href: "https://github.com",
//       isExternal: true,
//     },
//     {
//       icon: LinkedinIcon,
//       title: "LinkedIn Page",
//       text: "linkedin.com/company/routesense",
//       href: "https://linkedin.com",
//       isExternal: true,
//     },
//     {
//       icon: MessageSquare,
//       title: "Community Feedback",
//       text: "Share suggestions & ideas",
//       href: null,
//       isExternal: false,
//     },
//   ];

//   return (
//     <main
//       onMouseMove={handleMouseMove}
//       className="relative min-h-screen overflow-hidden bg-[#030712] px-6 py-20 text-white selection:bg-cyan-500 selection:text-black flex items-center justify-center"
//     >
//       {/* Interactive Spotlight Effect */}
//       <div
//         className="pointer-events-none absolute -inset-px transition-opacity duration-300"
//         style={{
//           background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.07), transparent 45%)`,
//         }}
//       />

//       {/* Background Ambient Glows */}
//       <div className="pointer-events-none absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[130px]" />
//       <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />

//       {/* Cyber Grid Mask Overlay */}
//       <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

//       <div className="relative mx-auto w-full max-w-6xl">
//         <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          
//           {/* Left Column (5 Cols) */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={staggerContainer}
//             className="flex flex-col justify-between lg:col-span-5"
//           >
//             <div>
//               <motion.div
//                 variants={fadeInUp}
//                 className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-cyan-300 backdrop-blur-xl"
//               >
//                 <Sparkles size={13} className="animate-pulse text-cyan-400" />
//                 <span>GET IN TOUCH</span>
//               </motion.div>

//               <motion.h1
//                 variants={fadeInUp}
//                 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl"
//               >
//                 Let's talk{" "}
//                 <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
//                   networking.
//                 </span>
//               </motion.h1>

//               <motion.p
//                 variants={fadeInUp}
//                 className="mt-3 text-sm leading-relaxed text-slate-400"
//               >
//                 Have feedback, ideas or questions about RouteSense? Drop us a
//                 message or connect through our active channels.
//               </motion.p>
//             </div>

//             {/* Social Cards Grid */}
//             <motion.div
//               variants={staggerContainer}
//               className="mt-6 grid gap-2.5"
//             >
//               {contactLinks.map((item) => {
//                 const Icon = item.icon;
//                 const Component = item.href ? "a" : "div";

//                 return (
//                   <motion.div key={item.title} variants={fadeInUp}>
//                     <Component
//                       href={item.href || undefined}
//                       target={item.isExternal ? "_blank" : undefined}
//                       rel={item.isExternal ? "noopener noreferrer" : undefined}
//                       className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-slate-900/30 p-3.5 backdrop-blur-xl transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-900/60"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-colors duration-200 group-hover:bg-cyan-400 group-hover:text-slate-950">
//                           <Icon size={18} />
//                         </div>

//                         <div>
//                           <p className="text-xs font-bold text-slate-200 transition-colors group-hover:text-cyan-300">
//                             {item.title}
//                           </p>
//                           <p className="text-[11px] text-slate-400">
//                             {item.text}
//                           </p>
//                         </div>
//                       </div>

//                       {item.isExternal && (
//                         <ArrowUpRight
//                           size={15}
//                           className="text-slate-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400"
//                         />
//                       )}
//                     </Component>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>

//             {/* Bottom Status Card */}
//             <motion.div
//               variants={fadeInUp}
//               className="mt-6 hidden items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-2.5 text-xs text-emerald-400 lg:flex"
//             >
//               <ShieldCheck size={16} />
//               <span>Systems Operational & Ready to Receive Packets</span>
//             </motion.div>
//           </motion.div>

//           {/* Right Column (7 Cols): Glassmorphic Box */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="flex flex-col justify-center rounded-2xl border border-white/10 bg-slate-900/40 p-6 md:p-8 backdrop-blur-2xl shadow-2xl shadow-cyan-500/5 lg:col-span-7"
//           >
//             <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
//               <div>
//                 <h2 className="text-lg font-bold tracking-tight text-white">
//                   Send Message
//                 </h2>
//                 <p className="text-xs text-slate-400">
//                   Direct communication payload
//                 </p>
//               </div>
//               <span className="font-mono text-[10px] uppercase text-cyan-400/80">
//                 [SECURE PROTOCOL]
//               </span>
//             </div>

//             {submitted ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="flex flex-col items-center justify-center text-center py-10"
//               >
//                 <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10">
//                   <CheckCircle2 size={28} />
//                 </div>
//                 <h3 className="mt-4 text-xl font-bold text-white">
//                   Message Transmitted!
//                 </h3>
//                 <p className="mt-2 max-w-xs text-xs text-slate-400 leading-relaxed">
//                   Payload received successfully. Our engineering team will review and respond shortly.
//                 </p>
//                 <button
//                   onClick={() => setSubmitted(false)}
//                   className="mt-6 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
//                 >
//                   Send Another Message
//                 </button>
//               </motion.div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       placeholder="Your name"
//                       className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
//                     />
//                   </div>

//                   <div>
//                     <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       placeholder="you@example.com"
//                       className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.subject}
//                     onChange={(e) =>
//                       setFormData({ ...formData, subject: e.target.value })
//                     }
//                     placeholder="What would you like to discuss?"
//                     className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                     Message
//                   </label>
//                   <textarea
//                     rows={4}
//                     required
//                     value={formData.message}
//                     onChange={(e) =>
//                       setFormData({ ...formData, message: e.target.value })
//                     }
//                     placeholder="Write your message here..."
//                     className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
//                   />
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.01 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="group flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-70 shadow-lg shadow-cyan-500/10"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 size={16} className="animate-spin text-black" />
//                       <span>Transmitting Telemetry...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Send Message</span>
//                       <Send
//                         size={15}
//                         className="transition-transform duration-300 group-hover:translate-x-1"
//                       />
//                     </>
//                   )}
//                 </motion.button>
//               </form>
//             )}
//           </motion.div>

//         </div>
//       </div>
//     </main>
//   );
// }

// export default Contact;

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

// Custom GitHub SVG Icon
const GithubIcon = ({ size = 18 }) => (
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

// Custom LinkedIn SVG Icon
const LinkedinIcon = ({ size = 18 }) => (
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

// Framer Motion Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function Contact() {
  const formRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // EmailJS Integration
    emailjs
      .sendForm(
        "service_k0rhn9j",   // 👈 EmailJS Service ID paste karo
        "template_7turgk4",  // 👈 EmailJS Template ID paste karo
        formRef.current,
        "sAiu0Voc-DoAqTtVQ"    // 👈 EmailJS Public Key paste karo
      )
      .then(
        (result) => {
          setIsSubmitting(false);
          setSubmitted(true);
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          setIsSubmitting(false);
          setErrorMessage("Failed to send message. Please try again.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  const contactLinks = [
    {
      icon: Mail,
      title: "Direct Email",
      text: "ansarimuhammad2005@gmail.com",
      href: "mailto:ansarimuhammad2005@gmail.com",
      isExternal: false,
    },
    {
      icon: GithubIcon,
      title: "GitHub Repository",
      text: "github.com/hacktivist2005",
      href: "https://github.com/hacktivist2005",
      isExternal: true,
    },
    {
      icon: LinkedinIcon,
      title: "LinkedIn Page",
      text: "linkedin.com/company/mohamed",
      href: "https://linkedin.com/mohamed-ansari-5ab548321",
      isExternal: true,
    },
    {
      icon: MessageSquare,
      title: "Community Feedback",
      text: "Share suggestions & ideas",
      href: null,
      isExternal: false,
    },
  ];

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#030712] px-6 py-20 text-white selection:bg-cyan-500 selection:text-black flex items-center justify-center"
    >
      {/* Interactive Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.07), transparent 45%)`,
        }}
      />

      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />

      {/* Cyber Grid Mask Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Column (5 Cols) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-cyan-300 backdrop-blur-xl"
              >
                <Sparkles size={13} className="animate-pulse text-cyan-400" />
                <span>GET IN TOUCH</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl"
              >
                Let's talk{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  networking.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-3 text-sm leading-relaxed text-slate-400"
              >
                Have feedback, ideas or questions about RouteSense? Drop us a
                message or connect through our active channels.
              </motion.p>
            </div>

            {/* Social Cards Grid */}
            <motion.div
              variants={staggerContainer}
              className="mt-6 grid gap-2.5"
            >
              {contactLinks.map((item) => {
                const Icon = item.icon;
                const Component = item.href ? "a" : "div";

                return (
                  <motion.div key={item.title} variants={fadeInUp}>
                    <Component
                      href={item.href || undefined}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-slate-900/30 p-3.5 backdrop-blur-xl transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-900/60"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-colors duration-200 group-hover:bg-cyan-400 group-hover:text-slate-950">
                          <Icon size={18} />
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-200 transition-colors group-hover:text-cyan-300">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {item.text}
                          </p>
                        </div>
                      </div>

                      {item.isExternal && (
                        <ArrowUpRight
                          size={15}
                          className="text-slate-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400"
                        />
                      )}
                    </Component>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Status Card */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 hidden items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-2.5 text-xs text-emerald-400 lg:flex"
            >
              <ShieldCheck size={16} />
              <span>Systems Operational & Ready to Receive Packets</span>
            </motion.div>
          </motion.div>

          {/* Right Column (7 Cols): Glassmorphic Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center rounded-2xl border border-white/10 bg-slate-900/40 p-6 md:p-8 backdrop-blur-2xl shadow-2xl shadow-cyan-500/5 lg:col-span-7"
          >
            <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  Send Message
                </h2>
                <p className="text-xs text-slate-400">
                  Direct communication payload
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase text-cyan-400/80">
                [SECURE PROTOCOL]
              </span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">
                  Message Transmitted!
                </h3>
                <p className="mt-2 max-w-xs text-xs text-slate-400 leading-relaxed">
                  Payload received successfully. Our engineering team will review and respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <p className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                    {errorMessage}
                  </p>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="What would you like to discuss?"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 placeholder:text-slate-600"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-70 shadow-lg shadow-cyan-500/10"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-black" />
                      <span>Transmitting Telemetry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </main>
  );
}

export default Contact;