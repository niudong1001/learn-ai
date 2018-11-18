(function ($, Drupal, window, document, undefined) {
  // NOTE TO MAINTAINERS: This code depends on the Underscore library.

  function configure_menu() {
    // Download the menu pointer image on pageload, so that it won't flicker the first time it's displayed.
    var img0 = new Image();
    img0.src = "/sites/all/modules/custom/caltech_banner/img/menu-pointer.png";

    // Hovering over a menu branch title for long enough opens that branch.
    $('#desktop-menu li.menu-branch').hover(start_opentimer, start_closetimer);
    // Moving the mouse outside of the menu for long enough, without moving it back in, closes the menu.
    $('#desktop-menu #main-menu').hover(cancel_closetimer, start_closetimer);

    // Clicking on any of the menu branch titles toggles the menu.
    $('#desktop-menu .menu-branch-title').click(function(event) {
      var branch = $(this).parent();
      if ($('ul.menu-twig-group', branch).hasClass('hidden')) {
        // This branch's twigs are not visible, so open the branch.
        open_branch(branch);
      }
      else {
        // This branch's twigs are already visible, so close the menu.
        close_branches();
      }
    });

    // Delete the text in the <h3> for any menus with a title that includes the substring "-2nd-col".
    // The menu maintainers are trained so that if they ever need to split a submenu across two columns, they
    // need to title the second one the same as the first, but with "-2nd-col" appended.
    $('#banner h3:contains("-2nd-col")').html('&nbsp;');
  }

  function configure_search_control() {
    // Set up the search field so that whenever it gains focus, the cursor is placed at the end of the field.
    $('#caltech-banner-search-keys').focus(function() {
      this.selectionStart = this.selectionEnd = this.value.length;
    });

    $('.search-icon').click(function() {
      var form = $('#caltech-banner-search-form');
      if (!form.hasClass('visible')) {
        open_search_form();
      }
      else {
        close_search_form();
      }
    });

    // Open the search control instantly on all search results pages.
    if ($('body').hasClass('page-search')) {
      open_search_form(true);
    }
  }

  function open_search_form(instant) {
    // Don't do anything on phones: the search form is always visible.
    if (window.matchMedia('(max-width: 767px)').matches) {
      return;
    }

    var form = $('#caltech-banner-search-form');
    form.addClass('visible');
    if (instant) {
      form.css({'opacity': 1});
    }
    else {
      form.animate({'opacity': 1});
    }
    $('#caltech-banner-search-keys').focus();

    // While the search control is open, listen for clicks on the document.
    $(document).on("mouseup.hideDocClick", function (event) {
      var form = $('#caltech-banner-search-form');
      // If the target of the click isn't the search form itself, nor one of its decendants, hide the control.
      // Also ignore clicks on .search-icon, since its click handler would interfere.
      if (!form.is(event.target) && form.has(event.target).length === 0 && !$('.search-icon').is(event.target)) {
        close_search_form();
      }
    });
  }

  function close_search_form() {
    var form = $('#caltech-banner-search-form');
    form.animate(
      {'opacity': 0},
      function() {form.removeClass('visible');}
    );
    // Stop listening for document clicks while the control is closed.
    $(document).off('.hideDocClick');
  }

  // Sets up Google Analytics tracking for clicks on various parts of the UI.
  function configure_google_analytics() {
    // Main Menu
    $('#desktop-menu a').on('click', function() {
      ga('send', 'event', 'Menus', 'Main Menu', $(this).text());
    });

    // Ribbon Menus. This includes Ribbon Menu 1, Ribbon Menu 2, and Quick Links, which are the strings
    // being pulled from $(this).data('menu-name').
    $('#ribbon-menus a').on('click', function() {
      ga('send', 'event', 'Menus', $(this).data('menu-name'), $(this).text());
    });
  }

  /////////////////////////////////////////////////////////////////////////////
  // Menu functions
  /////////////////////////////////////////////////////////////////////////////
  var closetimer = null;
  var hovertimer = null;

  function open_branch(branch) {
    var twig_group = $('ul.menu-twig-group', branch);
    close_branches();
    if (!branch.hasClass('filler')) {
      branch.addClass('open');
    }
    twig_group.removeClass('hidden');
  }

  // Hide all the twig collections in each branch.
  function close_branches() {
    $('.menu-branch').removeClass('open');
    $('ul.menu-twig-group').addClass('hidden');
  }

  // Close all branches after half a second.
  function start_closetimer() {
    cancel_closetimer();
    cancel_opentimer();
    closetimer = _.delay(close_branches, 500);
  }

  // Prevent the next menu-close from occuring.
  function cancel_closetimer() {
    clearTimeout(closetimer);
  }

  // Open the currently-hovered branch after half a second.
  function start_opentimer() {
    cancel_opentimer();
    hovertimer = _.delay(open_branch, 500, $(this));
  }

  // Prevent the next branch-open from occuring.
  function cancel_opentimer() {
    clearTimeout(hovertimer);
  }

  /////////////////////////////////////
  // Mobile code.
  /////////////////////////////////////
  function toggle_mobile_menu(event) {
    $('#mobile-menu').toggleClass('hidden');
  }

  // Clones the specified group out of the #main-menu and replaces #visible-menu with it.
  function display_link_group(group_id) {
    // Clone the link group that we want to display into #visible-menu.
    var visible_menu = $(group_id).not('#visible-menu ' + group_id).clone().attr('id', 'visible-menu').removeClass('hidden');
    $('#visible-menu').replaceWith(visible_menu);

    // Rebind the menu_dive function, because the cloned menu arrows lose the binding.
    $('.mobile-menu-arrow').click(menu_dive);
  }

  // Displays the menu section that the user just clicked into, and adds the menu context for it.
  function menu_dive(event) {
    var menu_arrow = $(this);
    var group_id = menu_arrow.data('group');
    display_link_group(group_id);

    var submenu_name = menu_arrow.siblings('a, .mobile-menu-branch-title').text();
    $('#mobile-menu-context').append('<li data-group="' + group_id + '">' + submenu_name + '</li>');
    rebind_menu_rise();
  }

  // Traverses up the menu by one chunk.
  function menu_rise(event) {
    display_link_group($(this).data('group'));
    $('#mobile-menu-context li').eq(-1).remove();
    rebind_menu_rise();
  }

  function rebind_menu_rise() {
    // Rebind the menu_rise function to only the second-to-last context <li>.
    $('#mobile-menu-context li').unbind('click').eq(-2).click(menu_rise);
  }

  function configure_mobile() {
    // Copy #main-menu-mobile into #visible-menu.
    var visible_menu = $('#main-menu-mobile').clone().attr('id', 'visible-menu');
    $('#main-menu-mobile').before(visible_menu);

    // Set up the mobile menu traversal code.
    $('#mobile-menu-button').click(toggle_mobile_menu);
    $('.mobile-menu-arrow').click(menu_dive);

    // Replace the substring "-2nd-col" in mobile menu links with "pg 2".
    $('a.mobile-menu-link:contains("-2nd-col")').each(function() {
      $(this).text($(this).text().replace('-2nd-col', 'pg 2'));
    });
  }

  ////////////////////////////////////////////////////////
  // On document.ready();
  ////////////////////////////////////////////////////////
  $(document).ready(function() {
    configure_menu();
    configure_search_control();
    configure_google_analytics();
    configure_mobile();
  });
}(jQuery, Drupal, this, this.document));
