"use client";

import { useOptimistic } from "@sanity/visual-editing/react";
import { env } from "@workspace/env/client";
import type { QueryHomePageDataResult } from "@workspace/sanity/types";
import { motion } from "motion/react";
import { createDataAttribute } from "next-sanity";
import { useCallback, useMemo } from "react";

import type { PageBuilderBlockTypes } from "@/types";
import { CategoriesBlock } from "./sections/categories";
import { CTABlock } from "./sections/cta";
import { FaqAccordion } from "./sections/faq-accordion";
import { FeatureCardsWithIcon } from "./sections/feature-cards-with-icon";
import { HeroBlock } from "./sections/hero";
import { ImageLinkCards } from "./sections/image-link-cards";
import { ProductShowcase } from "./sections/product-showcase";
import { SubscribeNewsletter } from "./sections/subscribe-newsletter";

// More specific and descriptive type aliases
// type PageBuilderBlock = NonNullable<
//   NonNullable<QueryHomePageDataResult>["pageBuilder"]
// >[number];

// Base type from Sanity query result
type SanityPageBuilderBlock = NonNullable<
  NonNullable<QueryHomePageDataResult>["pageBuilder"]
>[number];

// Extended type that ensures _key exists (Sanity array items always have _key at runtime)
type PageBuilderBlock = SanityPageBuilderBlock & {
  _key: string;
};

export type PageBuilderProps = {
  readonly pageBuilder?: PageBuilderBlock[];
  readonly id: string;
  readonly type: string;
};

type SanityDataAttributeConfig = {
  readonly id: string;
  readonly type: string;
  readonly path: string;
};

// Strongly typed component mapping with proper component signatures
const BLOCK_COMPONENTS = {
  cta: CTABlock,
  faqAccordion: FaqAccordion,
  hero: HeroBlock,
  featureCardsIcon: FeatureCardsWithIcon,
  subscribeNewsletter: SubscribeNewsletter,
  imageLinkCards: ImageLinkCards,
  categories: CategoriesBlock,
  productShowcase: ProductShowcase,
  // biome-ignore lint/suspicious/noExplicitAny: <any is used to allow for dynamic component rendering>
} as const as Record<PageBuilderBlockTypes, React.ComponentType<any>>;

/**
 * Helper function to create consistent Sanity data attributes
 */
function createSanityDataAttribute(config: SanityDataAttributeConfig): string {
  return createDataAttribute({
    id: config.id,
    baseUrl: env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    type: config.type,
    path: config.path,
  }).toString();
}

/**
 * Error fallback component for unknown block types
 */
function UnknownBlockError({
  blockType,
  blockKey,
}: {
  blockType: string;
  blockKey: string;
}) {
  return (
    <div
      aria-label={`Unknown block type: ${blockType}`}
      className="flex items-center justify-center rounded-lg border-2 border-muted-foreground/20 border-dashed bg-muted p-8 text-center text-muted-foreground"
      key={`${blockType}-${blockKey}`}
      role="alert"
    >
      <div className="space-y-2">
        <p>Component not found for block type:</p>
        <code className="rounded bg-background px-2 py-1 font-mono text-sm">
          {blockType}
        </code>
      </div>
    </div>
  );
}

/**
 * Hook to handle optimistic updates for page builder blocks
 */
function useOptimisticPageBuilder(
  initialBlocks: PageBuilderBlock[],
  documentId: string
) {
  // biome-ignore lint/suspicious/noExplicitAny: <any is used to allow for dynamic component rendering>
  return useOptimistic<PageBuilderBlock[], any>(
    initialBlocks,
    (currentBlocks, action) => {
      if (action.id === documentId && action.document?.pageBuilder) {
        return action.document.pageBuilder;
      }
      return currentBlocks;
    }
  );
}

/**
 * Custom hook for block component rendering logic
 */
function useBlockRenderer(id: string, type: string) {
  const createBlockDataAttribute = useCallback(
    (blockKey: string) =>
      createSanityDataAttribute({
        id,
        type,
        path: `pageBuilder[_key=="${blockKey}"]`,
      }),
    [id, type]
  );

  const renderBlock = useCallback(
    (block: PageBuilderBlock, _index: number) => {
      const Component =
        BLOCK_COMPONENTS[block._type as keyof typeof BLOCK_COMPONENTS];
      if (!Component) {
        return (
          <UnknownBlockError
            blockKey={block._key}
            blockType={block._type}
            key={`${block._type}-${block._key}`}
          />
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          data-sanity={createBlockDataAttribute(block._key)}
          key={`${block._type}-${block._key}`}
        >
          {/** biome-ignore lint/suspicious/noExplicitAny: <any is used to allow for dynamic component rendering> */}
          <Component {...(block as any)} />
        </motion.div>
      );
    },
    [createBlockDataAttribute]
  );

  return { renderBlock };
}

/**
 * PageBuilder component for rendering dynamic content blocks from Sanity CMS
 */
export function PageBuilder({
  pageBuilder: initialBlocks = [],
  id,
  type,
}: PageBuilderProps) {
  const blocks = useOptimisticPageBuilder(initialBlocks, id);
  const { renderBlock } = useBlockRenderer(id, type);

  const containerDataAttribute = useMemo(
    () => createSanityDataAttribute({ id, type, path: "pageBuilder" }),
    [id, type]
  );

  if (!blocks.length) {
    return null;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, animationDuration: 2 }}
      // className="mx-auto my-16 flex max-w-7xl flex-col gap-16"
      data-sanity={containerDataAttribute}
    >
      {blocks.map(renderBlock)}
    </motion.main>
  );
}
