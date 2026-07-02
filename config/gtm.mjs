import { IS_PRODUCTION } from './app.mjs'

// Google Tag Manager container IDs (format: "GTM-XXXXXXX").
//
// Create the container(s) at https://tagmanager.google.com (see
// docs/dev/guides/google-tag-manager-setup.md), then paste the IDs below.
// If you only have one container, use the same ID for both environments —
// the `env` value pushed to the dataLayer ("dev" | "alpha") lets you filter
// or branch inside GTM without separate containers.
//
// Leave a value empty ('') to disable GTM for that environment.
//
// Single container ("Safina" account) serves both environments — the `env`
// value ("dev" | "alpha") pushed to the dataLayer differentiates them.
const DEVELOPMENT_GTM_CONTAINER_ID = 'GTM-WGSVCNZF'
const PRODUCTION_GTM_CONTAINER_ID = 'GTM-WGSVCNZF'

export const GTM_CONTAINER_ID = IS_PRODUCTION
  ? PRODUCTION_GTM_CONTAINER_ID
  : DEVELOPMENT_GTM_CONTAINER_ID

// True only once a real container ID has been configured for this env.
export const GTM_ENABLED =
  typeof GTM_CONTAINER_ID === 'string' &&
  GTM_CONTAINER_ID.startsWith('GTM-') &&
  GTM_CONTAINER_ID !== 'GTM-XXXXXXX'
