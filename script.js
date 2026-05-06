/* ═══════════════════════════════════════════════════
   SIGNATURE FINE WINE, SPIRITS & CRAFT BEER
   script.js — All interactivity, forms & portal
   ═══════════════════════════════════════════════════ */

// ══════════════════════════════════════════════
// CONFIGURATION — Easy to change
// ══════════════════════════════════════════════
const CONFIG = {
  // ⬇ Replace with your Google Apps Script Web App URL after deploying Code.gs
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzboutGuox_kqVDKXTQ3lqbIAAV8KiZY5ZIGV6OtmMvy4RrKhJtuMX-fNcCBVJhWRd_/exec',

  // ⬇ Change this PIN to your store's 6-digit PIN
  STORE_PIN: '934567',

  STORE_NAME: 'Signature Fine Wine Beaumont',
  STORE_CODE: 'BEAU',
};

// ══════════════════════════════════════════════
// DOM READY
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  initHeader();
  initNav();
  initParticles();
  initEventForm();
  initPortal();
  setFooterYear();
  initScrollAnimations();
});

// ══════════════════════════════════════════════
// AGE GATE
// ══════════════════════════════════════════════
function initAgeGate() {
  const gate = document.getElementById('age-gate');
  const enterBtn = document.getElementById('age-enter');
  const exitBtn = document.getElementById('age-exit');

  if (!gate) return;

  // Check localStorage
  if (localStorage.getItem('sig_age_verified') === '1') {
    gate.classList.add('hidden');
    return;
  }

  document.body.classList.add('no-scroll');

  enterBtn.addEventListener('click', () => {
    localStorage.setItem('sig_age_verified', '1');
    gate.style.opacity = '0';
    gate.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      gate.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    }, 400);
  });

  exitBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
}

// ══════════════════════════════════════════════
// STICKY HEADER
// ══════════════════════════════════════════════
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Active nav highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  const observerOptions = {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(s => sectionObserver.observe(s));
}

// ══════════════════════════════════════════════
// MOBILE NAV
// ══════════════════════════════════════════════
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  });

  // Close nav on link click
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
  });
}

// ══════════════════════════════════════════════
// HERO PARTICLES
// ══════════════════════════════════════════════
function initParticles() {
  const container = document.querySelector('.hero__particles');
  if (!container) return;

  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDuration = `${6 + Math.random() * 14}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    p.style.width = `${1 + Math.random() * 2}px`;
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}

// ══════════════════════════════════════════════
// FOOTER YEAR
// ══════════════════════════════════════════════
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ══════════════════════════════════════════════
// SCROLL ANIMATIONS
// ══════════════════════════════════════════════
function initScrollAnimations() {
  const targets = document.querySelectorAll('.product-card, .stat-card, .faq__item, .wine-room__list li, .events-feature');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeInUp 0.5s ease ${i * 0.05}s both`;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(t => {
    t.style.opacity = '0';
    obs.observe(t);
  });
}

