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
    {
      name: "imageSize",
      title: "Image Size",
      type: "string",
      description: "Choose which image size to display for this category.",
      options: {
        list: [
          { title: "Large", value: "large" },
          { title: "Medium", value: "medium" },
        ],
        Layout: "radio",
      },
      initialValue: "large",
    },
    buttonsField,
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
