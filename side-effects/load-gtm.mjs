import { IS_PRODUCTION } from '../config/app.mjs'
import { GTM_CONTAINER_ID, GTM_ENABLED } from '../config/gtm.mjs'

// Loads the Google Tag Manager container and seeds the dataLayer.
//
// Runs as early as possible (imported in <head>) so GTM can fire its own
// page_view tag on the initial gtm.js / gtm.dom / gtm.load events. PostHog
// continues to run independently — this is purely additive.

const env = IS_PRODUCTION ? 'alpha' : 'dev'

// `dataLayer` must exist before the container script runs so that any event
// pushed by analytics/tracking.mjs is buffered and replayed once GTM loads.
window.dataLayer = window.dataLayer || []

// Capture UTM / click-id params on the first page so GTM (and GA4) can attribute
// the session to its acquisition source. These sit on the dataLayer as initial
// variables — reference them via Data Layer Variables in the GTM UI.
function readUtmParams() {
  const params = new URLSearchParams(window.location.search)
  const KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'gclid',
    'fbclid',
  ]
  const captured = {}
  KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) captured[key] = value
  })
  return captured
}

window.dataLayer.push({ env, ...readUtmParams() })

if (!GTM_ENABLED) {
  console.debug(
    `GTM disabled (${env}): no container ID configured in config/gtm.mjs. ` +
      'See docs/dev/guides/google-tag-manager-setup.md.',
  )
} else {
  // Standard GTM async loader (the JS half of the snippet from the GTM UI),
  // parameterised by the env-resolved container ID instead of being hardcoded.
  ;(function (w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })
    const f = d.getElementsByTagName(s)[0]
    const j = d.createElement(s)
    const dl = l !== 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', GTM_CONTAINER_ID)

  console.debug(`GTM loaded (${env}): ${GTM_CONTAINER_ID}`)
}