// ══════════════════════════════════════════════
// SUBMIT TO APPS SCRIPT
// ══════════════════════════════════════════════
async function submitToSheet(data) {
  const url = CONFIG.APPS_SCRIPT_URL;

  if (url === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
    console.warn('⚠ Apps Script URL not configured. Set CONFIG.APPS_SCRIPT_URL in script.js');
    // Simulate success for testing
    return { result: 'success' };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.json();
}

// ══════════════════════════════════════════════
// EVENT / WEDDING QUOTE FORM
// ══════════════════════════════════════════════
function initEventForm() {
  const form = document.getElementById('event-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('event-submit');
    const msgEl = document.getElementById('event-message');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Gather checkbox values
    const products = [...form.querySelectorAll('input[name="products"]:checked')]
      .map(cb => cb.value).join(', ');

    const payload = {
      formType: 'Event Quote',
      storeName: CONFIG.STORE_NAME,
      storeCode: CONFIG.STORE_CODE,
      timestamp: new Date().toISOString(),
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      eventType: form.eventType.value,
      eventDate: form.eventDate.value,
      guestCount: form.guestCount.value,
      pickupDelivery: form.pickupDelivery.value,
      productsNeeded: products,
      budgetRange: form.budgetRange.value,
      specialRequests: form.specialRequests.value.trim(),
      preferredContact: form.preferredContact.value,
      consent: form.consent.checked ? 'Yes — confirmed legal drinking age' : 'No',
    };

    setButtonLoading(btn, true);
    showMessage(msgEl, '', '');

    try {
      const result = await submitToSheet(payload);
      if (result.result === 'success' || result.success) {
        form.reset();
        showMessage(msgEl, 'success', 'Thank you. Your request has been sent to Signature Fine Wine Beaumont. Our team will contact you soon.');
        msgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      showMessage(msgEl, 'error', 'Something went wrong. Please call us directly at (780) 737-1227 or try again.');
    } finally {
      setButtonLoading(btn, false);
    }
  });
}

// ══════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════
function setButtonLoading(btn, loading) {
  if (!btn) return;
  btn.disabled = loading;
  if (loading) {
    btn.classList.add('loading');
  } else {
    btn.classList.remove('loading');
  }
}

function showMessage(el, type, text) {
  if (!el) return;
  el.className = `form-message ${type}`;
  el.textContent = text;
  el.hidden = !text;
}

function getTimestamp() {
  return new Date().toLocaleString('en-CA', {
    timeZone: 'America/Edmonton',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
}

// ══════════════════════════════════════════════
// STORE PORTAL
// ══════════════════════════════════════════════
function initPortal() {
  const fab = document.getElementById('portal-fab-btn');
  const overlay = document.getElementById('portal-overlay');
  const closeBtn = document.getElementById('portal-close');
  const pinScreen = document.getElementById('portal-pin-screen');
  const dashboard = document.getElementById('portal-dashboard');
  const pinError = document.getElementById('pin-error');
  const empSelect = document.getElementById('portal-emp-select');
  const empOtherWrap = document.getElementById('emp-other-wrap');
  const empOtherInput = document.getElementById('portal-emp-other');
  const backBtn = document.getElementById('portal-back');
  const formArea = document.getElementById('portal-form-area');
  const dashGrid = document.getElementById('dashboard-grid');
  const formContent = document.getElementById('portal-form-content');
  const formMsg = document.getElementById('portal-form-message');

  if (!fab || !overlay) return;

  let pinValue = '';

  // ── Open / Close ──
  fab.addEventListener('click', () => {
    overlay.hidden = false;
    document.body.classList.add('no-scroll');
    pinScreen.hidden = false;
    dashboard.hidden = true;
    resetPin();
  });

  closeBtn.addEventListener('click', closePortal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePortal();
  });

  function closePortal() {
    overlay.hidden = true;
    document.body.classList.remove('no-scroll');
    resetPin();
    showDashboard();
    if (formArea) formArea.hidden = true;
    if (dashGrid) dashGrid.style.display = '';
  }

  // ── PIN PAD ──
  document.querySelectorAll('.pin-btn[data-digit]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (pinValue.length < 6) {
        pinValue += btn.dataset.digit;
        updatePinDots();
      }
    });
  });

  document.getElementById('pin-clear')?.addEventListener('click', resetPin);

  document.getElementById('pin-enter')?.addEventListener('click', checkPin);

  function resetPin() {
    pinValue = '';
    updatePinDots();
    if (pinError) pinError.hidden = true;
  }

  function updatePinDots() {
    for (let i = 1; i <= 6; i++) {
      const dot = document.getElementById(`pd${i}`);
      if (dot) dot.classList.toggle('filled', i <= pinValue.length);
    }
  }

  function checkPin() {
    if (pinValue === CONFIG.STORE_PIN) {
      pinScreen.hidden = true;
      dashboard.hidden = false;
      if (pinError) pinError.hidden = true;
      resetPin();
    } else {
      if (pinError) pinError.hidden = false;
      resetPin();
      // Shake effect
      const display = document.getElementById('pin-display');
      if (display) {
        display.style.animation = 'shake 0.3s ease';
        setTimeout(() => display.style.animation = '', 300);
      }
    }
  }

  // Keyboard PIN entry
  document.addEventListener('keydown', (e) => {
    if (overlay.hidden) return;
    if (!pinScreen.hidden) {
      if (/^\d$/.test(e.key) && pinValue.length < 6) {
        pinValue += e.key;
        updatePinDots();
      } else if (e.key === 'Backspace') {
        pinValue = pinValue.slice(0, -1);
        updatePinDots();
      } else if (e.key === 'Enter') {
        checkPin();
      }
    }
  });

  // ── Employee Select ──
  if (empSelect) {
    empSelect.addEventListener('change', () => {
      if (empOtherWrap) empOtherWrap.hidden = empSelect.value !== 'OTHER';
    });
  }

  function getEmployeeInfo() {
    if (!empSelect) return { empNumber: '', empName: '' };
    const val = empSelect.value;
    if (val === 'OTHER') {
      const other = empOtherInput?.value.trim() || 'Other';
      return { empNumber: other, empName: other };
    }
    return { empNumber: val, empName: val };
  }

  // ── Dashboard Buttons ──
  document.querySelectorAll('.dash-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const formType = btn.dataset.form;
      showPortalForm(formType, formContent, formMsg);
      dashGrid.style.display = 'none';
      formArea.hidden = false;
    });
  });

  backBtn?.addEventListener('click', () => {
    formArea.hidden = true;
    dashGrid.style.display = '';
    formContent.innerHTML = '';
    if (formMsg) { formMsg.hidden = true; formMsg.textContent = ''; }
  });

  function showDashboard() {
    if (dashboard) dashboard.hidden = true;
    if (pinScreen) pinScreen.hidden = false;
  }

  // ── Portal Form Builder & Submitter ──
  function showPortalForm(type, container, msgEl) {
    const { empNumber, empName } = getEmployeeInfo();
    container.innerHTML = '';
    if (msgEl) { msgEl.hidden = true; msgEl.textContent = ''; }

    const forms = {
      clock: buildClockForm,
      opening: buildOpeningForm,
      closing: buildClosingForm,
      theft: buildTheftForm,
      customer: buildCustomerRequestForm,
      outofstock: buildOutOfStockForm,
      maintenance: buildMaintenanceForm,
      staffnote: buildStaffNoteForm,
      shiftreport: buildShiftReportForm,
    };

    if (forms[type]) {
      const wrapper = document.createElement('div');
      wrapper.className = 'portal-form-content-inner';
      forms[type](wrapper, empNumber, empName);
      container.appendChild(wrapper);

      // Submit handler
      const form = wrapper.querySelector('form');
      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const submitBtn = form.querySelector('[type="submit"]');
          setButtonLoading(submitBtn, true);

          const payload = serializePortalForm(form, type, empNumber, empName);

          try {
            const result = await submitToSheet(payload);
            if (result.result === 'success' || result.success) {
              showMessage(msgEl, 'success', '✓ Submitted successfully. Data saved to the store sheet.');
              form.reset();
            } else {
              throw new Error('Bad response');
            }
          } catch (err) {
            showMessage(msgEl, 'error', '✗ Submission failed. Please check the Apps Script URL and try again.');
          } finally {
            setButtonLoading(submitBtn, false);
          }
        });
      }
    }
  }

  function serializePortalForm(form, formType, empNum, empName) {
    const data = {
      formType: formType,
      storeName: CONFIG.STORE_NAME,
      storeCode: CONFIG.STORE_CODE,
      timestamp: getTimestamp(),
      employeeNumber: empNum,
      employeeName: empName,
    };

    const inputs = form.querySelectorAll('[name]');
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        data[input.name] = input.checked ? 'Yes' : 'No';
      } else {
        data[input.name] = input.value;
      }
    });

    return data;
  }
}

