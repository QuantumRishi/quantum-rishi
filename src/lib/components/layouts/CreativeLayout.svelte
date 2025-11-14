<script lang="ts">
	/**
	 * Creative Layout Component
	 * For creative divisions like QR.Digi, QR.Studio, QR.Design, etc.
	 *
	 * Features:
	 * - Media/portfolio slider
	 * - Visual showcase gallery
	 * - Creative services breakdown
	 * - Design capabilities
	 * - Modules section (Phase 10)
	 */

	import { Card, Button } from '$lib';
	import { onMount } from 'svelte';
	import modulesData from '$lib/data/modules.json';

	interface Props {
		division: {
			name: string;
			color: string;
			slug: string;
		};
	}

	let { division }: Props = $props();

	// Get modules for this division (Phase 10)
	const divisionModules = modulesData[division.slug as keyof typeof modulesData]?.modules || [];

	// Example portfolio items
	const portfolioItems = [
		{
			title: 'Brand Identity Design',
			category: 'Branding',
			color: '#FF6B9D'
		},
		{
			title: '3D Motion Graphics',
			category: 'Animation',
			color: '#4ECDC4'
		},
		{
			title: 'Interactive Experience',
			category: 'Digital',
			color: '#95E1D3'
		},
		{
			title: 'UI/UX Design',
			category: 'Interface',
			color: '#F38181'
		}
	];

	const creativeServices = [
		{
			name: 'Visual Design',
			description: 'Beautiful, modern designs that capture attention and communicate your brand',
			icon: '🎨'
		},
		{
			name: 'Motion & Animation',
			description: 'Engaging animations and motion graphics that bring your content to life',
			icon: '🎬'
		},
		{
			name: 'Digital Art',
			description: 'Custom digital artwork and illustrations for unique visual storytelling',
			icon: '✨'
		},
		{
			name: 'Brand Experience',
			description: 'Comprehensive brand identity and experience design solutions',
			icon: '💫'
		}
	];

	let currentSlide = $state(0);
	let intervalId: ReturnType<typeof setInterval>;

	onMount(() => {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Auto-advance slider (skip if user prefers reduced motion)
		if (!prefersReducedMotion) {
			const startInterval = () => {
				intervalId = setInterval(() => {
					currentSlide = (currentSlide + 1) % portfolioItems.length;
				}, 4000);
			};

			startInterval();

			return () => clearInterval(intervalId);
		}
	});

	const goToSlide = (index: number) => {
		currentSlide = index;
		clearInterval(intervalId);
		// Restart interval after manual navigation
		intervalId = setInterval(() => {
			currentSlide = (currentSlide + 1) % portfolioItems.length;
		}, 4000);
	};
</script>

