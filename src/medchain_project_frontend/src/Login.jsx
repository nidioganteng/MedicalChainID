import React, { useEffect, useMemo, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import "./style/index.css";
import { login } from "./utils/auth";
import { ShieldCheck, Share2, LockKeyhole, FileText, HeartPulse, Pill, Syringe, Users, Building2, ArrowRight, Fingerprint, Cpu, Sparkles } from "lucide-react";
import { medchain_project_backend } from "../../declarations/medchain_project_backend";

const SHOW_STATS = (import.meta.env?.VITE_SHOW_LANDING_STATS ?? "false") === "true";
const PLACEHOLDER = (import.meta.env?.VITE_STATS_PLACEHOLDER ?? "true") === "true";

export default function Login({ onLogin }) {
  useEffect(() => {
    AOS.init({ duration: 750, easing: "ease-out-quart", once: true, offset: 80 });
  }, []);

  const handleLogin = async () => {
    await login(onLogin);
  };

  const ctaRef = useRef(null);
  const onMouseMove = (e) => {
    const el = ctaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onMouseLeave = () => {
    const el = ctaRef.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 6 + Math.random() * 14,
        dur: 8 + Math.random() * 10,
        delay: Math.random() * -10,
        blur: Math.random() < 0.5,
        color:
          Math.random() > 0.5
            ? "rgba(56, 189, 248, .22)" // sky-400
            : "rgba(14, 165, 233, .22)", // cyan-500
      })),
    []
  );

  const crosses = useMemo(
    () =>
      Array.from({ length: 10 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        scale: 0.7 + Math.random() * 1.4,
        dur: 10 + Math.random() * 12,
        delay: Math.random() * -12,
        color:
          Math.random() > 0.5
            ? "rgba(59, 130, 246, .28)" // blue-500
            : "rgba(14, 165, 233, .28)", // cyan-500
      })),
    []
  );

  const [stats, setStats] = useState({ hospitals: null, records: null, latency: null });
  useEffect(() => {
    if (!SHOW_STATS || PLACEHOLDER) return;
    let cancelled = false;
    (async () => {
      try {
        const t0 = performance.now();
        const list = await medchain_project_backend.getAllRekamMedis(); // [(id, data)]
        const records = Array.isArray(list) ? list.length : 0;
        const hospitals = Array.from(new Set((list || []).map(([_, d]) => d?.rumah_sakit).filter(Boolean))).length;
        const latency = Math.max(1, Math.round(performance.now() - t0)) + "ms";
        if (!cancelled) setStats({ hospitals, records, latency });
      } catch {
        if (!cancelled) setStats({ hospitals: 0, records: 0, latency: "—" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-950 text-slate-100">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes floatY {0%{transform:translateY(0)}50%{transform:translateY(-10px)}100%{transform:translateY(0)}}
          @keyframes pulseRing {0%{box-shadow:0 0 0 0 rgba(56,189,248,.45)}70%{box-shadow:0 0 0 18px rgba(56,189,248,0)}100%{box-shadow:0 0 0 0 rgba(56,189,248,0)}}
          @keyframes wave {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
          .aurora:before,.aurora:after{content:"";position:absolute;inset:-25%;filter:blur(52px);opacity:.45;mix-blend:screen}
          .aurora:before{background:conic-gradient(from 180deg at 50% 50%, rgba(56,189,248,.55), rgba(14,165,233,.55), rgba(99,102,241,.55), rgba(59,130,246,.55));animation:floatY 12s ease-in-out infinite}
          .aurora:after{background:radial-gradient(60% 60% at 60% 40%, rgba(14,165,233,.35), rgba(2,6,23,0));animation:floatY 10s 1.2s ease-in-out infinite}
          .shine{position:relative;overflow:hidden}
          .shine::after{content:"";position:absolute;inset:auto -40% 0 -40%;top:-160%;height:220%;background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,.15) 50%,transparent 100%);transform:rotate(25deg);animation:shineMove 3.6s linear infinite}
          @keyframes shineMove{0%{transform:translateX(-120%) rotate(25deg)}100%{transform:translateX(120%) rotate(25deg)}}
          .wave-bg{background:linear-gradient(135deg, rgba(56,189,248,.22), rgba(14,165,233,.22), rgba(99,102,241,.22));background-size:250% 250%;animation:wave 16s ease infinite;}
          .cross{position:absolute;width:14px;height:14px;transform-origin:center;animation:floatY var(--dur,12s) ease-in-out infinite;opacity:.9}
          .cross::before,.cross::after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:var(--c,rgba(59,130,246,.3));border-radius:2px}
          .cross::before{width:100%;height:24%}
          .cross::after{width:24%;height:100%}
        `,
        }}
      />

      <div className="absolute inset-0 aurora pointer-events-none" />
      <div className="absolute inset-0 wave-bg opacity-60" />
      <div className="absolute inset-0 -z-0">
        {particles.map((p, i) => (
          <span
            key={`p-${i}`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              background: p.color,
              filter: p.blur ? "blur(1px)" : "none",
            }}
            className="absolute rounded-full animate-[floatY]"
          />
        ))}
        {crosses.map((c, i) => (
          <span
            key={`c-${i}`}
            style={{
              left: `${c.left}%`,
              top: `${c.top}%`,
              transform: `scale(${c.scale})`,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
              ["--c"]: c.color,
            }}
            className="cross"
          />
        ))}
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left copy */}
            <div data-aos="fade-up">
              <span className="inline-flex items-center gap-2 text-xs tracking-wide uppercase text-sky-200 ring-1 ring-sky-400/40 px-2.5 py-1 rounded-full mb-5 bg-sky-400/10">
                <Fingerprint className="h-3.5 w-3.5" /> Passwordless · On-chain
              </span>
              <h1 className="text-4xl sm:text-6xl font-black leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-300 via-cyan-300 to-indigo-300">Medical Chain ID</span>
                <br />
                <span className="text-slate-200">Your Health, Your Key.</span>
              </h1>
              <p className="mt-5 text-slate-300/90 text-base sm:text-lg max-w-prose">Own, share, and access your medical records securely whenever you need them.</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  ref={ctaRef}
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  onClick={handleLogin}
                  className="shine inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 px-6 py-3 text-white font-semibold border-2 border-white/70 hover:brightness-110 shadow-lg shadow-sky-500/30 active:scale-[0.98] transition-transform"
                >
                  Launch <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 flex items-center gap-4 text-xs text-slate-300">
                <div className="h-2 w-2 rounded-full bg-sky-400 animate-[pulseRing_1.8s_infinite]" />
                End-to-end encrypted · Privacy-first · Interoperable
              </div>
            </div>

            {/* Right glass card */}
            <div data-aos="fade-up" data-aos-delay="70" className="relative">
              <div className="rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-6 sm:p-7 shadow-2xl shadow-black/40">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-2xl grid place-items-center bg-gradient-to-tr from-sky-500 to-indigo-500">
                    <LockKeyhole className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-300/90">Designed for privacy</div>
                    <div className="text-lg font-semibold">Privacy by Design</div>
                  </div>
                </div>

                <ul className="space-y-3 text-slate-300/90">
                  <li className="flex gap-3">
                    <ShieldCheck className="h-5 w-5 text-sky-300 shrink-0 mt-0.5" /> You own your data and can revoke access anytime.
                  </li>
                  <li className="flex gap-3">
                    <Share2 className="h-5 w-5 text-cyan-300 shrink-0 mt-0.5" /> Permissioned sharing with trusted doctors.
                  </li>
                  <li className="flex gap-3">
                    <FileText className="h-5 w-5 text-indigo-300 shrink-0 mt-0.5" /> Portable records wherever you go.
                  </li>
                </ul>

                {/* Stats (conditional) */}
                {SHOW_STATS && (
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="text-xl font-bold">{PLACEHOLDER ? "—" : stats.hospitals ?? "—"}</div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-400">HOSPITALS</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="text-xl font-bold">{PLACEHOLDER ? "Coming soon" : stats.records ?? "—"}</div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-400">RECORDS</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="text-xl font-bold">{PLACEHOLDER ? "—" : stats.latency ?? "—"}</div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-400">LATENCY</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-3 right-6 text-[10px] bg-sky-500/20 text-sky-200 border border-sky-400/30 rounded-full px-2 py-1">
                <Cpu className="inline h-3.5 w-3.5 mr-1" /> Built on Internet Computer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY / BENEFITS */}
      <section id="about" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold" data-aos="fade-up">
              Why MedicalChain ID?
            </h2>
            <p className="text-slate-300/85 mt-3 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="50">
              A modern, privacy-first identity for healthcare. Control your records, share safely, and access anywhere.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div key={b.title} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:bg-white/[0.06] transition group" data-aos="fade-up" data-aos-delay={i * 60}>
                <div className={`h-10 w-10 rounded-xl grid place-items-center mb-4 ${b.bg}`}>
                  <b.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-sm text-slate-300/85">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOTIVATION / HEALTH VIBES */}
      <section className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-sky-500/15 via-cyan-500/10 to-indigo-500/15 backdrop-blur" data-aos="fade-up">
              <div className="flex items-center gap-2 text-sky-200 text-sm mb-2">
                <Sparkles className="h-4 w-4" /> Motivation
              </div>
              <blockquote className="text-xl font-semibold text-sky-200">“Health is the best investment. Own your data care for yourself.”</blockquote>
              <p className="text-sm text-slate-300 mt-3">Carry your medical history wherever you go, and share it only when you choose. Be more ready, more secure.</p>
            </div>

            <div className="rounded-2xl p-6 border border-white/10 bg-white/[0.04]" data-aos="fade-up" data-aos-delay="60">
              <h3 className="font-semibold mb-3">What you can do</h3>
              <ul className="space-y-2 text-sm text-slate-300/90">
                <li className="flex gap-2">
                  <HeartPulse className="h-4 w-4 text-rose-300 mt-0.5" /> Store allergies & chronic conditions.
                </li>
                <li className="flex gap-2">
                  <Pill className="h-4 w-4 text-sky-300 mt-0.5" /> Track prescriptions & dosages.
                </li>
                <li className="flex gap-2">
                  <Syringe className="h-4 w-4 text-cyan-300 mt-0.5" /> Archive vaccinations & lab results.
                </li>
                <li className="flex gap-2">
                  <Users className="h-4 w-4 text-indigo-300 mt-0.5" /> Share temporarily with doctors during visits.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl p-6 border border-white/10 bg-white/[0.04]" data-aos="fade-up" data-aos-delay="120">
              <h3 className="font-semibold mb-3">Trust & Safety</h3>
              <ul className="space-y-2 text-sm text-slate-300/90">
                <li className="flex gap-2">
                  <ShieldCheck className="h-4 w-4 text-sky-300 mt-0.5" /> End-to-end encrypted
                </li>
                <li className="flex gap-2">
                  <LockKeyhole className="h-4 w-4 text-cyan-300 mt-0.5" /> Permission-based access
                </li>
                <li className="flex gap-2">
                  <Building2 className="h-4 w-4 text-indigo-300 mt-0.5" /> Interoperability-ready
                </li>
                <li className="flex gap-2">
                  <FileText className="h-4 w-4 text-blue-300 mt-0.5" /> Portable & auditable history
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold" data-aos="fade-up">
              How it works
            </h2>
          </div>

          <ol className="relative mx-auto max-w-3xl">
            {steps.map((s, i) => (
              <li key={s.title} className="relative pl-10 pb-10" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="absolute left-0 top-0 h-10 w-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 grid place-items-center text-white ring-2 ring-white/20">{i + 1}</div>
                {i < steps.length - 1 && <div className="absolute left-5 top-10 bottom-0 w-[2px] bg-white/10" />}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-sm text-slate-300/85 mt-1">{s.desc}</div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <button
              onClick={handleLogin}
              className="shine inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 px-6 py-3 text-white font-semibold border-2 border-white/70 hover:brightness-110 shadow-lg shadow-sky-500/30 active:scale-[0.98]"
              data-aos="zoom-in"
            >
              Launch now <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="text-xl font-bold">MedicalChain ID</div>
            <div className="text-xs text-slate-400">Take control today</div>
          </div>
          <div className="text-center text-sm text-slate-400">© {new Date().getFullYear()} MedicalChain ID. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

const benefits = [
  {
    icon: HeartPulse,
    title: "Focus on your health",
    desc: "Keep everything important in one place ready when you need it.",
    bg: "bg-gradient-to-tr from-sky-500 to-cyan-500",
  },
  {
    icon: Share2,
    title: "Share safely",
    desc: "Grant temporary access to doctors and revoke it anytime.",
    bg: "bg-gradient-to-tr from-cyan-500 to-blue-500",
  },
  {
    icon: Pill,
    title: "Medication ready",
    desc: "Track prescriptions and allergies for safer care.",
    bg: "bg-gradient-to-tr from-blue-500 to-indigo-500",
  },
  {
    icon: Building2,
    title: "Move across providers",
    desc: "Carry your history when switching clinics or hospitals no hassle.",
    bg: "bg-gradient-to-tr from-indigo-500 to-sky-500",
  },
];

const steps = [
  { title: "Log in with Internet Identity", desc: "Secure, passwordless authentication using your trusted device." },
  { title: "Import / sync your records", desc: "Store labs, prescriptions, vaccinations, and medical summaries securely." },
  { title: "Share on your terms", desc: "Choose who can view your records and set access duration." },
];
