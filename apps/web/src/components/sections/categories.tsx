import type { CSSProperties } from "react";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

type CategoryBlockProps = PagebuilderType<"categories">;

export function CategoriesBlock({
  categories,
  subtitle,
  paddingTop,
  paddingBottom,
  backgroundColor,
}: CategoryBlockProps) {
  const toPx = (v: unknown) =>
    v == null ? undefined : typeof v === "number" ? `${v}px` : String(v);

  const sectionBackgroundColor: CSSProperties = {
    backgroundColor: backgroundColor || "",
  };

  const categoryPadding: CSSProperties = {
    paddingTop: toPx(paddingTop),
    paddingBottom: toPx(paddingBottom),
    backgroundColor: backgroundColor || "",
  };

  return (
    <section id="category" style={sectionBackgroundColor}>
      {subtitle && (
        <div className="text-center mb-6">
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      )}

      {categories?.map((cat) => (
        <div
          className="max-w-320.75 px-5 w-full flex mx-auto items-center justify-between gap-15"
          style={categoryPadding}
          key={cat._id ?? cat.title}
        >
          <div className="">
            <div className="max-w-127.25">
              {cat.subtitle && (
                <div className="text-center mb-5">
                  <h4 className="text-black">{cat.subtitle}</h4>
                </div>
              )}
              {cat.title && (
                <h1 className="text-balance mb-7.5 text-center">{cat.title}</h1>
              )}
              {cat.richText && <RichText richText={cat.richText} />}
              <div className="mt-7.5">
                <SanityButtons
                  buttons={cat.buttons}
                  buttonClassName="global-button mx-auto"
                />
              </div>
            </div>
          </div>

          {cat.image && (
            <div className="w-145.75 h-183.5">
              <SanityImage
                className="h-full object-contain"
                fetchPriority="low"
                height={734}
                image={cat.image}
                loading="lazy"
                width={583}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
