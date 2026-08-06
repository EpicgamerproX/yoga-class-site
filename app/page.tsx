import { YujHome } from "@/components/yuj-home";
import { faqs, siteConfig } from "@/config/site";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "NSS Hall, Near Sree Rajarajeswary Temple",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country
    },
    areaServed: ["Kochi", "Kerala"],
    priceRange: "$$",
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    knowsAbout: siteConfig.keywords
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
        dangerouslySetInnerHTML={{ __html: sanitizeJson(localBusinessSchema) }}
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
