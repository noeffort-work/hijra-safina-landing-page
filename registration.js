import {
  CURRENT_FIREBASE_CONFIG,
  FIREBASE_EMULATOR_CONFIG,
  USE_FIREBASE_EMULATORS,
} from './config/firebase.mjs';

// --- LOGGER UTILITY ---
const logger = {
  info: (message, ...args) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args),
  debug: (message, ...args) => console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, ...args),
  error: (message, ...args) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args),
};

// --- TRANSLATIONS OBJECT ---
const translations = {
  nav_signin: { en: "Sign In", id: "Masuk" },
  nav_signin_footer: { en: "Sign in", id: "Masuk" },
  registration_badge: { en: "Account Registration", id: "Pendaftaran Akun" },
  registration_title: { en: "Create your Finalytics account", id: "Buat akun Finalytics Anda" },
  registration_subtitle: { en: "Join Finalytics today. Fill in your details to get started. If you have a pre-paid activation code, you can enter it now to activate your plan instantly.", id: "Bergabunglah dengan Finalytics hari ini. Isi detail Anda untuk memulai. Jika Anda memiliki kode aktivasi prabayar, Anda dapat memasukkannya sekarang untuk mengaktifkan paket Anda secara instan." },
  status_idle_title: { en: "Complete your details", id: "Lengkapi detail Anda" },
  status_idle_subtitle: { en: "All fields are required except for the activation code.", id: "Semua kolom wajib diisi kecuali kode aktivasi." },
  status_success_title: { en: "Registration successful!", id: "Pendaftaran berhasil!" },
  status_success_subtitle: { en: "Welcome to Finalytics. You can now sign in.", id: "Selamat datang di Finalytics. Anda sekarang dapat masuk." },
  status_success_with_code_subtitle: { en: "Your account is created. Now activating your plan...", id: "Akun Anda telah dibuat. Sekarang mengaktifkan paket Anda..." },
  status_success_with_code_failed_subtitle: { en: "Your account was created, but plan activation failed.", id: "Akun Anda berhasil dibuat, tetapi aktivasi paket gagal." },
  form_name_label: { en: "Full name", id: "Nama lengkap" },
  form_name_placeholder: { en: "e.g. Budi Santoso", id: "contoh: Budi Santoso" },
  form_email_label: { en: "Email address", id: "Alamat email" },
  form_email_placeholder: { en: "you@example.com", id: "anda@contoh.com" },
  form_phone_label: { en: "Phone number", id: "Nomor telepon" },
  form_phone_placeholder: { en: "e.g. 08123456789", id: "contoh: 08123456789" },
  form_password_label: { en: "Create a password", id: "Buat kata sandi" },
  form_password_placeholder: { en: "Use at least 6 characters", id: "Gunakan minimal 6 karakter" },
  form_password_hint: { en: "Minimum 6 characters.", id: "Minimal 6 karakter." },
  form_password_show: { en: "Show password", id: "Tampilkan kata sandi" },
  form_password_hide: { en: "Hide password", id: "Sembunyikan kata sandi" },
  form_password_confirm_label: { en: "Confirm password", id: "Konfirmasi kata sandi" },
  form_password_confirm_placeholder: { en: "Re-enter the password", id: "Masukkan ulang kata sandi" },
  form_password_confirm_show: { en: "Show password confirmation", id: "Tampilkan konfirmasi kata sandi" },
  form_password_confirm_hide: { en: "Hide password confirmation", id: "Sembunyikan konfirmasi kata sandi" },
  form_code_label: { en: "Activation code (Optional)", id: "Kode aktivasi (Opsional)" },
  form_code_placeholder: { en: "ABC123", id: "ABC123" },
  form_code_hint: { en: "If you have a code from Mayar, enter it here to activate your plan immediately.", id: "Jika Anda memiliki kode dari Mayar, masukkan di sini untuk mengaktifkan paket Anda segera." },
  form_submit_btn: { en: "Create account", id: "Buat akun" },
  btn_processing: { en: "Creating account…", id: "Membuat akun…" },
  error_invalid_name: { en: "Please enter your full name.", id: "Harap masukkan nama lengkap Anda." },
  error_invalid_email: { en: "Please provide a valid email address.", id: "Harap berikan alamat email yang valid." },
  error_invalid_phone: { en: "Please enter a valid phone number.", id: "Harap masukkan nomor telepon yang valid." },
  error_password_mismatch: { en: "Passwords do not match.", id: "Kata sandi tidak cocok." },
  error_password_weak: { en: "Password must be at least 6 characters.", id: "Kata sandi harus minimal 6 karakter." },
  error_registration_failed: { en: "Failed to create account. Please try again or contact support.", id: "Gagal membuat akun. Silakan coba lagi atau hubungi dukungan." },
  error_activation_failed_contact: { en: "Activation failed due to an unrecoverable error. Please contact support@finalytics.id.", id: "Aktivasi gagal karena kesalahan yang tidak dapat dipulihkan. Silakan hubungi support@finalytics.id." },
  error_email_in_use: { en: "This email address is already in use. Please try another.", id: "Alamat email ini sudah digunakan. Silakan coba yang lain." },
  error_invalid_code_message: { en: "The activation code you entered is not valid. Please check and try again.", id: "Kode aktivasi yang Anda masukkan tidak valid. Silakan periksa dan coba lagi." },
  footer_help_text: { en: "Need help? Reach us at", id: "Butuh bantuan? Hubungi kami di" },
  footer_copyright: { en: "Finalytics. All rights reserved.", id: "Finalytics. Hak Cipta Dilindungi." },
  footer_home: { en: "Home", id: "Beranda" },
  progress_label: { en: "Status", id: "Status" },
  timeline_waiting_validation_title: { en: "Waiting for validation", id: "Menunggu validasi" },
  timeline_waiting_validation_desc: { en: "Activation document queued for backend verification.", id: "Dokumen aktivasi antre untuk verifikasi backend." },
  timeline_validating_code_title: { en: "Validating code", id: "Memvalidasi kode" },
  timeline_validating_code_desc: { en: "Mayar gateway verification in progress.", id: "Verifikasi gateway Mayar sedang berlangsung." },
  timeline_assigning_plan_title: { en: "Assigning plan", id: "Menetapkan paket" },
  timeline_assigning_plan_desc: { en: "Membership data and billing metadata being attached.", id: "Data keanggotaan dan metadata penagihan sedang dilampirkan." },
  timeline_success_title: { en: "Activation complete", id: "Aktivasi selesai" },
  timeline_success_desc: { en: "Your Finalytics membership is ready to use.", id: "Keanggotaan Finalytics Anda siap digunakan." },
  activation_status_pill_waiting: { en: "Activating plan...", id: "Mengaktifkan paket..."},
  activation_status_pill_success: { en: "Plan activated", id: "Paket diaktifkan"},
  activation_status_pill_failed: { en: "Activation failed", id: "Aktivasi gagal"},
  metadata_title: { en: "Membership detail", id: "Detail keanggotaan" },
  metadata_synced: { en: "Synced", id: "Tersinkronisasi" },
  metadata_name: { en: "Name", id: "Nama" },
  metadata_email: { en: "Email", id: "Email" },
  metadata_plan: { en: "Plan", id: "Paket" },
  metadata_expires: { en: "Expires", id: "Kedaluwarsa" },
  metadata_activation_code: { en: "Activation code", id: "Kode aktivasi" },
  metadata_plan_default: { en: "Free Plan", id: "Paket Gratis" },
  metadata_expires_never: { en: "Does not expire", id: "Tidak kedaluwarsa" },
};

