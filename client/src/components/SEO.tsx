// client/src/components/SEO.tsx

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

// ZMIANA: Zaktualizowano typy schematów, aby pasowały do strony technicznej.
type SchemaType = "website" | "tech_article" | "breadcrumbs";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  schema?: {
    type: SchemaType;
    data?: any;
  };
  isHomePage?: boolean;
}

// ZMIANA: Zaktualizowano wszystkie stałe, aby pasowały do projektu "AI Genesis".
const siteUrl = "https://zbuduj-strone.netlify.app";
const siteName = "AI Genesis: Interaktywny Meta-Tutorial";
const defaultImage = `${siteUrl}/1.png`; // Pamiętaj, aby utworzyć ten plik!
const authorName = "Adam Gierczak"; // Uzupełnij swoje dane
const authorProfileUrl = "https://github.com/AdamBabinicz"; // Opcjonalnie: link do Twojego profilu

export default function SEO({
  title,
  description,
  image = defaultImage,
  path,
  schema,
  isHomePage = false,
}: SEOProps) {
  const { i18n, t } = useTranslation();

  // Te klucze muszą istnieć w Twoich plikach z tłumaczeniami (patrz Krok 3).
  const defaultTitle = t("seo.defaultTitle");
  const defaultDescription = t("seo.defaultDescription");

  const pageTitle = title
    ? isHomePage
      ? title
      : `${title} - ${siteName}`
    : defaultTitle;
  const pageDescription = description || defaultDescription;
  const canonicalUrl = `${siteUrl}${path || "/"}`;

  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const getOgLocale = () => {
    switch (i18n.language) {
      case "pl":
        return "pl_PL";
      case "en":
        return "en_US";
      default:
        return "pl_PL";
    }
  };

  const generateSchema = () => {
    if (!schema) return null;

    let schemaData: any = null;
    const { type, data } = schema;

    switch (type) {
      case "website":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        };
        break;

      // ZMIANA: Usunięto schematy "artist" i "artwork".
      // Dodano schemat "TechArticle", idealny dla strony z tutorialem.
      case "tech_article":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: data.title || "",
          description: data.description || "",
          image: fullImageUrl,
          datePublished: data.date, // np. "2025-08-23"
          dateModified: data.date,
          author: {
            "@type": "Person",
            name: authorName,
            url: authorProfileUrl,
          },
          publisher: {
            "@type": "Organization",
            name: siteName,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/android-chrome-512x512.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
        };
        break;

      case "breadcrumbs":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: (data.items || []).map(
            (item: any, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: `${siteUrl}${item.path}`,
            })
          ),
        };
        break;
    }

    if (!schemaData) return null;

    return (
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    );
  };

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={getOgLocale()} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />

      <link rel="canonical" href={canonicalUrl} />
      {generateSchema()}
    </Helmet>
  );
}
