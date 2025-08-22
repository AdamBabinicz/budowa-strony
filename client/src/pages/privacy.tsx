import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("privacyPage.seoTitle")}</title>
        <meta name="description" content={t("privacyPage.seoDescription")} />
      </Helmet>
      <main className="max-w-4xl mx-auto py-16 sm:py-24 px-6 lg:px-8">
        <h2 className="font-playfair text-4xl sm:text-5xl mb-12 text-center">
          {t("privacyPage.title")}
        </h2>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {t("privacyPage.content")
            .split("\n\n")
            .map((paragraph, index) => {
              if (paragraph.startsWith("<h2>")) {
                return (
                  <h2
                    key={index}
                    className="font-playfair text-2xl sm:text-3xl mt-12 mb-6 border-b pb-2"
                  >
                    {paragraph.replace(/<\/?h2>/g, "")}
                  </h2>
                );
              }
              if (paragraph.trim() === "") return null;
              return (
                <p key={index} className="leading-relaxed text-foreground/80">
                  {paragraph}
                </p>
              );
            })}
        </div>
        <div className="mt-16 text-center">
          <Button asChild>
            <Link href="/">{t("legalNav.backToHome")}</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