// ══════════════════════════════════════════════
// PORTAL FORM BUILDERS
// ══════════════════════════════════════════════

function fGroup(labelText, inputHTML) {
  return `<div class="form-group">
    <label>${labelText}</label>
    ${inputHTML}
  </div>`;
}
function fInput(name, type = 'text', placeholder = '', required = false) {
  return `<input type="${type}" name="${name}" placeholder="${placeholder}" ${required ? 'required' : ''} />`;
}
function fSelect(name, options, required = false) {
  const opts = options.map(o => `<option value="${o}">${o}</option>`).join('');
  return `<select name="${name}" ${required ? 'required' : ''}><option value="">Select...</option>${opts}</select>`;
}
function fTextarea(name, placeholder = '', rows = 3) {
  return `<textarea name="${name}" rows="${rows}" placeholder="${placeholder}"></textarea>`;
}
function fCheck(name, label) {
  return `<label class="checkbox-label"><input type="checkbox" name="${name}" /> ${label}</label>`;
}
function fSubmitBtn(text) {
  return `<button type="submit" class="btn btn--gold">
    <span class="btn-text">${text}</span>
    <span class="btn-loader" hidden>Submitting…</span>
  </button>`;
}

function buildClockForm(wrap, empNum, empName) {
  wrap.innerHTML = `<h3>⏱ Clock In / Clock Out</h3>
  <form class="form">
    ${fGroup('Employee Number', fInput('employeeNumber', 'text', empNum || 'e.g. BEAU101', true))}
    ${fGroup('Employee Name', fInput('employeeName', 'text', empName || 'Your name', true))}
    ${fGroup('Action', fSelect('action', ['Clock In', 'Clock Out'], true))}
    ${fGroup('Note (optional)', fTextarea('note', 'Any notes for this clock entry...'))}
    ${fSubmitBtn('Submit Clock Entry')}
  </form>`;
  prefillEmp(wrap, empNum, empName);
}

