import { ActivityIcon } from "lucide-react";
import { defineType } from "sanity";

import { buttonsField, imageWithAltField } from "../common";
import { customRichText } from "../definitions/rich-text";

export const category = defineType({
  name: "category",
  title: "Category",
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
      title: "Sub Title",
      type: "string",
    },
    customRichText(["block"]),
    imageWithAltField(),
    buttonsField,
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
