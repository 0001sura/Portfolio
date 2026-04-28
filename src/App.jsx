import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Code2,
  LayoutPanelTop,
  Mail,
  Menu,
  MoveRight,
  PanelsTopLeft,
  Quote,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Perspective", href: "#perspective" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

const services = [
  {
    title: "Landing pages that convert",
    description:
      "Fast, high-trust marketing pages with clear hierarchy, persuasive sections, and responsive polish that survives real traffic.",
    icon: LayoutPanelTop,
  },
  {
    title: "Frontend development",
    description:
      "Frontend interfaces built for production with reusable components, clean states, and attention to speed, accessibility, and maintainability.",
    icon: Code2,
  },
  {
    title: "Redesigns and dashboards",
    description:
      "Sharper dashboards, redesigns, and product flows for teams that want their frontend to feel more premium, clearer, and easier to use.",
    icon: PanelsTopLeft,
  },
];

const projects = [
  {
    title: "Northstar Studio",
    summary:
      "Editorial-style landing page for a creative service brand with stronger positioning, lighter page weight, and clearer CTA flow.",
    impact: "42% longer average session time",
    stack: "React, Tailwind, Motion",
    palette: "from-[#1e1f23] via-[#3f4552] to-[#d8c7b2]",
    surface: "bg-[#14161a]",
    accent: "Creative service brand",
  },
  {
    title: "Ledger Loop",
    summary:
      "Refined a fintech dashboard UI with better hierarchy, calmer data presentation, and a mobile-ready navigation system.",
    impact: "28% lift in activation completion",
    stack: "React, charts, design system",
    palette: "from-[#10262a] via-[#234f59] to-[#c0d6cb]",
    surface: "bg-[#13282d]",
    accent: "Fintech dashboard refinement",
  },
  {
    title: "Launchline",
    summary:
      "Built a fast campaign microsite system for repeated launches, balancing brand expression with reusable component structure.",
    impact: "Shipped 6 pages in 3 weeks",
    stack: "Vite, Tailwind, CMS integration",
    palette: "from-[#29170f] via-[#7b4f2e] to-[#e7d7b8]",
    surface: "bg-[#2f1c12]",
    accent: "Campaign launch system",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Clarity first",
    description:
      "We define audience, positioning, and the single action the page or interface needs to drive.",
  },
  {
    step: "02",
    title: "Design with intent",
    description:
      "Structure, spacing, typography, and motion are shaped around trust, readability, and conversion.",
  },
  {
    step: "03",
    title: "Build for launch",
    description:
      "I develop the frontend with responsive care, accessible interactions, and clean handoff-ready code.",
  },
];

const testimonials = [
  {
    quote:
      "He turned a vague direction into a site that finally felt like our level. Clean, confident, and noticeably better on mobile.",
    name: "Maya Thompson",
    role: "Founder, Northstar Studio",
  },
  {
    quote:
      "The difference was in the details. Better hierarchy, smoother states, and a frontend that looked custom instead of assembled.",
    name: "Jonas Reed",
    role: "Product Lead, Ledger Loop",
  },
];

const stats = [
  { value: "Landing", label: "Pages built to make first impressions count" },
  { value: "WP + React", label: "Flexible delivery across marketing and product sites" },
  { value: "Freelance", label: "Available for focused frontend projects" },
];

