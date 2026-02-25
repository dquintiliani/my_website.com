// components/mdx-components.tsx
import React from "react";
import { InlineBadge } from "./inlinebadge";

// You can export this type if your MDX tooling needs it
export const mdxComponents = {
  // This means: when MDX sees <InlineBadge>...</InlineBadge>
  // use the InlineBadge React component we just imported
  InlineBadge,

  // you can add more:
  // FancyButton,
  // Callout,
  // CodeBlock,
};
