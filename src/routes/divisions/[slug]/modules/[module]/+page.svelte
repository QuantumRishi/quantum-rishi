<script lang="ts">
	/**
	 * Module Detail Page
	 * Phase 10: Modules System (Nested under Divisions)
	 *
	 * Features:
	 * - Display detailed information about a specific module
	 * - CTA button to redirect to sub-domain
	 * - List of module features
	 * - Related modules navigation
	 * - Glowing hover effects on cards
	 */

	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib';

	let { data }: { data: PageData } = $props();

	const { division, category, module, allModules } = data;

	let canvasElement: HTMLCanvasElement;
	let heroElement: HTMLElement;

	// Get related modules (excluding current)
	const relatedModules = allModules.filter((mod) => mod.slug !== module.slug);

	onMount(async () => {
		// ========== Dynamically import Three.js and GSAP for code splitting ==========
		// Phase 14: Lazy load heavy libraries
		const [THREE, { gsap }] = await Promise.all([import('three'), import('gsap')]);

		// ========== Three.js Background Animation ==========
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			canvasElement.clientWidth / canvasElement.clientHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({
			canvas: canvasElement,
			alpha: true,
			antialias: true
		});

		renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Create particle geometry
		const isMobile = window.innerWidth < 768;
		const particleCount = isMobile ? 300 : 600;
		const particles = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);
		const colors = new Float32Array(particleCount * 3);

		// Use division color for particles
		const divisionColor = new THREE.Color(division.color);

		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 12;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

			const colorVariation = Math.random() * 0.3;
			colors[i * 3] = divisionColor.r + colorVariation;
			colors[i * 3 + 1] = divisionColor.g + colorVariation;
			colors[i * 3 + 2] = divisionColor.b + colorVariation;
		}

		particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		const particleMaterial = new THREE.PointsMaterial({
			size: 0.05,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			blending: THREE.AdditiveBlending
		});

		const particleSystem = new THREE.Points(particles, particleMaterial);
		scene.add(particleSystem);

		camera.position.z = 5;

		// Animation loop
		let animationId: number;
		const animate = () => {
			animationId = requestAnimationFrame(animate);
			particleSystem.rotation.x += 0.0003;
			particleSystem.rotation.y += 0.0008;
			renderer.render(scene, camera);
		};
		animate();

		// Handle window resize
		const handleResize = () => {
			camera.aspect = canvasElement.clientWidth / canvasElement.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
		};
		window.addEventListener('resize', handleResize);

		// ========== GSAP Animations ==========
		gsap.from(heroElement.querySelector('.module-title'), {
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power3.out'
		});

		gsap.from(heroElement.querySelector('.module-description'), {
			opacity: 0,
			y: 30,
			duration: 1,
			delay: 0.2,
			ease: 'power3.out'
		});

		gsap.from(heroElement.querySelector('.module-cta'), {
			opacity: 0,
			y: 20,
			duration: 1,
			delay: 0.4,
			ease: 'power3.out'
		});

		gsap.from('.module-features', {
			opacity: 0,
			y: 30,
			duration: 1,
			delay: 0.6,
			ease: 'power3.out'
		});

		// Cleanup
		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
			renderer.dispose();
		};
	});
</script>

<svelte:head>
	<!-- Phase 13: SEO Meta Tags -->
	<title>{module.name} - {division.name} - Quantum Rishi</title>
	<meta name="description" content={module.description} />
	<meta
		name="keywords"
		content={`${module.name}, ${division.name}, ${division.tagline}, Quantum Rishi`}
	/>

	<!-- Phase 13: Open Graph Tags for Social Sharing -->
	<meta property="og:type" content="website" />
	<meta
		property="og:url"
		content={`https://quantum-rishi.com/divisions/${division.slug}/modules/${module.slug}`}
	/>
	<meta property="og:title" content={`${module.name} - ${division.name}`} />
	<meta property="og:description" content={module.description} />
	<meta property="og:site_name" content="Quantum Rishi" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${module.name} - ${division.name}`} />
	<meta name="twitter:description" content={module.description} />

	<!-- Additional SEO -->
	<meta name="author" content="Quantum Rishi" />
	<meta name="robots" content="index, follow" />
	<link
		rel="canonical"
		href={`https://quantum-rishi.com/divisions/${division.slug}/modules/${module.slug}`}
	/>

	<!-- Phase 13: Schema.org Structured Data for SoftwareApplication -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html '<script type="application/ld+json">' +
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: module.name,
			applicationCategory: 'DeveloperApplication',
			description: module.description,
			operatingSystem: 'Web',
			offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
			provider: {
				'@type': 'Organization',
				name: 'Quantum Rishi',
				url: 'https://quantum-rishi.com'
			},
			url: `https://${module.subdomain}`,
			isPartOf: { '@type': 'SoftwareApplication', name: division.name }
		}) +
		'<' +
		'/script>'}
</svelte:head>

