// place files you want to import through the `$lib` alias in this folder.

// Export design system components
export { default as Button } from "./components/Button.svelte";
export { default as Card } from "./components/Card.svelte";
export { default as SectionTitle } from "./components/SectionTitle.svelte";
export { default as Badge } from "./components/Badge.svelte";
export { default as HeroSection } from "./components/HeroSection.svelte";

// Export Phase 6 components
export { default as DivisionCard } from "./components/DivisionCard.svelte";
export { default as CategorySection } from "./components/CategorySection.svelte";

// Export Phase 9 layout components
export { default as TechLayout } from "./components/layouts/TechLayout.svelte";
export { default as CreativeLayout } from "./components/layouts/CreativeLayout.svelte";
export { default as KnowledgeLayout } from "./components/layouts/KnowledgeLayout.svelte";

// Export data
export { default as divisionsData } from "./data/divisions.json";

// Export Phase 11 utilities
export * from "./utils/smoothScroll";