function buildOpeningForm(wrap, empNum, empName) {
  wrap.innerHTML = `<h3>☀ Opening Duties</h3>
  <form class="form">
    ${fGroup('Employee Number', fInput('employeeNumber', 'text', empNum || 'e.g. BEAU101', true))}
    ${fGroup('Employee Name', fInput('employeeName', 'text', empName || 'Your name', true))}
    ${fGroup('Date', fInput('date', 'date', '', true))}
    <div class="form-group"><label>Checklist</label>
      ${fCheck('exteriorChecked', 'Store exterior checked')}
      ${fCheck('lightsChecked', 'Lights / signage checked')}
      ${fCheck('tillReady', 'Till / POS ready')}
      ${fCheck('coolerChecked', 'Cooler / walk-in checked')}
      ${fCheck('shelvesFaced', 'Shelves faced')}
      ${fCheck('flyerChecked', 'Flyer / display checked')}
    </div>
    ${fGroup('Issues Noticed', fTextarea('issues', 'Describe any issues noticed...'))}
    ${fGroup('Opening Notes', fTextarea('openingNotes', 'Any additional notes...'))}
    ${fSubmitBtn('Submit Opening Duties')}
  </form>`;
  prefillEmp(wrap, empNum, empName);
  setTodayDate(wrap);
}

function buildClosingForm(wrap, empNum, empName) {
  wrap.innerHTML = `<h3>🌙 Closing Duties</h3>
  <form class="form">
    ${fGroup('Employee Number', fInput('employeeNumber', 'text', empNum || 'e.g. BEAU101', true))}
    ${fGroup('Employee Name', fInput('employeeName', 'text', empName || 'Your name', true))}
    ${fGroup('Date', fInput('date', 'date', '', true))}
    <div class="form-group"><label>Checklist</label>
      ${fCheck('doorsSecured', 'Doors secured')}
      ${fCheck('tillClosed', 'Till closed')}
      ${fCheck('coolerChecked', 'Cooler checked')}
      ${fCheck('garbageHandled', 'Garbage handled')}
      ${fCheck('storeCleaned', 'Store cleaned')}
      ${fCheck('securityCheck', 'Theft / security check completed')}
    </div>
    ${fGroup('Closing Notes', fTextarea('closingNotes', 'Any additional notes...'))}
    ${fSubmitBtn('Submit Closing Duties')}
  </form>`;
  prefillEmp(wrap, empNum, empName);
  setTodayDate(wrap);
}

