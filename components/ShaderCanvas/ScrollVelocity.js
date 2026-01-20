/**
 * Lightweight scroll velocity tracker
 * Tracks scroll delta between frames with smoothed damping
 */
export class ScrollVelocity {
  constructor(options = {}) {
    this.damping = options.damping || 0.95;

    this.scrollY = 0;
    this.lastScrollY = 0;
    this.velocity = 0;

    this.onScroll = this.onScroll.bind(this);

    if (typeof window !== 'undefined') {
      this.scrollY = window.scrollY;
      this.lastScrollY = window.scrollY;
      window.addEventListener('scroll', this.onScroll, { passive: true });
    }
  }

  onScroll() {
    this.scrollY = window.scrollY;
  }

  update() {
    // Calculate raw velocity (pixels per frame)
    const delta = this.scrollY - this.lastScrollY;
    this.lastScrollY = this.scrollY;

    // Smoothly interpolate velocity with damping
    this.velocity += (delta - this.velocity) * 0.3;

    // Apply damping when not actively scrolling
    this.velocity *= this.damping;

    // Return velocity (will be in range roughly -50 to 50 for fast scrolling)
    // The shader clamps this to -5 to 5
    return this.velocity;
  }

  destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
}
