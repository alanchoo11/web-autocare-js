// Form validation
function todayString() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
}

function validateForm(form, result) {
    const fields = form.querySelectorAll('input, select, textarea');
    let firstError = null;

    for (const field of fields) {
        field.setCustomValidity('');
        const label = form.querySelector(`label[for="${field.id}"]`).textContent;

        if (field.required && field.type !== 'checkbox' && !field.value.trim()) {
            field.setCustomValidity(`${label} is required.`);
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            field.setCustomValidity('Enter a valid email address.');
        } else if (field.type === 'password' && field.minLength > 0 && field.value.length < field.minLength) {
            field.setCustomValidity(`Password must contain at least ${field.minLength} characters.`);
        } else if (field.id === 'subscriber-confirm' && field.value !== document.querySelector('#subscriber-password').value) {
            field.setCustomValidity('Passwords do not match.');
        } else if (field.type === 'date' && field.value) {
            field.min = todayString();
            if (field.value < field.min) {
                field.setCustomValidity('Choose today or a future date.');
            } else if (new Date(field.value + 'T12:00:00').getDay() === 0) {
                field.setCustomValidity('The workshop is closed on Sundays.');
            }
        }

        field.setAttribute('aria-invalid', String(!field.validity.valid));
        if (!field.validity.valid && !firstError) firstError = field;
    }

    if (firstError) {
        result.textContent = firstError.validationMessage;
        firstError.focus();
        return false;
    }
    return true;
}

document.querySelectorAll('form').forEach(function (form) {
    form.noValidate = true;
    form.addEventListener('input', function (event) {
        event.target.setCustomValidity('');
        event.target.removeAttribute('aria-invalid');
        form.querySelector('.form-result').textContent = '';
    });
});

// Booking
const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
    const service = document.querySelector('#service-type');
    const date = document.querySelector('#date');
    const result = document.querySelector('#booking-result');
    const requestedService = new URLSearchParams(window.location.search).get('service');
    for (const option of service.options) {
        if (option.value === requestedService) service.value = requestedService;
    }
    date.min = todayString();

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!validateForm(bookingForm, result)) return;
        const vehicle = document.querySelector('#vehicle').value.trim();
        const time = document.querySelector('#time').value;
        result.textContent = `Appointment preview: ${service.selectedOptions[0].textContent} for ${vehicle}, on ${date.value} at ${time}. Nothing has been sent or booked.`;
        result.focus();
    });
}

// Contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const result = document.querySelector('#contact-result');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!validateForm(contactForm, result)) return;
        const topic = document.querySelector('#contact-topic').selectedOptions[0].textContent;
        const message = document.querySelector('#contact-message').value.trim();
        result.textContent = `Message preview (${topic}): ${message} — Demo only; your message has not been sent.`;
        result.focus();
    });
}

// FAQ
document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
        const answer = document.getElementById(button.getAttribute('aria-controls'));
        const open = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(open));
        answer.setAttribute('aria-hidden', String(!open));
        answer.classList.toggle('open', open);
    });
});

// Subscription popup
const popup = document.querySelector('#subscription-dialog');
if (popup) {
    const openButton = document.querySelector('#open-subscription');
    const form = document.querySelector('#subscription-form');
    const result = document.querySelector('#subscription-result');

    openButton.addEventListener('click', function () { popup.showModal(); });
    document.querySelector('#close-subscription').addEventListener('click', function () { popup.close(); });
    popup.addEventListener('click', function (event) {
        const box = popup.getBoundingClientRect();
        if (event.target === popup && (event.clientX < box.left || event.clientX > box.right ||
            event.clientY < box.top || event.clientY > box.bottom)) popup.close();
    });
    popup.addEventListener('close', function () {
        form.reset();
        result.textContent = '';
        form.querySelectorAll('input').forEach(function (input) {
            input.setCustomValidity('');
            input.removeAttribute('aria-invalid');
        });
        openButton.focus();
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!validateForm(form, result)) return;
        form.reset();
        result.textContent = 'Form completed successfully. Demo only: no data was sent.';
    });
}

// Background color
const colorButton = document.querySelector('#change-background');
if (colorButton) {
    const colors = ['#ffffff', '#eaf2ff', '#f2f4f7'];
    let colorIndex = 0;
    colorButton.addEventListener('click', function () {
        colorIndex = (colorIndex + 1) % colors.length;
        document.body.style.backgroundColor = colors[colorIndex];
    });
}

// Current date and time
const clock = document.querySelector('#current-date-time');
if (clock) {
    function updateClock() {
        const now = new Date();
        clock.dateTime = now.toISOString();
        clock.textContent = now.toLocaleString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
        });
    }
    updateClock();
    setInterval(updateClock, 1000);
}
