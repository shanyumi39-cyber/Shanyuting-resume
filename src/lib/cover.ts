import type { Project } from "../types";

/**
 * Build a generated cover image URL for a project.
 * Project covers in portfolio.json are placeholders; per image guidelines we
 * render generated visuals derived from each project's title/category/desc.
 */
export function coverImage(project: Project): string {
  const prompt =
    `UI design portfolio mockup cover: ${project.title}, ${project.category}. ` +
    `${project.desc} Clean modern dark UI, glassmorphism, high fidelity screen design, ` +
    `soft ambient light, premium, minimal, detailed.`;
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=landscape_16_9`;
}

/** A hero/signature visual for the home page. */
export function heroVisual(prompt: string, size: ImageSize = "landscape_16_9"): string {
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=${size}`;
}

export type ImageSize =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9";
