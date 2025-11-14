/**
 * Smooth Scroll Utility
 * Phase 11: Motion & Interaction Enhancements
 *
 * Provides smooth scrolling functionality with easing and offset support
 */

/**
 * Smooth scroll to an element by ID
 * @param elementId - The ID of the target element
 * @param offset - Optional offset from the top (default: 0)
 * @param behavior - Scroll behavior ('smooth' or 'auto', default: 'smooth')
 */
export function smoothScrollTo(
	elementId: string,
	offset: number = 0,
	behavior: ScrollBehavior = 'smooth'
): void {
	const element = document.getElementById(elementId);
	if (!element) {
		console.warn(`Element with ID "${elementId}" not found`);
		return;
	}

	const elementPosition = element.getBoundingClientRect().top + window.scrollY;
	const offsetPosition = elementPosition - offset;

	window.scrollTo({
		top: offsetPosition,
		behavior
	});
}

/**
 * Smooth scroll to a specific Y position
 * @param position - The Y position to scroll to
 * @param behavior - Scroll behavior ('smooth' or 'auto', default: 'smooth')
 */
export function smoothScrollToPosition(
	position: number,
	behavior: ScrollBehavior = 'smooth'
): void {
	window.scrollTo({
		top: position,
		behavior
	});
}

/**
 * Smooth scroll to the top of the page
 * @param behavior - Scroll behavior ('smooth' or 'auto', default: 'smooth')
 */
export function smoothScrollToTop(behavior: ScrollBehavior = 'smooth'): void {
	window.scrollTo({
		top: 0,
		behavior
	});
}

/**
 * Check if user prefers reduced motion
 * @returns true if user prefers reduced motion, false otherwise
 */
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get smooth scroll behavior based on user preference
 * @returns 'auto' if user prefers reduced motion, 'smooth' otherwise
 */
export function getScrollBehavior(): ScrollBehavior {
	return prefersReducedMotion() ? 'auto' : 'smooth';
}