let currentLang = localStorage.getItem('language') || 'id';

function t(key) {
  return translations[key] && translations[key][currentLang] !== undefined
    ? translations[key][currentLang]
    : key;
}

const state = {
  ready: false,
  isSubmitting: false,
  error: null,
  registrationSuccess: false,
  activation: {
    id: null,
    code: null,
    status: 'idle', 
    error: null,
    metadata: null,
  },
};

let registrationService = null;
let activationService = null;
let unsubscribeCurrent = null;

const dom = {
  form: document.getElementById('registration-form'),
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  phoneNumber: document.getElementById('phoneNumber'),
  password: document.getElementById('password'),
  passwordConfirm: document.getElementById('passwordConfirm'),
  activationCode: document.getElementById('activationCode'),
  submitBtn: document.getElementById('submit-btn'),
  alert: document.getElementById('alert'),
  statusIcon: document.getElementById('status-icon'),
  statusTitle: document.getElementById('status-title'),
  statusSubtitle: document.getElementById('status-subtitle'),
  successContainer: document.getElementById('success-container'),
  activationStatusContainer: document.getElementById('activation-status-container'),
  activationStatusBadge: document.getElementById('activation-status-badge'),
  timeline: document.getElementById('timeline'),
  passwordToggles: Array.from(document.querySelectorAll('[data-toggle-password]')),
  membershipDetailContainer: document.getElementById('membership-detail-container'),
  membershipDetailList: document.getElementById('membership-detail-list'),
};

