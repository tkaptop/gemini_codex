/**
 * Comparison Table Component
 * 对比外界昵称 “Nano Banana 1/2” 与官方的 Gempix2 体验
 * 强调我们只是复用同一套底层技术栈
 */

import { useTranslations } from "next-intl";
import { RiCheckLine, RiArrowUpLine } from "react-icons/ri";

interface ComparisonData {
  feature: string;
  nanoBanana1: string | boolean;
  gempix2: string | boolean;
  improvement?: string;
}

export default function ComparisonTable() {
  const t = useTranslations("pages.landing.comparison");

  const comparisonData: ComparisonData[] = [
    {
      feature: t("features.processing_speed"),
      nanoBanana1: "Standard",
      gempix2: "15% Faster",
      improvement: "+15%"
    },
    {
      feature: t("features.character_consistency"),
      nanoBanana1: t("values.good"),
      gempix2: t("values.excellent"),
      improvement: t("values.enhanced")
    },
    {
      feature: t("features.detail_accuracy"),
      nanoBanana1: t("values.standard"),
      gempix2: t("values.superior"),
      improvement: t("values.improved")
    },
    {
      feature: t("features.aspect_ratios"),
      nanoBanana1: "8",
      gempix2: "10",
      improvement: "+2"
    },
    {
      feature: t("features.max_iterations"),
      nanoBanana1: "Limited",
      gempix2: t("values.unlimited"),
      improvement: "∞"
    },
    {
      feature: t("features.multi_image_fusion"),
      nanoBanana1: t("values.basic"),
      gempix2: t("values.advanced"),
      improvement: t("values.upgraded")
    },
    {
      feature: t("features.text_rendering"),
      nanoBanana1: "Short text",
      gempix2: "Long-form text",
      improvement: t("values.extended")
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
            {t("label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 md:p-6 border-b bg-muted/50">
              <div className="font-semibold">{t("headers.feature")}</div>
              <div className="font-semibold text-center">
                "Nano Banana 1"
                <div className="text-xs text-muted-foreground font-normal mt-1">
                  Community nickname (legacy stack)
                </div>
              </div>
              <div className="font-semibold text-center text-primary">
                Gempix2
                <div className="text-xs text-primary/70 font-normal mt-1">
                  Runs on "Nano Banana 2" stack
                </div>
              </div>
              <div className="font-semibold text-center">
                {t("headers.improvement")}
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y">
              {comparisonData.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 p-4 md:p-6 hover:bg-muted/30 transition-colors"
                >
                  {/* Feature Name */}
                  <div className="font-medium">{row.feature}</div>

                  {/* Nano Banana 1 Value */}
                  <div className="text-center text-muted-foreground">
                    {typeof row.nanoBanana1 === "boolean" ? (
                      row.nanoBanana1 ? (
                        <RiCheckLine className="inline text-green-500 w-5 h-5" />
                      ) : (
                        "-"
                      )
                    ) : (
                      row.nanoBanana1
                    )}
                  </div>

                  {/* Gempix2 (Nano Banana 2) Value */}
                  <div className="text-center font-medium text-primary">
                    {typeof row.gempix2 === "boolean" ? (
                      row.gempix2 ? (
                        <RiCheckLine className="inline text-green-500 w-5 h-5" />
                      ) : (
                        "-"
                      )
                    ) : (
                      row.gempix2
                    )}
                  </div>

                  {/* Improvement */}
                  <div className="text-center">
                    {row.improvement && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-md text-sm font-medium">
                        <RiArrowUpLine className="w-4 h-4" />
                        {row.improvement}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            {t("footer_note")}
          </p>
        </div>
      </div>
    </section>
  );
}
