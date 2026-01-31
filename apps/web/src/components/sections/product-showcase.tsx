import type { CSSProperties } from "react";

import type { PageBuilderBlockTypes } from "@/types";
import { SanityImage } from "../elements/sanity-image";

export function ProductShowcase({
  heading,
  products,
}: PageBuilderBlockTypes<"productShowcase">) {
  return (
    <section id="product-showcase" className="bg-[#E3E3E3]">
      <div className="pt-9.25 pb-10.25 pr-9.75 pl-9.5 flex flex-col items-center justify-center">
        <div className="">{heading && <h2>{heading}</h2>}</div>
        <div className="flex max-w-[1450px]  items-center w-full gap-8.25 justify-between mt-8.25">
          {products.map((prod) => {
            const style: CSSProperties = {
              ...(typeof prod.width === "number"
                ? { maxWidth: `${prod.width}px; width: 100%` }
                : {}),
              ...(typeof prod.height === "number"
                ? { height: `${prod.height}px; height: 'auto'` }
                : {}),
            };

            const containerClass = `flex flex-col justify-center mb-3 w-auto ${
              prod.width == null && prod.height == null ? "" : ""
            }`;

            return (
              <div className={containerClass} key={prod._id}>
                <div
                  style={style}
                  className="w-auto overflow-hidden flex items-center justify-center mb-3"
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
