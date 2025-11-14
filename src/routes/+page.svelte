<script lang="ts">
	import { HeroSection, CategorySection, divisionsData } from '$lib';

	// Extract categories from divisions data
	const categories = divisionsData.categories;
</script>

<!-- Phase 5: Hero Section -->
<HeroSection />

<!-- Phase 6: Meta-Category Layout -->
<div
	class="qr-container"
	id="ecosystem"
	role="region"
	aria-label="Quantum Rishi Ecosystem divisions"
>
	<!-- Digital Core Category -->
	<CategorySection
		categoryName={categories['digital-core'].name}
		categoryDescription={categories['digital-core'].description}
		divisions={categories['digital-core'].divisions}
	/>

	<!-- Applied Tech Category -->
	<CategorySection
		categoryName={categories['applied-tech'].name}
		categoryDescription={categories['applied-tech'].description}
		divisions={categories['applied-tech'].divisions}
	/>

	<!-- Knowledge Systems Category -->
	<CategorySection
		categoryName={categories['knowledge-systems'].name}
		categoryDescription={categories['knowledge-systems'].description}
		divisions={categories['knowledge-systems'].divisions}
	/>

	<!-- R&D & Vision Category -->
	<CategorySection
		categoryName={categories['rd-vision'].name}
		categoryDescription={categories['rd-vision'].description}
		divisions={categories['rd-vision'].divisions}
	/>
</div>
