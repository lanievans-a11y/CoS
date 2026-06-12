/* ============================================
   DIRECTOR OF PERSONAL SERVICES
   Application Logic
   ============================================ */

// ── Navigation ───────────────────────────────
function showSection(id, label, parentLabel) {
  // Hide all section pages
  document.querySelectorAll('.section-page').forEach(el => el.classList.remove('active'));
  // Show requested section
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll(`.nav-item[data-section="${id}"]`).forEach(el => el.classList.add('active'));
  // Update breadcrumb
  updateBreadcrumb(parentLabel || 'Command Center', label || id);
  // Close mobile sidebar
  closeMobileSidebar();
}

function updateBreadcrumb(parent, current) {
  const bc = document.getElementById('breadcrumb');
  if (bc) {
    bc.innerHTML = `<span>${parent}</span><span class="bc-sep">›</span><span class="bc-current">${current}</span>`;
  }
}

// ── Mobile Sidebar ────────────────────────────
function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}
function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

// ── Panel Toggle ──────────────────────────────
function togglePanel(el) {
  const panel = el.closest('.panel');
  panel.classList.toggle('open');
}

// ── Option Card Select ────────────────────────
function selectOption(card) {
  const siblings = card.closest('.option-cards').querySelectorAll('.option-card');
  siblings.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  card.querySelector('.option-check').textContent = '✓';
  siblings.forEach(c => { if (!c.classList.contains('selected')) c.querySelector('.option-check').textContent = ''; });
}

// ── Modal ─────────────────────────────────────
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
}
function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
}
// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ── Approval Actions ──────────────────────────
function approveItem(btn) {
  const card = btn.closest('.approval-card');
  card.style.opacity = '.5';
  card.style.pointerEvents = 'none';
  const title = card.querySelector('.approval-card-title')?.textContent || 'Item';
  showToast(`✓ Approved: ${title}`);
}
function declineItem(btn) {
  const card = btn.closest('.approval-card');
  card.style.opacity = '.5';
  card.style.pointerEvents = 'none';
  showToast('Declined — item archived', 'warn');
}
function delegateItem(btn) {
  const card = btn.closest('.approval-card');
  showToast('Item flagged for delegation', 'info');
}

// ── Toast Notification ────────────────────────
function showToast(message, type = 'ok') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:2rem; right:2rem; z-index:300;
      padding:.875rem 1.375rem; border-radius:8px; font-size:.8125rem;
      font-family:'Inter',sans-serif; font-weight:500; box-shadow:0 8px 24px rgba(0,0,0,.15);
      transform:translateY(10px); opacity:0; transition:all .2s ease;
      pointer-events:none; max-width:340px;
    `;
    document.body.appendChild(toast);
  }
  const colors = {
    ok:   { bg:'#2E2C28', color:'#F7F4EF' },
    warn: { bg:'#9A7040', color:'#fff' },
    info: { bg:'#6B5E4C', color:'#F7F4EF' },
  };
  const c = colors[type] || colors.ok;
  toast.style.background = c.bg;
  toast.style.color = c.color;
  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3000);
}

// ── Search ─────────────────────────────────────
function handleSearch(e) {
  const q = e.target.value.toLowerCase().trim();
  if (!q) return;
  const searchMap = {
    'schedule': 'section-dashboard', 'today': 'section-dashboard', 'brief': 'section-dashboard',
    'profile': 'section-profiles', 'principal': 'section-profiles', 'preferences': 'section-profiles',
    'planning': 'section-planning', 'calendar': 'section-planning', 'itinerary': 'section-planning',
    'estate': 'section-estate', 'property': 'section-estate', 'maintenance': 'section-estate',
    'staff': 'section-staffing', 'staffing': 'section-staffing', 'hiring': 'section-staffing', 'org': 'section-staffing',
    'sop': 'section-sop', 'manual': 'section-sop', 'protocol': 'section-sop',
    'project': 'section-projects', 'renovation': 'section-projects', 'construction': 'section-projects',
    'travel': 'section-travel', 'flight': 'section-travel', 'hotel': 'section-travel',
    'event': 'section-events', 'entertaining': 'section-events', 'guest': 'section-events',
    'office': 'section-family-office', 'legal': 'section-family-office', 'advisor': 'section-family-office',
    'document': 'section-documents', 'vault': 'section-documents', 'contract': 'section-documents',
    'report': 'section-reports', 'scorecard': 'section-reports', 'budget': 'section-reports',
  };
  for (const [keyword, section] of Object.entries(searchMap)) {
    if (q.includes(keyword)) {
      const label = section.replace('section-','').replace('-',' ');
      showSection(section, label.charAt(0).toUpperCase() + label.slice(1));
      e.target.value = '';
      return;
    }
  }
  showToast(`No section found for "${q}"`, 'warn');
  e.target.value = '';
}

// ── Inline Editable – double-click to edit ────
document.addEventListener('dblclick', function(e) {
  const editable = e.target.closest('[data-editable]');
  if (editable) {
    editable.contentEditable = 'true';
    editable.focus();
    showToast('Editing — click away to save', 'info');
  }
});
document.addEventListener('blur', function(e) {
  if (e.target.contentEditable === 'true') {
    e.target.contentEditable = 'false';
    showToast('Changes saved', 'ok');
  }
}, true);

// ── Status tag toggle ─────────────────────────
function cycleStatus(tag) {
  const statuses = ['tag-pending','tag-active','tag-complete','tag-urgent'];
  const labels   = ['Pending','Active','Complete','Urgent'];
  let cur = statuses.findIndex(s => tag.classList.contains(s));
  tag.classList.remove(statuses[cur]);
  cur = (cur + 1) % statuses.length;
  tag.classList.add(statuses[cur]);
  tag.textContent = labels[cur];
}

// ── Date / Time in topbar ─────────────────────
function updateClock() {
  const el = document.getElementById('topbarDate');
  const dayEl = document.getElementById('dash-day-display');
  const now = new Date();
  const formatted = now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
  if (el) el.textContent = formatted;
  if (dayEl) dayEl.textContent = now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' }).toUpperCase();
}
setInterval(updateClock, 60000);
updateClock();

// ── Init: show dashboard on load ──────────────
document.addEventListener('DOMContentLoaded', function () {
  showSection('section-dashboard', 'Command Center');
  // Search on Enter
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleSearch(e);
    });
  });
});