function buildTheftForm(wrap, empNum, empName) {
  wrap.innerHTML = `<h3>🔒 Theft Report</h3>
  <form class="form">
    ${fGroup('Employee Number', fInput('employeeNumber', 'text', empNum || 'e.g. BEAU101', true))}
    ${fGroup('Employee Name', fInput('employeeName', 'text', empName || 'Your name', true))}
    ${fGroup('Date / Time', fInput('dateTime', 'datetime-local', '', true))}
    ${fGroup('Product Involved', fInput('product', 'text', 'Product name & size', true))}
    ${fGroup('Estimated Value', fInput('estimatedValue', 'text', 'e.g. $25.00'))}
    ${fGroup('Description of Incident', fTextarea('description', 'What happened?', 4))}
    ${fGroup('Person Description', fTextarea('personDescription', 'Height, clothing, direction of travel, etc.'))}
    ${fGroup('Police Report Number (if any)', fInput('policeReport', 'text', 'Leave blank if none'))}
    ${fGroup('Camera Time Reference', fInput('cameraTime', 'text', 'e.g. 14:35 — camera 2'))}
    ${fGroup('Photo / Drive Link', fInput('photoLink', 'url', 'https://drive.google.com/...'))}
    ${fSubmitBtn('Submit Theft Report')}
  </form>`;
  prefillEmp(wrap, empNum, empName);
}

function buildCustomerRequestForm(wrap, empNum, empName) {
  wrap.innerHTML = `<h3>👤 Special Customer Request</h3>
  <form class="form">
    ${fGroup('Employee Number', fInput('employeeNumber', 'text', empNum || 'e.g. BEAU101', true))}
    ${fGroup('Employee Name', fInput('employeeName', 'text', empName || 'Your name', true))}
    ${fGroup('Customer Name', fInput('customerName', 'text', 'Customer full name', true))}
    ${fGroup('Customer Phone', fInput('customerPhone', 'tel', '(780) 000-0000'))}
    ${fGroup('Product Requested', fInput('product', 'text', 'Product name & details', true))}
    ${fGroup('Quantity', fInput('quantity', 'text', 'e.g. 2 cases'))}
    ${fGroup('Needed By Date', fInput('neededBy', 'date'))}
    ${fGroup('Notes', fTextarea('notes', 'Any additional details...'))}
    ${fSubmitBtn('Submit Customer Request')}
  </form>`;
  prefillEmp(wrap, empNum, empName);
}

function buildOutOfStockForm(wrap, empNum, empName) {
  wrap.innerHTML = `<h3>🚫 Out of Stock</h3>
  <form class="form">
    ${fGroup('Employee Number', fInput('employeeNumber', 'text', empNum || 'e.g. BEAU101', true))}
    ${fGroup('Employee Name', fInput('employeeName', 'text', empName || 'Your name', true))}
    ${fGroup('Product Name', fInput('productName', 'text', 'Product name', true))}
    ${fGroup('Size / Pack', fInput('sizePack', 'text', 'e.g. 750ml, 12-pack'))}
    ${fGroup('Supplier (if known)', fInput('supplier', 'text', 'Supplier or brand name'))}
    ${fGroup('Urgency', fSelect('urgency', ['Low', 'Medium', 'High'], true))}
    ${fGroup('Notes', fTextarea('notes', 'Any additional details...'))}
    ${fSubmitBtn('Submit Out of Stock')}
  </form>`;
  prefillEmp(wrap, empNum, empName);
}

