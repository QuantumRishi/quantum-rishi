<script lang="ts">
	/**
	 * Knowledge Layout Component
	 * For knowledge/education divisions like QR.Edu, QR.Learn, QR.Wiki, etc.
	 *
	 * Features:
	 * - Learning paths visualization
	 * - Course/content catalog
	 * - Knowledge base sections
	 * - Educational resources
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

	// Example learning paths
	const learningPaths = [
		{
			name: 'Beginner Path',
			level: 'Beginner',
			duration: '4 weeks',
			modules: 12,
			icon: '🌱',
			description: 'Start your journey with fundamental concepts and basics'
		},
		{
			name: 'Intermediate Path',
			level: 'Intermediate',
			duration: '8 weeks',
			modules: 24,
			icon: '🚀',
			description: 'Advance your skills with practical applications'
		},
		{
			name: 'Advanced Path',
			level: 'Advanced',
			duration: '12 weeks',
			modules: 36,
			icon: '⚡',
			description: 'Master advanced topics and expert techniques'
		},
		{
			name: 'Specialization',
			level: 'Expert',
			duration: '16 weeks',
			modules: 48,
			icon: '🎓',
			description: 'Deep dive into specialized areas and research'
		}
	];

	// Example content categories
	const contentCategories = [
		{
			name: 'Interactive Courses',
			description: 'Hands-on learning with real-world projects and exercises',
			icon: '📚',
			count: '150+'
		},
		{
			name: 'Video Tutorials',
			description: 'Step-by-step video guides from industry experts',
			icon: '🎬',
			count: '500+'
		},
		{
			name: 'Documentation',
			description: 'Comprehensive guides, references, and best practices',
			icon: '📖',
			count: '1000+'
		},
		{
			name: 'Live Workshops',
			description: 'Interactive sessions with mentors and peers',
			icon: '👥',
			count: '100+'
		},
		{
			name: 'Practice Labs',
			description: 'Safe environments to practice and experiment',
			icon: '🧪',
			count: '75+'
		},
		{
			name: 'Certifications',
			description: 'Industry-recognized certificates and credentials',
			icon: '🏆',
			count: '25+'
		}
	];

	// Example features
	const features = [
		{
			title: 'Personalized Learning',
			description: 'AI-powered recommendations based on your goals and progress',
			icon: '🎯'
		},
		{
			title: 'Community Support',
			description: 'Connect with learners and experts in our vibrant community',
			icon: '💬'
		},
		{
			title: 'Progress Tracking',
			description: 'Monitor your learning journey with detailed analytics',
			icon: '📊'
		}
	];
</script>

<div class="knowledge-layout" style="--division-color: {division.color}">
	<!-- Learning Paths Section -->
	<section class="paths-section" aria-labelledby="paths-heading">
		<div class="qr-container">
			<h2 class="section-heading" id="paths-heading">Learning Paths</h2>
			<p class="section-description">
				Choose your learning journey based on your experience level and goals
			</p>

			<div class="paths-grid" role="list" aria-label="Available learning paths">
				{#each learningPaths as path (path.name)}
					<div role="listitem">
						<Card hover glow>
							<div class="path-icon" aria-hidden="true">{path.icon}</div>
							<div class="path-level">{path.level}</div>
							<h3 class="path-name">{path.name}</h3>
							<p class="path-description">{path.description}</p>
							<div class="path-meta" aria-label="Course details">
								<span class="meta-item">
									<span class="meta-icon" aria-hidden="true">⏱️</span>
									<span class="sr-only">Duration:</span>
									{path.duration}
								</span>
								<span class="meta-item">
									<span class="meta-icon" aria-hidden="true">📦</span>
									<span class="sr-only">Modules:</span>
									{path.modules} modules
								</span>
							</div>
							<div class="path-action">
								<Button variant="outline" size="small" aria-label="Explore {path.name}"
									>Explore Path</Button
								>
							</div>
						</Card>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Content Categories Section -->
	<section class="categories-section" aria-labelledby="categories-heading">
		<div class="qr-container">
			<h2 class="section-heading" id="categories-heading">Content Library</h2>
			<p class="section-description">Access a comprehensive collection of learning resources</p>

			<div class="categories-grid" role="list" aria-label="Content categories">
				{#each contentCategories as category (category.name)}
					<div class="category-card" role="listitem">
						<div class="category-icon" aria-hidden="true">{category.icon}</div>
						<div class="category-header">
							<h3 class="category-name">{category.name}</h3>
							<span class="category-count" aria-label="{category.count} items"
								>{category.count}</span
							>
						</div>
						<p class="category-description">{category.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="features-section" aria-labelledby="features-heading">
		<div class="qr-container">
			<h2 class="section-heading" id="features-heading">Platform Features</h2>

			<div class="features-grid" role="list" aria-label="Platform features">
				{#each features as feature (feature.title)}
					<div role="listitem">
						<Card hover glow>
							<div class="feature-icon" aria-hidden="true">{feature.icon}</div>
							<h3 class="feature-title">{feature.title}</h3>
							<p class="feature-description">{feature.description}</p>
						</Card>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="stats-section" aria-label="Platform statistics">
		<div class="qr-container">
			<div class="stats-grid" role="list">
				<div class="stat-item" role="listitem">
					<div class="stat-value" aria-label="10 thousand plus">10K+</div>
					<div class="stat-label">Active Learners</div>
				</div>
				<div class="stat-item" role="listitem">
					<div class="stat-value" aria-label="1500 plus">1500+</div>
					<div class="stat-label">Hours of Content</div>
				</div>
				<div class="stat-item" role="listitem">
					<div class="stat-value" aria-label="95 percent">95%</div>
					<div class="stat-label">Completion Rate</div>
				</div>
				<div class="stat-item" role="listitem">
					<div class="stat-value" aria-label="4.8 out of 5 stars">4.8/5</div>
					<div class="stat-label">Average Rating</div>
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
				<h2 class="cta-title">Start Learning Today</h2>
				<p class="cta-description">
					Join thousands of learners and begin your journey with {division.name}
				</p>
				<div class="cta-actions">
					<Button variant="primary" size="large">Get Started Free</Button>
					<Button variant="outline" size="large">Browse Courses</Button>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.knowledge-layout {
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

	/* Learning Paths */
	.paths-section {
		background: var(--color-dark-alt);
	}

	.paths-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
	}

	.path-icon {
		font-size: 3rem;
		text-align: center;
		margin-bottom: var(--spacing-md);
	}

	.path-level {
		font-family: var(--font-family-mono);
		font-size: var(--font-size-small);
		color: var(--division-color);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-align: center;
		margin-bottom: var(--spacing-sm);
	}

	.path-name {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h5);
		font-weight: var(--font-weight-semibold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-sm);
		text-align: center;
	}

	.path-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-small);
		color: var(--color-gray);
		text-align: center;
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--spacing-md);
	}

	.path-meta {
		display: flex;
		gap: var(--spacing-md);
		justify-content: center;
		margin-bottom: var(--spacing-lg);
	}

	.meta-item {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-small);
		color: var(--color-gray);
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.meta-icon {
		font-size: 1rem;
	}

	.path-action {
		text-align: center;
	}

	/* Content Categories */
	.categories-section {
		background: var(--color-dark);
	}

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
	}

	.category-card {
		padding: var(--spacing-xl);
		background: var(--color-dark-alt);
		border-radius: var(--radius-lg);
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all var(--transition-base);
	}

	.category-card:hover {
		border-color: var(--division-color);
		transform: translateY(-4px);
	}

	.category-icon {
		font-size: 2.5rem;
		margin-bottom: var(--spacing-md);
	}

	.category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-sm);
	}

	.category-name {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h6);
		font-weight: var(--font-weight-semibold);
		color: var(--color-light);
		margin: 0;
	}

	.category-count {
		font-family: var(--font-family-mono);
		font-size: var(--font-size-small);
		color: var(--division-color);
		font-weight: var(--font-weight-semibold);
	}

	.category-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-small);
		color: var(--color-gray);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	/* Features Section */
	.features-section {
		background: var(--color-dark-alt);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
	}

	.feature-icon {
		font-size: 3rem;
		text-align: center;
		margin-bottom: var(--spacing-md);
	}

	.feature-title {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h5);
		font-weight: var(--font-weight-semibold);
		color: var(--color-light);
		margin: 0 0 var(--spacing-sm);
		text-align: center;
	}

	.feature-description {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-small);
		color: var(--color-gray);
		text-align: center;
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	/* Stats Section */
	.stats-section {
		background: var(--color-dark);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-xl);
		max-width: 1000px;
		margin: 0 auto;
	}

	.stat-item {
		text-align: center;
		padding: var(--spacing-xl);
		background: var(--color-dark-alt);
		border-radius: var(--radius-lg);
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.stat-value {
		font-family: var(--font-family-display);
		font-size: var(--font-size-h1);
		font-weight: var(--font-weight-bold);
		color: var(--division-color);
		margin-bottom: var(--spacing-sm);
	}

	.stat-label {
		font-family: var(--font-family-sans);
		font-size: var(--font-size-p);
		color: var(--color-gray);
	}

	/* CTA Section */
	.cta-section {
		background: var(--color-dark-alt);
	}

	.cta-content {
		text-align: center;
		padding: var(--spacing-3xl);
		background: var(--color-dark);
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

	/* Responsive */
	@media (max-width: 768px) {
		section {
			padding: var(--spacing-3xl) 0;
		}

		.section-heading {
			font-size: var(--font-size-h3);
		}

		.paths-grid,
		.categories-grid,
		.features-grid,
		.stats-grid {
			grid-template-columns: 1fr;
		}

		.cta-title {
			font-size: var(--font-size-h3);
		}

		.cta-actions {
			flex-direction: column;
		}

		.stat-value {
			font-size: var(--font-size-h2);
		}
	}
</style>
