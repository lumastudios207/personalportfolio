import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: z.object({
    company: z.string(),
    location: z.string(),
    description: z.string(),
    // Required. Purpose-written blurb for search results and social share
    // cards. Hard-capped at 160 chars so it is never truncated mid-sentence.
    ogDescription: z.string().max(160),
    previewImage: z.string(),
    workTypes: z.array(
      z.enum(["product-design", "marketing-design"])
    ),
    contributions: z.array(z.string()),
    clientQuote: z.string(),
    clientLogo: z.string(),
    clientName: z.string().optional(),
    clientRole: z.string().optional(),
    projectLength: z.string().optional(),
    workSectionDescription: z.string().optional(),
    productDesignDescription: z.string().optional(),
    marketingDesignDescription: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { work };