function buildMaintenanceForm(wrap, empNum, empName) {
  wrap.innerHTML = `<h3>🔧 Maintenance Issue</h3>
  <form class="form">
    ${fGroup('Employee Number', fInput('employeeNumber', 'text', empNum || 'e.g. BEAU101', true))}
    ${fGroup('Employee Name', fInput('employeeName', 'text', empName || 'Your name', true))}
    ${fGroup('Issue Area', fSelect('issueArea', ['Cooler', 'POS', 'Lights', 'Door', 'Shelving', 'Washroom', 'Signage', 'Other'], true))}
    ${fGroup('Urgency', fSelect('urgency', ['Low', 'Medium', 'High', 'Emergency'], true))}
    ${fGroup('Description', fTextarea('description', 'Describe the issue in detail...', 4))}
    ${fGroup('Photo / Drive Link', fInput('photoLink', 'url', 'https://drive.google.com/...'))}
    ${fSubmitBtn('Submit Maintenance Issue')}
  </form>`;
  prefillEmp(wrap, empNum, empName);
}

function buildStaffNoteForm(wrap, empNum, empName) {
  wrap.innerHTML = `<h3>📝 Staff Note</h3>
  <form class="form">
    ${fGroup('Employee Number', fInput('employeeNumber', 'text', empNum || 'e.g. BEAU101', true))}
    ${fGroup('Employee Name', fInput('employeeName', 'text', empName || 'Your name', true))}
    ${fGroup('Note Type', fSelect('noteType', ['General', 'Customer', 'Inventory', 'Manager Attention', 'Safety', 'Other'], true))}
    ${fGroup('Note', fTextarea('note', 'Write your note here...', 5))}
    ${fSubmitBtn('Submit Staff Note')}
  </form>`;
  prefillEmp(wrap, empNum, empName);
}

function buildShiftReportForm(wrap, empNum, empName) {
  wrap.innerHTML = `<h3>📋 Daily Shift Report</h3>
  <form class="form">
    ${fGroup('Employee Number', fInput('employeeNumber', 'text', empNum || 'e.g. BEAU101', true))}
    ${fGroup('Employee Name', fInput('employeeName', 'text', empName || 'Your name', true))}
    ${fGroup('Shift Date', fInput('shiftDate', 'date', '', true))}
    ${fGroup('Shift Type', fSelect('shiftType', ['Morning', 'Afternoon', 'Evening', 'Closing'], true))}
    ${fGroup('What Went Well', fTextarea('wentWell', 'Positives from this shift...'))}
    ${fGroup('Customer Issues', fTextarea('customerIssues', 'Any customer concerns or complaints...'))}
    ${fGroup('Inventory Issues', fTextarea('inventoryIssues', 'Stock issues, gaps, overstocks...'))}
    ${fGroup('Security Issues', fTextarea('securityIssues', 'Any security concerns...'))}
    ${fGroup('Manager Follow-Up Needed', fTextarea('managerFollowUp', 'Items that need manager attention...'))}
    ${fGroup('Final Notes', fTextarea('finalNotes', 'Anything else to note...'))}
    ${fSubmitBtn('Submit Shift Report')}
  </form>`;
  prefillEmp(wrap, empNum, empName);
  setTodayDate(wrap, 'shiftDate');
}

// ── Helpers ──
function prefillEmp(wrap, empNum, empName) {
  if (empNum) {
    const numInput = wrap.querySelector('[name="employeeNumber"]');
    if (numInput) numInput.value = empNum;
  }
  if (empName) {
    const nameInput = wrap.querySelector('[name="employeeName"]');
    if (nameInput) nameInput.value = empName;
  }
}

function setTodayDate(wrap, fieldName = 'date') {
  const dateInput = wrap.querySelector(`[name="${fieldName}"]`);
  if (dateInput) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    dateInput.value = `${y}-${m}-${d}`;
  }
}

// Add shake animation style dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
}`;
document.head.appendChild(shakeStyle);
