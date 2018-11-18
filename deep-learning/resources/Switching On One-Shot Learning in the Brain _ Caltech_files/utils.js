/**
 * @file - Contains various utilities used by multiple different parts of our javascript. This file is included
 * directly in the html.tpl.php template.
 */

// Avoid `console` errors in IE8. Our code shouldn't ever be calling console functions in production,
// but we can't control what any third-party code might do.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// This function navigates to the given destination based on the given click event. It exists to support the "click on
// a parent and it acts like clicking on the <a> within that parent" functionality that we use throughout the site.
function caltech_click_link(destination, event) {
  event.preventDefault();
  event.stopPropagation();
  if (event.which == 2) {
    window.open(destination, '_blank');
  }
  else {
    window.location.href = destination;
  }
  return false;
}
