import { YujHome } from "@/components/yuj-home";
import { faqs, programs, siteConfig } from "@/config/site";

export default function Home() {
  const yogaStudioSchema = {
    "@context": "https://schema.org",
    "@type": ["YogaStudio", "LocalBusiness", "SportsActivityLocation"],
    "@id": `${siteConfig.url}/#yogastudio`,
    name: siteConfig.name,
    legalName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/og.svg`,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.latitude,
      longitude: siteConfig.address.longitude
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "20:00"
      }
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Kochi"
      },
      {
        "@type": "AdministrativeArea",
        name: "Kerala"
      }
    ],
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    knowsAbout: siteConfig.keywords
  };

  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: programs.map((program, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: program.title,
        description: program.description,
        provider: {
          "@type": "YogaStudio",
          name: siteConfig.name,
          sameAs: siteConfig.url
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          category: program.fit
        }
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url
      }
    ]
  };

  const sanitizeJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJson(yogaStudioSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJson(courseListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJson(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJson(breadcrumbSchema) }}
      />
      <YujHome />
    </>
  );
}
