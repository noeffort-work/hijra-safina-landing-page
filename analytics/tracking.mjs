/**
 * Custom analytics event tracking for the Safina landing page.
 *
 * Relies on the global `posthog` object being initialised before this
 * module is loaded (the PostHog snippet in <head> takes care of that).
 *
 * Every interactive element that should be tracked is selected via
 * `data-track-*` attributes so that tracking is decoupled from styling
 * and resilient to markup changes.
 */

// ─── Helpers ────────────────────────────────────────────────────────

/** Thin wrapper – single place to swap providers if ever needed. */
function track(eventName, properties = {}) {
  if (typeof posthog !== 'undefined' && posthog.capture) {
    posthog.capture(eventName, properties)
  }
}

// ─── CTA Button Clicks ─────────────────────────────────────────────

function trackCTAClicks() {
  document.querySelectorAll('[data-track-cta]').forEach((el) => {
    el.addEventListener('click', () => {
      track('cta_clicked', {
        location: el.dataset.trackCta,          // "hero" | "bottom"
        href: el.getAttribute('href'),
        text: el.textContent.trim(),
      })
    })
  })
}

// ─── Navigation Link Clicks ────────────────────────────────────────

function trackNavClicks() {
  // Desktop nav links
  document.querySelectorAll('nav .hidden.md\\:flex a[href^="#"]').forEach((el) => {
    el.addEventListener('click', () => {
      track('nav_clicked', {
        section: el.getAttribute('href'),
        text: el.textContent.trim(),
        device: 'desktop',
      })
    })
  })

  // Mobile nav links
  document.querySelectorAll('#mobile-menu a[href^="#"]').forEach((el) => {
    el.addEventListener('click', () => {
      track('nav_clicked', {
        section: el.getAttribute('href'),
        text: el.textContent.trim(),
        device: 'mobile',
      })
    })
  })
}

// ─── Mobile Menu Toggle ────────────────────────────────────────────

function trackMobileMenuToggle() {
  const toggle = document.getElementById('menu-toggle')
  if (!toggle) return

  // Track the state *after* the click (the existing handler flips
  // `menuOpen` synchronously, so we read the DOM result on next tick).
  toggle.addEventListener('click', () => {
    // The menu's max-height is set to '0' when closed and '400px' when
    // open.  Reading after a microtask lets the existing handler run first.
    requestAnimationFrame(() => {
      const menu = document.getElementById('mobile-menu')
      const isNowOpen = menu && menu.style.maxHeight !== '0' && menu.style.maxHeight !== '0px'
      track('mobile_menu_toggled', {
        action: isNowOpen ? 'open' : 'close',
      })
    })
  })
}

// ─── Footer Link Clicks ────────────────────────────────────────────

function trackFooterLinks() {
  document.querySelectorAll('[data-track-footer]').forEach((el) => {
    el.addEventListener('click', () => {
      track('footer_link_clicked', {
        text: el.textContent.trim(),
        href: el.getAttribute('href'),
      })
    })
  })
}

// ─── Section Visibility (scroll depth) ─────────────────────────────

function trackSectionViews() {
  const sections = document.querySelectorAll('[data-track-section]')
  if (!sections.length) return

  const seen = new Set()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const el = entry.target
        const sectionId = el.id || el.dataset.trackSection
        if (seen.has(sectionId)) return

        seen.add(sectionId)
        track('section_viewed', {
          section_id: sectionId,
          section_name: el.dataset.trackSection,
        })

        // Stop observing once tracked
        observer.unobserve(el)
      })
    },
    { threshold: 0.3 },
  )

  sections.forEach((section) => observer.observe(section))
}

// ─── Init ───────────────────────────────────────────────────────────

function init() {
  trackCTAClicks()
  trackNavClicks()
  trackMobileMenuToggle()
  trackFooterLinks()
  trackSectionViews()
}

// The module is loaded with `defer` semantics (type="module"), so the
// DOM is already parsed. But we guard with DOMContentLoaded just in case.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

// Export `track` so the inline email-form script can import it.
export { track }
