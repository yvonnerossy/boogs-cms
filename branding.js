window.BRAND_DEFAULTS = {
  pageTitle: 'Boogs Community Management System — Brgy. Kapatungan',
  name: 'Boogs Community Management System',
  emoji: '🏘️',
  logoUrl: '',
  logoDataUrl: '',
  tagline: 'BOOGS',
  navSub: 'Brgy. Kapatungan · Trento, Agusan del Sur',
  adminLink: 'Admin',
  heroSub: 'Community Management System',
  heroLoc: 'Brgy. Kapatungan · Trento, Agusan del Sur',
  purposeIcon: '📋',
  purpose: 'This system helps us organize household information to better coordinate community programs for Brgy. Kapatungan residents.',
  heroBody: 'Register your household and help us map out our community — emergency response, health programs, relief coordination, and more.',
  cta: 'Register Your Household',
  ctaNote: 'Free · Takes under a minute · No account needed',
  navScroll: 'Our Purpose ↓',
  statHouseholds: 'Households',
  statIndividuals: 'Individuals',
  statPuroks: 'Puroks',
  statPurokNum: '22',
  featTitle: 'WHY WE COLLECT THIS DATA',
  featDesc: "We put this together so no one in the community gets left out — whether it's relief goods, health programs, or just knowing who to call in an emergency.",
  disclaimer: 'This is NOT a campaign activity.',
  ctaBottom: 'Register Your Household Now',
  modalSub: 'Brgy. Kapatungan · Trento, Agusan del Sur',
  modalTitle: 'REGISTRATION',
  regHof: '🏠 Head of Household',
  regMembers: '👨‍👩‍👧 Household Members',
  regMembersOpt: '(optional)',
  regAdd: '+ Add Household Member',
  regSubmit: 'Submit Registration',
  regErr: 'Please fill in all required fields.',
  regLabelName: 'Full Name',
  regLabelPhone: 'Phone Number',
  regLabelAge: 'Age',
  regLabelPurok: 'Sitio / Purok — type to search',
  tyTitle: 'DAGHANG SALAMAT!',
  tyBody: 'Malampuson nga narehistro na ang imong pamilya sa<br><strong style="color:#7dd3fc;">Barangay Kapatungan, Trento, Agusan del Sur.</strong><br><br>Ang imong pakigbahin nakatulong sa pag-rehistro ug mapausbaw ang serbisyo sa atong komunidad.',
  tyAgain: 'Register Another Household',
  features: [
    { icon: '🏠', title: 'Household Record System', desc: 'Maintain an organized database of every household for efficient resource planning and community coordination.' },
    { icon: '👴', title: 'Senior Citizen Registry', desc: 'Identify and track senior citizens for targeted benefits, health monitoring, and priority services.' },
    { icon: '🚨', title: 'Emergency Contact Database', desc: 'Build a reliable directory of contacts for rapid response during calamities, accidents, or health emergencies.' },
    { icon: '🥗', title: 'Health & Feeding Program', desc: 'Support nutrition programs and feeding initiatives by knowing who qualifies for assistance.' },
    { icon: '📍', title: 'Purok Coordination System', desc: 'Organize residents by purok for local coordination, community meetings, and targeted announcements.' },
    { icon: '👥', title: 'Purok-Based Population Monitoring', desc: 'Track population per purok and sitio to allocate resources fairly and plan effectively.' },
    { icon: '🌊', title: 'Disaster & Relief Coordination', desc: 'During typhoons or flooding, quickly identify affected families and coordinate relief distribution efficiently.' }
  ]
};

window.mergeBrand = function(overrides) {
  const b = { ...window.BRAND_DEFAULTS, ...(overrides || {}) };
  if (overrides && overrides.features) b.features = overrides.features;
  return b;
};

window.getLocalBrand = function() {
  try {
    return JSON.parse(localStorage.getItem('site_branding') || '{}');
  } catch (e) {
    return {};
  }
};

window.getBrand = function(overrides) {
  return window.mergeBrand({ ...window.getLocalBrand(), ...(overrides || {}) });
};

window.escBrandHtml = function(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

window.applyLogoToEl = function(el, b) {
  if (!el) return;
  const src = b.logoDataUrl || b.logoUrl;
  el.innerHTML = '';
  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    el.style.background = 'transparent';
    el.style.overflow = 'hidden';
    el.appendChild(img);
  } else {
    el.textContent = b.emoji || '🏘️';
    el.style.background = '';
  }
};

