<script lang="ts">
	/**
	 * Technical Layout Component
	 * For technical divisions like QR.AI, QR.Data, QR.Cloud, etc.
	 *
	 * Features:
	 * - Architecture diagram section
	 * - Technical specifications
	 * - API/SDK documentation preview
	 * - System components breakdown
	 * - Modules section (Phase 10)
	 */

	import { Card, Button } from '$lib';
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

	// Example architecture components - would come from division-specific data in the future
	const architectureComponents = [
		{
			name: 'Core Engine',
			description: 'High-performance processing layer with distributed computing capabilities',
			icon: '⚙️'
		},
		{
			name: 'API Gateway',
			description: 'RESTful and GraphQL API endpoints with real-time websocket support',
			icon: '🔌'
		},
		{
			name: 'Data Layer',
			description: 'Scalable storage with caching and replication for high availability',
			icon: '💾'
		},
		{
			name: 'Security Module',
			description: 'End-to-end encryption with quantum-resistant algorithms',
			icon: '🔒'
		}
	];

	const technicalSpecs = [
		{ label: 'Performance', value: '99.99% uptime SLA' },
		{ label: 'Scalability', value: 'Auto-scaling to 10M+ requests/sec' },
		{ label: 'Security', value: 'SOC 2 Type II certified' },
		{ label: 'Deployment', value: 'Multi-cloud & on-premise' }
	];
</script>

