import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import divisionsData from '$lib/data/divisions.json';
import modulesData from '$lib/data/modules.json';

export const load: PageLoad = ({ params }) => {
	const { slug, module: moduleSlug } = params;

	// Find the division first
	let foundDivision = null;
	let foundCategory = null;

	for (const [categoryKey, categoryData] of Object.entries(divisionsData.categories)) {
		const division = categoryData.divisions.find((div) => div.slug === slug);
		if (division) {
			foundDivision = division;
			foundCategory = {
				key: categoryKey,
				name: categoryData.name,
				description: categoryData.description
			};
			break;
		}
	}

	if (!foundDivision || !foundCategory) {
		throw error(404, {
			message: 'Division not found'
		});
	}

	// Find the module within the division
	const divisionModules = modulesData[slug as keyof typeof modulesData];

	if (!divisionModules || !divisionModules.modules) {
		throw error(404, {
			message: 'No modules found for this division'
		});
	}

	const foundModule = divisionModules.modules.find((mod) => mod.slug === moduleSlug);

	if (!foundModule) {
		throw error(404, {
			message: 'Module not found'
		});
	}

	return {
		division: foundDivision,
		category: foundCategory,
		module: foundModule,
		allModules: divisionModules.modules
	};
};
