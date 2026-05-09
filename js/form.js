(function () {
  var form = document.getElementById('orderForm');
  if (!form) return;

  /* Populate selects from config.js */
  if (typeof BB_CONFIG !== 'undefined') {
    fillSelect('occasion',    BB_CONFIG.occasions);
    fillSelect('cakeType',    BB_CONFIG.cakeTypes);
    fillSelect('serves',      BB_CONFIG.serves);
    fillSelect('cakeShape',   BB_CONFIG.cakeShapes);
    fillSelect('delivery',    BB_CONFIG.delivery);
    fillSelect('sponge',      BB_CONFIG.spongeFlavours);
    fillSelect('buttercream', BB_CONFIG.buttercreamFlavours);
    fillSelect('filling',     BB_CONFIG.fillings);
    fillSelect('cakeStyle',   BB_CONFIG.cakeStyles);
    fillSelect('heardFrom',   BB_CONFIG.heardFrom);
    fillAddons(BB_CONFIG.addons);
  }

  function fillSelect(id, options) {
    var select = document.getElementById(id);
    if (!select) return;
    var placeholder = select.querySelector('option[disabled]');
    select.innerHTML = '';
    if (placeholder) select.appendChild(placeholder);
    options.forEach(function (text) {
      var opt = document.createElement('option');
      opt.textContent = text;
      select.appendChild(opt);
    });
  }

  function fillAddons(addons) {
    var grid = document.getElementById('addonsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    addons.forEach(function (addon) {
      var safeId = 'addon-' + addon.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      var item = document.createElement('div');
      item.className = 'addon-item';
      var cb = document.createElement('input');
      cb.type = 'checkbox'; cb.id = safeId; cb.name = 'addons'; cb.value = addon;
      var lbl = document.createElement('label');
      lbl.className = 'addon-label'; lbl.htmlFor = safeId; lbl.textContent = addon;
      item.appendChild(cb); item.appendChild(lbl);
      grid.appendChild(item);
    });
  }

  /* Min date = today */
  var dateInput = document.getElementById('eventDate');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  /* Photo previews */
  var photoInput = document.getElementById('photoInput');
  var previews   = document.getElementById('uploadPreviews');
  var uploadZone = document.getElementById('uploadZone');

  if (photoInput && previews) {
    photoInput.addEventListener('change', function () {
      renderPreviews(Array.from(this.files).slice(0, 5));
    });
  }
  if (uploadZone) {
    uploadZone.addEventListener('dragover', function (e) { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', function () { uploadZone.classList.remove('drag-over'); });
    uploadZone.addEventListener('drop', function (e) {
      e.preventDefault(); uploadZone.classList.remove('drag-over');
      if (photoInput && e.dataTransfer.files.length) {
        photoInput.files = e.dataTransfer.files;
        renderPreviews(Array.from(e.dataTransfer.files).slice(0, 5));
      }
    });
  }
  function renderPreviews(files) {
    if (!previews) return;
    previews.innerHTML = '';
    files.forEach(function (file) {
      if (!file.type.startsWith('image/')) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.createElement('img');
        img.src = e.target.result; img.className = 'upload-preview'; img.alt = file.name;
        previews.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  /* Validation */
  var fields = [
    { inputId: 'occasion',    wrapperId: 'field-occasion' },
    { inputId: 'eventDate',   wrapperId: 'field-event-date' },
    { inputId: 'cakeType',    wrapperId: 'field-cake-type' },
    { inputId: 'serves',      wrapperId: 'field-serves' },
    { inputId: 'sponge',      wrapperId: 'field-sponge' },
    { inputId: 'buttercream', wrapperId: 'field-buttercream' },
    { inputId: 'fullName',    wrapperId: 'field-name' },
    { inputId: 'phone',       wrapperId: 'field-phone' },
    { inputId: 'email',       wrapperId: 'field-email' },
  ];

  function isValid(input) {
    var val = input.value.trim();
    if (!val) return false;
    if (input.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    return true;
  }
  function validateField(inputId, wrapperId) {
    var input = document.getElementById(inputId);
    var wrapper = document.getElementById(wrapperId);
    if (!input || !wrapper) return true;
    var valid = isValid(input);
    wrapper.classList.toggle('has-error', !valid);
    return valid;
  }
  fields.forEach(function (f) {
    var input = document.getElementById(f.inputId);
    if (!input) return;
    input.addEventListener('blur', function () { validateField(f.inputId, f.wrapperId); });
    input.addEventListener('input', function () {
      var wrapper = document.getElementById(f.wrapperId);
      if (wrapper && wrapper.classList.contains('has-error')) validateField(f.inputId, f.wrapperId);
    });
  });

  /* Submit */
  var submitBtn = document.getElementById('submitBtn');
  form.addEventListener('submit', function (e) {
    var allValid = fields.every(function (f) { return validateField(f.inputId, f.wrapperId); });
    if (!allValid) {
      e.preventDefault();
      var firstError = form.querySelector('.has-error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
  });

}());
