import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: z.object({
    company: z.string(),
    location: z.string(),
    description: z.string(),
    previewImage: z.string(),
    workTypes: z.array(
      z.enum(["product-design", "marketing-design"])
    ),
    contributions: z.array(z.string()),
    clientQuote: z.string(),
    clientLogo: z.string(),
    order: z.number(),
  }),
});

export const collections = { work };
