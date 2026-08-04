"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
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

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 }
};

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=80",
    alt: "Calm yoga meditation practice in warm morning light"
  },
  {
    src: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=80",
    alt: "Yoga student holding a mindful posture"
  },
  {
    src: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=1000&q=80",
    alt: "Peaceful yoga studio class with soft light"
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
    alt: "Outdoor yoga session with relaxed breathing"
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    alt: "Yoga movement in a bright premium studio"
  }
];

const benefits = [
  ["Improve Flexibility", "Gentle mobility and alignment for spacious movement.", Leaf],
  ["Reduce Stress", "Breath-led practice to soften the nervous system.", Moon],
  ["Increase Strength", "Stable postures that build grounded confidence.", Zap],
  ["Better Posture", "Awareness and control for everyday ease.", Sparkles],
  ["Mental Clarity", "Meditative focus for a quieter inner rhythm.", Sun],
  ["Better Sleep", "Restorative practices for deeper recovery.", Heart],
  ["Improved Immunity", "Consistent movement and breath for resilience.", Flower2],
  ["Healthy Lifestyle", "A supportive path from practice to daily life.", Star]
] as const;

const journey = ["Morning", "Stretch", "Meditation", "Breathing", "Practice", "Relaxation", "Healthy Lifestyle"];

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

