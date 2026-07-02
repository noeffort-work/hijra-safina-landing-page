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

/**
 * Thin wrapper – single place to fan an event out to every analytics sink.
 *
 * Currently: PostHog (`capture`) + GTM (`dataLayer.push`). Both are additive
 * and independent; either can be absent without breaking the other. The GTM
 * container is loaded by side-effects/load-gtm.mjs, which also creates
 * `window.dataLayer` before this module runs.
 */
function track(eventName, properties = {}) {
  if (typeof posthog !== 'undefined' && posthog.capture) {
    posthog.capture(eventName, properties)
  }
  if (Array.isArray(window.dataLayer)) {
    // GTM convention: the trigger key is `event`; props sit alongside it and
    // are read via Data Layer Variables in the GTM UI.
    window.dataLayer.push({ event: eventName, ...properties })
  }
}

// ─── CTA Button Clicks ─────────────────────────────────────────────

function trackCTAClicks() {
  document.querySelectorAll('[data-track-cta]').forEach((el) => {
    el.addEventListener('click', () => {
      track('cta_clicked', {
        location: el.dataset.trackCta, // "hero" | "bottom"
        href: el.getAttribute('href'),
        text: el.textContent.trim(),
      })
    })
  })
}

// ─── Navigation Link Clicks ────────────────────────────────────────

function trackNavClicks() {
  // Desktop nav links
  document
    .querySelectorAll('nav .hidden.md\\:flex a[href^="#"]')
    .forEach((el) => {
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
      const isNowOpen =
        menu && menu.style.maxHeight !== '0' && menu.style.maxHeight !== '0px'
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

// ─── Scroll Depth ──────────────────────────────────────────────────

// Fires `scroll_50` / `scroll_90` once each when the user passes that
// fraction of the page — the marketing-funnel depth signals from the
// tracking plan (docs/product/requirements/setup-gtm.md).
function trackScrollDepth() {
  const thresholds = [
    { fraction: 0.5, event: 'scroll_50' },
    { fraction: 0.9, event: 'scroll_90' },
  ]
  const pending = new Set(thresholds.map((t) => t.event))

  function onScroll() {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight
    if (scrollable <= 0) return
    const ratio = window.scrollY / scrollable

    thresholds.forEach(({ fraction, event }) => {
      if (ratio >= fraction && pending.has(event)) {
        pending.delete(event)
        track(event, { depth_percent: Math.round(fraction * 100) })
      }
    })

    if (pending.size === 0) {
      window.removeEventListener('scroll', onScroll)
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // account for short pages already past a threshold on load
}

// ─── App Redirects & Outbound Clicks ───────────────────────────────

const APP_HOST_FRAGMENT = 'app.safinalab.id'
const INTERNAL_HOST_FRAGMENTS = ['safinalab.id', 'localhost', '127.0.0.1']

// Delegated click handler: a single listener classifies every anchor click as
// either an app redirect (→ app.safinalab.id, the key funnel step) or a
// generic outbound click (→ any other external host).
function trackLinkNavigation() {
  document.addEventListener(
    'click',
    (e) => {
      const link = e.target.closest('a[href]')
      if (!link) return

      const href = link.getAttribute('href')
      // Skip in-page anchors and non-navigational links.
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return
      }

      let url
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return

      if (url.hostname.includes(APP_HOST_FRAGMENT)) {
        track('app_redirect', { href: url.href, text: link.textContent.trim() })
        return
      }

      const isInternal = INTERNAL_HOST_FRAGMENTS.some((fragment) =>
        url.hostname.includes(fragment),
      )
      if (!isInternal) {
        track('outbound_click', {
          href: url.href,
          host: url.hostname,
          text: link.textContent.trim(),
        })
      }
    },
    true, // capture phase: fire before the browser navigates away
  )
}

// ─── Init ───────────────────────────────────────────────────────────

function init() {
  trackCTAClicks()
  trackNavClicks()
  trackMobileMenuToggle()
  trackFooterLinks()
  trackSectionViews()
  trackScrollDepth()
  trackLinkNavigation()
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
