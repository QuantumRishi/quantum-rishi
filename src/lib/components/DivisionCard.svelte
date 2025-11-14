<script lang="ts">
	/**
	 * DivisionCard Component
	 * Phase 6: Landing Page – Meta-Category Layout
	 *
	 * Interactive card for displaying division information with:
	 * - Hover glow effect
	 * - Division tagline display on hover
	 * - Click navigation to division detail page
	 */

	interface Props {
		name: string;
		tagline: string;
		color: string;
		slug: string;
		onclick?: () => void;
		class?: string;
	}

	let { name, tagline, color, slug, onclick, class: className = '' }: Props = $props();

	const handleClick = () => {
		if (onclick) {
			onclick();
		} else {
			// Default navigation to division page
			window.location.href = `/divisions/${slug}`;
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		// Handle Enter and Space keys for accessibility
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	};
</script>

<button
	class="division-card {className}"
	style="--division-color: {color}"
	onclick={handleClick}
	onkeydown={handleKeyDown}
	type="button"
	aria-label="Navigate to {name} - {tagline}"
>
	<div class="division-card-content">
		<div class="division-header">
			<h3 class="division-name">{name}</h3>
			<div class="division-tagline">{tagline}</div>
		</div>
		<div class="division-glow"></div>
	</div>
</button>

<style>
	.division-card {
		position: relative;
		background: var(--color-dark-alt);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		cursor: pointer;
		transition: all 0.3s ease;
		overflow: hidden;
		text-align: left;
		width: 100%;
		min-height: 140px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.division-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, var(--division-color) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: 0;
	}

	.division-card:hover {
		transform: translateY(-4px);
		border-color: var(--division-color);
		box-shadow: 0 0 30px rgba(var(--division-color-rgb, 40, 229, 255), 0.3);
	}

	.division-card:hover::before {
		opacity: 0.1;
	}

	.division-card-content {
		position: relative;
		z-index: 1;
		width: 100%;
	}

	.division-header {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.division-name {
		font-family: var(--font-family-display);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-light);
		margin: 0;
		transition: color 0.3s ease;
	}

	.division-card:hover .division-name {
		color: var(--division-color);
	}

	.division-tagline {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-sm);
		color: var(--color-gray);
		opacity: 0;
		transform: translateY(-10px);
		transition: all 0.3s ease;
	}

	.division-card:hover .division-tagline {
		opacity: 1;
		transform: translateY(0);
	}

	.division-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(
			circle,
			rgba(var(--division-color-rgb, 40, 229, 255), 0.2) 0%,
			transparent 70%
		);
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.division-card:hover .division-glow {
		opacity: 1;
	}

	/* Focus styles for accessibility */
	.division-card:focus {
		outline: 2px solid var(--division-color);
		outline-offset: 2px;
	}

	.division-card:focus:not(:focus-visible) {
		outline: none;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.division-card {
			min-height: 120px;
			padding: var(--spacing-md);
		}

		.division-name {
			font-size: var(--font-size-lg);
		}
	}
</style>
