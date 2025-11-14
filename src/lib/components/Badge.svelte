<script lang="ts">
	/**
	 * Badge Component
	 * Phase 3: Global Design System
	 *
	 * Reusable badge component for tags and labels
	 */
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'accent' | 'success';
		class?: string;
		children?: Snippet;
	}

	let { variant = 'primary', class: className = '', children }: Props = $props();

	const variantClasses = {
		primary: 'qr-badge-primary',
		secondary: 'qr-badge-secondary',
		accent: 'qr-badge-accent',
		success: 'qr-badge-success'
	};

	const badgeClasses = `qr-badge ${variantClasses[variant]} ${className}`;
</script>

<span class={badgeClasses}>
	{@render children?.()}
</span>
