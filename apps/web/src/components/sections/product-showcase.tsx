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
      <div className="pt-9.25 pb-10.25 pr-9.75 max-sm:pr-4 pl-9.5 max-sm:pl-4 flex flex-col items-center justify-center">
        <div className="">{heading && <h2>{heading}</h2>}</div>
        <div className="flex max-w-362.5 flex-wrap max-sm:justify-center items-center w-full gap-8.25 justify-center 2xl:justify-between mt-8.25">
          {products.map((prod) => {
            const desktopStyle: CSSProperties = {
              ...(typeof prod.width === "number"
                ? { maxWidth: `${prod.width}px`, width: "100%" }
                : {}),
              ...(typeof prod.height === "number"
                ? { height: `${prod.height}px` }
                : {}),
            };

            return (
              <div
                className="flex flex-col justify-center mb-3 w-auto"
                key={prod._id}
              >
                {/* Mobile: responsive sizing */}
                <div className="sm:hidden w-full overflow-hidden flex items-center justify-center mb-3">
                  <SanityImage
                    className="object-cover w-full h-auto"
                    fetchPriority="low"
                    loading="lazy"
                    image={prod.image}
                    width={333}
                    height={244}
                  />
                </div>
                {/* Desktop: custom CMS sizing */}
                <div
                  style={desktopStyle}
                  className="hidden sm:flex w-auto overflow-hidden items-center justify-center mb-3"
                >
                  <SanityImage
                    className="object-contain"
                    fetchPriority="low"
                    loading="lazy"
                    image={prod.image}
                    width={333}
                    height={244}
                  />
                </div>
                <div className="text-[#737373] text-center">
                  <h3 className="font-semibold mb-2">{prod.title}</h3>
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
