import type { Product } from "@workspace/sanity/types";
import type { CSSProperties } from "react";

import { SanityImage } from "../elements/sanity-image";

export function ProductShowcase({
  heading,
  products,
}: {
  heading?: string;
  products: Product[];
}) {
  return (
    <section id="product-showcase" className="bg-[#E3E3E3]">
      <div className="pt-[3.7rem] pb-[4.1rem] pr-[3.9rem] max-sm:pr-[1.6rem] pl-[3.8rem] max-sm:pl-[1.6rem] flex flex-col items-center justify-center">
        <div className="">{heading && <h2>{heading}</h2>}</div>
        <div className="flex max-w-[145rem] flex-wrap max-sm:justify-center items-center w-full gap-[3.3rem] justify-center 2xl:justify-between mt-[3.3rem]">
          {products.map((prod) => {
            const desktopStyle: CSSProperties = {
              ...(typeof prod.width === "number"
                ? { maxWidth: `${prod.width / 10}rem`, width: "100%" }
                : {}),
              ...(typeof prod.height === "number"
                ? { height: `${prod.height / 10}rem` }
                : {}),
            };

            return (
              <div
                className="flex flex-col justify-center mb-[1.2rem] w-auto"
                key={prod._id}
              >
                {/* Mobile: responsive sizing */}
                <div className="sm:hidden w-full overflow-hidden flex items-center justify-center mb-[1.2rem]">
                  <SanityImage
                    className="object-cover w-full h-auto"
                    fetchPriority="low"
                    loading="lazy"
                    image={prod.image as any}
                    width={333}
                    height={244}
                  />
                </div>
                {/* Desktop: custom CMS sizing */}
                <div
                  style={desktopStyle}
                  className="hidden sm:flex w-auto overflow-hidden items-center justify-center mb-[1.2rem]"
                >
                  <SanityImage
                    className="object-cover"
                    fetchPriority="low"
                    loading="lazy"
                    image={prod.image as any}
                    width={333}
                    height={244}
                  />
                </div>
                <div className="text-[#737373] text-center">
                  <h3 className="font-semibold mb-[0.8rem]">{prod.title}</h3>
                  <h3>{prod.subtitle}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
