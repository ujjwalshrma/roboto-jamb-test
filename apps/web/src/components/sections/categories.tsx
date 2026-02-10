import Link from "next/link";
import type { CSSProperties } from "react";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityImage } from "../elements/sanity-image";

type CategoryBlockProps = PagebuilderType<"categories">;

export function CategoriesBlock({
  categories,
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
      {categories?.map((cat) => (
        <div
          className="px-5 flex mx-[13.2rem] items-center justify-between gap-15 max-sm:block"
          style={categoryPadding}
          key={cat._id ?? cat.title}
        >
          <div className="max-w-200">
            <div className="">
              {cat.subtitle && (
                <div className="text-center mb-5 max-sm:text-left">
                  <h4 className="text-black">{cat.subtitle}</h4>
                </div>
              )}
              {cat.title && (
                <h1 className="text-balance mb-12 text-center max-sm:text-left">
                  {cat.title}
                </h1>
              )}
              {cat.richText && <RichText richText={cat.richText as any} />}
              <div className="mt-12 max-sm:mb-12 flex flex-col gap-[1.2rem] items-center justify-center max-sm:justify-start max-sm:items-start">
                {cat.buttons?.map((button: any) => (
                  <Link
                    key={button._key}
                    href={button.href ?? "#"}
                    target={button.openInNewTab ? "_blank" : undefined}
                    rel={
                      button.openInNewTab ? "noopener noreferrer" : undefined
                    }
                    className="text-[#737373] border block border-[#737373] rounded-none w-fit bg-transparent pl-[2.8rem] pr-[2.9rem] py-1 hover:bg-transparent hover:text-[#737373] transition-colors"
                  >
                    <p>{button.text ?? "Learn More"}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {cat.image && (
            <div
              className={`w-[58.3rem] h-[73.4rem] max-sm:h-auto max-sm:w-full flex items-center justify-center`}
            >
              <SanityImage
                className="h-full w-[58.3rem] object-cover max-sm:w-full max-sm:h-auto"
                fetchPriority="low"
                height={734}
                image={cat.image as any}
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
