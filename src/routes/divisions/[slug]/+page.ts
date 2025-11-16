import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import divisionsData from "$lib/data/divisions.json";

export const load: PageLoad = ({ params }) => {
  const { slug } = params;

  // Search through all categories to find the division with matching slug
  let foundDivision = null;
  let foundCategory = null;

  for (const [categoryKey, categoryData] of Object.entries(
    divisionsData.categories,
  )) {
    const division = categoryData.divisions.find((div) => div.slug === slug);
    if (division) {
      foundDivision = division;
      foundCategory = {
        key: categoryKey,
        name: categoryData.name,
        description: categoryData.description,
      };
      break;
    }
  }

  if (!foundDivision || !foundCategory) {
    throw error(404, {
      message: "Division not found",
    });
  }

  return {
    division: foundDivision,
    category: foundCategory,
  };
};