const toneToClasses = {
  neutral: { badge: 'inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600', icon: 'flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500' },
  progress: { badge: 'inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600', icon: 'flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-white text-indigo-500' },
  success: { badge: 'inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600', icon: 'flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-500' },
  error: { badge: 'inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600', icon: 'flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-white text-red-500' },
};

const ICONS = {
  idle: `<span class="icon-mask" style="--icon-src: url('./assets/icons/user-plus.svg');" aria-hidden="true"></span>`,
  progress: `<span class="icon-mask animate-spin" style="--icon-src: url('./assets/icons/loader-circle.svg');" aria-hidden="true"></span>`,
  success: `<span class="icon-mask" style="--icon-src: url('./assets/icons/check-badge.svg');" aria-hidden="true"></span>`,
  error: `<span class="icon-mask" style="--icon-src: url('./assets/icons/exclamation-triangle.svg');" aria-hidden="true"></span>`,
};

const terminalFailureStates = ['failed', 'invalid_code'];

// --- ADDED: Function to parse query parameters ---
function getRegistrationPrefillFromQuery() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);

  const name = params.get('name') || params.get('fullName');
  const email = params.get('email') || params.get('mail');
  const phone = params.get('phone') || params.get('phoneNumber');
  const activationCode = params.get('licenseCode') || params.get('activationCode') || params.get('code');

  const result = {};
  if (name) result.fullName = name.trim();
  if (email) result.email = email.trim().toLowerCase();
  if (phone) result.phoneNumber = phone.trim();
  if (activationCode) result.activationCode = activationCode.trim().toUpperCase();
  
  logger.info('Parsed query parameters for pre-fill.', result);
  return result;
}

// --- ADDED: Apply pre-filled values to the DOM ---
const queryPrefill = getRegistrationPrefillFromQuery();
if (queryPrefill.fullName && dom.fullName) dom.fullName.value = queryPrefill.fullName;
if (queryPrefill.email && dom.email) dom.email.value = queryPrefill.email;
if (queryPrefill.phoneNumber && dom.phoneNumber) dom.phoneNumber.value = queryPrefill.phoneNumber;
if (queryPrefill.activationCode && dom.activationCode) dom.activationCode.value = queryPrefill.activationCode;


function setState(update) {
  logger.debug('setState called with:', update);
  Object.assign(state, update);
  render();
}

function render() {
  logger.debug('Render triggered. Current state:', JSON.parse(JSON.stringify(state)));
  dom.form.classList.toggle('hidden', state.registrationSuccess);
  dom.successContainer.classList.toggle('hidden', !state.registrationSuccess);

  if (state.registrationSuccess) {
    const activationFailed = terminalFailureStates.includes(state.activation.status);
    
    dom.statusIcon.className = activationFailed ? toneToClasses.error.icon : toneToClasses.success.icon;
    dom.statusIcon.innerHTML = activationFailed ? ICONS.error : ICONS.success;
    dom.statusTitle.textContent = t('status_success_title');
    if (state.activation.id) {
        dom.statusSubtitle.textContent = activationFailed
            ? t('status_success_with_code_failed_subtitle')
            : t('status_success_with_code_subtitle');
    } else {
        dom.statusSubtitle.textContent = t('status_success_subtitle');
    }
  } else {
    dom.statusIcon.className = toneToClasses.neutral.icon;
    dom.statusIcon.innerHTML = ICONS.idle;
    dom.statusTitle.textContent = t('status_idle_title');
    dom.statusSubtitle.textContent = t('status_idle_subtitle');
  }
  
  if (state.error) {
    dom.alert.textContent = state.error;
    dom.alert.classList.remove('hidden');
  } else {
    dom.alert.classList.add('hidden');
    dom.alert.textContent = '';
  }

  const formElements = [dom.fullName, dom.email, dom.phoneNumber, dom.password, dom.passwordConfirm, dom.activationCode];
  formElements.forEach(el => el.disabled = state.isSubmitting);
  dom.submitBtn.disabled = !state.ready || state.isSubmitting;
  setButtonLoading(dom.submitBtn, state.isSubmitting, t('form_submit_btn'), t('btn_processing'));
  
  if (state.registrationSuccess) {
    dom.activationStatusContainer.classList.toggle('hidden', !state.activation.id);
    if(state.activation.id) {
        renderActivationTimeline();
    }
    if(!terminalFailureStates.includes(state.activation.status)) {
        renderMembershipDetails();
    } else {
        dom.membershipDetailContainer.classList.add('hidden');
    }
  }

  syncPasswordToggles();
}