<!-- Module Hero Section -->
<section class="module-hero" style="--division-color: {division.color}" bind:this={heroElement}>
	<!-- Animated Background Canvas -->
	<canvas class="hero-canvas" bind:this={canvasElement}></canvas>

	<div class="qr-container">
		<div class="hero-content">
			<!-- Breadcrumb -->
			<div class="breadcrumb">
				<a href="/" class="breadcrumb-link">Home</a>
				<span class="breadcrumb-separator">/</span>
				<a href="/#ecosystem" class="breadcrumb-link">{category.name}</a>
				<span class="breadcrumb-separator">/</span>
				<a href="/divisions/{division.slug}" class="breadcrumb-link">{division.name}</a>
				<span class="breadcrumb-separator">/</span>
				<span class="breadcrumb-current">{module.name}</span>
			</div>

			<!-- Module Title -->
			<h1 class="module-title">{module.name}</h1>

			<!-- Module Description -->
			<p class="module-description">{module.description}</p>

			<!-- CTA Button to Sub-domain -->
			<div class="module-cta">
				<Button variant="primary" size="large" href="https://{module.subdomain}" external>
					Launch Module →
				</Button>
				<Button variant="outline" size="large" href="/divisions/{division.slug}">
					Back to {division.name}
				</Button>
			</div>
		</div>
	</div>

	<!-- Gradient Overlay -->
	<div class="hero-gradient"></div>
</section>

<!-- Module Features Section -->
<section class="module-features qr-section">
	<div class="qr-container">
		<h2 class="section-title">Key Features</h2>
		<div class="features-grid">
			{#each module.features as feature, index (index)}
				<div class="feature-card">
					<div class="feature-icon" style="color: {division.color}">
						<svg
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12l5 5L20 7" />
						</svg>
					</div>
					<span class="feature-text">{feature}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Related Modules Section -->
{#if relatedModules.length > 0}
	<section class="related-modules qr-section">
		<div class="qr-container">
			<h2 class="section-title">Related Modules</h2>
			<div class="modules-grid">
				{#each relatedModules as relatedModule, index (index)}
					<a
						href="/divisions/{division.slug}/modules/{relatedModule.slug}"
						class="module-card"
						style="--card-color: {division.color}"
					>
						<div class="module-card-content">
							<h3 class="module-card-title">{relatedModule.name}</h3>
							<p class="module-card-description">{relatedModule.description}</p>
							<div class="module-card-arrow">→</div>
						</div>
						<div class="module-card-glow"></div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	/* Hero Section */
	.module-hero {
		position: relative;
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-alt) 100%);
	}

	.hero-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.hero-gradient {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(
			circle at 50% 50%,
			transparent 0%,
			var(--color-dark) 70%,
			var(--color-dark) 100%
		);
		pointer-events: none;
		z-index: 1;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
		padding: var(--spacing-4xl) 0;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-lg);
		font-family: var(--font-family-mono);
		font-size: var(--font-size-small);
		flex-wrap: wrap;
	}

	.breadcrumb-link {
		color: var(--color-gray);
		text-decoration: none;
		transition: color var(--transition-base);
	}

	.breadcrumb-link:hover {
		color: var(--division-color);
	}

	.breadcrumb-separator {
		color: var(--color-gray);
	}

	.breadcrumb-current {
		color: var(--division-color);
	}

	.module-title {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h1);
		font-weight: var(--font-weight-bold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-lg);
		line-height: var(--line-height-tight);
		background: linear-gradient(135deg, var(--color-light), var(--division-color));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.module-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-h6);
		line-height: var(--line-height-relaxed);
		color: var(--color-gray);
		margin-bottom: var(--spacing-2xl);
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.module-cta {
		display: flex;
		gap: var(--spacing-md);
		justify-content: center;
		flex-wrap: wrap;
	}

	/* Features Section */
	.module-features {
		background: var(--color-dark);
	}

	.section-title {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h3);
		font-weight: var(--font-weight-bold);
		color: var(--color-light);
		text-align: center;
		margin-bottom: var(--spacing-2xl);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
		max-width: 900px;
		margin: 0 auto;
	}

	.feature-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-lg);
		background: var(--color-dark-alt);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		transition: all var(--transition-base);
	}

	.feature-card:hover {
		border-color: var(--division-color);
		transform: translateY(-2px);
	}

	.feature-icon {
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.feature-text {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-p);
		color: var(--color-light);
		font-weight: var(--font-weight-medium);
	}

	/* Related Modules Section */
	.related-modules {
		background: var(--color-dark-alt);
	}

	.modules-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--spacing-xl);
	}

	/* Module Card with Glowing Hover Effect (Phase 10 requirement) */
	.module-card {
		position: relative;
		display: block;
		text-decoration: none;
		background: var(--color-dark);
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

	.module-card-arrow {
		font-size: var(--font-size-h4);
		color: var(--card-color);
		transition: transform var(--transition-base);
	}

	/* Glowing hover effect */
	.module-card-glow {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, var(--card-color) 0%, transparent 70%);
		opacity: 0;
		transition: opacity var(--transition-base);
		pointer-events: none;
		z-index: 1;
	}

	.module-card:hover {
		border-color: var(--card-color);
		transform: translateY(-4px);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.3),
			0 0 20px var(--card-color);
	}

	.module-card:hover .module-card-glow {
		opacity: 0.15;
	}

	.module-card:hover .module-card-arrow {
		transform: translateX(4px);
	}

	/* Responsive Styles */
	@media (max-width: 768px) {
		.module-hero {
			min-height: 50vh;
		}

		.module-title {
			font-size: var(--font-size-h2);
		}

		.module-description {
			font-size: var(--font-size-p);
		}

		.module-cta {
			flex-direction: column;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}

		.modules-grid {
			grid-template-columns: 1fr;
		}

		.breadcrumb {
			font-size: 0.75rem;
		}
	}
</style>
