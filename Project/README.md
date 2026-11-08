# AutoCare - final integrated project (Assignments 1-6)

Team: AutoCare | Group: SE2508
Alan Akylbek, Aitemir Nazimov, Beksultan Amantai.

Open index.html, or serve the Project directory on localhost. For clipboard access use
localhost or the published HTTPS site. jQuery loads from the required CDN in the head;
js/jquery-fallback.js loads the identical local 4.0.0 copy when the CDN is unavailable.
The CDN can still produce a network error while offline; the local fallback keeps features usable.

Source map
- HTML: seven connected pages; page credit comments and member footers.
- css/style.css: shared original branding, forms, FAQ, Flexbox cards, Grid gallery and Services grid areas.
- css/media-queries.css: standalone no-Bootstrap media-query exercise (3/2/1 cards).
- css/feedback.css: shared search, scroll progress, counters, spinner, toast and copy feedback.
- js/main.js: validation, two-step booking, object/method summary, sound, menu arrows,
  Read More, contact preview, FAQ, subscription popup, background cycle and clock.
- js/assignment6.js: jQuery ready, service filter/suggestions/highlighting, scroll progress,
  counters, simulated submit, toast, clipboard and viewport image loading.
- vendor/: existing Bootstrap and fallback jQuery; images/ and audio/: local assets.

Requirement map
A1: six main pages plus one exercise; shared CSS, selectors, semantic content, lists,
three-column schedule table, forms, real circular initials images, credits and team biographies.
Alan: Home/About; Aitemir: Services/Booking; Beksultan: Schedule/Contact (existing page roles).
A2: Flexbox navbar and equal-height team cards with image/title/text/action; Services uses
named CSS grid areas; About has nine grid images with hover/focus captions.
A3: media query typography and 3/2/1 columns without Bootstrap; Bootstrap two- and
three-column sections, spacing utilities including responsive spacing, navbar, buttons,
card-group with images, nine-slide carousel with indicators/controls, responsive forms.
A4: validation (including password length/match), FAQ, popup, background and live clock.
A5: DOM/styles/Read More, click, keydown/switch, Next/Back callback, object/method,
array/for, forEach, one resettable audio player, animations, external code.
A6: all tasks 0-9; see task comments in assignment6.js.

Historical requirements
A1 originally forbade Bootstrap, but A3 requires it and A6 requires jQuery. The final
integrated version follows these later requirements; it is not a replacement for the
historical framework-free A1 submission. Custom branding/layout spacing is retained
alongside Bootstrap utilities to preserve the requested design; the early all-custom-CSS
and later all-Bootstrap-spacing rules cannot both describe the same final stylesheet.
The media-query exercise still has no Bootstrap dependency. Prior ZIPs are preserved.

Verification
100 jQuery/regression checks plus 268 extended browser assertions passed in Chrome and
Edge. Widths include 360, 390, 768 and 1280px across suites. All seven pages, images,
footers, unique IDs, forms, navigation, carousel, gallery, CSS grid, copy success/failure,
notifications, sound and fallback were covered. 177 local links/assets resolve.
See the final audit PDF and verification JSON files for scope and remaining limits.

Important: forms are frontend demonstrations. No booking, message or account is sent
to a server; data is not retained after reload. Clipboard denial shows manual-copy advice.
Submission deadlines, historical authorship and defense are verified by the course, not software tests.

Site: https://alanchoo11.github.io/web-autocare-js/Project/index.html
Repository: https://github.com/alanchoo11/web-autocare-js

Final report (English)
[Download the final review of Assignments 1-6](reports/AutoCare_Final_Report_EN.pdf).
Published PDF: https://alanchoo11.github.io/web-autocare-js/Project/reports/AutoCare_Final_Report_EN.pdf
