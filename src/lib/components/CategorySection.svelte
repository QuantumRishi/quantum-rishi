<script lang="ts">
	/**
	 * CategorySection Component
	 * Phase 6: Landing Page – Meta-Category Layout
	 * Phase 11: Motion & Interaction Enhancements
	 * Phase 14: Performance Optimization - Lazy loading heavy assets
	 *
	 * Displays a category with its divisions in a responsive grid layout
	 * Enhanced with GSAP ScrollTrigger for reveal animations (lazy loaded)
	 */
	import { onMount } from 'svelte';
	import SectionTitle from './SectionTitle.svelte';
	import DivisionCard from './DivisionCard.svelte';

	interface Division {
		id: string;
		slug: string;
		name: string;
		tagline: string;
		description: string;
		color: string;
		icon?: string;
	}

	interface Props {
		categoryName: string;
		categoryDescription?: string;
		divisions: Division[];
		class?: string;
	}

	let { categoryName, categoryDescription, divisions, class: className = '' }: Props = $props();

	let sectionElement: HTMLElement;
	let headerElement: HTMLDivElement;
	let gridElement: HTMLDivElement;

	onMount(async () => {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Store references to ScrollTriggers for proper cleanup
		const scrollTriggers: { kill: () => void }[] = [];

		if (!prefersReducedMotion) {
			// ========== Dynamically import GSAP for code splitting ==========
			// Phase 14: Lazy load heavy libraries to improve initial page load
			const { gsap, ScrollTrigger } = await import('gsap/all');

			// Register ScrollTrigger plugin
			gsap.registerPlugin(ScrollTrigger);

			// Animate section header with fade + upward reveal
			const headerAnimation = gsap.from(headerElement, {
				opacity: 0,
				y: 30,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionElement,
					start: 'top 80%',
					toggleActions: 'play none none none'
				}
			});
			if (headerAnimation.scrollTrigger) {
				scrollTriggers.push(headerAnimation.scrollTrigger);
			}

			// Animate division cards with stagger effect
			const cards = gridElement.querySelectorAll('.division-card-wrapper');
			const cardsAnimation = gsap.from(cards, {
				opacity: 0,
				y: 50,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: gridElement,
					start: 'top 75%',
					toggleActions: 'play none none none'
				}
			});
			if (cardsAnimation.scrollTrigger) {
				scrollTriggers.push(cardsAnimation.scrollTrigger);
			}
		}

		// Cleanup function - only kill this component's ScrollTriggers
		return () => {
			scrollTriggers.forEach((trigger) => trigger.kill());
		};
	});
</script>

<section
	class="category-section {className}"
	aria-labelledby="category-{categoryName.replace(/\s+/g, '-').toLowerCase()}"
	bind:this={sectionElement}
>
	<div class="category-header" bind:this={headerElement}>
		<SectionTitle level={2} id="category-{categoryName.replace(/\s+/g, '-').toLowerCase()}">
			{categoryName}
		</SectionTitle>
		{#if categoryDescription}
			<p class="category-description">{categoryDescription}</p>
		{/if}
	</div>

	<div
		class="divisions-grid"
		role="list"
		aria-label="{categoryName} divisions"
		bind:this={gridElement}
	>
		{#each divisions as division (division.id)}
			<div class="division-card-wrapper" role="listitem">
				<DivisionCard
					name={division.name}
					tagline={division.tagline}
					color={division.color}
					slug={division.slug}
				/>
			</div>
		{/each}
	</div>
</section>

<style>
	.category-section {
		padding: var(--spacing-3xl) 0;
	}

	.category-header {
		margin-bottom: var(--spacing-2xl);
		text-align: center;
	}

	.category-description {
		color: var(--color-gray);
		font-size: var(--font-size-lg);
		margin-top: var(--spacing-md);
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.divisions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
		margin-top: var(--spacing-2xl);
	}

	.division-card-wrapper {
		/* Wrapper for animation purposes */
		width: 100%;
	}

	/* Responsive grid adjustments */
	@media (min-width: 768px) {
		.divisions-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.divisions-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1280px) {
		.divisions-grid {
			grid-template-columns: repeat(5, 1fr);
		}
	}
</style>