function renderActivationTimeline() {
    const status = state.activation.status;
    const isFailed = terminalFailureStates.includes(status);
    const toneKey = status === 'success' ? 'success' : isFailed ? 'error' : 'progress';
    const pillKey = status === 'success' ? 'activation_status_pill_success' : isFailed ? 'activation_status_pill_failed' : 'activation_status_pill_waiting';

    dom.activationStatusBadge.className = toneToClasses[toneKey].badge;
    dom.activationStatusBadge.textContent = t(pillKey);
    
    if (isFailed && !state.error) {
        logger.info(`Activation status is "${status}", setting UI error message.`);
        const errorMessage = status === 'invalid_code' 
            ? t('error_invalid_code_message') 
            : t('error_activation_failed_contact');
        setState({ error: errorMessage });
    }

    const TIMELINE_ORDER = ['waiting_validation', 'validating_code', 'assigning_plan', 'success'];
    const currentIndex = TIMELINE_ORDER.indexOf(status);
    Array.from(dom.timeline.querySelectorAll('[data-status-item]')).forEach(
      (item) => {
        const itemStatus = item.getAttribute('data-status-item');
        const dot = item.querySelector('div[aria-hidden]');
        const index = TIMELINE_ORDER.indexOf(itemStatus);
        item.classList.remove('border-indigo-200', 'bg-indigo-50', 'shadow-sm', 'border-gray-200/70', 'bg-white', 'opacity-60');
        if (index < currentIndex) {
          item.classList.add('border-indigo-200', 'bg-indigo-50');
          if (dot) dot.className = 'h-2 w-2 rounded-full bg-indigo-400 mt-2';
        } else if (index === currentIndex) {
          item.classList.add('border-indigo-200', 'bg-white', 'shadow-sm');
          if (dot) dot.className = 'h-2 w-2 rounded-full bg-indigo-500 mt-2';
        } else {
          item.classList.add('border-gray-200/70', 'bg-white', 'opacity-60');
          if (dot) dot.className = 'h-2 w-2 rounded-full bg-gray-300 mt-2';
        }
      }
    );
}

function renderMembershipDetails() {
  const { status, metadata, code } = state.activation;
  const showDetails = status === 'success' && metadata;
  if (!showDetails) {
    dom.membershipDetailContainer.classList.add('hidden');
    return;
  }
  const pairs = [
    [t('metadata_name'), dom.fullName.value],
    [t('metadata_email'), dom.email.value],
    [t('metadata_plan'), metadata.membershipTierName],
    [t('metadata_expires'), formatTimestamp(metadata.membershipExpiresAt)],
    [t('metadata_activation_code'), code],
  ].filter(([, value]) => Boolean(value));
  dom.membershipDetailList.innerHTML = pairs.map(([label, value]) => `
      <div>
        <dt class="text-xs uppercase tracking-wide text-gray-500">${label}</dt>
        <dd class="text-sm font-medium text-gray-800">${value}</dd>
      </div>`).join('');
  dom.membershipDetailContainer.classList.remove('hidden');
}

function setButtonLoading(button, isLoading, idleLabel, loadingLabel) {
  if (!button) return;
  if (isLoading) {
    button.innerHTML = `<span class="flex items-center gap-2"><span class="icon-mask icon-sm animate-spin" style="--icon-src: url('./assets/icons/loader-circle.svg');" aria-hidden="true"></span>${loadingLabel}</span>`;
  } else {
    button.textContent = idleLabel;
  }
}

function setElementHidden(element, isHidden) {
  if (isHidden) element.setAttribute('hidden', 'true');
  else element.removeAttribute('hidden');
}

