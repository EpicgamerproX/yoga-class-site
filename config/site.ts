export const siteConfig = {
  name: "YUJ - School of Yoga",
  shortName: "YUJ",
  url: "https://yuj-school-of-yoga.example.com",
  description:
    "Premium yoga classes in Kochi for mindful movement, breathwork, meditation, and holistic transformation.",
  phone: "+91 6238991328",
  whatsapp: "916238991328",
  email: "hello@yujyoga.example",
  address: {
    name: "Sree Rajarajeswary Temple, NSS Hall",
    locality: "Palarivattom",
    city: "Kochi",
    region: "Kerala",
    country: "IN"
  },
  mapsQuery: "Sree Rajarajeswary Temple NSS Hall Palarivattom Kochi Kerala",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/"
  },
  analytics: {
    googleAnalyticsId: "",
    metaPixelId: "",
    searchConsoleVerification: ""
  },
  keywords: [
    "Yoga Classes Kochi",
    "Yoga School Kerala",
    "Yoga Near Me",
    "Best Yoga Classes Kochi",
    "Ashtanga Yoga Kochi",
    "Family Yoga Kochi",
    "Meditation Classes Kochi",
    "Yoga Training Kerala",
    "Yoga Studio Kochi",
    "Yoga for Beginners Kochi"
  ]
};

export const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Programs", "programs"],
  ["Benefits", "benefits"],
  ["Gallery", "gallery"],
  ["Testimonials", "testimonials"],
  ["Contact", "contact"]
] as const;

export const programs = [
  {
    title: "Group Lessons",
    duration: "60 min",
    level: "All levels",
    fit: "Community practice",
    description: "A graceful class rhythm for steady strength, mobility, breath, and shared momentum."
  },
  {
    title: "Ashtanga Yoga",
    duration: "75 min",
    level: "Intermediate",
    fit: "Disciplined flow",
    description: "Structured sequences that build heat, focus, endurance, and confident alignment."
  },
  {
    title: "Family Yoga",
    duration: "50 min",
    level: "Beginner",
    fit: "Families",
    description: "Warm, accessible sessions designed for connection, playfulness, and healthy routines."
  },
  {
    title: "Private Sessions",
    duration: "Flexible",
    level: "Personalized",
    fit: "1:1 attention",
    description: "Individual guidance shaped around posture, stress, recovery, or long-term growth."
  },
  {
    title: "Meditation",
    duration: "45 min",
    level: "All levels",
    fit: "Mental clarity",
    description: "Stillness practices for attention, emotional balance, and inner spaciousness."
  },
  {
    title: "Breathing Workshops",
    duration: "40 min",
    level: "All levels",
    fit: "Stress relief",
    description: "Pranayama-led workshops for calm, energy, sleep, and nervous-system regulation."
  }
];

export const faqs = [
  {
    question: "Are YUJ classes suitable for beginners?",
    answer:
      "Yes. Beginners are guided with gentle progressions, clear breath cues, and posture options."
  },
  {
    question: "What should I bring for a trial class?",
    answer: "Wear comfortable clothing and bring water. A yoga mat is helpful, but guidance is available."
  },
  {
    question: "Do you offer family yoga in Kochi?",
    answer:
      "Yes. Family Yoga is part of the YUJ program mix and is designed for shared healthy routines."
  },
  {
    question: "How do I book my first class?",
    answer:
      "Use the booking form on this page. It opens WhatsApp with your class details ready to send."
  }
];