const principles = [
  "Pretty is easy. Clear is rarer.",
  "Motion should guide attention, not ask for it.",
  "If a page looks premium but hesitates on mobile, it is unfinished.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? {} : "show"}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -48]);
  const heroCardY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 72]);
  const heroCardRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -3]);
  const heroCardScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.965]);
  const heroGlowY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const heroGlowTwoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -90]);

  useEffect(() => {
    const sections = ["home", "work", "services", "perspective", "process", "about"].map(
      (id) => document.getElementById(id),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: 0.1,
      },
    );

    sections.filter(Boolean).forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-grain"
        aria-hidden="true"
      />

      <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-ink text-sm font-semibold uppercase tracking-[0.2em] text-paper">
              AK
            </span>
            <div>
              <p className="font-display text-lg leading-none">Surafel</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-stone">
                Frontend Developer
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const current = activeSection === item.href.slice(1);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    current ? "text-ink" : "text-stone hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="mailto:surafelgbr@gmail.com"
              className="button-glow inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-paper transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              Build a site that earns trust faster
              <ArrowRight size={16} />
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-line bg-paper md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-stone transition-colors hover:bg-white/70 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="mailto:surafelgbr@gmail.com"
                className="button-glow mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-5 py-3 text-sm text-paper"
              >
                Build a site that earns trust faster
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section
          id="home"
          className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16"
        >
          <div
            ref={heroRef}
            className="relative grid gap-8 overflow-hidden rounded-[2.5rem] border border-line bg-white/40 px-6 py-8 shadow-soft lg:grid-cols-[1.28fr_0.72fr] lg:items-end lg:px-10 lg:py-12"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 top-12 h-48 w-48 rounded-full bg-ember/10 blur-3xl"
              style={{ y: heroGlowY }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 bottom-8 h-56 w-56 rounded-full bg-moss/10 blur-3xl"
              style={{ y: heroGlowTwoY }}
            />

            <Reveal className="space-y-8">
              <motion.div style={{ y: heroTextY }} className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.22em] text-stone shadow-soft">
                  <Sparkles size={14} className="text-ember" />
                  Available for select freelance projects
                </div>

                <div className="space-y-6">
                  <p className="max-w-2xl text-sm uppercase tracking-[0.24em] text-stone">
                    Landing pages, frontend builds, and UI refinement for ambitious digital brands
                  </p>
                  <h1 className="max-w-4xl font-display text-5xl leading-[0.92] tracking-tight md:text-7xl">
                    Frontend work that looks polished, feels effortless, and helps more visitors trust what they see.
                  </h1>
                  <p className="max-w-copy text-lg leading-8 text-stone md:text-xl">
                    I design and build landing pages, WordPress sites, dashboards, redesigns, and custom frontend experiences for brands that want more than a decent interface. The goal is simple: sharper trust, better usability, and a site people remember.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="mailto:surafelgbr@gmail.com"
                    className="button-glow inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm text-paper transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                  >
                    Build a site that earns trust faster
                    <MoveRight size={16} />
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/80 px-6 py-4 text-sm text-ink transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                  >
                    See how the work drives results
                  </a>
                </div>
              </motion.div>
            </Reveal>

            <Reveal delay={0.12} className="lg:pl-6">
              <motion.div
                style={{
                  y: heroCardY,
                  rotate: heroCardRotate,
                  scale: heroCardScale,
                }}
                whileHover={reduceMotion ? {} : { y: 8, rotate: -1.5, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative ml-auto max-w-[25rem] overflow-hidden rounded-[2rem] border border-line bg-white/72 p-5 text-ink shadow-soft md:p-6"
              >
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,76,47,0.10),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.25),transparent_60%)]"
                  aria-hidden="true"
                />
                <div className="relative space-y-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-stone">
                        Current focus
                      </p>
                      <p className="mt-3 max-w-xs font-display text-2xl leading-tight md:text-[2rem]">
                        Landing pages, WordPress builds, dashboard UI, and frontend redesign work.
                      </p>
                    </div>
                    <span className="rounded-full border border-line px-3 py-2 text-xs uppercase tracking-[0.18em] text-stone">
                      2026
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {stats.slice(0, 2).map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[1.35rem] border border-line bg-paper/80 p-4"
                      >
                        <p className="font-display text-2xl">{stat.value}</p>
                        <p className="mt-2 text-sm leading-6 text-stone">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                    <div className="rounded-[1.35rem] border border-line bg-ink px-4 py-5 text-paper">
                      <p className="text-xs uppercase tracking-[0.18em] text-paper/60">Promise</p>
                      <p className="mt-2 text-sm leading-6">
                        Clearer first impressions and cleaner paths to action.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-line bg-white/75 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-stone">
                          What changes after launch
                        </p>
                        <p className="mt-2 text-lg leading-7">
                          Sharper first impressions, clearer structure, and frontend detail that makes the whole brand feel more established.
                        </p>
                      </div>
                      <Star className="hidden text-ember md:block" size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="mt-10 md:mt-14">
            <div className="grid gap-4 rounded-[2rem] border border-line bg-white/70 p-5 shadow-soft md:grid-cols-4 md:p-6">
              {["Landing Pages", "WordPress Sites", "Dashboards", "Frontend Redesigns"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-line bg-paper/80 px-4 py-4 text-center text-sm text-stone"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-stone">Selected work</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
                A portfolio shaped to feel premium before a visitor reads a single sentence.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-stone">
              Every project below is designed to communicate trust quickly, guide attention cleanly, and stay polished on mobile where most first impressions happen.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={0.08 * index}>
                <motion.article
                  whileHover={
                    reduceMotion
                      ? {}
                      : {
                          y: -10,
                          rotate: index % 2 === 0 ? -0.8 : 0.8,
                          scale: 1.01,
                        }
                  }
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`card-tilt group flex h-full flex-col overflow-hidden rounded-[2.2rem] border border-line bg-white/75 shadow-soft ${
                    index === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-[1.1fr_0.9fr]" : ""
                  }`}
                >
                  <div className={`relative ${project.surface} p-6 text-paper ${index === 0 ? "min-h-[25rem] md:p-8" : "min-h-[20rem]"}`}>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.palette} opacity-90`}
                      aria-hidden="true"
                    />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-paper/70">
                          {project.accent}
                        </p>
                        <span className="rounded-full border border-white/15 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-paper/75">
                          {project.stack}
                        </span>
                      </div>

                      <div className="rounded-[1.75rem] border border-white/12 bg-black/10 p-5 backdrop-blur-[2px] md:max-w-[22rem]">
                        <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
                          <div className="rounded-[1.2rem] bg-white/12 p-4">
                            <div className="h-2 w-12 rounded-full bg-white/60" />
                            <div className="mt-5 h-20 rounded-[1rem] bg-white/10" />
                            <div className="mt-3 h-2 w-20 rounded-full bg-white/45" />
                          </div>
                          <div className="space-y-3">
                            <div className="rounded-[1rem] bg-white/10 p-3">
                              <div className="h-2 w-10 rounded-full bg-white/50" />
                              <div className="mt-3 h-10 rounded-[0.8rem] bg-white/10" />
                            </div>
                            <div className="rounded-[1rem] bg-white/10 p-3">
                              <div className="h-2 w-14 rounded-full bg-white/50" />
                              <div className="mt-3 h-10 rounded-[0.8rem] bg-white/10" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`flex flex-1 flex-col justify-between p-6 md:p-8 ${index === 0 ? "bg-white/68" : ""}`}>
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-stone">Selected case study</p>
                      <p className="mt-3 font-display text-3xl leading-tight md:text-4xl">
                        {project.title}
                      </p>
                      <p className="mt-5 max-w-xl text-base leading-7 text-stone">{project.summary}</p>
                      <p className="mt-6 text-sm uppercase tracking-[0.18em] text-ember">
                        {project.impact}
                      </p>
                    </div>
                    <div className="link-sweep mt-8 inline-flex items-center gap-2 text-sm text-ink">
                      See the business impact behind it
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="services" className="border-y border-line bg-white/55">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <Reveal className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-stone">Services</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Freelance frontend support across marketing sites, redesigns, WordPress builds, and product UI.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <Reveal key={service.title} delay={0.08 * index}>
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? {}
                          : {
                              y: -8,
                              rotateX: 3,
                              rotateY: index === 1 ? 0 : index === 0 ? 3 : -3,
                            }
                      }
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="h-full rounded-[2rem] border border-line bg-paper/90 p-6 shadow-soft"
                    >
                      <div className="inline-flex rounded-2xl border border-line bg-white p-3 text-ember">
                        <Icon size={22} />
                      </div>
                      <h3 className="mt-8 font-display text-3xl leading-tight">
                        {service.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-stone">
                        {service.description}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="perspective" className="relative overflow-hidden bg-ink text-paper">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(200,76,47,0.18),transparent_24%),radial-gradient(circle_at_85%_80%,rgba(232,217,197,0.10),transparent_20%)]"
            aria-hidden="true"
          />
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.22em] text-paper/55">Perspective</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                My opinion: most portfolios and landing pages do not have a design problem. They have a trust problem.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-paper/72">
                Clean visuals help, but what actually moves people is confidence. Clear hierarchy. Strong proof. Friction-free interaction. Fast pages that feel deliberate. That is the layer I care about most.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3">
              {principles.map((item, index) => (
                <Reveal key={item} delay={0.06 * index}>
                  <motion.div
                    whileHover={reduceMotion ? {} : { y: -6, scale: 1.01 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="flex min-h-[220px] flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <Quote size={20} className="text-ember" />
                    <p className="font-display text-3xl leading-tight">{item}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.22em] text-stone">Process</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Calm process, clear communication, serious attention to finish.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-stone">
                Good frontend work is not just attractive. It should feel coherent, move smoothly, and make next steps obvious. That only happens when the build process protects quality from the start.
              </p>
            </Reveal>

            <div className="space-y-5">
              {processSteps.map((item, index) => (
                <Reveal key={item.step} delay={0.08 * index}>
                  <div className="grid gap-5 rounded-[2rem] border border-line bg-white/75 p-6 shadow-soft md:grid-cols-[110px_1fr] md:items-start">
                    <div className="font-display text-5xl text-ember">{item.step}</div>
                    <div>
                      <h3 className="font-display text-3xl">{item.title}</h3>
                      <p className="mt-3 max-w-xl text-base leading-7 text-stone">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-4 md:px-8 md:py-8">
          <Reveal>
            <div className="grid overflow-hidden rounded-[2.2rem] border border-line bg-white/80 shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.22em] text-stone">Conversion-first CTA</p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
                  If your site already looks decent, the next win is making it feel more trusted, more focused, and easier to act on.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-stone">
                  I help teams close the gap between &ldquo;clean enough&rdquo; and &ldquo;the kind of frontend that makes people stay, believe, and click.&rdquo;
                </p>
              </div>
              <div className="flex flex-col justify-between bg-sand/55 p-8 md:p-10">
                <div className="space-y-4 text-sm text-stone">
                  <p>Best fit for service brands, SaaS teams, product launches, and portfolios that need stronger commercial presence.</p>
                  <p>Available for focused builds, premium refreshes, and landing page performance upgrades.</p>
                </div>
                <a
                  href="mailto:surafelgbr@gmail.com"
                  className="button-glow mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm text-paper transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  Turn this site into a stronger sales asset
                  <MoveRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal>
              <div className="rounded-[2rem] border border-line bg-ink p-8 text-paper shadow-card">
                <p className="text-xs uppercase tracking-[0.22em] text-paper/60">About</p>
                <h2 className="mt-4 font-display text-4xl leading-tight">
                  I help brands look sharper online without sacrificing speed, clarity, or usability.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-paper/72">
                  I am a frontend developer focused on clean interfaces, thoughtful interactions, and strong execution across landing pages, WordPress websites, dashboards, redesigns, and custom frontend builds. I care about the details people feel before they can name them: rhythm, spacing, hierarchy, responsiveness, and the confidence of a clean interface.
                </p>

                <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-paper/55">
                    Availability
                  </p>
                  <p className="mt-3 text-lg leading-7">
                    Available for freelance frontend projects for founders, agencies, and teams that need better landing pages, website redesigns, WordPress execution, or polished dashboard UI.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6">
              <Reveal>
                <div className="rounded-[2rem] border border-line bg-white/75 p-6 shadow-soft">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone">GitHub</p>
                  <h3 className="mt-4 font-display text-3xl leading-tight">
                    See how I build, not just how I present.
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-7 text-stone">
                    Browse my code, experiments, and frontend work on GitHub.
                  </p>
                  <a
                    href="https://github.com/0001sura"
                    target="_blank"
                    rel="noreferrer"
                    className="link-sweep mt-6 inline-flex items-center gap-2 text-sm text-ink"
                  >
                    github.com/0001sura
                    <ArrowRight size={16} />
                  </a>
                </div>
              </Reveal>

              {testimonials.map((item, index) => (
                <Reveal key={item.name} delay={0.08 * (index + 1)}>
                  <blockquote className="rounded-[2rem] border border-line bg-white/75 p-6 shadow-soft">
                    <p className="font-display text-3xl leading-tight">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <footer className="mt-6">
                      <p className="text-sm font-medium text-ink">{item.name}</p>
                      <p className="mt-1 text-sm text-stone">{item.role}</p>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}

              <Reveal delay={0.16}>
                <div className="rounded-[2rem] border border-line bg-sand/60 p-6 shadow-soft">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone">Ready to start</p>
                  <h3 className="mt-4 font-display text-4xl leading-tight">
                    Need a landing page, WordPress site, dashboard, or frontend redesign?
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-7 text-stone">
                    If the goal is a more confident digital presence with better frontend execution, I&apos;d love to help.
                  </p>
                  <a
                    href="mailto:surafelgbr@gmail.com"
                    className="button-glow mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-sm text-paper transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                  >
                    <Mail size={16} />
                    Start a frontend project with sharper ROI
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