window.applyBrandToPage = function(b) {
  b = window.mergeBrand(b);
  localStorage.setItem('site_branding', JSON.stringify(b));
  document.title = b.pageTitle || b.name;

  const t = (id, v) => {
    const el = document.getElementById(id);
    if (el && v != null) el.textContent = v;
  };

  window.applyLogoToEl(document.getElementById('nav-logo'), b);
  t('nav-title', b.name);
  t('nav-subtitle', b.navSub);
  t('nav-scroll-btn', b.navScroll);
  t('hero-main-title', b.tagline);
  t('hero-subtitle', b.heroSub);
  t('hero-location', b.heroLoc);
  t('hero-purpose', b.purpose);
  t('hero-body', b.heroBody);
  t('cta-label', b.cta);
  t('cta-note', b.ctaNote);
  t('features-title', b.featTitle);
  t('features-desc', b.featDesc);
  t('disclaimer-text', b.disclaimer);
  t('cta-bottom-label', b.ctaBottom);
  t('modal-sub', b.modalSub);
  t('modal-title', b.modalTitle);
  t('reg-hof-title', b.regHof);
  t('reg-label-name', b.regLabelName);
  t('reg-label-phone', b.regLabelPhone);
  t('reg-label-age', b.regLabelAge);
  t('reg-label-purok', b.regLabelPurok);
  t('reg-add-btn', b.regAdd);
  t('ty-title', b.tyTitle);
  t('reg-members-opt', b.regMembersOpt);
  t('s-households-label', b.statHouseholds);
  t('s-individuals-label', b.statIndividuals);
  t('s-puroks-label', b.statPuroks);
  t('s-purok-num', b.statPurokNum);

  const pi = document.getElementById('purpose-icon');
  if (pi) pi.textContent = b.purposeIcon || '📋';

  const al = document.getElementById('admin-link');
  if (al) al.innerHTML = '&#9679; ' + window.escBrandHtml(b.adminLink);

  const mt = document.getElementById('reg-members-title');
  if (mt) {
    mt.innerHTML = window.escBrandHtml(b.regMembers) + ' <span id="reg-members-opt" style="font-size:0.7rem;font-weight:400;color:rgba(255,255,255,0.28);margin-left:4px;">' + window.escBrandHtml(b.regMembersOpt) + '</span>';
  }

  const sb = document.getElementById('submit-btn');
  if (sb) sb.innerHTML = '✓ &nbsp;' + window.escBrandHtml(b.regSubmit);

  const fe = document.getElementById('form-err');
  if (fe) fe.innerHTML = '⚠ ' + window.escBrandHtml(b.regErr);

  const ty = document.getElementById('ty-body');
  if (ty) ty.innerHTML = b.tyBody;

  const ta = document.getElementById('ty-again-btn');
  if (ta) ta.textContent = '↺ ' + b.tyAgain;

  (b.features || []).forEach((f, i) => {
    const card = document.querySelector('[data-feat="' + i + '"]');
    if (!card) return;
    const ic = card.querySelector('.feat-icon');
    const ti = card.querySelector('.feat-title');
    const de = card.querySelector('.feat-desc');
    if (ic && f.icon) ic.textContent = f.icon;
    if (ti && f.title) ti.textContent = f.title;
    if (de && f.desc) de.textContent = f.desc;
  });
};

window.fetchBrandFromSupabase = async function(sb) {
  if (!sb) return window.getBrand();
  const { data, error } = await sb.from('site_branding').select('settings').eq('id', 1).maybeSingle();
  if (error || !data || !data.settings) return window.getBrand();
  return window.mergeBrand(data.settings);
};

window.saveBrandToSupabase = async function(sb, brand) {
  localStorage.setItem('site_branding', JSON.stringify(brand));
  if (!sb) return { ok: true, local: true };
  const { error } = await sb.from('site_branding').upsert({ id: 1, settings: brand, updated_at: new Date().toISOString() });
  if (error) return { ok: false, error, local: true };
  return { ok: true };
};

window.initPublicBranding = async function(sb) {
  const b = await window.fetchBrandFromSupabase(sb);
  window.applyBrandToPage(b);
  return b;
};
