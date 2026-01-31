import { ActivityIcon } from "lucide-react";
import { defineType } from "sanity";

export const productShowcase = defineType({
  name: "productShowcase",
  title: "Product Showcase",
  icon: ActivityIcon,
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
  ],
  preview: {
    select: {
      heading: "heading",
      categoryTitle: "category->title",
    },
    prepare: ({ heading, categoryTitle }) => ({
      title: heading || "Product Showcase",
      subtitle: categoryTitle
        ? `Category: ${categoryTitle}`
        : "No linked category",
    }),
  },
});