function formatTimestamp(value) {
  if (!value) return null;
  if (typeof value === 'string' && (value === t('metadata_expires_never'))) return null;
  if (typeof value.toDate === 'function') return formatDate(value.toDate());
  if (typeof value === 'object' && 'seconds' in value && 'nanoseconds' in value) {
    return formatDate(new Date(value.seconds * 1000 + value.nanoseconds / 1e6));
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return formatDate(date);
  }
  return value;
}

function formatDate(date) {
  try {
    return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  } catch (error) {
    return date.toISOString();
  }
}

function syncPasswordToggles() {
  dom.passwordToggles.forEach((button) => {
    const targetId = button.dataset.togglePassword;
    if (!targetId) return;
    const input = document.getElementById(targetId);
    if (!input) return;
    const showLabel = t(button.dataset.labelShowKey);
    const hideLabel = t(button.dataset.labelHideKey);
    const isPassword = input.type === 'password';
    setElementHidden(button.querySelector('[data-toggle-password-icon="show"]'), !isPassword);
    setElementHidden(button.querySelector('[data-toggle-password-icon="hide"]'), isPassword);
    button.setAttribute('aria-label', isPassword ? showLabel : hideLabel);
    button.setAttribute('aria-pressed', String(!isPassword));
    button.disabled = state.isSubmitting || input.disabled;
  });
}

function togglePasswordVisibility(button) {
  const targetId = button.dataset.togglePassword;
  if (!targetId) return;
  const input = document.getElementById(targetId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  syncPasswordToggles();
}

function validateName(value) { return value.trim().length > 2; }
function validateEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
function validatePhone(value) { return /^[0-9\s-()+]{6,}$/.test(value); }
function validatePassword(value) {
  return value.length >= 6;
}

dom.form.addEventListener('submit', async (event) => {
  event.preventDefault();
  logger.info('Registration form submitted.');
  if (!state.ready || state.isSubmitting) return;

  const fullName = dom.fullName.value.trim();
  const email = dom.email.value.trim().toLowerCase();
  const phoneNumber = dom.phoneNumber.value.trim();
  const password = dom.password.value;
  const passwordConfirm = dom.passwordConfirm.value;
  const activationCode = dom.activationCode.value.trim().toUpperCase();

  if (!validateName(fullName)) return setState({ error: t('error_invalid_name') });
  if (!validateEmail(email)) return setState({ error: t('error_invalid_email') });
  if (!validatePhone(phoneNumber)) return setState({ error: t('error_invalid_phone') });
  if (!validatePassword(password)) return setState({ error: t('error_password_weak') });
  if (password !== passwordConfirm) return setState({ error: t('error_password_mismatch') });

  setState({ isSubmitting: true, error: null });

  try {
    logger.info('Calling registration service for email:', email);
    await registrationService.register({ fullName, email, phoneNumber, password });
    logger.info('Registration service call successful.');
    
    if (activationCode) {
      logger.info('Activation code provided, calling activation service.');
      const { id } = await activationService.createActivation({ email, activationCode });
      setState({
        registrationSuccess: true,
        activation: { ...state.activation, id, code: activationCode },
      });
      subscribeToActivation(id);
    } else {
      logger.info('No activation code provided, showing default success state.');
      setState({
        registrationSuccess: true,
        activation: {
          ...state.activation,
          status: 'success',
          metadata: {
            customerName: fullName,
            customerEmail: email,
            planType: t('metadata_plan_default'),
            membershipExpiresAt: t('metadata_expires_never'),
          }
        }
      });
    }
  } catch (error) {
    logger.error('Registration failed.', error);
    let errorMessage = t('error_registration_failed');
    if (error.code === 'auth/email-already-in-use') {
        errorMessage = t('error_email_in_use');
    }
    setState({ error: errorMessage });
  } finally {
    setState({ isSubmitting: false });
  }
});

dom.passwordToggles.forEach((button) => {
  button.addEventListener('click', () => togglePasswordVisibility(button));
});

function subscribeToActivation(id) {
  logger.info(`Subscribing to real-time updates for activation ID: ${id}`);
  if (unsubscribeCurrent) unsubscribeCurrent();
  unsubscribeCurrent = activationService.onActivationChange(id, (doc) => {
    if (!doc) {
      logger.error(`Activation document ${id} not found or was deleted.`);
      state.activation.status = 'failed';
      state.activation.error = 'Activation record not found.';
      render();
      return;
    }
    logger.debug(`Received update for activation ID: ${id}. New status: ${doc.status}`);
    state.activation.status = doc.status || state.activation.status;
    state.activation.error = doc.error || null;
    state.activation.metadata = doc.metadata || null;
    render();
  });
}

const langSwitcher = document.getElementById('lang-switcher');
const langBtn = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');
const langText = document.getElementById('lang-text');

if (langBtn && langMenu) {
  langBtn.addEventListener('click', () => langMenu.classList.toggle('hidden'));
  document.addEventListener('click', (event) => {
    if (langSwitcher && !langSwitcher.contains(event.target)) {
      langMenu.classList.add('hidden');
    }
  });
  langMenu.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedLang = e.target.getAttribute('data-lang');
    if (selectedLang) setLanguage(selectedLang);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  logger.info(`Language changed to: ${lang}`);
  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    if (translations[key]?.[lang]) el.innerHTML = translations[key][lang];
  });
  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    const key = el.getAttribute('data-translate-placeholder');
    if (translations[key]?.[lang]) el.placeholder = translations[key][lang];
  });
  if (langText) langText.textContent = lang.toUpperCase();
  localStorage.setItem('language', lang);
  if (langMenu) langMenu.classList.add('hidden');
  render();
}

