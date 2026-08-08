"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flower2,
  Heart,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Navigation,
  Phone,
  Play,
  Search,
  Sparkles,
  Star,
  Sun,
  X,
  Zap
} from "lucide-react";
import { faqs, navItems, programs, siteConfig } from "@/config/site";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: smoothEase }
  }
};

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=80",
    alt: "Calm yoga meditation practice in warm morning light",
    title: "Morning Meditation",
    description: "Centering mind and body in quiet sunrise atmosphere."
  },
  {
    src: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=80",
    alt: "Yoga student holding a mindful posture",
    title: "Mindful Alignment",
    description: "Building steady posture and conscious alignment."
  },
  {
    src: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=1000&q=80",
    alt: "Peaceful yoga studio class with soft light",
    title: "Studio Sanctuary",
    description: "Spacious studio environment designed for serene focus."
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
    alt: "Outdoor yoga session with relaxed breathing",
    title: "Breath & Flow",
    description: "Connecting breath movement in harmonious flow."
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    alt: "Yoga movement in a bright premium studio",
    title: "Restorative Grace",
    description: "Deep relaxation and physical recovery."
  }
];

type BenefitItem = readonly [string, string, React.ComponentType<{ className?: string }>];

const benefits: BenefitItem[] = [
  ["Improve Flexibility", "Gentle mobility and alignment for spacious movement.", Leaf],
  ["Reduce Stress", "Breath-led practice to soften the nervous system.", Moon],
  ["Increase Strength", "Stable postures that build grounded confidence.", Zap],
  ["Better Posture", "Awareness and control for everyday ease.", Sparkles],
  ["Mental Clarity", "Meditative focus for a quieter inner rhythm.", Sun],
  ["Better Sleep", "Restorative practices for deeper recovery.", Heart],
  ["Improved Immunity", "Consistent movement and breath for resilience.", Flower2],
  ["Healthy Lifestyle", "A supportive path from practice to daily life.", Star]
];

const journey = [
  { name: "Morning Awakening", desc: "Gentle stretch & sunrise stillness" },
  { name: "Mindful Stretch", desc: "Opening hips, spine, and breath" },
  { name: "Pranayama", desc: "Deep nervous system calibration" },
  { name: "Asana Practice", desc: "Balanced strength and posture sequence" },
  { name: "Meditation", desc: "Quieting mental clutter for focus" },
  { name: "Savasana Rest", desc: "Total physical integration & calm" },
  { name: "Daily Vitality", desc: "Carrying peace into daily life" }
];

const testimonials = [
  {
    name: "Anjana R.",
    text: "YUJ feels peaceful from the first breath. The classes are elegant, attentive, and genuinely grounding.",
    role: "Beginner student"
  },
  {
    name: "Vivek M.",
    text: "The Ashtanga sessions helped me build strength without losing the meditative quality of yoga.",
    role: "Ashtanga practitioner"
  },
  {
    name: "Meera S.",
    text: "Family yoga became our weekly reset. Warm teaching, beautiful energy, and thoughtful guidance.",
    role: "Family yoga member"
  }
];

const stats: [string, number][] = [
  ["Students trained", 1200],
  ["Years of experience", 10],
  ["Classes conducted", 4500],
  ["Community members", 800]
];

type BookingForm = {
  date: string;
  time: string;
  program: string;
  instructor: string;
  name: string;
  phone: string;
  note: string;
};

