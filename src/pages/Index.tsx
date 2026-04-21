import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Linkedin, MapPin, Cpu, Database, GitBranch, Terminal, Briefcase, GraduationCap, Award, Download } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const PROJECTS = [
  {
    id: "01",
    name: "JARVIS",
    tagline: "Voice-first AI assistant for macOS",
    description:
      "A British-butler AI that runs locally on macOS. Connects to Apple Calendar, Mail, Notes; spawns Claude Code sessions to build entire projects; visualises voice with a Three.js particle orb.",
    stack: ["Python", "FastAPI", "Three.js", "Claude API", "Fish Audio TTS", "WebSocket"],
    accent: "terminal-green",
    icon: Terminal,
  },
  {
    id: "02",
    name: "Harry's F1 Live Dashboard",
    tagline: "True-live Formula 1 telemetry",
    description:
      "Custom-built React dashboard bypassing commercial F1 API locks by reading directly from native SignalR broadcast arrays. InfluxDB-backed live pipeline polling every 5s, plus a browser-native race replay engine.",
    stack: ["React", "TypeScript", "InfluxDB", "Vite", "Python", "OpenF1"],
    accent: "terminal-amber",
    icon: Cpu,
  },
  {
    id: "03",
    name: "Personal Schedule Dashboard",
    tagline: "Local-first deadline & event tracker",
    description:
      "Single-user schedule manager with deterministic text parsing, image/screenshot extraction via pluggable OCR adapter, due-soon reminders, and reports on completion trends — all persisted locally.",
    stack: ["React 19", "TypeScript", "Vitest", "localStorage"],
    accent: "terminal-cyan",
    icon: Database,
  },
];

const EXPERIENCE = [
  {
    role: "Business Analyst (Executive Officer)",
    org: "Department for Work and Pensions (DWP)",
    location: "Cardiff, UK",
    period: "Aug 2024 — Feb 2026",
    bullets: [
      "Translated UK regulatory policy into operational SOPs across a 2,000+ case/month workflow — 22% reduction in audit deviations.",
      "Wrote SQL queries against cloud-hosted case data warehouses to surface bottlenecks — drove a 19–25% improvement in case resolution timelines.",
      "Built Python scripts (pandas, openpyxl) to automate weekly KPI extracts and reconciliation reports — saved ~8 hrs/week of manual work.",
      "Designed Power BI dashboards on top of cloud datasets for senior leadership reviews — 35% reporting accuracy gain.",
      "Partnered with engineering on requirements for internal tooling, writing user stories, acceptance criteria, and process maps in Jira.",
    ],
  },
  {
    role: "Business Analyst — Client Operations",
    org: "The Contact Company",
    location: "Birkenhead, UK",
    period: "Jan 2024 — Aug 2024",
    bullets: [
      "Translated client requirements into Salesforce CRM workflow improvements — +21% first-contact resolution.",
      "Used SQL + Excel to analyse contact-centre performance data and identify root causes of SLA breaches.",
      "Standardised SOPs across teams — 95% reduction in onboarding errors.",
      "Designed KPI dashboards cutting supervisor diagnostic time by 30%.",
    ],
  },
  {
    role: "Business Analyst & Operations Lead",
    org: "Cookooc (Digital Startup)",
    location: "Remote — India / UK",
    period: "Jan 2020 — Dec 2023",
    bullets: [
      "Owned full implementation lifecycle for a 1,000+ tx/month platform — 27% cycle-time reduction.",
      "Built lightweight Python/SQL data pipelines on cloud infra to track transactions, refunds, and vendor performance.",
      "Applied LLM-based tooling to operational workflows — 60% manual-effort reduction.",
      "Built dashboards & governance docs supporting leadership decisions.",
    ],
  },
];

const KPIS = [
  { value: "2,000+", label: "cases/month analysed at DWP" },
  { value: "22%", label: "reduction in audit deviations" },
  { value: "19–25%", label: "faster case resolution" },
  { value: "35%", label: "reporting accuracy gain" },
  { value: "60%", label: "manual effort cut via LLM tooling" },
  { value: "5+ yrs", label: "in regulated, data-heavy ops" },
];

