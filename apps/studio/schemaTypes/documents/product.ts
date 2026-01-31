import { ActivityIcon } from "lucide-react";
import { defineType } from "sanity";

import { imageWithAltField } from "../common";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: ActivityIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    imageWithAltField(),
    {
      name: "width",
      title: "Width",
      type: "number",
      description:
        "This is the image container width and height, if not set then default size would be applied",
      options: {
        range: { min: 0, max: 2000, step: 1 },
      },
    },
    {
      name: "height",
      title: "Height",
      type: "number",
      description:
        "This is the image container width and height, if not set then default size would be applied",
      options: {
        range: { min: 0, max: 2000, step: 1 },
      },
    },
    {
      name: "categoryId",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