export function YujHome() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [faqQuery, setFaqQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeJourneyIndex, setActiveJourneyIndex] = useState(0);

  const defaultProgram = programs[0]?.title ?? "Group Lessons";

  const [form, setForm] = useState<BookingForm>({
    date: "",
    time: "",
    program: defaultProgram,
    instructor: "First available",
    name: "",
    phone: "",
    note: ""
  });

  const lenisRef = useRef<Lenis | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const isFooterInView = useInView(footerRef, { amount: 0.05 });
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, reducedMotion ? 0 : 80]);
  const mistY = useTransform(scrollYProgress, [0, 0.28], [0, reducedMotion ? 0 : -45]);

  // Session loader check (fast load for instant LCP)
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("yuj_loaded")) {
      setLoaded(true);
      return;
    }
    const timer = window.setTimeout(() => {
      setLoaded(true);
      sessionStorage.setItem("yuj_loaded", "true");
    }, 350);
    return () => window.clearTimeout(timer);
  }, []);

  // Modal body scroll locking
  useEffect(() => {
    if (activeGalleryIndex !== null || bookingConfirmed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeGalleryIndex, bookingConfirmed]);

  // Lenis smooth scroll (skip on mobile touch devices to save CPU/battery)
  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = typeof window !== "undefined" && window.innerWidth < 768 ? -90 : -70;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset, duration: 1.4 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  }, []);

  // Section Observer with tuned threshold & margin
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20% 0px -40% 0px" }
    );

    const sectionIds = navItems.map((item) => item[1]);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Gallery Navigation Callbacks
  const openGallery = (index: number) => setActiveGalleryIndex(index);
  const closeGallery = () => setActiveGalleryIndex(null);
  const prevGallery = useCallback(() => {
    setActiveGalleryIndex((prev) => (prev !== null ? (prev === 0 ? gallery.length - 1 : prev - 1) : null));
  }, []);
  const nextGallery = useCallback(() => {
    setActiveGalleryIndex((prev) => (prev !== null ? (prev === gallery.length - 1 ? 0 : prev + 1) : null));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeGalleryIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") prevGallery();
      if (e.key === "ArrowRight") nextGallery();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGalleryIndex, prevGallery, nextGallery]);

  const selectProgramAndBook = (programTitle: string) => {
    setForm((prev) => ({ ...prev, program: programTitle }));
    scrollToSection("contact");
    const nameInput = document.getElementById("booking-name-input");
    if (nameInput) {
      nameInput.focus();
    }
  };

  const filteredFaqs = useMemo(() => {
    const query = faqQuery.trim().toLowerCase();
    if (!query) return faqs;
    return faqs.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(query));
  }, [faqQuery]);

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapsQuery)}`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Namaste YUJ, I would like to enquire about yoga classes.")}`;

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingConfirmed(true);
  };

  const sendWhatsAppBooking = () => {
    const message = [
      "Namaste YUJ, I would like to book a trial class.",
      `Name: ${form.name || "Guest"}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Program: ${form.program}`,
      `Date: ${form.date || "Preferred date"}`,
      `Time: ${form.time || "Preferred time"}`,
      `Instructor: ${form.instructor}`,
      form.note ? `Note: ${form.note}` : ""
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setBookingConfirmed(false);
  };

  return (
    <main className="relative min-h-screen">
      <AnimatePresence>{!loaded && <Loader />}</AnimatePresence>
      <CursorGlow />
      
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeSection={activeSection}
        onNavClick={scrollToSection}
      />

      {/* HERO SECTION */}
      <section id="home" ref={heroRef} className="aurora relative flex min-h-screen items-center overflow-hidden pt-24">
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-[16%] h-80 w-80 -translate-x-1/2 rounded-full bg-yuj-peach/60 blur-3xl breath" />
          <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-gradient-to-t from-yuj-purple/20 to-transparent" />
          <div className="absolute bottom-16 left-[-8%] h-52 w-[62%] rounded-[50%] bg-yuj-purple/30 blur-2xl" />
          <div className="absolute bottom-24 right-[-4%] h-48 w-[58%] rounded-[50%] bg-yuj-plum/25 blur-2xl" />
        </motion.div>
        <motion.div style={{ y: mistY }} className="pointer-events-none absolute inset-x-0 bottom-16 h-36 bg-white/30 blur-3xl" />
        
        {["left-[8%] top-[28%]", "right-[12%] top-[22%]", "left-[18%] bottom-[20%]", "right-[20%] bottom-[28%]"].map((position, index) => (
          <Flower2
            key={position}
            className={`petal absolute ${position} h-7 w-7 text-yuj-gold/45`}
            style={{ animationDelay: `${index * 1.5}s` }}
          />
        ))}

        <div className="section-shell relative z-10 grid min-h-[calc(100vh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div initial="hidden" animate={loaded ? "visible" : "hidden"} variants={fadeUp}>
            <motion.p
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-yuj-plum shadow-glow backdrop-blur cursor-default"
            >
              <Sparkles className="h-4 w-4 text-yuj-gold" /> Yoga for One Earth, One Health
            </motion.p>
            <h1 className="font-heading text-6xl font-bold leading-[0.92] text-yuj-purple text-balance sm:text-7xl lg:text-8xl">
              Transform Your Body, Mind, Soul
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-yuj-ink/76">
              A premium yoga school in Kochi for mindful strength, breath-led calm, and holistic transformation.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: smoothEase }}
                onClick={() => scrollToSection("contact")}
                className="gold-shimmer inline-flex items-center justify-center gap-3 rounded-full bg-yuj-purple px-7 py-4 font-bold text-white shadow-gold focus:outline-none focus:ring-4 focus:ring-yuj-gold/40"
              >
                Book Your First Class <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: smoothEase }}
                onClick={() => scrollToSection("programs")}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white/80 px-7 py-4 font-bold text-yuj-purple shadow-glow backdrop-blur focus:outline-none focus:ring-4 focus:ring-yuj-lavender"
              >
                Explore Classes <Play className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: smoothEase }}
            className="flex flex-col items-center justify-center relative mx-auto w-full max-w-[420px]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[12rem] rounded-b-[3rem] shadow-glow border-4 border-white/70 bg-gradient-to-b from-yuj-peach via-yuj-lavender to-yuj-purple">
              <Image
                priority
                src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80"
                alt="Meditation silhouette at sunrise representing YUJ yoga practice"
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover mix-blend-luminosity opacity-85 transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yuj-purple/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="-mt-8 z-20 w-[86%] max-w-[340px] rounded-3xl bg-white/90 px-6 py-4 text-center shadow-2xl backdrop-blur-xl border border-white/80"
            >
              <p className="font-heading text-3xl font-bold text-yuj-purple leading-tight">YUJ</p>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-yuj-plum mt-0.5">School of Yoga</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <Section id="about" eyebrow="Find Peace" title="A calm school shaped around trust, tradition, and attentive guidance.">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageCard src="https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?auto=format&fit=crop&w=900&q=80" alt="Yoga instructor guiding a peaceful class" tall />
            <ImageCard src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=900&q=80" alt="Premium yoga studio atmosphere" />
          </div>
          <div className="glass rounded-[32px] p-7 sm:p-10 flex flex-col justify-between">
            <p className="text-lg leading-8 text-yuj-ink/76">
              YUJ blends mindful movement, breath, meditation, and community into an elegant practice journey. Every class is designed to help students feel grounded, strong, and deeply present.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map(([label, value]) => (
                <Counter key={label} label={label} value={value} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PROGRAMS SECTION */}
      <Section id="programs" eyebrow="Explore Classes" title="Premium programs for every stage of practice.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: smoothEase }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass group rounded-[28px] p-6 flex flex-col justify-between cursor-pointer"
              onClick={() => selectProgramAndBook(program.title)}
            >
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-yuj-purple text-white shadow-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <Flower2 className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-yuj-purple">{program.title}</h3>
                <p className="mt-3 leading-7 text-yuj-ink/72">{program.description}</p>
              </div>

              <div>
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-yuj-purple/10 pt-4 text-xs font-bold text-yuj-plum">
                  <span className="flex-1 min-w-[72px] inline-flex items-center justify-center rounded-full bg-yuj-lilac/70 px-3 py-1.5 text-center leading-tight">
                    {program.level}
                  </span>
                  <span className="flex-1 min-w-[60px] inline-flex items-center justify-center rounded-full bg-yuj-lilac/70 px-3 py-1.5 text-center leading-tight">
                    {program.duration}
                  </span>
                  <span className="flex-1 min-w-[90px] inline-flex items-center justify-center rounded-full bg-yuj-lilac/70 px-3 py-1.5 text-center leading-tight">
                    {program.fit}
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between font-bold text-yuj-purple group-hover:text-yuj-plum transition-colors">
                  <span>Select & Book</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* BENEFITS SECTION */}
      <Section id="benefits" eyebrow="Build Trust" title="A practice that supports body, breath, rest, and clarity.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([title, text, Icon]) => (
            <motion.article
              key={title}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="group rounded-[28px] bg-white/72 p-6 shadow-glow border border-white/60 transition-all duration-500 hover:bg-yuj-purple hover:border-yuj-purple hover:shadow-2xl cursor-pointer"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-yuj-lilac text-yuj-purple transition-all duration-500 group-hover:bg-white/20 group-hover:text-yuj-gold group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-yuj-purple transition-colors duration-500 group-hover:text-white">{title}</h3>
              <p className="mt-3 leading-7 text-yuj-ink/70 transition-colors duration-500 group-hover:text-white/90">{text}</p>
            </motion.article>
          ))}
        </div>

        {/* Interactive Journey Timeline */}
        <div className="mt-14 overflow-hidden rounded-[32px] bg-yuj-purple p-6 text-white shadow-glow sm:p-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-yuj-gold">Daily Practice Arc</p>
          <div className="flex flex-wrap gap-3">
            {journey.map((step, index) => (
              <motion.button
                key={step.name}
                onClick={() => setActiveJourneyIndex(index)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className={`flex items-center gap-3 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 ${
                  activeJourneyIndex === index
                    ? "bg-yuj-gold text-yuj-ink shadow-gold"
                    : "bg-white/12 text-white/80 hover:bg-white/20"
                }`}
              >
                <span>0{index + 1}. {step.name}</span>
              </motion.button>
            ))}
          </div>
          <motion.div
            key={activeJourneyIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="mt-6 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15"
          >
            <p className="text-xl font-heading font-bold text-yuj-gold">{journey[activeJourneyIndex].name}</p>
            <p className="mt-1 text-white/80">{journey[activeJourneyIndex].desc}</p>
          </motion.div>
        </div>
      </Section>

      {/* INSTRUCTOR / VS SECTION */}
      <Section id="instructor" eyebrow="Personal Attention" title="YUJ brings depth beyond conventional fitness.">
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="rounded-[32px] bg-yuj-purple p-8 text-white shadow-glow relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-yuj-gold/10 blur-2xl pointer-events-none" />
            <h3 className="font-heading text-4xl font-bold">YUJ</h3>
            <p className="mt-2 text-yuj-lavender">Mindful, Traditional & Grounded</p>
            <div className="mt-6 space-y-4">
              {["Mindful movement with intentional breath", "Somatic stress relief & nervous system healing", "Warm & supportive studio community", "Spiritual depth and modern physical alignment", "Personalized instructor guidance"].map((item) => (
                <p key={item} className="flex items-center gap-3 text-lg"><Star className="h-5 w-5 text-yuj-gold shrink-0" /> {item}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="glass rounded-[32px] p-8"
          >
            <h3 className="font-heading text-4xl font-bold text-yuj-purple">Traditional Fitness</h3>
            <p className="mt-2 text-yuj-plum">Gyms & High-Intensity Routines</p>
            <div className="mt-6 space-y-4">
              {["Primarily superficial physical targets", "Often high-pressure, exhausting routines", "Limited restorative practice and internal recovery", "Less individual breath and alignment correction", "Short-term intensity without holistic calm"].map((item) => (
                <p key={item} className="flex items-center gap-3 text-lg text-yuj-ink/72"><Sparkles className="h-5 w-5 text-yuj-gold shrink-0" /> {item}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* GALLERY LIGHTBOX SECTION */}
      <Section id="gallery" eyebrow="See Real Results" title="A serene visual world for practice, reflection, and community.">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((image, index) => (
            <motion.div
              key={image.src}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="mb-5 block w-full aspect-[4/3] overflow-hidden rounded-[28px] bg-white shadow-glow group cursor-pointer relative"
              onClick={() => openGallery(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yuj-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-white">
                <p className="font-heading text-2xl font-bold">{image.title}</p>
                <p className="text-xs text-white/80 mt-1">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeGalleryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="fixed inset-0 z-50 grid place-items-center bg-yuj-ink/88 p-4 backdrop-blur-2xl"
            onClick={closeGallery}
          >
            <button
              onClick={closeGallery}
              className="absolute right-6 top-6 z-50 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/30"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevGallery(); }}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/30"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextGallery(); }}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/30"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            <motion.div
              key={activeGalleryIndex}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-[30px] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[activeGalleryIndex].src}
                alt={gallery[activeGalleryIndex].alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-yuj-ink/90 via-yuj-ink/50 to-transparent p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-3xl font-bold">{gallery[activeGalleryIndex].title}</h3>
                    <p className="text-sm text-white/80">{gallery[activeGalleryIndex].description}</p>
                  </div>
                  <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold backdrop-blur">
                    {activeGalleryIndex + 1} / {gallery.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TESTIMONIALS SECTION */}
      <Section id="testimonials" eyebrow="Community" title="Students describe YUJ as attentive, peaceful, and transformative.">
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <motion.article
              key={item.name}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="glass rounded-[28px] p-7 flex flex-col justify-between"
            >
              <div>
                <div className="mb-5 flex gap-1 text-yuj-gold">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="leading-8 text-yuj-ink/74">“{item.text}”</p>
              </div>
              <div className="mt-6 border-t border-yuj-purple/10 pt-4">
                <p className="font-bold text-yuj-purple">{item.name}</p>
                <p className="text-sm text-yuj-ink/58">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* EVENTS SECTION */}
      <Section id="events" eyebrow="Upcoming" title="Workshops and special classes that deepen the journey.">
        <div className="grid gap-5 md:grid-cols-3">
          {["International Yoga Day", "Breathwork Evening", "Weekend Meditation Retreat"].map((event, index) => (
            <motion.article
              key={event}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="rounded-[28px] bg-white/76 p-7 shadow-glow border border-white/60 flex flex-col justify-between"
            >
              <div>
                <CalendarDays className="mb-5 h-8 w-8 text-yuj-gold" />
                <h3 className="font-heading text-3xl font-bold text-yuj-purple">{event}</h3>
                <p className="mt-4 text-yuj-ink/70">{index + 12} days to the next guided session.</p>
              </div>
              <button
                onClick={() => selectProgramAndBook(`Workshop: ${event}`)}
                className="mt-6 inline-flex items-center gap-2 font-bold text-yuj-purple hover:text-yuj-plum transition-colors"
              >
                Reserve interest <ArrowRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* FAQ SECTION */}
      <Section id="faq" eyebrow="Questions" title="Everything important before your first class.">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3 rounded-full bg-white/80 px-5 py-4 shadow-glow border border-white/60">
            <Search className="h-5 w-5 text-yuj-plum" />
            <input
              value={faqQuery}
              onChange={(event) => setFaqQuery(event.target.value)}
              placeholder="Search questions..."
              className="w-full bg-transparent outline-none text-yuj-ink placeholder:text-yuj-ink/40"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.question;
              return (
                <article key={faq.question} className="rounded-[24px] bg-white/76 shadow-glow border border-white/60 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-yuj-purple transition-colors hover:text-yuj-plum"
                  >
                    <span className="text-lg">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-yuj-gold" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: smoothEase }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 leading-7 text-yuj-ink/72 border-t border-yuj-purple/10 pt-3">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      {/* CONTACT & BOOKING SECTION */}
      <Section id="contact" eyebrow="Book A Class" title="Begin with a trial class at YUJ in Palarivattom, Kochi.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-[32px] p-7 flex flex-col justify-between">
            <div>
              <p className="flex items-start gap-3 text-lg text-yuj-ink">
                <MapPin className="mt-1 h-5 w-5 text-yuj-gold shrink-0" />
                <span>{siteConfig.address.name}, {siteConfig.address.locality}, {siteConfig.address.city}, {siteConfig.address.region}</span>
              </p>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="mt-5 flex items-center gap-3 text-yuj-ink hover:text-yuj-purple transition-colors font-semibold"
              >
                <Phone className="h-5 w-5 text-yuj-gold shrink-0" /> {siteConfig.phone}
              </a>
              <p className="mt-5 flex items-center gap-3 text-yuj-ink">
                <Clock className="h-5 w-5 text-yuj-gold shrink-0" /> Morning and evening batches
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-yuj-purple px-5 py-3 font-bold text-white shadow-gold"
              >
                <Navigation className="h-4 w-4" /> Directions
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-yuj-purple shadow-glow"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </motion.a>
            </div>
          </div>

          <form id="booking" onSubmit={handleBookingSubmit} className="rounded-[32px] bg-yuj-purple p-6 text-white shadow-glow sm:p-8">
            <h3 className="font-heading text-4xl font-bold">Book Trial Class</h3>
            <p className="mt-1 text-sm text-yuj-lavender">Reserve your space in our Kochi studio</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field id="booking-name-input" label="Name" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
              <Field label="Phone" required value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
              <Field label="Date" type="date" required value={form.date} onChange={(value) => setForm({ ...form, date: value })} />
              <Field label="Time" type="time" required value={form.time} onChange={(value) => setForm({ ...form, time: value })} />
              <Select label="Program" value={form.program} onChange={(value) => setForm({ ...form, program: value })} options={programs.map((p) => p.title)} />
              <Select label="Instructor" value={form.instructor} onChange={(value) => setForm({ ...form, instructor: value })} options={["First available", "Founder session", "Female instructor preferred"]} />
              
              <label className="sm:col-span-2 block">
                <span className="text-sm font-bold text-white/78">Note (Optional)</span>
                <textarea
                  value={form.note}
                  onChange={(event) => setForm({ ...form, note: event.target.value })}
                  rows={3}
                  placeholder="Any health goals or questions..."
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/12 px-4 py-3 text-white outline-none focus:ring-4 focus:ring-yuj-gold/35 placeholder:text-white/40 transition-all duration-300"
                />
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="gold-shimmer mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-yuj-gold px-6 py-4 font-bold text-yuj-ink shadow-gold cursor-pointer"
            >
              Review & Book <MessageCircle className="h-5 w-5" />
            </motion.button>
          </form>
        </div>
      </Section>

      {/* BOOKING CONFIRMATION MODAL */}
      <AnimatePresence>
        {bookingConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-yuj-ink/80 p-4 backdrop-blur-md"
            onClick={() => setBookingConfirmed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl text-yuj-ink"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-green-600">
                  <CheckCircle2 className="h-7 w-7" />
                  <span className="font-heading text-2xl font-bold text-yuj-purple">Ready to Confirm</span>
                </div>
                <button onClick={() => setBookingConfirmed(false)} className="rounded-full bg-yuj-lilac p-2 text-yuj-purple">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 text-yuj-ink/75">
                We will dispatch your trial booking directly via WhatsApp to our team at YUJ School of Yoga.
              </p>

              <div className="mt-6 rounded-2xl bg-yuj-lilac/50 p-4 space-y-2 text-sm font-medium">
                <p><span className="font-bold text-yuj-purple">Name:</span> {form.name || "Guest"}</p>
                <p><span className="font-bold text-yuj-purple">Phone:</span> {form.phone || "Not provided"}</p>
                <p><span className="font-bold text-yuj-purple">Program:</span> {form.program}</p>
                <p><span className="font-bold text-yuj-purple">Date & Time:</span> {form.date || "Preferred date"} at {form.time || "Preferred time"}</p>
                <p><span className="font-bold text-yuj-purple">Instructor:</span> {form.instructor}</p>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="w-1/2 rounded-full border border-yuj-purple/20 py-3.5 font-bold text-yuj-purple"
                >
                  Edit Details
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={sendWhatsAppBooking}
                  className="w-1/2 rounded-full bg-green-600 py-3.5 font-bold text-white shadow-lg flex items-center justify-center gap-2"
                >
                  Open WhatsApp <MessageCircle className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer ref={footerRef} className="bg-yuj-ink px-4 pb-28 pt-12 text-white md:pb-10">
        <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-4xl font-bold">YUJ</p>
            <p className="text-white/64">School of Yoga - Kochi, Kerala</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-bold text-white/78">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollToSection(id)} className="transition hover:text-yuj-gold">
                {label}
              </button>
            ))}
          </div>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="YUJ Instagram"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        <div className="section-shell mt-10 border-t border-white/10 pt-6 flex flex-col items-center justify-between gap-4 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} YUJ - School of Yoga. All rights reserved.</p>
          <p>
            Designed & Developed by{" "}
            <a
              href="https://truculence.in"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-yuj-gold underline underline-offset-4 decoration-yuj-gold/40 hover:text-white transition-colors"
            >
              truculence.in
            </a>
          </p>
        </div>
      </footer>

      {/* MOBILE & DESKTOP FLOATING CTAS */}
      <AnimatePresence>
        {!isFooterInView && (
          <>
            <motion.button
              key="mobile-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-yuj-purple px-5 py-4 font-bold text-white shadow-gold md:hidden border border-white/20"
            >
              Book Trial Class <ArrowRight className="h-5 w-5" />
            </motion.button>

            <motion.a
              key="whatsapp-cta"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400/50 md:bottom-8 md:right-8"
            >
              <MessageCircle className="h-7 w-7" />
            </motion.a>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      className="fixed inset-0 z-[100] grid place-items-center bg-yuj-purple text-white"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360, scale: [0.92, 1.06, 0.92] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 border border-white/20"
        >
          <Flower2 className="h-12 w-12 text-yuj-gold" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-heading text-5xl font-bold">
          YUJ
        </motion.p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.34em] text-white/70">School of Yoga</p>
      </div>
    </motion.div>
  );
}

function Navbar({
  menuOpen,
  setMenuOpen,
  activeSection,
  onNavClick
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  activeSection: string;
  onNavClick: (id: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4 transition-all duration-500">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3.5 transition-all duration-500 border ${
          scrolled
            ? "bg-white/85 shadow-2xl backdrop-blur-2xl border-white/70 py-3"
            : "bg-white/60 shadow-glow backdrop-blur-2xl border-white/50"
        }`}
      >
        <button onClick={() => onNavClick("home")} className="flex items-center gap-2.5 group text-left shrink-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yuj-purple text-yuj-gold shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Flower2 className="h-5 w-5 shrink-0" />
          </div>
          <div className="shrink-0 text-left">
            <span className="font-heading text-2xl font-bold leading-none text-yuj-purple block">YUJ</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-yuj-plum block -mt-0.5 whitespace-nowrap">School of Yoga</span>
          </div>
        </button>

        <div className="hidden items-center gap-1 text-sm font-bold text-yuj-ink/75 lg:flex">
          {navItems.map(([label, id]) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => onNavClick(id)}
                className={`relative px-4 py-2 rounded-full transition-colors duration-300 ${
                  isActive ? "text-yuj-purple font-bold" : "hover:text-yuj-purple text-yuj-ink/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-yuj-lilac/80 -z-10 shadow-sm"
                    transition={{ duration: 0.5, ease: smoothEase }}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavClick("contact")}
          className="hidden rounded-full bg-yuj-purple px-6 py-3 text-sm font-bold text-white shadow-gold lg:inline-flex items-center gap-2"
        >
          Book Class <ArrowRight className="h-4 w-4" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center rounded-full bg-yuj-lilac/80 px-3.5 py-2.5 text-yuj-purple border border-yuj-purple/15 transition-all duration-300 hover:bg-yuj-purple hover:text-white lg:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: smoothEase }}
            className="mx-auto mt-2.5 grid max-w-7xl gap-1.5 rounded-3xl bg-white/95 p-3.5 shadow-2xl backdrop-blur-2xl border border-white/80 lg:hidden"
          >
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => onNavClick(id)}
                className={`rounded-2xl px-4 py-3 text-left font-bold transition-all duration-300 ${
                  activeSection === id ? "bg-yuj-purple text-white shadow-sm" : "text-yuj-purple hover:bg-yuj-lilac/50"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => onNavClick("contact")}
              className="mt-2 w-full rounded-2xl bg-yuj-gold px-5 py-3.5 font-bold text-yuj-ink shadow-gold text-center flex items-center justify-center gap-2"
            >
              Book Class <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative py-20 sm:py-28"
    >
      <div className="section-shell">
        <motion.div variants={fadeUp} className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-yuj-gold">{eyebrow}</p>
          <h2 className="font-heading text-5xl font-bold leading-tight text-yuj-purple text-balance sm:text-6xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </motion.section>
  );
}

function ImageCard({ src, alt, tall = false }: { src: string; alt: string; tall?: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: smoothEase }}
      className={`relative overflow-hidden rounded-[32px] shadow-glow border border-white/60 ${
        tall ? "min-h-[460px] sm:row-span-2" : "min-h-[220px]"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 90vw, 420px"
        className="object-cover transition-transform duration-700 hover:scale-105"
      />
    </motion.div>
  );
}

function Counter({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest: number) => setDisplayValue(Math.floor(latest))
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="rounded-3xl bg-white/70 p-5 shadow-sm border border-white/80">
      <p className="font-heading text-4xl font-bold text-yuj-purple">
        {displayValue.toLocaleString()}+
      </p>
      <p className="mt-1 text-sm font-bold text-yuj-ink/65">{label}</p>
    </div>
  );
}

function Field({ id, label, value, onChange, type = "text", required = false }: { id?: string; label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white/80">{label}</span>
      <input
        id={id}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/20 bg-white/12 px-4 py-3 text-white outline-none focus:ring-4 focus:ring-yuj-gold/40 transition-all duration-300"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white/80">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/20 bg-white/12 px-4 py-3 text-white outline-none focus:ring-4 focus:ring-yuj-gold/40 transition-all duration-300"
      >
        {options.map((option) => (
          <option key={option} value={option} className="text-yuj-ink">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CursorGlow() {
  const [finePointer, setFinePointer] = useState(false);
  const springConfig = { stiffness: 100, damping: 22 };
  const cursorX = useSpring(-200, springConfig);
  const cursorY = useSpring(-200, springConfig);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      setFinePointer(true);
    }
  }, []);

  useEffect(() => {
    if (!finePointer) return;
    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - 160);
      cursorY.set(event.clientY - 160);
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [finePointer, cursorX, cursorY]);

  if (!finePointer) return null;

  return (
    <motion.div
      style={{ x: cursorX, y: cursorY }}
      className="pointer-events-none fixed top-0 left-0 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-yuj-peach/35 via-yuj-lavender/20 to-transparent blur-3xl opacity-70 will-change-transform"
    />
  );
}
