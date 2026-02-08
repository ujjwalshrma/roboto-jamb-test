import { LayoutPanelLeft, Link, PanelBottom } from "lucide-react";
import { defineField, defineType } from "sanity";

const footerColumnLink = defineField({
  name: "footerColumnLink",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Name for the link",
    }),
    defineField({
      name: "url",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}${newTabIndicator}`,
        media: Link,
      };
    },
  },
});

const footerColumnTitle = defineField({
  name: "footerTitle",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Title for the links.",
    }),
  ],
});

const footerColumnDivider = defineField({
  name: "footerColumnDivider",
  type: "object",
  title: "Divider",
  fields: [
    defineField({
      name: "divider",
      type: "string",
      options: { list: ["solid", "dashed"] },
    }),
  ],
});

const footerColumn = defineField({
  name: "footerColumn",
  type: "object",
  icon: LayoutPanelLeft,
  fields: [
    defineField({
      name: "footerContent",
      type: "array",
      title: "Footer Content",
      description: "Links for the column",
      of: [footerColumnLink, footerColumnDivider, footerColumnTitle],
    }),
  ],
});

// footer newsletter field
const footerNewsletter = defineField({
  name: "footerNewsletter",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Footer Newsletter Title",
    }),
  ],
});

const footerHeader = defineField({
  name: "footerHeader",
  title: "Footer Header",
  type: "object",
  icon: LayoutPanelLeft,
  description: "Header of the Footer",
  fields: [
    defineField({
      name: "columns",
      title: "Footer Header Columns",
      type: "array",
      of: [footerColumn],
      validation: (Rule) =>
        Rule.max(3).warning("Maximum 3 Columns can be added."),
    }),
    footerNewsletter,
  ],
});

export const footer = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  description: "Footer content for your website",
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Footer",
      title: "Label",
      description: "Label used to identify footer in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "text",
      rows: 2,
      title: "Subtitle",
      description: "Subtitle that sits beneath the logo in the footer",
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Columns",
      description: "Columns for the footer",
      of: [footerColumn],
    }),
    footerHeader,
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Footer",
      media: PanelBottom,
    }),
  },
});
