/* Order form — validation, photo previews, drag & drop */
(function () {
  var form = document.getElementById('orderForm');
  if (!form) return;

  /* ── Date: set minimum to today ── */
  var dateInput = document.getElementById('eventDate');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  /* ── Photo upload preview ── */
  var photoInput   = document.getElementById('photoInput');
  var previews     = document.getElementById('uploadPreviews');
  var uploadZone   = document.getElementById('uploadZone');

  if (photoInput && previews) {
    photoInput.addEventListener('change', function () {
      renderPreviews(Array.from(this.files).slice(0, 5));
    });
  }

  if (uploadZone) {
    uploadZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      uploadZone.classList.add('drag-over');
    });
    uploadZone.addEventListener('dragleave', function () {
      uploadZone.classList.remove('drag-over');
    });
    uploadZone.addEventListener('drop', function (e) {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      if (photoInput && e.dataTransfer.files.length) {
        photoInput.files = e.dataTransfer.files;
        renderPreviews(Array.from(e.dataTransfer.files).slice(0, 5));
      }
    });
  }

  function renderPreviews(files) {
    previews.innerHTML = '';
    files.forEach(function (file) {
      if (!file.type.startsWith('image/')) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'upload-preview';
        img.alt = file.name;
        previews.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  /* ── Validation ── */
  var fields = [
    { inputId: 'occasion',   wrapperId: 'field-occasion' },
    { inputId: 'eventDate',  wrapperId: 'field-event-date' },
    { inputId: 'cakeType',   wrapperId: 'field-cake-type' },
    { inputId: 'serves',     wrapperId: 'field-serves' },
    { inputId: 'sponge',     wrapperId: 'field-sponge' },
    { inputId: 'buttercream',wrapperId: 'field-buttercream' },
    { inputId: 'fullName',   wrapperId: 'field-name' },
    { inputId: 'phone',      wrapperId: 'field-phone' },
    { inputId: 'email',      wrapperId: 'field-email' },
  ];

  function isValid(input) {
    var val = input.value.trim();
    if (!val) return false;
    if (input.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    return true;
  }

  function validateField(inputId, wrapperId) {
    var input   = document.getElementById(inputId);
    var wrapper = document.getElementById(wrapperId);
    if (!input || !wrapper) return true;
    var valid = isValid(input);
    wrapper.classList.toggle('has-error', !valid);
    return valid;
  }

  /* Live feedback on blur */
  fields.forEach(function (f) {
    var input = document.getElementById(f.inputId);
    if (!input) return;
    input.addEventListener('blur', function () {
      validateField(f.inputId, f.wrapperId);
    });
    input.addEventListener('input', function () {
      var wrapper = document.getElementById(f.wrapperId);
      if (wrapper && wrapper.classList.contains('has-error')) {
        validateField(f.inputId, f.wrapperId);
      }
    });
  });

  /* Submit */
  var submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', function (e) {
    var allValid = fields.every(function (f) {
      return validateField(f.inputId, f.wrapperId);
    });

    if (!allValid) {
      e.preventDefault();
      var firstError = form.querySelector('.has-error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
  });
}());
