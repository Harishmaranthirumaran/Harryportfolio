import { useEffect, useState, useRef, type ComponentType, type MouseEvent as ReactMouseEvent } from "react";
import { 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink,
  ChevronRight,
  Briefcase,
  Cloud,
  Terminal,
  Database,
  Server,
  Layers,
  Container,
  Code2,
  Award,
  GraduationCap,
  MapPin,
  Cpu,
  GitBranch,
  Workflow,
  Boxes
} from "lucide-react";

// SCROLL REVEAL HOOK
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// ANIMATED TYPING COMPONENT
const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [started, text]);
  
  return (
    <span>
      {displayText}
      <span className="inline-block w-[3px] h-[1em] bg-purple-500 ml-1 animate-pulse" />
    </span>
  );
};

// SOLAR SYSTEM SKILLS - DevOps tools orbiting the cloud core like planets
type Planet = { name: string; label: string; color: string; ring: number; angle: number };

const SolarSystem = () => {
  // Three concentric orbits. ring => radius. angle => starting position (deg).
  const planets: Planet[] = [
    // Inner orbit — core platforms
    { name: "AWS", label: "AWS", color: "#FF9900", ring: 0, angle: 0 },
    { name: "Docker", label: "DK", color: "#2496ED", ring: 0, angle: 120 },
    { name: "Kubernetes", label: "K8s", color: "#326CE5", ring: 0, angle: 240 },
    // Middle orbit — infra + observability
    { name: "Terraform", label: "TF", color: "#7B42BC", ring: 1, angle: 45 },
    { name: "Linux", label: "LX", color: "#FCC624", ring: 1, angle: 135 },
    { name: "Prometheus", label: "PM", color: "#E6522C", ring: 1, angle: 225 },
    { name: "Grafana", label: "GF", color: "#F46800", ring: 1, angle: 315 },
    // Outer orbit — automation + delivery
    { name: "Python", label: "Py", color: "#3776AB", ring: 2, angle: 20 },
    { name: "Ansible", label: "AN", color: "#EE0000", ring: 2, angle: 92 },
    { name: "Jenkins", label: "JK", color: "#D24939", ring: 2, angle: 164 },
    { name: "GitHub Actions", label: "GA", color: "#2088FF", ring: 2, angle: 236 },
    { name: "Git", label: "Git", color: "#F05032", ring: 2, angle: 308 },
  ];

  const ringRadius = [95, 155, 215];
  const ringDuration = [32, 46, 60]; // slower as you go out, like real orbits

  return (
    <div className="relative w-[480px] h-[480px] max-w-full mx-auto scale-[0.6] sm:scale-[0.8] md:scale-100 origin-center">
      {/* Ambient core glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-600/30 rounded-full blur-[70px] animate-pulse" />

      {/* Orbit rings (visual guides) */}
      {ringRadius.map((r, i) => (
        <div
          key={`ring-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
          style={{
            width: r * 2,
            height: r * 2,
            borderColor: "rgba(168,133,255,0.12)",
          }}
        />
      ))}

      {/* The Sun / core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-600 to-pink-600 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.6)] border border-white/20">
          <Cloud className="w-9 h-9 text-white" />
          <span className="text-[10px] font-semibold text-white/90 mt-0.5 tracking-wide">DevOps</span>
        </div>
      </div>

      {/* Planets */}
      {planets.map((p, i) => {
        const radius = ringRadius[p.ring];
        const duration = ringDuration[p.ring];
        return (
          <div
            key={p.name}
            className="absolute top-1/2 left-1/2 w-0 h-0"
            style={{ animation: `sys-orbit-${i} ${duration}s linear infinite` }}
          >
            <div
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: radius, top: 0, animation: `sys-spin-${i} ${duration}s linear infinite` }}
            >
              <div
                className="flex items-center justify-center rounded-full font-bold text-[11px] w-12 h-12
                  cursor-pointer transition-transform duration-300 hover:scale-125 border border-white/15 backdrop-blur-sm"
                style={{
                  background: "rgba(18,18,34,0.9)",
                  color: p.color,
                  boxShadow: `0 0 18px ${p.color}55`,
                }}
              >
                {p.label}
                <span
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap
                    rounded-md bg-slate-900/95 px-2 py-1 text-[10px] font-medium text-white/90
                    opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700/60"
                >
                  {p.name}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Per-planet keyframes: orbit rotates the arm, spin counter-rotates the planet to stay upright */}
      <style>{`
        ${planets
          .map(
            (p, i) => `
          @keyframes sys-orbit-${i} {
            from { transform: rotate(${p.angle}deg); }
            to   { transform: rotate(${p.angle + 360}deg); }
          }
          @keyframes sys-spin-${i} {
            from { transform: translate(-50%, -50%) rotate(${-p.angle}deg); }
            to   { transform: translate(-50%, -50%) rotate(${-p.angle - 360}deg); }
          }
        `
          )
          .join("")}
      `}</style>
    </div>
  );
};

// EXPERIENCE CARD
const ExperienceCard = ({ 
  title, 
  company, 
  period, 
  description,
  icon: Icon,
  color,
  delay = 0
}: { 
  title: string; 
  company: string; 
  period: string; 
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div 
      ref={ref}
      className={`
        group relative bg-slate-900/60 backdrop-blur-md 
        border border-slate-700/50 rounded-2xl p-6 
        hover:border-purple-500/50 transition-all duration-500
        hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 
        group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-purple-400 text-sm font-medium mb-1">{company}</p>
      <p className="text-slate-500 text-xs mb-3 font-mono">{period}</p>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

// PROJECT CARD
const ProjectCard = ({ 
  title, 
  subtitle,
  description, 
  image,
  tags,
  github,
  live,
  align = "left",
  delay = 0
}: { 
  title: string; 
  subtitle?: string;
  description: string; 
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  align?: "left" | "right";
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollReveal();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    // max ~7deg tilt, eased
    setTilt({
      rx: (0.5 - py) * 14,
      ry: (px - 0.5) * 14,
      gx: px * 100,
      gy: py * 100,
    });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });

  return (
    <div 
      ref={ref}
      className={`
        grid lg:grid-cols-2 gap-8 items-center
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
        transition-all duration-1000
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`${align === "right" ? "lg:order-2" : ""}`}>
        <div className="text-purple-500 text-sm font-medium mb-2 uppercase tracking-wider">
          {subtitle || "Featured Project"}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h3>
        <p className="text-slate-400 leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-slate-800/80 text-slate-300 text-xs rounded-full 
                border border-slate-700 hover:border-purple-500/50 hover:text-white 
                hover:-translate-y-0.5 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
              <Github className="w-5 h-5" />
              <span className="text-sm group-hover:underline">Source</span>
            </a>
          )}
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm group-hover:underline">Live Demo</span>
            </a>
          )}
        </div>
      </div>
      <div className={`${align === "right" ? "lg:order-1" : ""}`} style={{ perspective: "1200px" }}>
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={resetTilt}
          className="relative group rounded-2xl overflow-hidden border border-slate-700/50 
            transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform
            hover:border-purple-500/40 hover:shadow-[0_20px_80px_-20px_rgba(139,92,246,0.45)]"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.rx || tilt.ry ? 1.02 : 1})`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* skeleton shimmer while image loads */}
          {!imgLoaded && (
            <div className="absolute inset-0 z-20 bg-slate-800 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          )}

          {/* gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/10 to-transparent z-10" />

          {/* cursor-follow spotlight */}
          <div
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(400px circle at ${tilt.gx}% ${tilt.gy}%, rgba(139,92,246,0.25), transparent 60%)`,
            }}
          />

          <img 
            src={image} 
            alt={title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full aspect-video object-cover transition-all duration-700 ease-out
              group-hover:scale-110 ${imgLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
          />

          {/* hover CTA pill */}
          {(live || github) && (
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full 
              bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm text-white
              translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
              transition-all duration-500">
              <ExternalLink className="w-4 h-4" />
              {live ? "Open live demo" : "View source"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// STATS COMPONENT
const StatCard = ({ number, label, suffix = "" }: { number: number; label: string; suffix?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [isVisible, number]);

  return (
    <div 
      ref={ref}
      className={`
        text-center p-6 bg-slate-900/40 rounded-2xl border border-slate-800
        hover:border-purple-500/30 transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-slate-500 text-sm">{label}</div>
    </div>
  );
};

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      {/* Animated background orbs with parallax */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div 
          className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[120px]"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        <div 
          className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            H.
          </a>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-slate-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Profile Card */}
            <div 
              ref={heroRef}
              className={`
                relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 
                border border-slate-700/50 shadow-[0_0_60px_rgba(139,92,246,0.1)]
                overflow-hidden
                ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                transition-all duration-1000
              `}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="text-purple-500 text-sm font-medium mb-2 uppercase tracking-widest">Hello! I Am</div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Harishmaran</h1>
                <div className="relative w-24 h-24 mb-6">
                  {/* radial glow behind the memoji */}
                  <div className="absolute inset-0 -m-4 rounded-full bg-purple-500/40 blur-2xl animate-pulse" />
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl animate-avatar-float">
                    <span className="text-5xl select-none" role="img" aria-label="Developer coding on a MacBook">👨‍💻</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, href: "https://linkedin.com/in/harishmaran", label: "LinkedIn" },
                    { icon: Github, href: "https://github.com/Harishmaranthirumaran", label: "GitHub" },
                    { icon: Mail, href: "mailto:harishmaran2001@gmail.com", label: "Email" }
                  ].map(({ icon: Icon, href, label }) => (
                    <a 
                      key={label}
                      href={href}
                      className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 
                        flex items-center justify-center text-slate-400 
                        hover:text-white hover:bg-purple-500/20 hover:border-purple-500/50 
                        transition-all duration-300 group"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right - Hero Text */}
            <div className={`text-center lg:text-left transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <p className="text-slate-400 text-lg mb-4">A DevOps Engineer who</p>
              <h2 className="text-5xl md:text-7xl font-bold mb-2">
                <span className="text-white">Automates</span>
              </h2>
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  everything...
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-lg mx-auto lg:mx-0">
                Currently building scalable infrastructure and CI/CD pipelines that empower teams to ship faster and more reliably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard number={4} suffix="+" label="Years Experience" />
          <StatCard number={99} suffix=".9%" label="Uptime Maintained" />
          <StatCard number={40} suffix="%" label="Deploy Time Reduced" />
          <StatCard number={30} suffix="+" label="IaC Projects Shipped" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
            About Me
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            I'm a <span className="text-purple-400"><Typewriter text="DevOps Engineer" delay={500} /></span>
          </h2>
          <p className="text-slate-400 text-lg mb-4">
            Currently a Business Analyst at{" "}
            <a href="https://www.gov.uk/government/organisations/department-for-work-pensions" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">DWP</a>
            {" "}— where I bridge delivery teams and cloud engineering — with a hands-on focus on DevOps and cloud infrastructure.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Over 4+ years across service delivery and cloud engineering, I've built Infrastructure as Code with
            Terraform, containerised workloads on AWS with Docker and Kubernetes, and wired up CI/CD and
            observability with Prometheus and Grafana. I care about the equilibrium between developer velocity
            and operational stability.
          </p>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
              Professional Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Work Experience</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ExperienceCard
              title="Business Analyst — DevOps & Cloud"
              company="DWP — Department for Work and Pensions"
              period="Aug 2024 - Present"
              description="Bridge delivery teams and cloud engineering on government digital services. Translate operational requirements into Infrastructure as Code with Terraform and AWS, and champion CI/CD automation to shorten release cycles."
              icon={Cloud}
              color="bg-gradient-to-br from-blue-500 to-indigo-600"
              delay={0}
            />
            <ExperienceCard
              title="Cloud & DevOps Engineer"
              company="The Contact Company"
              period="Jan 2024 - Aug 2024"
              description="Designed CI/CD pipelines with GitHub Actions and automated deployments that cut release time by 40%. Containerised services with Docker and orchestrated them on Kubernetes for repeatable, self-healing rollouts."
              icon={Layers}
              color="bg-gradient-to-br from-purple-500 to-pink-600"
              delay={100}
            />
            <ExperienceCard
              title="Systems & Infrastructure Engineer"
              company="Cookooc"
              period="Jan 2021 - Dec 2023"
              description="Ran cloud infrastructure for a live digital platform at 99.9% uptime. Scripted server provisioning and monitoring in Python and Bash, and introduced Prometheus and Grafana dashboards for proactive alerting."
              icon={Server}
              color="bg-gradient-to-br from-emerald-500 to-teal-600"
              delay={200}
            />
            <ExperienceCard
              title="MSc International Business"
              company="University of Liverpool"
              period="2023 - 2024"
              description="Postgraduate study with a focus on data analytics and digital transformation, alongside self-directed AWS and Kubernetes engineering that seeded the cloud projects below."
              icon={GraduationCap}
              color="bg-gradient-to-br from-amber-500 to-orange-600"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Skills Orbit Section */}
      <section className="relative z-10 py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
            Technical Arsenal
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Skills & Technologies</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            My DevOps toolchain orbits a single goal — shipping reliable, observable infrastructure.
            The core platforms sit at the centre, with automation and monitoring tooling circling around.
          </p>

          <div className="flex justify-center items-center min-h-[320px] sm:min-h-[420px] md:min-h-[520px] py-4">
            <SolarSystem />
          </div>

          {/* Grouped skill matrix for scanability */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-left">
            {[
              { group: "Cloud & Platforms", items: ["AWS", "EKS / ECS", "Fargate", "App Runner"] },
              { group: "Containers & Orchestration", items: ["Docker", "Kubernetes", "Helm", "Istio"] },
              { group: "IaC & Automation", items: ["Terraform", "Ansible", "GitHub Actions", "Jenkins"] },
              { group: "Observability & OS", items: ["Prometheus", "Grafana", "OpenTelemetry", "Linux"] },
            ].map((cat) => (
              <div
                key={cat.group}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/30 transition-colors"
              >
                <h4 className="text-sm font-semibold text-purple-400 mb-3">{cat.group}</h4>
                <ul className="space-y-1.5">
                  {cat.items.map((s) => (
                    <li key={s} className="text-slate-400 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
              Featured Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Featured Projects</h2>
          </div>
          
          <div className="space-y-32">
            {/* Project 1 — Retail Store container platform */}
            <ProjectCard
              title="Cloud-Native Retail Store Platform"
              subtitle="Containers on AWS · ECS & EKS"
              description="A microservices retail store (UI, catalog, cart, orders, checkout in Java, Go and Node) deployed on AWS with Terraform. I provisioned the VPC, ran the services on ECS Fargate and Amazon EKS, and backed them with RDS, DynamoDB and Redis. Every service is wired for Prometheus metrics and OpenTelemetry tracing, with Istio handling service mesh traffic on Kubernetes."
              image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
              tags={["Terraform", "Amazon EKS", "ECS Fargate", "Istio", "Prometheus", "OpenTelemetry", "RDS", "DynamoDB"]}
              github="https://github.com/Harishmaranthirumaran/retail-store-sample-app"
              align="left"
              delay={0}
            />

            {/* Project 2 — AWS Project Pack / IaC blueprint library */}
            <ProjectCard
              title="AWS Infrastructure Blueprint Library"
              subtitle="Terraform IaC · 30+ Reusable Projects"
              description="A curated pack of production-shaped Terraform blueprints covering the full cloud lifecycle: static hosting and serverless pipelines, multi-account landing zones, EKS GitOps platforms, observability stacks, security guardrails with SCPs and GuardDuty, disaster-recovery drills and FinOps cost intelligence. Each blueprint ships with runbooks, architecture notes and remote-state conventions so it can be deployed independently."
              image="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80"
              tags={["Terraform", "AWS Organizations", "GitOps", "Argo CD", "GuardDuty", "AWS Backup", "FinOps", "Ansible"]}
              github="https://github.com/Harishmaranthirumaran/Cloud-project1"
              align="right"
              delay={100}
            />

            {/* Project 3 — Live F1 telemetry dashboard */}
            <ProjectCard
              title="Live Formula 1 Telemetry Dashboard"
              subtitle="Real-Time Data Pipeline · React & InfluxDB"
              description="A self-built live F1 dashboard that streams native telemetry from the F1 SignalR broadcast feed, re-sorting every competitive metric across the grid every 5 seconds. A Dockerised fastf1 ingestion service writes into InfluxDB, which a Vite-proxied React front end queries with Flux, plus a browser-native race replay powered by OpenF1 session data. Deployed live on Vercel."
              image="/f1-pitwall.jpg"
              tags={["React", "TypeScript", "InfluxDB", "Docker", "Python (fastf1)", "OpenF1", "Vercel"]}
              github="https://github.com/HARISHMARAN/Harry-s-F1-data"
              live="https://harry-s-f1-data.vercel.app"
              align="left"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            I'm currently looking to join a cross-functional team that values improving developer experience 
            through reliable infrastructure, or have a project in mind? Let's connect.
          </p>
          <a 
            href="mailto:harishmaran2001@gmail.com"
            className="inline-flex items-center gap-2 text-xl md:text-2xl font-medium text-purple-400 hover:text-purple-300 transition-colors group"
          >
            harishmaran2001@gmail.com
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <div className="flex justify-center gap-6 mt-12">
            {[
              { icon: Linkedin, href: "https://linkedin.com/in/harishmaran", label: "LinkedIn" },
              { icon: Github, href: "https://github.com/Harishmaranthirumaran", label: "GitHub" },
              { icon: Mail, href: "mailto:harishmaran2001@gmail.com", label: "Email" }
            ].map(({ icon: Icon, href, label }) => (
              <a 
                key={label}
                href={href}
                className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 
                  flex items-center justify-center text-slate-400 
                  hover:text-white hover:bg-purple-500/20 hover:border-purple-500/50 
                  transition-all duration-300 group"
                aria-label={label}
              >
                <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              H.
            </div>
            <span className="text-slate-500 text-sm">Harishmaran S. Thirumaran</span>
          </div>
          <p className="text-slate-600 text-sm">
            Designed & Built with precision
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
