import { IS_PRODUCTION } from './app.mjs'

const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
const searchParams = typeof window !== 'undefined'
  ? new URLSearchParams(window.location.search)
  : new URLSearchParams()

const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1', '::1']
const LOCAL_HOST_SUFFIXES = ['.localhost', '.local', '.test']
const matchesLocalHostname = LOCAL_HOSTNAMES.includes(hostname)
  || LOCAL_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix))

const toBoolean = (value) => {
  if (!value) return undefined
  const normalized = value.toLowerCase()
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false
  return undefined
}

const toPort = (value, fallback) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const emulatorToggle = toBoolean(searchParams.get('useFirebaseEmulators'))
const emulatorHostOverride = searchParams.get('firebaseEmulatorHost')
const authPortOverride = toPort(searchParams.get('firebaseAuthPort'), 9099)
const firestorePortOverride = toPort(searchParams.get('firebaseFirestorePort'), 8080)

const NORMALIZED_LOCALHOST = '127.0.0.1'
const defaultEmulatorHost = matchesLocalHostname ? hostname : NORMALIZED_LOCALHOST
const computedEmulatorHost = emulatorHostOverride || defaultEmulatorHost || NORMALIZED_LOCALHOST

const DEVELOPMENT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAT81L_gsi3PWwxiz1FpoiUD54aYYhrkj8",
  authDomain: "finalytics-development.firebaseapp.com",
  projectId: "finalytics-development",
  storageBucket: "finalytics-development.firebasestorage.app",
  messagingSenderId: "334725384863",
  appId: "1:334725384863:web:69d07127690da125c630aa"
}
const PRODUCTION_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyB9_J1AZkSbCM9v3PeV4m33qojHX51bLwg',
  authDomain: 'finalytics-62350.firebaseapp.com',
  projectId: 'finalytics-62350',
  storageBucket: 'finalytics-62350.firebasestorage.app',
  messagingSenderId: '586305419053',
  appId: '1:586305419053:web:b94a325fd5b649340305a4',
}

export const CURRENT_FIREBASE_CONFIG = IS_PRODUCTION
  ? PRODUCTION_FIREBASE_CONFIG
  : DEVELOPMENT_FIREBASE_CONFIG

export const USE_FIREBASE_EMULATORS = emulatorToggle === undefined
  ? (!IS_PRODUCTION && matchesLocalHostname)
  : emulatorToggle

export const FIREBASE_EMULATOR_CONFIG = {
  host: computedEmulatorHost,
  authPort: authPortOverride,
  firestorePort: firestorePortOverride,
}

console.debug(
  'Firebase is running in ' +
  (IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT') +
  ' environment' +
  (USE_FIREBASE_EMULATORS ? ' with local emulators.' : '.'),
);

if (USE_FIREBASE_EMULATORS) {
  console.debug(
    `Firebase emulator config -> host: ${FIREBASE_EMULATOR_CONFIG.host}, auth: ${FIREBASE_EMULATOR_CONFIG.authPort}, firestore: ${FIREBASE_EMULATOR_CONFIG.firestorePort}`,
  )
}
