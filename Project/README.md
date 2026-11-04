# AutoCare - Assignment 6: jQuery
Team: AutoCare | Group: SE2508
Alan Akylbek, Beksultan Amantai, Aitemir Nazimov

Run: open index.html with internet access, or serve Project with a local web server.
jQuery 4.0.0 is loaded from the CDN in each HTML head as required by Task 0.
Clipboard copying works on HTTPS (the published site) or localhost, with browser permission.
If clipboard access is denied, the site gives an honest manual-copy message.

Task map (custom code: js/assignment6.js)
0: $(document).ready and the console message "jQuery is ready!"
1: Services - case-insensitive live filtering of service titles and descriptions.
2: Services - dropdown suggestions, click or Up/Down + Enter; Escape dismisses.
3: Services - every occurrence in the searchable card titles/descriptions is highlighted; clear resets it.
4: All pages - gradient scroll progress, resize and changing content supported.
5: Home - counters for actual project facts: 5 booking choices, 3 members, 2 steps.
6: Booking - validate first, disable the form and show a spinner for a 1-second simulated call.
7: Booking/copy - a temporary jQuery fade-out notification.
8: Booking preview - real clipboard write, checkmark and visible tooltip after success.
9: Home/Services - service-card images use data-src; jQuery assigns src on entering the viewport.
The hero and existing carousel remain eager; not every image should be deferred.

The Assignment 5 interactions remain in js/main.js. It signals preview:ready after validation;
the jQuery handler waits and then calls the original completion callback. No real booking is sent.
HTML, CSS and JS remain separate. Bootstrap is retained; no jQuery UI or other new library is used.

Published site: https://alanchoo11.github.io/web-autocare-js/Project/services.html
Repository: https://github.com/alanchoo11/web-autocare-js

Defense: demonstrate Services search, Home counters/scroll, Booking spinner/toast/copy,
and Network requests for below-fold images. Explain the functions marked with task comments.
Each member submits the ZIP and report and defends the work by the LMS deadline.
