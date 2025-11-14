<script lang="ts">
	/**
	 * Division Detail Page
	 * Phase 8: Dynamic Division Routing
	 * Phase 9: Division-Specific Layout Variations
	 *
	 * Features:
	 * - Dynamic division data loading based on slug
	 * - Hero section with division color theming
	 * - Animated background
	 * - Conditional layout rendering based on division type
	 * - Layout variants: Technical, Creative, Knowledge
	 */

	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { Button, TechLayout, CreativeLayout, KnowledgeLayout } from '$lib';

	let { data }: { data: PageData } = $props();

	const { division, category } = data;

	let canvasElement: HTMLCanvasElement;
	let heroElement: HTMLElement;

	// Generate sub-domain URL based on division slug
	const generateSubDomainUrl = (slug: string) => {
		// Extract the core identifier after 'qr-' prefix
		const subdomain = slug.replace('qr-', '');
		return `https://${subdomain}.quantum-rishi.com`;
	};

	onMount(async () => {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// ========== Dynamically import Three.js and GSAP for code splitting ==========
		// Phase 14: Lazy load heavy libraries
		const [THREE, { gsap }] = await Promise.all([import('three'), import('gsap')]);

		// ========== Three.js Animated Background Setup ==========
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
		const particleCount = isMobile ? 500 : 1000;
		const particles = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);
		const colors = new Float32Array(particleCount * 3);

		// Use division color for particles
		const divisionColor = new THREE.Color(division.color);

		for (let i = 0; i < particleCount; i++) {
			// Position
			positions[i * 3] = (Math.random() - 0.5) * 15;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

			// Color with slight variations
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
			particleSystem.rotation.x += 0.0005;
			particleSystem.rotation.y += 0.001;
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
		// Skip animations if user prefers reduced motion
		if (!prefersReducedMotion) {
			gsap.from(heroElement.querySelector('.hero-title'), {
				opacity: 0,
				y: 50,
				duration: 1,
				ease: 'power3.out'
			});

			gsap.from(heroElement.querySelector('.hero-tagline'), {
				opacity: 0,
				y: 30,
				duration: 1,
				delay: 0.2,
				ease: 'power3.out'
			});

			gsap.from(heroElement.querySelector('.hero-description'), {
				opacity: 0,
				y: 30,
				duration: 1,
				delay: 0.4,
				ease: 'power3.out'
			});

			gsap.from(heroElement.querySelector('.hero-meta'), {
				opacity: 0,
				y: 20,
				duration: 1,
				delay: 0.6,
				ease: 'power3.out'
			});

			gsap.from(heroElement.querySelector('.hero-cta'), {
				opacity: 0,
				y: 20,
				duration: 1,
				delay: 0.8,
				ease: 'power3.out'
			});
		}

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
	<title>{division.name} - Quantum Rishi</title>
	<meta name="description" content={division.description} />
	<meta
		name="keywords"
		content={`${division.tagline}, ${division.name}, Quantum Rishi, ${category.name}`}
	/>

	<!-- Phase 13: Open Graph Tags for Social Sharing -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://quantum-rishi.com/divisions/${division.slug}`} />
	<meta property="og:title" content={`${division.name} - ${division.tagline}`} />
	<meta property="og:description" content={division.description} />
	<meta property="og:site_name" content="Quantum Rishi" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${division.name} - ${division.tagline}`} />
	<meta name="twitter:description" content={division.description} />

	<!-- Additional SEO -->
	<meta name="author" content="Quantum Rishi" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={`https://quantum-rishi.com/divisions/${division.slug}`} />

	<!-- Phase 13: Schema.org Structured Data for SoftwareApplication -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html '<script type="application/ld+json">' +
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: division.name,
			applicationCategory: 'DeveloperApplication',
			description: division.description,
			operatingSystem: 'Web',
			offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
			provider: {
				'@type': 'Organization',
				name: 'Quantum Rishi',
				url: 'https://quantum-rishi.com'
			},
			url: `https://quantum-rishi.com/divisions/${division.slug}`,
			keywords: `${division.tagline}, ${division.name}, ${category.name}`
		}) +
		'<' +
		'/script>'}
</svelte:head>

<!-- Division Hero Section -->
<section
	class="division-hero"
	style="--division-color: {division.color}"
	bind:this={heroElement}
	aria-labelledby="division-title"
>
	<!-- Animated Background Canvas -->
	<canvas class="hero-canvas" bind:this={canvasElement} aria-hidden="true"></canvas>

	<div class="qr-container">
		<div class="hero-content">
			<!-- Breadcrumb / Category Badge -->
			<nav class="hero-meta" aria-label="Breadcrumb">
				<a href="/" class="breadcrumb-link">Home</a>
				<span class="breadcrumb-separator" aria-hidden="true">/</span>
				<a href="/#ecosystem" class="breadcrumb-link">{category.name}</a>
			</nav>

			<!-- Division Title -->
			<h1 class="hero-title" id="division-title">{division.name}</h1>

			<!-- Division Tagline -->
			<div class="hero-tagline">{division.tagline}</div>

			<!-- Division Description -->
			<p class="hero-description">{division.description}</p>

			<!-- CTA Button -->
			<div class="hero-cta" role="group" aria-label="Division actions">
				<Button
					variant="primary"
					size="large"
					href={generateSubDomainUrl(division.slug)}
					external
					aria-label="Open {division.name} platform in new tab"
				>
					Open Platform →
				</Button>
				<Button
					variant="outline"
					size="large"
					href="/#ecosystem"
					aria-label="Return to ecosystem overview">Back to Ecosystem</Button
				>
			</div>
		</div>
	</div>

	<!-- Gradient Overlay -->
	<div class="hero-gradient"></div>
</section>

<!-- Phase 9: Conditional Layout Rendering based on Division Type -->
{#if division.layoutType === 'technical'}
	<TechLayout {division} />
{:else if division.layoutType === 'creative'}
	<CreativeLayout {division} />
{:else if division.layoutType === 'knowledge'}
	<KnowledgeLayout {division} />
{:else}
	<!-- Fallback to Technical Layout -->
	<TechLayout {division} />
{/if}

<style>
	/* Hero Section Styles */
	.division-hero {
		position: relative;
		min-height: 70vh;
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

	.hero-meta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-lg);
		font-family: var(--font-family-mono);
		font-size: var(--font-size-small);
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

	.hero-title {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h1);
		font-weight: var(--font-weight-bold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-md);
		line-height: var(--line-height-tight);
		background: linear-gradient(135deg, var(--color-light), var(--division-color));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-tagline {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h4);
		color: var(--division-color);
		margin-bottom: var(--spacing-lg);
		font-weight: var(--font-weight-medium);
	}

	.hero-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-h6);
		line-height: var(--line-height-relaxed);
		color: var(--color-gray);
		margin-bottom: var(--spacing-2xl);
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-cta {
		display: flex;
		gap: var(--spacing-md);
		justify-content: center;
		flex-wrap: wrap;
	}

	/* Responsive Styles */
	@media (max-width: 768px) {
		.division-hero {
			min-height: 60vh;
		}

		.hero-title {
			font-size: var(--font-size-h2);
		}

		.hero-tagline {
			font-size: var(--font-size-h5);
		}

		.hero-description {
			font-size: var(--font-size-p);
		}

		.hero-cta {
			flex-direction: column;
		}
	}

	@media (min-width: 769px) and (max-width: 1024px) {
	}
</style>