<div class="creative-layout" style="--division-color: {division.color}">
	<!-- Portfolio Slider Section -->
	<section class="portfolio-section" aria-labelledby="portfolio-heading">
		<div class="qr-container">
			<h2 class="section-heading" id="portfolio-heading">Featured Work</h2>
			<p class="section-description">
				Explore our creative portfolio and see the {division.name} difference
			</p>

			<div
				class="slider-container"
				role="region"
				aria-label="Portfolio carousel"
				aria-live="polite"
			>
				<div class="slider-track" style="transform: translateX(-{currentSlide * 100}%)">
					{#each portfolioItems as item, index (item.title)}
						<div
							class="slide"
							style="background: linear-gradient(135deg, {item.color}33, {item.color}11)"
						>
							<div class="slide-content">
								<div class="slide-category">{item.category}</div>
								<h3 class="slide-title">{item.title}</h3>
								<div class="slide-number">{String(index + 1).padStart(2, '0')}</div>
							</div>
							<div class="slide-visual" style="border-color: {item.color}">
								<div class="visual-placeholder">
									<span style="color: {item.color}; font-size: 4rem;">🖼️</span>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Slider Controls -->
				<div class="slider-controls" role="group" aria-label="Portfolio navigation">
					{#each portfolioItems as item, index (item.title)}
						<button
							class="slider-dot"
							class:active={currentSlide === index}
							onclick={() => goToSlide(index)}
							aria-label="Go to slide {index + 1}: {item.title}"
							aria-current={currentSlide === index ? 'true' : 'false'}
						></button>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Creative Services Section -->
	<section class="services-section" aria-labelledby="services-heading">
		<div class="qr-container">
			<h2 class="section-heading" id="services-heading">Creative Services</h2>

			<div class="services-grid" role="list" aria-label="Creative services offered">
				{#each creativeServices as service (service.name)}
					<div role="listitem">
						<Card hover glow>
							<div class="service-icon" aria-hidden="true">{service.icon}</div>
							<h3 class="service-name">{service.name}</h3>
							<p class="service-description">{service.description}</p>
						</Card>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Tools & Capabilities Section -->
	<section class="tools-section">
		<div class="qr-container">
			<h2 class="section-heading">Tools & Capabilities</h2>

			<div class="tools-grid">
				<div class="tool-category">
					<h3 class="tool-category-title">Design Tools</h3>
					<div class="tool-list">
						<span class="tool-badge">Figma</span>
						<span class="tool-badge">Adobe CC</span>
						<span class="tool-badge">Sketch</span>
						<span class="tool-badge">Blender</span>
					</div>
				</div>

				<div class="tool-category">
					<h3 class="tool-category-title">Development</h3>
					<div class="tool-list">
						<span class="tool-badge">React</span>
						<span class="tool-badge">Three.js</span>
						<span class="tool-badge">GSAP</span>
						<span class="tool-badge">WebGL</span>
					</div>
				</div>

				<div class="tool-category">
					<h3 class="tool-category-title">Video & Motion</h3>
					<div class="tool-list">
						<span class="tool-badge">After Effects</span>
						<span class="tool-badge">Premiere Pro</span>
						<span class="tool-badge">Cinema 4D</span>
						<span class="tool-badge">DaVinci</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Modules Section (Phase 10) -->
	{#if divisionModules.length > 0}
		<section class="modules-section">
			<div class="qr-container">
				<h2 class="section-heading">Available Modules</h2>
				<p class="section-description">
					Explore specialized modules and capabilities within {division.name}
				</p>

				<div class="modules-grid">
					{#each divisionModules as module (module.slug)}
						<a
							href="/divisions/{division.slug}/modules/{module.slug}"
							class="module-card"
							style="--module-color: {division.color}"
						>
							<div class="module-card-content">
								<h3 class="module-card-title">{module.name}</h3>
								<p class="module-card-description">{module.description}</p>
								<div class="module-card-features">
									{#each module.features.slice(0, 3) as feature, index (index)}
										<span class="feature-tag">{feature}</span>
									{/each}
								</div>
								<div class="module-card-arrow">→</div>
							</div>
							<div class="module-card-glow"></div>
						</a>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="qr-container">
			<div class="cta-content">
				<h2 class="cta-title">Ready to create something amazing?</h2>
				<p class="cta-description">Let's collaborate and bring your creative vision to life</p>
				<div class="cta-actions">
					<Button variant="primary" size="large">Start a Project</Button>
					<Button variant="outline" size="large">View Portfolio</Button>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.creative-layout {
		background: var(--color-dark);
	}

	/* Section Styles */
	section {
		padding: var(--spacing-4xl) 0;
	}

	.section-heading {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h2);
		font-weight: var(--font-weight-bold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-md);
		text-align: center;
	}

	.section-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-h6);
		color: var(--color-gray);
		text-align: center;
		margin: 0 0 var(--spacing-3xl);
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Portfolio Slider */
	.portfolio-section {
		background: var(--color-dark-alt);
	}

	.slider-container {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-xl);
	}

	.slider-track {
		display: flex;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.slide {
		min-width: 100%;
		padding: var(--spacing-3xl);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-2xl);
		background: var(--color-dark);
		border-radius: var(--radius-xl);
	}

	.slide-content {
		flex: 1;
	}

	.slide-category {
		font-family: var(--font-family-mono);
		font-size: var(--font-size-small);
		color: var(--division-color);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: var(--spacing-md);
	}

	.slide-title {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h2);
		font-weight: var(--font-weight-bold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-lg);
	}

	.slide-number {
		font-family: var(--font-family-display);
		font-size: 5rem;
		font-weight: var(--font-weight-bold);
		color: rgba(255, 255, 255, 0.1);
	}

	.slide-visual {
		flex: 1;
		aspect-ratio: 16/9;
		border-radius: var(--radius-lg);
		border: 2px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.3);
	}

	.visual-placeholder {
		text-align: center;
	}

	.slider-controls {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: center;
		padding: var(--spacing-xl) 0;
	}

	.slider-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		border: none;
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.slider-dot:hover {
		background: rgba(255, 255, 255, 0.4);
	}

	.slider-dot.active {
		background: var(--division-color);
		width: 32px;
		border-radius: 6px;
	}

	/* Creative Services */
	.services-section {
		background: var(--color-dark);
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	.service-icon {
		font-size: 3rem;
		text-align: center;
		margin-bottom: var(--spacing-md);
	}

	.service-name {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h5);
		font-weight: var(--font-weight-semibold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-sm);
		text-align: center;
	}

	.service-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-small);
		color: var(--color-gray);
		text-align: center;
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	/* Tools Section */
	.tools-section {
		background: var(--color-dark-alt);
	}

	.tools-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-xl);
	}

	.tool-category {
		padding: var(--spacing-xl);
		background: var(--color-dark);
		border-radius: var(--radius-lg);
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.tool-category-title {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h5);
		font-weight: var(--font-weight-semibold);
		color: var(--division-color);
		margin: 0 0 var(--spacing-lg);
		text-align: center;
	}

	.tool-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		justify-content: center;
	}

	.tool-badge {
		display: inline-block;
		padding: var(--spacing-xs) var(--spacing-md);
		background: rgba(255, 255, 255, 0.05);
		border-radius: var(--radius-md);
		font-family: var(--font-family-mono);
		font-size: var(--font-size-small);
		color: var(--color-light);
		transition: all var(--transition-base);
	}

	.tool-badge:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--division-color);
	}

	/* Modules Section (Phase 10) */
	.modules-section {
		background: var(--color-dark);
	}

	.modules-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--spacing-xl);
	}

	/* Module Card with Glowing Hover Effect (Phase 10) */
	.module-card {
		position: relative;
		display: block;
		text-decoration: none;
		background: var(--color-dark-alt);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		padding: var(--spacing-xl);
		transition: all var(--transition-base);
		overflow: hidden;
	}

	.module-card-content {
		position: relative;
		z-index: 2;
	}

	.module-card-title {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h5);
		font-weight: var(--font-weight-bold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-sm);
	}

	.module-card-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-small);
		color: var(--color-gray);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--spacing-md);
	}

	.module-card-features {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-md);
	}

	.feature-tag {
		display: inline-block;
		padding: var(--spacing-xs) var(--spacing-sm);
		background: rgba(255, 255, 255, 0.05);
		border-radius: var(--radius-sm);
		font-family: var(--font-family-mono);
		font-size: 0.75rem;
		color: var(--color-gray);
		transition: all var(--transition-base);
	}

	.module-card:hover .feature-tag {
		background: rgba(255, 255, 255, 0.1);
		color: var(--module-color);
	}

	.module-card-arrow {
		font-size: var(--font-size-h4);
		color: var(--module-color);
		transition: transform var(--transition-base);
	}

	/* Glowing hover effect */
	.module-card-glow {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, var(--module-color) 0%, transparent 70%);
		opacity: 0;
		transition: opacity var(--transition-base);
		pointer-events: none;
		z-index: 1;
	}

	.module-card:hover {
		border-color: var(--module-color);
		transform: translateY(-4px);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.3),
			0 0 20px var(--module-color);
	}

	.module-card:hover .module-card-glow {
		opacity: 0.15;
	}

	.module-card:hover .module-card-arrow {
		transform: translateX(4px);
	}

	/* CTA Section */
	.cta-section {
		background: var(--color-dark);
	}

	.cta-content {
		text-align: center;
		padding: var(--spacing-3xl);
		background: var(--color-dark-alt);
		border-radius: var(--radius-xl);
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.cta-title {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h2);
		font-weight: var(--font-weight-bold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-md);
	}

	.cta-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-h6);
		color: var(--color-gray);
		margin: 0 0 var(--spacing-2xl);
	}

	.cta-actions {
		display: flex;
		gap: var(--spacing-md);
		justify-content: center;
		flex-wrap: wrap;
	}

	/* Responsive */
	@media (max-width: 768px) {
		section {
			padding: var(--spacing-3xl) 0;
		}

		.section-heading {
			font-size: var(--font-size-h3);
		}

		.slide {
			flex-direction: column;
			padding: var(--spacing-xl);
		}

		.slide-title {
			font-size: var(--font-size-h3);
		}

		.slide-number {
			font-size: 3rem;
		}

		.services-grid,
		.tools-grid {
			grid-template-columns: 1fr;
		}

		.cta-title {
			font-size: var(--font-size-h3);
		}

		.cta-actions {
			flex-direction: column;
		}
	}
</style>