<div class="tech-layout" style="--division-color: {division.color}">
	<!-- Architecture Diagram Section -->
	<section class="architecture-section" aria-labelledby="architecture-heading">
		<div class="qr-container">
			<h2 class="section-heading" id="architecture-heading">System Architecture</h2>
			<p class="section-description">
				Explore the core components and infrastructure that power {division.name}
			</p>

			<div
				class="architecture-diagram"
				role="img"
				aria-label="System architecture diagram showing core components and their connections"
			>
				<div class="diagram-placeholder">
					<svg viewBox="0 0 800 400" class="arch-svg" aria-hidden="true">
						<defs>
							<linearGradient id="tech-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" style="stop-color:{division.color};stop-opacity:0.3" />
								<stop offset="100%" style="stop-color:{division.color};stop-opacity:0.1" />
							</linearGradient>
						</defs>

						<!-- Central Node -->
						<circle
							cx="400"
							cy="200"
							r="60"
							fill="url(#tech-gradient)"
							stroke={division.color}
							stroke-width="2"
						/>
						<text
							x="400"
							y="205"
							text-anchor="middle"
							fill="white"
							font-size="14"
							font-weight="bold"
						>
							Core
						</text>

						<!-- Outer Nodes -->
						<circle
							cx="250"
							cy="100"
							r="40"
							fill="url(#tech-gradient)"
							stroke={division.color}
							stroke-width="2"
						/>
						<text x="250" y="105" text-anchor="middle" fill="white" font-size="12">API</text>

						<circle
							cx="550"
							cy="100"
							r="40"
							fill="url(#tech-gradient)"
							stroke={division.color}
							stroke-width="2"
						/>
						<text x="550" y="105" text-anchor="middle" fill="white" font-size="12">Data</text>

						<circle
							cx="250"
							cy="300"
							r="40"
							fill="url(#tech-gradient)"
							stroke={division.color}
							stroke-width="2"
						/>
						<text x="250" y="305" text-anchor="middle" fill="white" font-size="12">Auth</text>

						<circle
							cx="550"
							cy="300"
							r="40"
							fill="url(#tech-gradient)"
							stroke={division.color}
							stroke-width="2"
						/>
						<text x="550" y="305" text-anchor="middle" fill="white" font-size="12">Monitor</text>

						<!-- Connection Lines -->
						<line
							x1="340"
							y1="180"
							x2="280"
							y2="130"
							stroke={division.color}
							stroke-width="1.5"
							opacity="0.5"
						/>
						<line
							x1="460"
							y1="180"
							x2="520"
							y2="130"
							stroke={division.color}
							stroke-width="1.5"
							opacity="0.5"
						/>
						<line
							x1="340"
							y1="220"
							x2="280"
							y2="270"
							stroke={division.color}
							stroke-width="1.5"
							opacity="0.5"
						/>
						<line
							x1="460"
							y1="220"
							x2="520"
							y2="270"
							stroke={division.color}
							stroke-width="1.5"
							opacity="0.5"
						/>
					</svg>
				</div>
			</div>

			<!-- Architecture Components -->
			<div class="components-grid" role="list" aria-label="Architecture components">
				{#each architectureComponents as component (component.name)}
					<div role="listitem">
						<Card hover glow>
							<div class="component-icon" aria-hidden="true">{component.icon}</div>
							<h3 class="component-name">{component.name}</h3>
							<p class="component-description">{component.description}</p>
						</Card>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Technical Specifications Section -->
	<section class="specs-section" aria-labelledby="specs-heading">
		<div class="qr-container">
			<h2 class="section-heading" id="specs-heading">Technical Specifications</h2>

			<dl class="specs-grid">
				{#each technicalSpecs as spec (spec.label)}
					<div class="spec-item">
						<dt class="spec-label">{spec.label}</dt>
						<dd class="spec-value">{spec.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</section>

	<!-- Modules Section (Phase 10) -->
	{#if divisionModules.length > 0}
		<section class="modules-section" aria-labelledby="modules-heading">
			<div class="qr-container">
				<h2 class="section-heading" id="modules-heading">Available Modules</h2>
				<p class="section-description">
					Explore specialized modules and capabilities within {division.name}
				</p>

				<div class="modules-grid" role="list" aria-label="Available modules">
					{#each divisionModules as module (module.slug)}
						<div role="listitem">
							<a
								href="/divisions/{division.slug}/modules/{module.slug}"
								class="module-card"
								style="--module-color: {division.color}"
								aria-label="View {module.name} module details"
							>
								<div class="module-card-content">
									<h3 class="module-card-title">{module.name}</h3>
									<p class="module-card-description">{module.description}</p>
									<div class="module-card-features">
										{#each module.features.slice(0, 3) as feature, index (index)}
											<span class="feature-tag">{feature}</span>
										{/each}
									</div>
									<div class="module-card-arrow" aria-hidden="true">→</div>
								</div>
								<div class="module-card-glow" aria-hidden="true"></div>
							</a>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Developer Resources Section -->
	<section class="dev-resources" aria-labelledby="dev-resources-heading">
		<div class="qr-container">
			<h2 class="section-heading" id="dev-resources-heading">Developer Resources</h2>

			<div class="resources-grid">
				<Card hover glow>
					<div class="resource-icon">📖</div>
					<h3 class="resource-name">API Documentation</h3>
					<p class="resource-description">Complete API reference with examples and SDKs</p>
					<div class="resource-action">
						<Button variant="outline" size="small">View Docs</Button>
					</div>
				</Card>

				<Card hover glow>
					<div class="resource-icon">🧪</div>
					<h3 class="resource-name">Playground</h3>
					<p class="resource-description">Interactive testing environment for APIs</p>
					<div class="resource-action">
						<Button variant="outline" size="small">Try Now</Button>
					</div>
				</Card>

				<Card hover glow>
					<div class="resource-icon">💻</div>
					<h3 class="resource-name">SDK Downloads</h3>
					<p class="resource-description">Client libraries for multiple languages</p>
					<div class="resource-action">
						<Button variant="outline" size="small">Download</Button>
					</div>
				</Card>
			</div>
		</div>
	</section>
</div>

<style>
	.tech-layout {
		background: var(--color-dark);
	}

	/* Section Styles */
	section {
		padding: var(--spacing-4xl) 0;
	}

	.architecture-section {
		background: var(--color-dark-alt);
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

	/* Architecture Diagram */
	.architecture-diagram {
		margin-bottom: var(--spacing-3xl);
		display: flex;
		justify-content: center;
	}

	.diagram-placeholder {
		width: 100%;
		max-width: 800px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.arch-svg {
		width: 100%;
		height: auto;
	}

	/* Components Grid */
	.components-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	.component-icon {
		font-size: 2.5rem;
		margin-bottom: var(--spacing-md);
		text-align: center;
	}

	.component-name {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h5);
		font-weight: var(--font-weight-semibold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-sm);
		text-align: center;
	}

	.component-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-small);
		color: var(--color-gray);
		line-height: var(--line-height-relaxed);
		margin: 0;
		text-align: center;
	}

	/* Technical Specifications */
	.specs-section {
		background: var(--color-dark);
	}

	.specs-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-xl);
		max-width: 900px;
		margin: 0 auto;
	}

	.spec-item {
		text-align: center;
		padding: var(--spacing-xl);
		background: var(--color-dark-alt);
		border-radius: var(--radius-lg);
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all var(--transition-base);
	}

	.spec-item:hover {
		border-color: var(--division-color);
		box-shadow: 0 0 20px color-mix(in srgb, var(--division-color) 20%, transparent);
	}

	.spec-label {
		font-family: var(--font-family-display);
		font-size: var(--font-size-small);
		font-weight: var(--font-weight-medium);
		color: var(--division-color);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--spacing-sm);
	}

	.spec-value {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-h6);
		font-weight: var(--font-weight-semibold);
		color: var(--color-light);
	}

	/* Developer Resources */
	.dev-resources {
		background: var(--color-dark-alt);
	}

	.resources-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
	}

	.resource-icon {
		font-size: 3rem;
		text-align: center;
		margin-bottom: var(--spacing-md);
	}

	.resource-name {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h5);
		font-weight: var(--font-weight-semibold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-sm);
		text-align: center;
	}

	.resource-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-small);
		color: var(--color-gray);
		margin: 0 0 var(--spacing-lg);
		text-align: center;
	}

	.resource-action {
		text-align: center;
	}

	/* Modules Section (Phase 10) */
	.modules-section {
		background: var(--color-dark-alt);
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

	/* Responsive */
	@media (max-width: 768px) {
		section {
			padding: var(--spacing-3xl) 0;
		}

		.section-heading {
			font-size: var(--font-size-h3);
		}

		.components-grid,
		.specs-grid,
		.resources-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
