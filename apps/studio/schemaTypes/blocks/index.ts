import { cta } from "@/schemaTypes/blocks/cta";
import { faqAccordion } from "@/schemaTypes/blocks/faq-accordion";
import { featureCardsIcon } from "@/schemaTypes/blocks/feature-cards-icon";
import { hero } from "@/schemaTypes/blocks/hero";
import { imageLinkCards } from "@/schemaTypes/blocks/image-link-cards";
import { subscribeNewsletter } from "@/schemaTypes/blocks/subscribe-newsletter";
import { categories } from "./categories";
import { productShowcase } from "./product-showcase";

export const pageBuilderBlocks = [
  hero,
  cta,
  featureCardsIcon,
  faqAccordion,
  imageLinkCards,
  subscribeNewsletter,
  categories,
  productShowcase,
];
