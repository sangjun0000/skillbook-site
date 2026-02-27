"use client";

import { useState } from "react";
import { skills, categories, ui } from "./data";
import type { Skill, Lang } from "./data";

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur rounded-full p-0.5 border border-white/20">
      <button
        onClick={() => setLang("ko")}
        className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
          lang === "ko" ? "bg-white text-gray-900 shadow" : "text-white/70 hover:text-white"
        }`}
      >
        한국어
      </button>
      <button
        onClick={() => setLang("en")}
        className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
          lang === "en" ? "bg-white text-gray-900 shadow" : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}

function CopyButton({ text, lang }: { text: string; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  const t = ui[lang];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 px-2 py-1 rounded text-xs font-mono transition-all hover:bg-white/10 active:scale-95"
      title="Copy"
    >
      {copied ? (
        <span className="text-green-400">{t.copied}</span>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/50 hover:text-white/80 transition-colors">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    business: "bg-amber-100 text-amber-900 border-amber-300",
    ai: "bg-blue-100 text-blue-900 border-blue-300",
    dev: "bg-emerald-100 text-emerald-900 border-emerald-300",
    product: "bg-violet-100 text-violet-900 border-violet-300",
    meta: "bg-slate-100 text-slate-800 border-slate-300",
    architecture: "bg-rose-100 text-rose-900 border-rose-300",
    infra: "bg-cyan-100 text-cyan-900 border-cyan-300",
    data: "bg-orange-100 text-orange-900 border-orange-300",
    mobile: "bg-pink-100 text-pink-900 border-pink-300",
    design: "bg-teal-100 text-teal-900 border-teal-300",
  };
  const labels: Record<string, string> = { business: "Business", ai: "AI / LLM", dev: "Dev", product: "Product", meta: "Meta", architecture: "Architecture", infra: "Infra", data: "Data", mobile: "Mobile", design: "Design" };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colors[category]}`}>
      {labels[category]}
    </span>
  );
}