const SKILLS = {
  "Business Analysis": ["Requirements Gathering", "Process Mapping", "Gap Analysis", "Stakeholder Alignment", "Change Facilitation"],
  "Regulatory & Compliance": ["Policy-to-Process", "Audit Frameworks", "Governance Docs", "SOPs"],
  "AI & Tech": ["Generative AI / LLMs", "Prompt Engineering", "NLP concepts", "Salesforce", "Automation"],
  "Data & Reporting": ["SQL", "Power BI", "Advanced Excel", "KPI Reporting", "Root Cause Analysis"],
  "Delivery": ["Agile", "Jira", "Iterative Implementation", "Vendor Onboarding"],
};

const Index = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      {/* Radial glow */}
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ background: "var(--gradient-radial)" }} />

      {/* Top bar */}
      <header className="border-b border-border/60 backdrop-blur-sm bg-background/70 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-3 mono text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">harishmaran<span className="text-primary">@</span>portfolio</span>
            <span className="text-muted-foreground hidden sm:inline">: ~/</span>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">about</a>
            <a href="#projects" className="hover:text-primary transition-colors">projects</a>
            <a href="#experience" className="hover:text-primary transition-colors">experience</a>
            <a href="#skills" className="hover:text-primary transition-colors">skills</a>
            <a href="#contact" className="hover:text-primary transition-colors">contact</a>
          </nav>
          <div className="text-muted-foreground tabular-nums hidden sm:block">
            {time.toISOString().slice(11, 19)} UTC
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="container pt-20 md:pt-32 pb-24 md:pb-40">
        <div className="mono text-xs text-muted-foreground mb-6 terminal-prompt">whoami</div>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight mb-6">
          Harishmaran <br />
          <span className="text-primary glow-text">Subbaiah</span> Thirumaran
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
          Business Analyst translating <span className="text-foreground">regulatory complexity</span> into operational systems —
          and an after-hours <span className="text-foreground">builder</span> shipping AI assistants, live telemetry dashboards, and local-first tools.
        </p>

        <div className="flex flex-wrap gap-3 mono text-xs mb-12">
          <span className="px-3 py-1.5 border border-border bg-card/50 rounded-sm">5+ years • regulated environments</span>
          <span className="px-3 py-1.5 border border-border bg-card/50 rounded-sm">AI-enhanced process design</span>
          <span className="px-3 py-1.5 border border-primary/40 text-primary bg-primary/5 rounded-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> available — Amsterdam, NL
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 mono text-sm hover:bg-primary/90 transition-colors">
            view_projects() <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a href="/Harishmaran_Subbaiah_Thirumaran_CV.pdf" download className="inline-flex items-center gap-2 border border-primary/40 text-primary bg-primary/5 px-5 py-3 mono text-sm hover:bg-primary/10 transition-colors">
            <Download className="h-4 w-4" /> download_cv.pdf
          </a>
          <a href="mailto:harishmaran2001@gmail.com" className="inline-flex items-center gap-2 border border-border px-5 py-3 mono text-sm hover:border-primary hover:text-primary transition-colors">
            <Mail className="h-4 w-4" /> get_in_touch()
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container py-20 md:py-28 border-t border-border/60">
        <SectionHeader index="01" title="about" subtitle="story · education · KPIs · craft" />
        <div className="grid md:grid-cols-3 gap-10 mt-12">
          <div className="md:col-span-2 space-y-8 text-muted-foreground leading-relaxed text-base md:text-lg">
            <div>
              <div className="mono text-xs text-primary mb-3">## the_story_so_far</div>
              <p className="mb-4">
                I started out as a <span className="text-foreground">mechanical engineer</span> in Tamil Nadu, India — but spent more time automating spreadsheets than designing parts. That pull toward <span className="text-foreground">systems thinking</span> took me from engineering into operations: first co-running <span className="text-foreground">Cookooc</span>, a digital startup processing 1,000+ transactions a month, where I learned to translate fuzzy founder ideas into repeatable workflows.
              </p>
              <p className="mb-4">
                A move to the UK for an MSc at the <span className="text-foreground">University of Liverpool</span> opened up regulated industries — first as a <span className="text-foreground">Business Analyst at The Contact Company</span> rebuilding Salesforce flows, then as a <span className="text-foreground">Business Analyst at the UK's Department for Work and Pensions</span>, where policy literally becomes code in a 2,000+ case/month pipeline.
              </p>
              <p>
                Today I'm in <span className="text-foreground">Amsterdam</span>, looking for the next role where regulatory rigour, cloud data tooling, and AI all meet — and building open-source projects on the side to keep the engineering muscles warm.
              </p>
            </div>

            <div>
              <div className="mono text-xs text-primary mb-3">## education</div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary mono mt-1.5 text-xs">▸</span>
                  <span><span className="text-foreground">MSc International Business</span> — University of Liverpool, UK (2:1). Strategy, managerial finance, international management.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mono mt-1.5 text-xs">▸</span>
                  <span><span className="text-foreground">BE Mechanical Engineering</span> — Kumaraguru College of Tech, Anna University (8.1/10). Foundation in systems, quantitative analysis, and CAD.</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="mono text-xs text-primary mb-3">## the_business_analyst_craft</div>
              <p className="mb-4">
                My day-to-day at DWP and previously at The Contact Company is <span className="text-foreground">Business Analyst work in regulated environments</span> — but it's far from PowerPoint-only. I write <span className="text-foreground">SQL</span> against cloud-hosted case warehouses to find bottlenecks, build <span className="text-foreground">Python</span> scripts (pandas, openpyxl, requests) to automate weekly extracts and reconciliations, and stand up <span className="text-foreground">Power BI</span> dashboards on top of those datasets for senior reviews.
              </p>
              <p>
                I treat requirements like a product spec: user stories in Jira, acceptance criteria, process maps, and a clear definition of done. The same instinct that makes me a decent engineer makes me a sharper analyst — I want to know <span className="text-foreground">how the data actually moves</span>, not just what the report says.
              </p>
            </div>

            <p className="mono text-sm text-primary pt-2">
              // currently in Amsterdam — Orientation Year Visa, no sponsorship required.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3 mono text-xs">
              <InfoRow label="role" value="Business Analyst" />
              <InfoRow label="focus" value="Regulatory · SQL · Python · BI" />
              <InfoRow label="location" value="Amsterdam, NL" />
              <InfoRow label="visa" value="Orientation Year — no sponsorship" />
              <InfoRow label="status" value="open to opportunities" highlight />
            </div>

            <div className="border border-border bg-card/40 p-5">
              <div className="mono text-xs text-primary mb-4">## kpis_shipped</div>
              <div className="grid grid-cols-2 gap-4">
                {KPIS.map((k) => (
                  <div key={k.label}>
                    <div className="font-serif text-2xl text-foreground leading-none mb-1">{k.value}</div>
                    <div className="mono text-[10px] text-muted-foreground leading-snug">{k.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <a href="/Harishmaran_Subbaiah_Thirumaran_CV.pdf" download className="flex items-center justify-between border border-primary/40 text-primary bg-primary/5 hover:bg-primary/10 px-4 py-3 mono text-xs transition-colors">
              <span>download_full_cv.pdf</span>
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="container py-20 md:py-28 border-t border-border/60">
        <SectionHeader index="02" title="projects" subtitle="things I build outside the day job" />
        <div className="grid gap-6 mt-12">
          {PROJECTS.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.id} className="group relative border border-border bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all p-6 md:p-8">
                <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start">
                  <div className="flex md:flex-col items-center md:items-start gap-3">
                    <span className="mono text-xs text-muted-foreground">/{p.id}</span>
                    <Icon className={`h-6 w-6 text-${p.accent}`} style={{ color: `hsl(var(--${p.accent}))` }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl mb-1">{p.name}</h3>
                    <p className="mono text-xs text-muted-foreground mb-4">// {p.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className="mono text-[10px] uppercase tracking-wider px-2 py-1 bg-secondary text-secondary-foreground border border-border/50">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="hidden md:block h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="container py-20 md:py-28 border-t border-border/60">
        <SectionHeader index="03" title="experience" />
        <div className="mt-12 space-y-8">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 pb-8 border-b border-border/40 last:border-0">
              <div className="mono text-xs text-muted-foreground">
                <div className="text-primary mb-1">{e.period}</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {e.location}</div>
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl leading-tight">{e.role}</h3>
                <div className="mono text-sm text-muted-foreground mb-4 flex items-center gap-2 mt-1">
                  <Briefcase className="h-3.5 w-3.5" /> {e.org}
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed">
                      <span className="text-primary mono mt-1.5 text-xs">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="container py-20 md:py-28 border-t border-border/60">
        <SectionHeader index="04" title="education & certifications" />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="border border-border bg-card/40 p-6">
            <GraduationCap className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-serif text-2xl mb-1">MSc International Business</h3>
            <p className="text-muted-foreground mono text-xs mb-3">University of Liverpool, UK · 2:1</p>
            <p className="text-sm text-muted-foreground">Global Corporate Strategy · Managerial Finance · International Management</p>
          </div>
          <div className="border border-border bg-card/40 p-6">
            <GraduationCap className="h-5 w-5 text-accent mb-3" />
            <h3 className="font-serif text-2xl mb-1">BE Mechanical Engineering</h3>
            <p className="text-muted-foreground mono text-xs mb-3">Kumaraguru College of Tech · Anna University · 8.1/10</p>
          </div>
          <div className="border border-border bg-card/40 p-6 md:col-span-2">
            <Award className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-serif text-2xl mb-4">Certifications</h3>
            <ul className="grid sm:grid-cols-2 gap-2 mono text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">▸</span> Google Project Management — Coursera (2024)</li>
              <li className="flex gap-2"><span className="text-primary">▸</span> Generative AI for Business — LinkedIn (2024)</li>
              <li className="flex gap-2"><span className="text-primary">▸</span> Microsoft Power BI Data Analyst (PL-300) — in progress</li>
              <li className="flex gap-2"><span className="text-primary">▸</span> Agile Project Management Fundamentals</li>
              <li className="flex gap-2 sm:col-span-2"><span className="text-primary">▸</span> HEAR Accreditation — University of Liverpool (2023)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="container py-20 md:py-28 border-t border-border/60">
        <SectionHeader index="05" title="skills" subtitle="the working toolkit" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="border border-border bg-card/40 p-5 hover:border-primary/40 transition-colors">
              <div className="mono text-xs text-primary mb-3 flex items-center gap-2">
                <GitBranch className="h-3.5 w-3.5" />{cat.toLowerCase().replace(/\s+/g, "_")}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 bg-secondary border border-border/50">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container py-20 md:py-32 border-t border-border/60">
        <SectionHeader index="06" title="contact" />
        <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              Let's build something <span className="text-primary glow-text">measurable</span>.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Open to Business Analyst, Regulatory Change, and AI-enhanced operations roles in Amsterdam &amp; remote across Europe.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
              <a href="mailto:harishmaran2001@gmail.com" className="group flex items-center justify-between border border-border bg-card/40 hover:border-primary hover:bg-card p-4 transition-all">
                <div>
                  <div className="mono text-[10px] text-muted-foreground mb-1">email</div>
                  <div className="text-foreground text-sm truncate">harishmaran2001@gmail.com</div>
                </div>
                <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
              </a>
              <a href="https://linkedin.com/in/harishmaran" target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-border bg-card/40 hover:border-primary hover:bg-card p-4 transition-all">
                <div>
                  <div className="mono text-[10px] text-muted-foreground mb-1">linkedin</div>
                  <div className="text-foreground text-sm">/in/harishmaran</div>
                </div>
                <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
              </a>
              <a href="/Harishmaran_Subbaiah_Thirumaran_CV.pdf" download className="group sm:col-span-2 flex items-center justify-between border border-primary/40 text-primary bg-primary/5 hover:bg-primary/10 p-4 transition-all">
                <div>
                  <div className="mono text-[10px] text-muted-foreground mb-1">curriculum vitae</div>
                  <div className="text-sm">Download full CV (PDF)</div>
                </div>
                <Download className="h-4 w-4 flex-shrink-0 ml-2" />
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="container py-10 border-t border-border/60 mono text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} Harishmaran S. Thirumaran</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> system online
        </div>
      </footer>
    </div>
  );
};

const SectionHeader = ({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) => (
  <div className="flex items-end justify-between gap-4 flex-wrap">
    <div>
      <div className="mono text-xs text-primary mb-2">/{index}</div>
      <h2 className="font-serif text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mono text-xs text-muted-foreground mt-2">// {subtitle}</p>}
    </div>
    <div className="flex-1 h-px bg-border max-w-[40%] mb-3 hidden sm:block" />
  </div>
);

const InfoRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-start justify-between gap-4 py-2 border-b border-border/40">
    <span className="text-muted-foreground">{label}</span>
    <span className={highlight ? "text-primary flex items-center gap-1.5" : "text-foreground text-right"}>
      {highlight && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
      {value}
    </span>
  </div>
);

export default Index;
