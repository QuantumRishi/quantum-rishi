<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Phase 13: Default SEO Meta Tags -->
	<title>Quantum Rishi - Intelligent Autonomous Systems for Future-Ready India</title>
	<meta
		name="description"
		content="We Build Intelligent Autonomous Systems for a Secure, Scalable and Future-Ready India. AI + Blockchain + Quantum-inspired Security unified into one ecosystem."
	/>
	<meta
		name="keywords"
		content="Quantum Rishi, AI, Machine Learning, Blockchain, Quantum Computing, Cybersecurity, Cloud Infrastructure, IoT, India"
	/>

	<!-- Open Graph Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://quantum-rishi.com" />
	<meta property="og:title" content="Quantum Rishi - Intelligent Autonomous Systems" />
	<meta
		property="og:description"
		content="We Build Intelligent Autonomous Systems for a Secure, Scalable and Future-Ready India. AI + Blockchain + Quantum-inspired Security unified into one ecosystem."
	/>
	<meta property="og:site_name" content="Quantum Rishi" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Quantum Rishi - Intelligent Autonomous Systems" />
	<meta
		name="twitter:description"
		content="We Build Intelligent Autonomous Systems for a Secure, Scalable and Future-Ready India"
	/>

	<!-- Additional SEO -->
	<meta name="author" content="Quantum Rishi" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://quantum-rishi.com" />

	<!-- Favicon -->
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Phase 13: Schema.org Organization Data -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html '<script type="application/ld+json">' +
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Quantum Rishi',
			url: 'https://quantum-rishi.com',
			description:
				'We Build Intelligent Autonomous Systems for a Secure, Scalable and Future-Ready India',
			sameAs: []
		}) +
		'<' +
		'/script>'}
</svelte:head>

<!-- Skip to main content link for keyboard navigation -->
<a href="#main-content" class="skip-to-content">Skip to main content</a>

<main id="main-content">
	{@render children?.()}
</main>

<style>
	.skip-to-content {
		position: absolute;
		left: -9999px;
		z-index: 999;
		padding: var(--spacing-md) var(--spacing-lg);
		background-color: var(--color-primary);
		color: var(--color-dark);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		border-radius: var(--radius-md);
	}

	.skip-to-content:focus {
		left: var(--spacing-md);
		top: var(--spacing-md);
	}
</style>
