<script lang="ts">
	/**
	 * SectionTitle Component
	 * Phase 3: Global Design System
	 *
	 * Reusable section title with optional neon underline effect
	 */
	import type { Snippet } from 'svelte';

	interface Props {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		underline?: boolean;
		align?: 'left' | 'center' | 'right';
		class?: string;
		id?: string;
		children?: Snippet;
	}

	let {
		level = 2,
		underline = true,
		align = 'left',
		class: className = '',
		id,
		children
	}: Props = $props();

	const headingClasses = {
		1: 'qr-heading-1',
		2: 'qr-heading-2',
		3: 'qr-heading-3',
		4: 'qr-heading-4',
		5: 'qr-heading-5',
		6: 'qr-heading-6'
	};

	const alignClasses = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};

	const titleClasses = `${headingClasses[level]} ${alignClasses[align]} ${className}`;
	const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
</script>

<svelte:element this={tag} class={titleClasses} {id}>
	{@render children?.()}
	{#if underline}
		<div class="neon-underline" aria-hidden="true"></div>
	{/if}
</svelte:element>

<style>
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		position: relative;
		display: inline-block;
		color: var(--color-light);
	}

	.neon-underline {
		height: 3px;
		width: 60px;
		background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
		margin-top: var(--spacing-sm);
		border-radius: var(--radius-full);
		box-shadow: 0 0 10px var(--color-primary);
	}

	.text-center .neon-underline {
		margin-left: auto;
		margin-right: auto;
	}

	.text-right .neon-underline {
		margin-left: auto;
	}
</style>