class FirebaseRegistrationService {
    constructor(authModule, db, firestoreModule, authInstance) {
        this.authModule = authModule;
        this.db = db;
        this.fs = firestoreModule;
        this.auth = authInstance || authModule.getAuth();
    }
    async register({ fullName, email, phoneNumber, password }) {
        const { createUserWithEmailAndPassword } = this.authModule;
        const { doc, setDoc, serverTimestamp } = this.fs;
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;
        const userDocRef = doc(this.db, 'users', user.uid);
        await setDoc(userDocRef, {
            uid: user.uid,
            fullName,
            email,
            phoneNumber,
            createdAt: serverTimestamp(),
            roles: ['user'], // Assign a default role
        });

        return { success: true, userId: user.uid };
    }
}

class FirebaseActivationService {
  constructor(app, db, firestore, config) {
    this.app = app;
    this.db = db;
    this.fs = firestore;
    this.collectionPath = config.collectionPath || 'activations';
  }
  async createActivation({ email, activationCode }) {
    const { collection, doc, setDoc, serverTimestamp, Timestamp } = this.fs;
    const colRef = collection(this.db, this.collectionPath);
    const docRef = doc(colRef);
    const expiresAt = Timestamp.fromMillis(Date.now() + 24 * 60 * 60 * 1000);

    await setDoc(docRef, {
      activationCode,
      email,
      status: 'waiting_validation',
      retryCount: 0,
      activationExpiresAt: expiresAt,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      error: null,
    });

    return { id: docRef.id };
  }
  onActivationChange(id, callback) {
    const { doc, onSnapshot } = this.fs;
    const docRef = doc(this.db, this.collectionPath, id);
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          callback(null);
          return;
        }
        callback({ id: snapshot.id, ...snapshot.data() });
      },
      (error) => {
        logger.error('Firestore listener error.', error);
        callback({ id, status: 'failed', error: 'Realtime updates failed.' });
      }
    );
  }
}

(async () => {
  logger.info('Application starting...');
  try {
    const firebaseConfig = CURRENT_FIREBASE_CONFIG;
    
    const appModule = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    const authModule = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
    const firestoreModule = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

    const { initializeApp, getApps } = appModule;
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const db = firestoreModule.getFirestore(app);
    const auth = authModule.getAuth(app);

    if (USE_FIREBASE_EMULATORS) {
      const { host, authPort, firestorePort } = FIREBASE_EMULATOR_CONFIG;
      authModule.connectAuthEmulator(auth, `http://${host}:${authPort}`, { disableWarnings: true });
      firestoreModule.connectFirestoreEmulator(db, host, firestorePort);
      logger.info(
        `Connected Firebase services to local emulators at ${host} (auth:${authPort}, firestore:${firestorePort}).`,
      );
    }

    registrationService = new FirebaseRegistrationService(authModule, db, firestoreModule, auth);
    activationService = new FirebaseActivationService(app, db, firestoreModule, {});
    
    logger.info('Firebase services initialized successfully.');
    setState({ ready: true });
  } catch (error) {
    logger.error("Firebase initialization failed:", error);
    setState({
      ready: false,
      error: 'Unable to start registration flow. Please check your connection or contact support.',
    });
  } finally {
    setLanguage(currentLang);
  }
})();
