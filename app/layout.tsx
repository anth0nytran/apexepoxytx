import type { Metadata } from "next";
import { Manrope, Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const headlineFont = Manrope({
  variable: "--font-app-headline",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-app-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const displayFont = DM_Serif_Display({
  variable: "--font-app-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://apexepoxytx.com'),
  title: "Epoxy Garage Floor Coatings Cypress TX | Apex Epoxy & Surface Systems",
  description: "Professional epoxy garage floor coatings in Cypress & Houston, TX. Flake epoxy, metallic floors, patio coatings & commercial flooring. 5-year warranty. Free estimates. Owner-operated. Call (281) 433-4346.",
  keywords: [
    'epoxy flooring Cypress TX',
    'garage floor coating Cypress',
    'epoxy garage floor Houston',
    'flake epoxy floor Cypress TX',
    'metallic epoxy floor Houston',
    'patio coating Cypress TX',
    'commercial epoxy flooring Houston',
    'epoxy floor contractor Cypress',
    'garage floor epoxy near me',
    'polyaspartic floor coating Houston TX',
    'epoxy floor installation Cypress Texas',
    'decorative concrete coating Houston',
    'warehouse floor coating Houston TX',
    'epoxy flooring company near me',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Epoxy Garage Floor Coatings in Cypress & Houston TX | Apex Epoxy",
    description: "Professional epoxy garage floors, metallic finishes, patio coatings & commercial flooring in Cypress & Greater Houston. 5-year warranty. Free estimates. Owner-operated. Call (281) 433-4346.",
    url: 'https://apexepoxytx.com',
    siteName: 'Apex Epoxy & Surface Systems',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Epoxy Floor Coatings Cypress & Houston TX | Apex Epoxy",
    description: "Garage floors, metallic epoxy, patio coatings & commercial flooring. 5-year warranty. Free estimates. Call (281) 433-4346.",
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gscVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Apex Epoxy & Surface Systems",
              "@id": "https://apexepoxytx.com",
              "url": "https://apexepoxytx.com",
              "telephone": "+12814334346",
              "email": "beauscalise@apexepoxytx.com",
              "description": "Professional epoxy garage floor coatings in Cypress & Houston, TX. Flake epoxy, metallic floors, patio coatings, and commercial flooring with 5-year warranty. Owner-operated by Beau Scalise & Haden Mcdade.",
              "founder": [
                { "@type": "Person", "name": "Beau Scalise" },
                { "@type": "Person", "name": "Haden Mcdade" }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Cypress",
                "addressRegion": "TX",
                "postalCode": "77429",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "29.9691",
                "longitude": "-95.6970"
              },
              "areaServed": [
                { "@type": "City", "name": "Cypress" },
                { "@type": "City", "name": "Houston" },
                { "@type": "City", "name": "The Woodlands" },
                { "@type": "City", "name": "Katy" },
                { "@type": "City", "name": "Spring" },
                { "@type": "City", "name": "Tomball" },
                { "@type": "City", "name": "Sugar Land" },
                { "@type": "City", "name": "Pearland" },
                { "@type": "City", "name": "Friendswood" },
                { "@type": "City", "name": "League City" },
                { "@type": "City", "name": "Humble" },
                { "@type": "City", "name": "Kingwood" },
                { "@type": "City", "name": "Conroe" },
                { "@type": "City", "name": "Richmond" }
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "06:00",
                "closes": "18:00"
              },
              "priceRange": "$$",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "1",
                "bestRating": "5"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Epoxy Flooring Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flake Epoxy Garage Floor Coatings", "description": "Decorative vinyl flake epoxy floor systems for residential garages in Cypress & Houston TX" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Metallic Epoxy Floor Finishes", "description": "High-gloss metallic epoxy floor coatings creating unique 3D marble effects" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial & Warehouse Floor Coatings", "description": "Industrial-strength epoxy coatings for warehouses, auto shops, and commercial spaces in Houston TX" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Patio & Outdoor Concrete Coatings", "description": "UV-stable polyaspartic patio coatings for outdoor living spaces in Cypress & Houston" } }
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does an epoxy garage floor take in Cypress?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Most residential garage floors in Cypress take just 1-2 days to complete. Larger commercial or multi-bay projects may take 2-3 days." }
                },
                {
                  "@type": "Question",
                  "name": "How much does epoxy flooring cost in Houston?",
                  "acceptedAnswer": { "@type": "Answer", "text": "A typical 2-car garage in Cypress or Houston ranges from $1,800 to $3,500 for a full flake system. We provide free, no-obligation estimates." }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer free estimates in the Cypress area?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes! We provide 100% free on-site estimates throughout Cypress, Houston, Katy, The Woodlands, and all surrounding communities." }
                },
                {
                  "@type": "Question",
                  "name": "What's included in the 5-year epoxy floor warranty?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Our warranty covers peeling, delamination, and hot-tire pickup. If there's an issue with our workmanship, we come back and fix it at no charge." }
                },
                {
                  "@type": "Question",
                  "name": "Is epoxy flooring slippery when wet?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Not with our system. We add anti-slip aggregate to the polyaspartic top coat, giving your floor excellent traction even when wet." }
                },
                {
                  "@type": "Question",
                  "name": "What areas in Houston do you serve?",
                  "acceptedAnswer": { "@type": "Answer", "text": "We're based in Cypress and serve the entire Greater Houston metro area including The Woodlands, Katy, Spring, Tomball, Sugar Land, Pearland, Friendswood, League City, and all surrounding communities." }
                }
              ]
            })
          }}
        />
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
        {gscVerification ? (
          <meta name="google-site-verification" content={gscVerification} />
        ) : null}
      </head>
      <body
        className={`${headlineFont.variable} ${bodyFont.variable} ${displayFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