const stats = [
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
  const [activeImage, setActiveImage] = useState<(typeof gallery)[number] | null>(null);
  const [faqQuery, setFaqQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState<BookingForm>({
    date: "",
    time: "",
    program: programs[0].title,
    instructor: "First available",
    name: "",
    phone: "",
    note: ""
  });
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, reducedMotion ? 0 : 120]);
  const mistY = useTransform(scrollYProgress, [0, 0.28], [0, reducedMotion ? 0 : -70]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  const filteredFaqs = useMemo(() => {
    const query = faqQuery.trim().toLowerCase();
    if (!query) return faqs;
    return faqs.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(query));
  }, [faqQuery]);

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapsQuery)}`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}`;

  const handleBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Namaste YUJ, I would like to book a trial class.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Program: ${form.program}`,
      `Date: ${form.date}`,
      `Time: ${form.time}`,
      `Instructor: ${form.instructor}`,
      form.note ? `Note: ${form.note}` : ""
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatePresence>{!loaded && <Loader />}</AnimatePresence>
      <CursorGlow />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section id="home" className="aurora relative flex min-h-screen items-center overflow-hidden pt-24">
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-[16%] h-72 w-72 -translate-x-1/2 rounded-full bg-yuj-peach/70 blur-3xl breath" />
          <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-gradient-to-t from-yuj-purple/25 to-transparent" />
          <div className="absolute bottom-16 left-[-8%] h-48 w-[62%] rounded-[50%] bg-yuj-purple/35 blur-xl" />
          <div className="absolute bottom-24 right-[-4%] h-44 w-[58%] rounded-[50%] bg-yuj-plum/30 blur-xl" />
        </motion.div>
        <motion.div style={{ y: mistY }} className="pointer-events-none absolute inset-x-0 bottom-16 h-36 bg-white/30 blur-3xl" />
        {["left-[8%] top-[28%]", "right-[12%] top-[22%]", "left-[18%] bottom-[20%]", "right-[20%] bottom-[28%]"].map((position, index) => (
          <Flower2 key={position} className={`petal absolute ${position} h-7 w-7 text-yuj-gold/50`} style={{ animationDelay: `${index * 1.1}s` }} />
        ))}
        <div className="section-shell relative z-10 grid min-h-[calc(100vh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div initial="hidden" animate={loaded ? "visible" : "hidden"} variants={fadeUp} transition={{ duration: 0.8 }}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-yuj-plum shadow-glow backdrop-blur">
              <Sparkles className="h-4 w-4 text-yuj-gold" /> Yoga for One Earth, One Health
            </p>
            <h1 className="font-heading text-6xl font-bold leading-[0.92] text-yuj-purple text-balance sm:text-7xl lg:text-8xl">
              Transform Your Body, Mind, Soul
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-yuj-ink/76">
              A premium yoga school in Kochi for mindful strength, breath-led calm, and holistic transformation.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#booking" className="gold-shimmer inline-flex items-center justify-center gap-3 rounded-full bg-yuj-purple px-7 py-4 font-bold text-white shadow-gold transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-yuj-gold/40">
                Book Your First Class <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#programs" className="inline-flex items-center justify-center gap-3 rounded-full bg-white/70 px-7 py-4 font-bold text-yuj-purple shadow-glow backdrop-blur transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-yuj-lavender">
                Explore Classes <Play className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={loaded ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1 }} className="relative mx-auto aspect-[4/5] w-full max-w-[440px]">
            <div className="absolute inset-0 rounded-[44%_44%_10%_10%] bg-gradient-to-b from-yuj-peach via-yuj-lavender to-yuj-purple shadow-glow" />
            <Image priority src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=900&q=85" alt="Meditation silhouette at sunrise representing YUJ yoga practice" fill sizes="(max-width: 768px) 90vw, 440px" className="rounded-[44%_44%_10%_10%] object-cover mix-blend-luminosity opacity-80" />
            <div className="absolute -bottom-6 left-1/2 w-[82%] -translate-x-1/2 rounded-full bg-white/70 px-5 py-4 text-center shadow-glow backdrop-blur">
              <p className="font-heading text-3xl font-bold text-yuj-purple">YUJ</p>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-yuj-plum">School of Yoga</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="about" eyebrow="Find Peace" title="A calm school shaped around trust, tradition, and attentive guidance.">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageCard src="https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?auto=format&fit=crop&w=900&q=80" alt="Yoga instructor guiding a peaceful class" tall />
            <ImageCard src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=900&q=80" alt="Premium yoga studio atmosphere" />
          </div>
          <div className="glass rounded-[32px] p-7 sm:p-10">
            <p className="text-lg leading-8 text-yuj-ink/76">
              YUJ blends mindful movement, breath, meditation, and community into an elegant practice journey. Every class is designed to help students feel grounded, strong, and deeply present.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map(([label, value]) => (
                <Counter key={label} label={label as string} value={value as number} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="programs" eyebrow="Explore Classes" title="Premium programs for every stage of practice.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.article key={program.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: index * 0.05 }} whileHover={{ y: -8, rotate: index % 2 ? -0.6 : 0.6 }} className="glass group rounded-[28px] p-6">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-yuj-purple text-white shadow-gold">
                <Flower2 className="h-6 w-6 transition group-hover:rotate-45" />
              </div>
              <h3 className="font-heading text-3xl font-bold text-yuj-purple">{program.title}</h3>
              <p className="mt-3 min-h-20 leading-7 text-yuj-ink/72">{program.description}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-bold text-yuj-plum">
                <span>{program.level}</span>
                <span>{program.duration}</span>
                <span>{program.fit}</span>
              </div>
              <a href="#booking" className="mt-7 inline-flex items-center gap-2 font-bold text-yuj-purple">
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="benefits" eyebrow="Build Trust" title="A practice that supports body, breath, rest, and clarity.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([title, text, Icon]) => (
            <motion.article key={title} whileHover={{ y: -7, scale: 1.02 }} className="group rounded-[28px] bg-white/72 p-6 shadow-glow transition">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-yuj-lilac text-yuj-purple group-hover:bg-yuj-purple group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-yuj-purple">{title}</h3>
              <p className="mt-3 leading-7 text-yuj-ink/70">{text}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-14 overflow-hidden rounded-[32px] bg-yuj-purple p-5 text-white shadow-glow sm:p-8">
          <div className="flex min-w-max gap-4">
            {journey.map((step, index) => (
              <motion.div key={step} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex items-center gap-4">
                <span className="rounded-full bg-white/12 px-5 py-3 font-bold">{step}</span>
                {index < journey.length - 1 && <ArrowRight className="h-5 w-5 text-yuj-gold" />}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="instructor" eyebrow="Personal Attention" title="YUJ brings depth beyond conventional fitness.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] bg-yuj-purple p-8 text-white shadow-glow">
            <h3 className="font-heading text-4xl font-bold">YUJ</h3>
            {["Mindful movement", "Breath and stress relief", "Community warmth", "Spiritual growth", "Personal guidance"].map((item) => (
              <p key={item} className="mt-5 flex items-center gap-3 text-lg"><Star className="h-5 w-5 text-yuj-gold" /> {item}</p>
            ))}
          </div>
          <div className="glass rounded-[32px] p-8">
            <h3 className="font-heading text-4xl font-bold text-yuj-purple">Traditional Fitness</h3>
            {["Primarily physical goals", "Often high-pressure routines", "Limited restorative practice", "Less individual breath guidance", "Short-term motivation cycles"].map((item) => (
              <p key={item} className="mt-5 flex items-center gap-3 text-lg text-yuj-ink/72"><Sparkles className="h-5 w-5 text-yuj-gold" /> {item}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="gallery" eyebrow="See Real Results" title="A serene visual world for practice, reflection, and community.">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((image, index) => (
            <button key={image.src} onClick={() => setActiveImage(image)} className="mb-5 block w-full overflow-hidden rounded-[28px] bg-white shadow-glow focus:outline-none focus:ring-4 focus:ring-yuj-lavender" aria-label={`Open gallery image ${index + 1}`}>
              <Image src={image.src} alt={image.alt} width={900} height={index % 2 ? 1100 : 760} className="h-auto w-full object-cover transition duration-700 hover:scale-105" />
            </button>
          ))}
        </div>
      </Section>

      <Section id="testimonials" eyebrow="Community" title="Students describe YUJ as attentive, peaceful, and transformative.">
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="glass rounded-[28px] p-7">
              <div className="mb-5 flex gap-1 text-yuj-gold">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-5 w-5 fill-current" />)}</div>
              <p className="leading-8 text-yuj-ink/74">“{item.text}”</p>
              <p className="mt-6 font-bold text-yuj-purple">{item.name}</p>
              <p className="text-sm text-yuj-ink/58">{item.role}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="events" eyebrow="Upcoming" title="Workshops and special classes that deepen the journey.">
        <div className="grid gap-5 md:grid-cols-3">
          {["International Yoga Day", "Breathwork Evening", "Weekend Meditation Retreat"].map((event, index) => (
            <article key={event} className="rounded-[28px] bg-white/76 p-7 shadow-glow">
              <CalendarDays className="mb-5 h-8 w-8 text-yuj-gold" />
              <h3 className="font-heading text-3xl font-bold text-yuj-purple">{event}</h3>
              <p className="mt-4 text-yuj-ink/70">{index + 12} days to the next guided session.</p>
              <a href="#booking" className="mt-6 inline-flex items-center gap-2 font-bold text-yuj-purple">Reserve interest <ArrowRight className="h-4 w-4" /></a>
            </article>
          ))}
        </div>
      </Section>

      <Section id="faq" eyebrow="Questions" title="Everything important before your first class.">
        <div className="mx-auto max-w-3xl">
          <label className="mb-5 flex items-center gap-3 rounded-full bg-white/80 px-5 py-4 shadow-glow">
            <Search className="h-5 w-5 text-yuj-plum" />
            <span className="sr-only">Search FAQs</span>
            <input value={faqQuery} onChange={(event) => setFaqQuery(event.target.value)} placeholder="Search questions" className="w-full bg-transparent outline-none" />
          </label>
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <article key={faq.question} className="rounded-[24px] bg-white/76 shadow-glow">
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-yuj-purple">
                  {faq.question}
                  <ChevronDown className={`h-5 w-5 shrink-0 transition ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-6 pb-5 leading-7 text-yuj-ink/72">
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" eyebrow="Book A Class" title="Begin with a trial class at YUJ in Palarivattom, Kochi.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-[32px] p-7">
            <p className="flex items-start gap-3 text-lg"><MapPin className="mt-1 h-5 w-5 text-yuj-gold" /> {siteConfig.address.name}, {siteConfig.address.locality}, {siteConfig.address.city}, {siteConfig.address.region}</p>
            <p className="mt-5 flex items-center gap-3"><Phone className="h-5 w-5 text-yuj-gold" /> {siteConfig.phone}</p>
            <p className="mt-5 flex items-center gap-3"><Clock className="h-5 w-5 text-yuj-gold" /> Morning and evening batches</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={mapsHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-yuj-purple px-5 py-3 font-bold text-white"><Navigation className="h-4 w-4" /> Directions</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-yuj-purple shadow-glow"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </div>
          <form id="booking" onSubmit={handleBooking} className="rounded-[32px] bg-yuj-purple p-6 text-white shadow-glow sm:p-8">
            <h3 className="font-heading text-4xl font-bold">Book Trial Class</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
              <Field label="Phone" required value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
              <Field label="Date" type="date" required value={form.date} onChange={(value) => setForm({ ...form, date: value })} />
              <Field label="Time" type="time" required value={form.time} onChange={(value) => setForm({ ...form, time: value })} />
              <Select label="Program" value={form.program} onChange={(value) => setForm({ ...form, program: value })} options={programs.map((program) => program.title)} />
              <Select label="Instructor" value={form.instructor} onChange={(value) => setForm({ ...form, instructor: value })} options={["First available", "Founder session", "Female instructor preferred"]} />
              <label className="sm:col-span-2">
                <span className="text-sm font-bold text-white/78">Note</span>
                <textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} rows={4} className="mt-2 w-full rounded-2xl border border-white/20 bg-white/12 px-4 py-3 outline-none focus:ring-4 focus:ring-yuj-gold/35" />
              </label>
            </div>
            <button className="gold-shimmer mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-yuj-gold px-6 py-4 font-bold text-yuj-ink shadow-gold">
              Send WhatsApp Confirmation <MessageCircle className="h-5 w-5" />
            </button>
          </form>
        </div>
      </Section>

      <footer className="bg-yuj-ink px-4 pb-28 pt-12 text-white md:pb-10">
        <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-4xl font-bold">YUJ</p>
            <p className="text-white/64">School of Yoga - Kochi, Kerala</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-bold text-white/78">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </div>
          <a href={siteConfig.social.instagram} aria-label="YUJ Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10"><Instagram className="h-5 w-5" /></a>
        </div>
      </footer>

      <a href="#booking" className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-yuj-purple px-5 py-4 font-bold text-white shadow-gold md:hidden">
        Book Trial Class <ArrowRight className="h-5 w-5" />
      </a>
      <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Open WhatsApp" className="fixed bottom-24 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-glow md:flex">
        <MessageCircle className="h-6 w-6" />
      </a>

      <AnimatePresence>
        {activeImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-yuj-ink/82 p-5 backdrop-blur-xl" onClick={() => setActiveImage(null)}>
            <button className="absolute right-5 top-5 rounded-full bg-white/15 p-3 text-white" aria-label="Close gallery"><X className="h-6 w-6" /></button>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} className="relative aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-[30px]">
              <Image src={activeImage.src} alt={activeImage.alt} fill sizes="90vw" className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Loader() {
  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="fixed inset-0 z-[100] grid place-items-center bg-yuj-purple text-white">
      <div className="text-center">
        <motion.div animate={{ rotate: 360, scale: [0.9, 1.08, 0.9] }} transition={{ duration: 1.8, ease: "easeInOut" }} className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
          <Flower2 className="h-12 w-12 text-yuj-gold" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="font-heading text-5xl font-bold">YUJ</motion.p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.34em] text-white/70">School of Yoga</p>
      </div>
    </motion.div>
  );
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/50 px-5 py-3 shadow-glow backdrop-blur-2xl">
        <a href="#home" className="font-heading text-3xl font-bold text-yuj-purple">YUJ</a>
        <div className="hidden items-center gap-6 text-sm font-bold text-yuj-ink/72 lg:flex">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="transition hover:text-yuj-purple">{label}</a>)}
        </div>
        <a href="#booking" className="hidden rounded-full bg-yuj-purple px-5 py-3 text-sm font-bold text-white lg:inline-flex">Book Class</a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full bg-yuj-purple p-3 text-white lg:hidden" aria-label="Toggle navigation">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-[28px] bg-white/90 p-4 shadow-glow backdrop-blur lg:hidden">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 font-bold text-yuj-purple">{label}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section id={id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} transition={{ staggerChildren: 0.08 }} className="relative py-20 sm:py-28">
      <div className="section-shell">
        <motion.div variants={fadeUp} className="mb-10 max-w-3xl">
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
    <div className={`relative overflow-hidden rounded-[32px] shadow-glow ${tall ? "min-h-[460px] sm:row-span-2" : "min-h-[220px]"}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 420px" className="object-cover transition duration-700 hover:scale-105" />
    </div>
  );
}

function Counter({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl bg-white/60 p-5">
      <p className="font-heading text-4xl font-bold text-yuj-purple">{value.toLocaleString()}+</p>
      <p className="mt-1 text-sm font-bold text-yuj-ink/60">{label}</p>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label>
      <span className="text-sm font-bold text-white/78">{label}</span>
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/20 bg-white/12 px-4 py-3 text-white outline-none focus:ring-4 focus:ring-yuj-gold/35" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label>
      <span className="text-sm font-bold text-white/78">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/20 bg-white/12 px-4 py-3 text-white outline-none focus:ring-4 focus:ring-yuj-gold/35">
        {options.map((option) => <option key={option} className="text-yuj-ink">{option}</option>)}
      </select>
    </label>
  );
}

function CursorGlow() {
  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);
  return null;
}
