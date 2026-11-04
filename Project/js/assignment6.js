// Task 0: CDN jQuery is loaded in the head before this external script.
$(document).ready(function () {
    console.log('jQuery is ready!');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Tasks 1-3: one service search provides filtering, suggestions and highlighting.
    const search = $('#service-search');
    const cards = $('main .service-card');
    const suggestions = $('#service-suggestions');
    const titles = cards.find('.card-title').map(function () { return $(this).text(); }).get();
    const searchText = cards.find('.card-title, .card-text');
    searchText.each(function () { $(this).data('original', $(this).text()); });

    function closeSuggestions() {
        suggestions.empty().hide();
        search.attr('aria-expanded', 'false').removeAttr('aria-activedescendant');
    }

    function updateSearch(showSuggestions) {
        const query = search.val().trim().toLowerCase();
        let count = 0;
        cards.each(function () {
            const card = $(this);
            const text = card.find('.card-title, .card-text').map(function () {
                return $(this).data('original');
            }).get().join(' ').toLowerCase();
            const matches = text.includes(query);
            card.parent().toggle(matches);
            if (matches) count++;
        });
        $('#search-status').text(count ? count + ' services found' : 'No services found. Try another word.');
        // Text nodes keep punctuation and user input safe; every occurrence is marked.
        searchText.each(function () {
            const element = $(this);
            const text = element.data('original');
            element.empty();
            let start = 0;
            let match = query ? text.toLowerCase().indexOf(query) : -1;
            while (match !== -1) {
                element.append(document.createTextNode(text.slice(start, match)));
                element.append($('<mark>').text(text.slice(match, match + query.length)));
                start = match + query.length;
                match = text.toLowerCase().indexOf(query, start);
            }
            element.append(document.createTextNode(text.slice(start)));
        });
        closeSuggestions();
        if (query && showSuggestions) {
            titles.filter(function (title) { return title.toLowerCase().includes(query); })
                .forEach(function (title, index) {
                    suggestions.append($('<li>', { role: 'option', id: 'suggestion-' + index,
                        'aria-selected': 'false' }).text(title));
                });
            if (suggestions.children().length) {
                suggestions.show();
                search.attr('aria-expanded', 'true');
            }
        }
        updateViewport();
    }
    search.on('input', function () { updateSearch(true); });
    suggestions.on('click', 'li', function () {
        search.val($(this).text()).trigger('focus');
        updateSearch(false);
    });
    search.on('keydown', function (event) {
        const options = suggestions.children();
        let index = options.index(options.filter('[aria-selected="true"]'));
        if (event.key === 'Escape') { closeSuggestions(); return; }
        if (event.key === 'Enter') {
            if (index >= 0) { event.preventDefault(); options.eq(index).trigger('click'); }
            return;
        }
        if (!options.length || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
        event.preventDefault();
        index = event.key === 'ArrowDown' ? (index + 1) % options.length : (index <= 0 ? options.length - 1 : index - 1);
        options.attr('aria-selected', 'false').eq(index).attr('aria-selected', 'true');
        search.attr('aria-activedescendant', options.eq(index).attr('id'));
    });
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.service-search').length) closeSuggestions();
    });
    search.on('blur', function () { setTimeout(closeSuggestions, 150); });

    // Task 7: one reusable notification, with old timers/animations cleared.
    let toastTimer;
    function notify(message) {
        clearTimeout(toastTimer);
        $('#action-toast').stop(true, true).text(message).fadeIn(reducedMotion ? 0 : 150);
        toastTimer = setTimeout(function () {
            $('#action-toast').fadeOut(reducedMotion ? 0 : 400);
        }, 3000);
    }

    // Task 6: validation occurs in main.js before this simulated submission.
    $('#booking-form').on('preview:ready', function (event, completePreview) {
        const form = $(this);
        if (form.attr('aria-busy') === 'true') return;
        const button = form.find('[type="submit"]');
        const label = button.text();
        form.attr('aria-busy', 'true');
        form.find('fieldset').prop('disabled', true);
        $('#copy-controls').prop('hidden', true);
        $('#booking-result').text('');
        button.prop('disabled', true).html('<span class="submit-spinner" aria-hidden="true"></span> Please wait…');
        setTimeout(function () {
            form.removeAttr('aria-busy').find('fieldset').prop('disabled', false);
            button.prop('disabled', false).text(label);
            completePreview();
            $('#copy-controls').prop('hidden', false);
            notify('Appointment preview ready. No booking has been sent.');
        }, 1000);
    });
    $('#booking-form').on('input', function () { $('#copy-controls').prop('hidden', true); });
    $('#booking-back, #booking-next').on('click', function () { $('#copy-controls').prop('hidden', true); });

    // Task 8: show success only after the clipboard operation succeeds.
    let copyTimer;
    $('#copy-preview').on('click', async function () {
        const button = $(this);
        const text = $('#booking-result').text();
        if (!text) return;
        button.prop('disabled', true);
        try {
            await navigator.clipboard.writeText(text);
            clearTimeout(copyTimer);
            button.find('.copy-icon').text('✓');
            $('#copy-tooltip').prop('hidden', false);
            notify('Copied to clipboard!');
            copyTimer = setTimeout(function () {
                button.find('.copy-icon').text('⧉');
                $('#copy-tooltip').prop('hidden', true);
            }, 2500);
        } catch (error) {
            notify('Copy unavailable. Select the preview text and copy it manually.');
        } finally {
            button.prop('disabled', false);
        }
    });

    // Tasks 4, 5 and 9: update scroll progress, start visible counters and load images.
    function inView(element) {
        if (!element.is(':visible')) return false;
        const top = element.offset().top;
        return top < $(window).scrollTop() + $(window).height() &&
            top + element.outerHeight() > $(window).scrollTop();
    }
    function updateViewport() {
        const distance = $(document).height() - $(window).height();
        const percent = distance > 0 ? Math.min(100, Math.max(0, $(window).scrollTop() / distance * 100)) : 100;
        $('#scroll-progress').css('width', percent + '%').attr('aria-valuenow', Math.round(percent));
        $('.number-counter').each(function () {
            const counter = $(this);
            if (!inView(counter) || counter.data('started')) return;
            counter.data('started', true);
            const target = Number(counter.attr('data-target'));
            $({ value: 0 }).animate({ value: target }, {
                duration: reducedMotion ? 0 : 1400,
                step: function (value) { counter.text(Math.floor(value)); },
                complete: function () { counter.text(target); }
            });
        });
        $('img[data-src]').each(function () {
            const image = $(this);
            if (inView(image)) image.attr('src', image.attr('data-src')).removeAttr('data-src');
        });
    }
    $(window).on('scroll resize load', updateViewport);
    $('img').on('load', updateViewport);
    if (search.length) updateSearch(false);
    updateViewport();
});
