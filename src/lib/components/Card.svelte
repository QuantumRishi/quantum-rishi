<script lang="ts">
	/**
	 * Card Component
	 * Phase 3: Global Design System
	 *
	 * Reusable card component for content containers
	 */
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'compact' | 'spacious';
		hover?: boolean;
		glow?: boolean;
		class?: string;
		children?: Snippet;
	}

	let {
		variant = 'default',
		hover = true,
		glow = false,
		class: className = '',
		children
	}: Props = $props();

	const variantClasses = {
		default: 'qr-card',
		compact: 'qr-card qr-card-compact',
		spacious: 'qr-card qr-card-spacious'
	};

	const cardClasses = `${variantClasses[variant]} ${hover ? '' : 'no-hover'} ${glow ? 'with-glow' : ''} ${className}`;
</script>

<div class={cardClasses}>
	{@render children?.()}
</div>

<style>
	.no-hover:hover {
		transform: none;
		box-shadow: var(--shadow-md);
		border-color: rgba(40, 229, 255, 0.1);
	}
</style>
