import { useEffect, useState, useRef, type ComponentType } from "react";
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

// ENHANCED ORBITING SKILLS - Each icon rotates on its own path
const OrbitingSkills = () => {
  const skills = [
    { name: "AWS", icon: "AWS", color: "#FF9900", size: "large", speed: 25 },
    { name: "Docker", icon: "DK", color: "#2496ED", size: "large", speed: 30 },
    { name: "Kubernetes", icon: "K8s", color: "#326CE5", size: "large", speed: 35 },
    { name: "Terraform", icon: "TF", color: "#7B42BC", size: "medium", speed: 20 },
    { name: "Python", icon: "Py", color: "#3776AB", size: "medium", speed: 28 },
    { name: "GitHub Actions", icon: "GA", color: "#2088FF", size: "medium", speed: 32 },
    { name: "TypeScript", icon: "TS", color: "#3178C6", size: "small", speed: 22 },
    { name: "Linux", icon: "LX", color: "#FCC624", size: "small", speed: 26 },
  ];

  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      {/* Central glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600/30 rounded-full blur-[60px] animate-pulse" />
      
      {/* Central logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_40px_rgba(139,92,246,0.5)] border-2 border-white/20">
          <Cloud className="w-10 h-10" />
        </div>
      </div>
      
      {/* Orbit paths (visual only) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-purple-500/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-purple-500/5" />
      
      {/* Skill icons - each on its own independent orbit */}
      {skills.map((skill, index) => {
        const isInner = index < 4;
        const radius = isInner ? 140 : 180;
        const startAngle = (index * 90) + (isInner ? 0 : 45);
        const duration = skill.speed;
        const delay = index * -3;
        
        return (
          <div
            key={skill.name}
            className="absolute top-1/2 left-1/2"
            style={{
              animation: `orbit-${index} ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <div
              className={`
                flex items-center justify-center rounded-xl font-bold
                transition-all duration-300 hover:scale-125 cursor-pointer
                shadow-lg border border-white/10 backdrop-blur-sm
                ${skill.size === 'large' ? 'w-14 h-14 text-xs' : 
                  skill.size === 'medium' ? 'w-12 h-12 text-[10px]' : 'w-10 h-10 text-[9px]'}
              `}
              style={{
                background: 'rgba(30, 30, 50, 0.8)',
                color: skill.color,
                transform: `translate(-50%, -50%) translateX(${radius}px)`,
                boxShadow: `0 0 20px ${skill.color}40`,
              }}
            >
              {skill.icon}
              {/* Tooltip */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] text-white/70">
                {skill.name}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* CSS keyframes for each orbit */}
      <style>{`
        ${skills.map((_, index) => `
          @keyframes orbit-${index} {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `).join('')}
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
                border border-slate-700 hover:border-purple-500/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {github && (
            <a href={github} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
              <Github className="w-5 h-5" />
              <span className="text-sm group-hover:underline">Source</span>
            </a>
          )}
          {live && (
            <a href={live} className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm group-hover:underline">Live Demo</span>
            </a>
          )}
        </div>
      </div>
      <div className={`${align === "right" ? "lg:order-1" : ""}`}>
        <div className="relative group rounded-xl overflow-hidden border border-slate-700/50 
          hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(139,92,246,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10" />
          <img 
            src={image} 
            alt={title}
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
          />
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
            {['Home', 'About', 'Experience', 'Projects', 'Lab'].map((item) => (
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
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-4xl mb-6 shadow-2xl">
                  <Cloud className="w-10 h-10 text-white" />
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
          <StatCard number={5} suffix="+" label="Years Experience" />
          <StatCard number={99} suffix=".9%" label="Uptime Maintained" />
          <StatCard number={40} suffix="%" label="Deploy Time Reduced" />
          <StatCard number={3} suffix="+" label="Cloud Platforms" />
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
            Currently, I'm a Business Analyst at{" "}
            <a href="https://www.gov.uk/government/organisations/department-for-work-pensions" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">DWP</a>
            {" "}, transitioning into DevOps.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            A self-taught cloud infrastructure enthusiast, functioning in the industry for 5+ years now. 
            I build meaningful and reliable systems that create an equilibrium between developer velocity 
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
              title="DevOps Engineer"
              company="DWP - Department for Work and Pensions"
              period="Aug 2024 - Present"
              description="Leading cloud migration initiatives and implementing Infrastructure as Code with Terraform and AWS. Driving automation of CI/CD pipelines for government digital services."
              icon={Cloud}
              color="bg-gradient-to-br from-blue-500 to-indigo-600"
              delay={0}
            />
            <ExperienceCard
              title="Cloud Infrastructure Engineer"
              company="The Contact Company"
              period="Jan 2024 - Aug 2024"
              description="Built CI/CD pipelines and automated deployment processes, reducing release time by 40%. Implemented container orchestration with Kubernetes and Docker."
              icon={Layers}
              color="bg-gradient-to-br from-purple-500 to-pink-600"
              delay={100}
            />
            <ExperienceCard
              title="Systems Administrator"
              company="Cookooc"
              period="Jan 2020 - Dec 2023"
              description="Managed cloud infrastructure for digital platform, ensuring 99.9% uptime for 1000+ monthly transactions. Automated server deployment and monitoring."
              icon={Server}
              color="bg-gradient-to-br from-emerald-500 to-teal-600"
              delay={200}
            />
            <ExperienceCard
              title="Graduate Student"
              company="University of Liverpool"
              period="2023 - 2024"
              description="MSc International Business with focus on data analytics and digital transformation. Achieved 2:1 Honours with specialization in cloud strategy."
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
          <p className="text-slate-400 mb-16 max-w-2xl mx-auto">
            I'm currently looking to join a cross-functional team that values improving developer experience 
            through reliable infrastructure and accessible automation.
          </p>
          
          <div className="flex justify-center py-12">
            <OrbitingSkills />
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
            {/* Retail Store Project */}
            <ProjectCard
              title="Retail Store Sample Application"
              subtitle="AWS Cloud Infrastructure"
              description="Implemented complete cloud infrastructure for AWS Containers Retail Sample using Terraform. Constructed VPC with public/private subnets, deployed ECS cluster with Fargate compute, set up RDS for database, DynamoDB tables, ElastiCache, and configured ECS Service Connect for inter-service communication. Enabled OpenTelemetry integration for observability and Container Insights for monitoring."
              image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
              tags={["Terraform", "ECS", "Fargate", "VPC", "Service Connect", "OpenTelemetry", "RDS", "DynamoDB"]}
              github="https://github.com/Harishmaranthirumaran/retail-store-sample-app"
              align="left"
              delay={0}
            />
            
            {/* Kubernetes EKS Project */}
            <ProjectCard
              title="Kubernetes on EKS"
              subtitle="Cloud Native Orchestration"
              description="Extended retail sample application with EKS deployment capabilities. Configured managed node groups across multiple availability zones, integrated OpenTelemetry with AWS Distro for observability, and enabled Istio service mesh. Automated Helm chart deployments and implemented GitOps workflows for infrastructure as code."
              image="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80"
              tags={["EKS", "Kubernetes", "Helm", "Istio", "GitOps", "Terraform", "AWS"]}
              github="https://github.com/Harishmaranthirumaran/retail-store-sample-app/tree/main/terraform/eks"
              align="right"
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
