import { ActivityIcon } from "lucide-react";
import { defineType } from "sanity";

export const categories = defineType({
  name: "categories",
  title: "Categories",
  icon: ActivityIcon,
  type: "object",
  fields: [
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    },
    {
      name: "paddingTop",
      title: "Padding Top (px)",
      type: "number",
      description: "Top padding in pixels.",
      options: {
        range: { min: 0, max: 1000, step: 1 },
      },
      initialValue: 0,
    },
    {
      name: "paddingBottom",
      title: "Padding Bottom (px)",
      type: "number",
      description: "Bottom padding in pixels.",
      options: {
        range: { min: 0, max: 1000, step: 1 },
      },
      initialValue: 0,
    },
    {
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      description: "Hex or CSS color value (e.g. #ffffff or rgba(0,0,0,0.1)).",
      initialValue: "#ffffff",
    },
  ],
  preview: {
    select: {
      titles: "categories[]->title",
    },
    prepare: ({ titles }) => {
      const list = Array.isArray(titles) ? titles.filter(Boolean) : [];
      return {
        title: list.length
          ? `Categories (${list.length})`
          : "Categories (none)",
        subtitle: list.length ? list.join(", ") : "No linked categories",
      };
    },
  },
});
