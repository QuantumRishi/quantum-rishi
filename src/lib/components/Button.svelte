<script lang="ts">
	/**
	 * Button Component
	 * Phase 3: Global Design System
	 *
	 * Reusable button component with multiple variants and sizes
	 */
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'accent' | 'outline';
		size?: 'small' | 'medium' | 'large';
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		href?: string;
		external?: boolean;
		'aria-label'?: string;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'medium',
		type = 'button',
		disabled = false,
		class: className = '',
		onclick,
		href,
		external = false,
		'aria-label': ariaLabel,
		children
	}: Props = $props();

	// Build class string based on variant and size
	const variantClasses = {
		primary: 'qr-button-primary',
		secondary: 'qr-button-secondary',
		accent: 'qr-button-accent',
		outline: 'qr-button-outline'
	};

	const sizeClasses = {
		small: 'qr-button-small',
		medium: '',
		large: 'qr-button-large'
	};

	const buttonClasses = `qr-button ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
</script>

{#if href}
	<a
		{href}
		class={buttonClasses}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		aria-disabled={disabled}
		aria-label={ariaLabel}
	>
		{@render children?.()}
	</a>
{:else}
	<button {type} class={buttonClasses} {disabled} {onclick} aria-label={ariaLabel}>
		{@render children?.()}
	</button>
{/if}

<style>
	button:disabled,
	a[aria-disabled='true'] {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	button:disabled:hover,
	a[aria-disabled='true']:hover {
		transform: none;
		box-shadow: var(--shadow-md);
	}

	a {
		text-decoration: none;
	}

	/* Phase 11: Hover pulse animation for CTA buttons */
	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow: 0 0 15px rgba(40, 229, 255, 0.4);
		}
		50% {
			box-shadow: 0 0 25px rgba(40, 229, 255, 0.8);
		}
	}

	@keyframes pulse-glow-secondary {
		0%,
		100% {
			box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
		}
		50% {
			box-shadow: 0 0 25px rgba(99, 102, 241, 0.8);
		}
	}

	@keyframes pulse-glow-accent {
		0%,
		100% {
			box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
		}
		50% {
			box-shadow: 0 0 25px rgba(139, 92, 246, 0.8);
		}
	}

	/* Apply pulse animation on hover for non-disabled buttons */
	button:not(:disabled):hover,
	a:not([aria-disabled='true']):hover {
		animation: pulse-glow 1.5s ease-in-out infinite;
	}

	/* Respect reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		button:not(:disabled):hover,
		a:not([aria-disabled='true']):hover {
			animation: none;
		}
	}
</style>