function SkillPage({ skill, lang }: { skill: Skill; lang: Lang }) {
  const t = ui[lang];
  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="mb-7 pb-5 border-b-2 border-amber-800/30">
        <div className="flex items-start justify-between mb-3 gap-3">
          <h2 className="fluid-heading font-bold text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>
            {skill.name[lang]}
          </h2>
          <CategoryBadge category={skill.category} />
        </div>
        <p className="text-gray-700 fluid-body italic leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
          &ldquo;{skill.description[lang]}&rdquo;
        </p>
      </div>

      {/* Role */}
      <section className="mb-7">
        <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest mb-3">
          {t.roleTitle}
        </h3>
        <p className="text-gray-800 fluid-body leading-relaxed pl-4 border-l-[3px] border-amber-400 bg-amber-50/50 py-3 pr-3 rounded-r">
          {skill.role[lang]}
        </p>
      </section>

      {/* Principles */}
      <section className="mb-7">
        <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest mb-3">
          {t.principlesTitle}
        </h3>
        <ul className="space-y-2.5">
          {skill.principles.map((p, i) => (
            <li key={i} className="fluid-body text-gray-800 leading-relaxed flex gap-2.5">
              <span className="text-amber-600 shrink-0 mt-0.5 font-bold">&#9830;</span>
              <span>{p[lang]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Stats */}
      <section className="mb-7">
        <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest mb-3">
          {t.metricsTitle}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-center">
            <div className="text-xl font-bold text-amber-900" style={{ fontFamily: "var(--font-serif)" }}>{skill.processSteps}</div>
            <div className="text-xs font-semibold text-amber-700 mt-1">{t.processSteps}</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-center">
            <div className="text-xl font-bold text-amber-900" style={{ fontFamily: "var(--font-serif)" }}>{skill.principles.length}</div>
            <div className="text-xs font-semibold text-amber-700 mt-1">{t.principles}</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-center">
            <div className="text-xl font-bold text-amber-900" style={{ fontFamily: "var(--font-serif)" }}>{skill.lineCount}</div>
            <div className="text-xs font-semibold text-amber-700 mt-1">{t.lines}</div>
          </div>
        </div>
      </section>

      {/* Anti-patterns */}
      <section>
        <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest mb-3">
          {t.antiTitle}
        </h3>
        <ul className="space-y-2.5">
          {skill.antiPatterns.map((a, i) => (
            <li key={i} className="fluid-body text-gray-800 leading-relaxed flex gap-2.5">
              <span className="text-red-600 shrink-0 mt-0.5 font-bold">&#10006;</span>
              <span>{a[lang]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <div className="mt-8 pt-3 border-t border-amber-200 text-xs text-gray-500 text-right font-mono">
        ~/.claude/skillbook/{skill.path}
      </div>
    </div>
  );
}

function HeroSection({ lang, totalLines }: { lang: Lang; totalLines: number }) {
  const t = ui[lang];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative" style={{ padding: "clamp(1.5rem, 4vw, 3rem)" }}>
      {/* Title */}
      <div className="text-center mb-10 max-w-2xl">
        <h1
          className="fluid-title font-bold gold-shimmer animate-title-reveal"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 1.8rem + 2.5vw, 4rem)" }}
        >
          Skill Book
        </h1>
        <p
          className="text-amber-200/80 mt-4 animate-fade-in-up"
          style={{ fontFamily: "var(--font-serif)", animationDelay: "0.5s", fontSize: "clamp(0.95rem, 0.85rem + 0.5vw, 1.2rem)" }}
        >
          {t.heroDesc}
        </p>
        <p
          className="text-amber-200/50 mt-3 animate-fade-in-up text-sm tracking-wide"
          style={{ animationDelay: "0.7s" }}
        >
          {skills.length} Skills · {categories.length} Categories · {totalLines.toLocaleString()} Lines of Knowledge
        </p>
      </div>

      {/* Install Card */}
      <div
        className="w-full max-w-lg animate-fade-in-up rounded-xl border border-white/10 overflow-hidden"
        style={{ animationDelay: "0.9s", background: "linear-gradient(145deg, rgba(30,22,15,0.95), rgba(20,14,10,0.98))" }}
      >
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-base" style={{ fontFamily: "var(--font-serif)" }}>
              {t.installTitle}
            </h2>
            <p className="text-white/40 text-xs mt-0.5">{t.installDesc}</p>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
        </div>
        <div className="p-5 space-y-3">
          {/* Step 1 */}
          <div className="flex items-center gap-3">
            <span className="text-amber-500/70 text-xs font-bold shrink-0 w-4 text-right">1</span>
            <div className="flex-1 flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2.5 border border-white/5 group">
              <span className="text-green-400/80 font-mono text-xs shrink-0">$</span>
              <code className="text-amber-100/90 text-sm font-mono flex-1 break-all">{t.step1Cmd}</code>
              <CopyButton text={t.step1Cmd} lang={lang} />
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex items-center gap-3">
            <span className="text-amber-500/70 text-xs font-bold shrink-0 w-4 text-right">2</span>
            <div className="flex-1 flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2.5 border border-white/5 group">
              <span className="text-green-400/80 font-mono text-xs shrink-0">$</span>
              <code className="text-amber-100/90 text-sm font-mono flex-1 break-all">{t.step2Cmd}</code>
              <CopyButton text={t.step2Cmd} lang={lang} />
            </div>
          </div>
        </div>
      </div>

      {/* 3-Step Visual Guide */}
      <div
        className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mt-10 animate-fade-in-up"
        style={{ animationDelay: "1.1s" }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <span className="text-white/70 text-xs font-semibold">{t.step1Label}</span>
        </div>

        <div className="hidden sm:block text-amber-500/30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <span className="text-white/70 text-xs font-semibold">{t.step2Label}</span>
        </div>

        <div className="hidden sm:block text-amber-500/30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="text-white/70 text-xs font-semibold">{t.step3Label}</span>
        </div>
      </div>

      {/* How to Use example */}
      <div
        className="mt-8 animate-fade-in-up"
        style={{ animationDelay: "1.3s" }}
      >
        <p className="text-white/30 text-xs text-center mb-2 uppercase tracking-wider font-semibold">{t.howToUse}</p>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2.5 border border-white/5">
          <span className="text-green-400/80 font-mono text-xs shrink-0">$</span>
          <code className="text-amber-100/70 text-sm font-mono">{t.step3Cmd}</code>
          <CopyButton text={t.step3Cmd} lang={lang} />
        </div>
      </div>

      {/* Browse Skills button */}
      <a
        href="#skills"
        className="mt-14 animate-fade-in-up inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500/30 text-amber-300/80 hover:text-amber-200 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all text-sm font-semibold btn-press"
        style={{ animationDelay: "1.5s" }}
      >
        {t.browseSkills}
      </a>
    </section>
  );
}

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("ko");

  const t = ui[lang];
  const filteredSkills = activeCategory ? skills.filter((s) => s.category === activeCategory) : skills;
  const totalSteps = skills.reduce((sum, s) => sum + s.processSteps, 0);
  const totalLines = skills.reduce((sum, s) => sum + s.lineCount, 0);

  return (
    <>
      {/* Fixed Language Toggle */}
      <div className="fixed top-4 right-4 z-50 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      {/* Hero Section */}
      <HeroSection lang={lang} totalLines={totalLines} />

      {/* Book Section */}
      <section id="skills">
        <main className="flex items-center justify-center" style={{ padding: "clamp(1rem, 3vw, 2rem)", paddingBottom: "clamp(2rem, 5vw, 4rem)" }}>
          <div className="animate-book-open w-full max-w-6xl">
            {/* Header: Title + Stats */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="fluid-title font-bold gold-shimmer animate-title-reveal" style={{ fontFamily: "var(--font-serif)" }}>
                  {t.title}
                </h1>
                <p className="fluid-subtitle text-amber-200 mt-2 animate-fade-in-up" style={{ fontFamily: "var(--font-serif)", animationDelay: "0.5s" }}>
                  {t.subtitle_tpl.replace("{count}", String(skills.length)).replace("{steps}", String(totalSteps)).replace("{lines}", totalLines.toLocaleString())}
                </p>
              </div>
            </div>

            {/* The Book */}
            <div className="book-shadow rounded-sm overflow-hidden flex flex-col md:flex-row" style={{ minHeight: "clamp(500px, 70vh, 750px)" }}>
              {/* Left Page - Table of Contents */}
              <div className="w-full md:w-[380px] shrink-0 bg-page page-texture flex flex-col">
                <div style={{ padding: "clamp(0.75rem, 2vw, 1.25rem)" }} className="border-b border-amber-200">
                  <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>
                    {t.toc}
                  </h2>
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border btn-press ${
                        activeCategory === null
                          ? "bg-amber-900 text-white border-amber-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:text-amber-900"
                      }`}
                    >
                      {t.all}
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border btn-press flex items-center gap-1 ${
                          activeCategory === cat.id
                            ? "bg-amber-900 text-white border-amber-900"
                            : "bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:text-amber-900"
                        }`}
                      >
                        <span>{cat.icon}</span> {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skill list */}
                <div className="flex-1 overflow-y-auto book-scroll px-3 py-3">
                  {categories
                    .filter((cat) => !activeCategory || cat.id === activeCategory)
                    .map((cat) => {
                      const catSkills = filteredSkills.filter((s) => s.category === cat.id);
                      if (catSkills.length === 0) return null;
                      return (
                        <div key={cat.id} className="mb-4">
                          <div className="flex items-center gap-2 mb-1.5 px-2">
                            <span className="text-base">{cat.icon}</span>
                            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                              {cat.label}
                            </span>
                            <span className="text-xs font-semibold text-gray-500">({catSkills.length})</span>
                          </div>
                          {catSkills.map((skill) => (
                            <button
                              key={skill.id}
                              onClick={() => setSelectedSkill(skill)}
                              className={`w-full text-left px-3 py-2.5 rounded-lg card-interactive group ${
                                selectedSkill?.id === skill.id
                                  ? "bg-amber-100 border border-amber-300 shadow-sm"
                                  : "hover:bg-amber-50 border border-transparent"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-sm font-semibold ${selectedSkill?.id === skill.id ? "text-amber-900" : "text-gray-900 group-hover:text-amber-800"}`}
                                  style={{ fontFamily: "var(--font-serif)" }}
                                >
                                  {skill.name[lang]}
                                </span>
                                <span className="text-xs font-medium text-gray-500 tabular-nums">{skill.lineCount}L</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{skill.description[lang]}</p>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                </div>

                <div className="px-6 py-3 border-t border-amber-200 text-center">
                  <span className="text-xs text-gray-500" style={{ fontFamily: "var(--font-serif)" }}>
                    — {filteredSkills.length} {t.skills} —
                  </span>
                </div>
              </div>

              {/* Book Spine */}
              <div className="hidden md:block w-3 bg-gradient-to-r from-amber-900/40 via-amber-800/60 to-amber-900/40 spine-shadow" />

              {/* Right Page - Skill Detail */}
              <div className="flex-1 bg-page page-texture page-curl flex flex-col">
                <div className="flex-1 overflow-y-auto book-scroll" style={{ padding: "clamp(1rem, 3vw, 2rem)" }}>
                  {selectedSkill ? (
                    <SkillPage key={selectedSkill.id + lang} skill={selectedSkill} lang={lang} />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-scale">
                      <div className="text-6xl mb-6" style={{ animation: "pulse-glow 3s ease-in-out infinite" }}>📖</div>
                      <h2 className="fluid-heading font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                        {t.welcomeHeading}
                      </h2>
                      <p className="text-gray-700 fluid-body max-w-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: "var(--font-serif)" }}>
                        {t.welcomeDesc}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-xs">
                        {categories.map((cat) => {
                          const count = skills.filter((s) => s.category === cat.id).length;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setActiveCategory(cat.id);
                                const first = skills.find((s) => s.category === cat.id);
                                if (first) setSelectedSkill(first);
                              }}
                              className="bg-white hover:bg-amber-50 card-interactive rounded-lg p-3.5 text-center group border border-gray-200 hover:border-amber-300"
                            >
                              <div className="text-2xl mb-1.5">{cat.icon}</div>
                              <div className="text-xs font-semibold text-gray-800 group-hover:text-amber-900 transition-colors">
                                {cat.label}
                              </div>
                              <div className="text-xs font-medium text-gray-500 mt-0.5">{count} {t.skills}</div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-10 text-xs text-gray-400" style={{ fontFamily: "var(--font-serif)" }}>
                        {t.footer}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-2 mx-8 bg-gradient-to-b from-black/20 to-transparent rounded-b-full" />
          </div>
        </main>
      </section>
    </>
  );
}
