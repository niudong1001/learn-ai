/*global Drupal:true */
(function ($, Drupal, window, document, undefined) {
  /////////////////////////////////////////////////////////////////////////////
  // Utility functions
  /////////////////////////////////////////////////////////////////////////////
  function trim_news_listing_body() {
    $("div.news-listing div.ds-2col div.group-left").each(function() {
      var ele = $(this);
      var d = ele.find('div.field-name-publish-date');
      var t = ele.find('div.field-name-teaser-title, div.field-name-listing-title');
      var w = ele.find('div.field-name-field-writer');
      var max_h = ele.height() - d.height() - t.height() - w.height();
      var body = ele.find("div.field-name-body, div.field-name-field-description");
      var h = body.height() + parseInt(body.css("margin-top"), 10) + 10;
      var p, text, idx, c;

      if (h > max_h) {
        body.css("background", "red");
        p = body.find("p");
        if (p.length > 1) {
          c = body.find('div.field-item.even');
          c.empty();
          c.append(p[0]);
          p = body.find("p");
        } else {
          if (p.length === 0) {
            p = body.find('div.field-item.even');
          }
        }
        text = p.html();
        while (text.length && (h > max_h)) {
          idx = text.lastIndexOf(" ");
          text = text.substring(0, idx);
          p.html(text + " ...");
          h = body.height() + parseInt(body.css("margin-top"), 10) + 10;
        }
        body.css("background", "");
      }
    });
  }

  function add_play_button_to_videos() {
    $(".file-video:not(:has(div.play-button)) a.media-colorbox").append('<div class="play-button"></div>');
  }

  /////////////////////////////////////////////////////////////////////////////
  // Search box functions
  /////////////////////////////////////////////////////////////////////////////
  function add_link_to_all_teaser_images() {
    // First let's do all of the image+link style teasers. They are all ds-2col with a right subsection with the link.
    $(".pane div.ds-2col, div.ds-2col.pane").each(function() {
      // Sometimes, there will be a '.group-right a' inside a '.group-left' div (e.g. Tagged News Listing Launchers)
      // In that case, don't attempt to create the <a> wrapper.
      if ($(this).parents('.group-left').length) {
        return;
      }
      var link = $(this).children(".group-right").find("a").attr("href");
      // If there is a link in the box, wrap a copy of it around the entire thing.
      if (link) {
        $(this).wrap('<a style="display:block;" href="' + link + '" />');
      }
    });
    // And now we need the same for the color, title, link type.
    $("div.ds-1col.node-color-title-link").each(function() {
      var link = $(this).find("a").attr("href");
      if (link.length > 0) {
        $(this).wrap('<a style="display:block;" href="' + link + '" />');
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  // OTHER FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////////////////

  // The gradient divs in front of grid images are problematic for videos, because they
  // partially cover the play button, making it difficult to click. This function shortens
  // the gradient divs over videos so that they don't cover the play buttons.
  function shorten_video_gradients() {
    var right = $("div.file-video").closest("div.group-left").next();
    var parent = right.parent();
    if (!parent.hasClass('node-hero-image')) {
      var parent_height = parseInt(parent.css('height'));
      right.css({"height": (parent_height * 2/5) + "px"});
    }
  }

  // The content team wants to make sure that News Listing Launchers never display the same
  // image more than once per grid page. This functionality is implemented by having the
  // News Listing Launchers render 2 images instead of 1, and hiding the second. This function
  // determines which single image should be shown for each launcher.
  function change_duplicate_news_listing_launchers() {
    var launchers = $('.view-news-spotlight-image-only');
    if (!launchers.length) {
      return;
    }

    // Mark all views-row-1's as 'show', so that subsequent passes can find all currently visible images.
    launchers.find('.views-row-1').addClass('show');

    // Search for duplicate images in all visible rows.
    var fixed_duplicates = [];
    launchers.find('.views-row.show').each(function() {
      var img_path_array = $(this).find('img').attr('src').split('/');
      var filename = img_path_array[img_path_array.length-1];

      // If we've already fixed the dupes of this image, skip this loop.
      if (_.contains(fixed_duplicates, filename)) {
        return;
      }
      var same_named_imgs = $('img[src$="' + filename + '"]');

      // If there is more than one views-row with the same image showing, show the second views-row instead.
      if (same_named_imgs.length >= 2) {
        var dup_row = same_named_imgs.eq(1).closest('.views-row');
        dup_row.removeClass('show').addClass('hide').next().addClass('show');

        // Record that we've fixed the duplicates of this file, so we don't try to "fix" the next launcher which
        // has this file in it.
        fixed_duplicates.push(filename);
      }

    });
  }

  // Performs some necessary setup for Slideshow pages.
  function setup_slideshow_page() {
    // Move all the non-slideshow fields up to z-index 100, so that the slideshow won't overlap them.
    $('div.node-slideshow').children().each(function() {
      var field = $(this);
      if (!field.hasClass('field-name-field-slideshow')) {
        field.addClass('zindex100');
      }
    });
  }

  // Sets up the AJAXiness of the Experts Guide page.
  function setup_experts_guide() {
    // Stick the hidden AJAX progress throbber into the page, to be shown while
    // AJAX calls are being made.
    $('body').append('<div id="ajax-throbber" class="hidden">');

    // Set up the Expert Search AJAX.
    $('#search-form').submit(function(event) {
      event.preventDefault();
      event.stopPropagation();

      var that = $(this);
      $('#ajax-throbber').removeClass('hidden');
      $.ajax({
        type: 'POST',
        data: that.serialize(),
        url: that.attr('action'),
        context: that,
        success: display_expert_search_results,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          $('#ajax-throbber').addClass('hidden');
          alert("We're sorry, but an error has occured. Please try again.");
        }
      });
      return false;
    });

    // Set up the Expanded Experts AJAX.
    $(".view-expert-research-topics .views-field-expander a").each(function() {
      var row = $(this).parents('.views-row');
      $(this).click(function(event) {
        event.preventDefault();
        event.stopPropagation();

        if ($('.expanded-experts', row).length) {
          // Rather than creating a new expanded experts list when there's
          // already one here, hide/show the existing one.
          $('.expanded-experts', row).toggle();

          // Toggle the "up/down" arrow.
          var arrow = $(this).children('img').eq(0);
          if (arrow.hasClass('up')) {
            arrow.attr('src', '/sites/all/themes/caltech_mte/img/expand_down.png');
            arrow.removeClass('up');
          }
          else {
            arrow.attr('src', '/sites/all/themes/caltech_mte/img/expand_up.png');
            arrow.addClass('up');
          }
          return;
        }

        $('#ajax-throbber').removeClass('hidden');
        $.ajax({
          url: $(this).attr('href'),
          context: row,
          success: expand_experts,
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#ajax-throbber').addClass('hidden');
            alert("We're sorry, but an error has occured. Please try again.");
          }
        });
      });
    });
  }

  function expand_experts(response) {
    var list = $('<ul class="expanded-experts">');
    _.each(response.experts, function(expert, index) {
      // Construct an <li> from the data returned by the AJAX call.
      var li = $('<li class="expert">');
      if (index % 2 == 0) {
        // Since JS is 0-indexed, the 'odd' ones are 0, 2, 4, ...
        li.addClass('odd');
      }
      li.append('<div class="name"><h4>' + expert.name + '</h4></div>');
      if (expert.title) {
        li.append('<div class="title">' + expert.title + '</div>');
      }
      if (expert.summary) {
        li.append('<div class="summary">' + expert.summary + '</div>');
      }
      list.append(li);
    });

    // Add the newly-created <ul> to the parent views-row.
    this.append(list);

    // Change the down arrow to "up".
    var arrow = this.find('.views-field-expander img').eq(0);
    arrow.attr('src', '/sites/all/themes/caltech_mte/img/expand_up.png');
    arrow.addClass('up');

    $('#ajax-throbber').addClass('hidden');
  }

  // Displays the search results retrieved from the AJAX form post, hiding the
  // Expert Research Topics panel to make room.
  function display_expert_search_results(response) {
    var panel = $('.panel-col-first .inside');
    var topics = $('.pane-expert-research-topics-panel-pane-1');
    var search_results_panel = $('<div id="search-results-panel"></div>');
    var search_results = $('<div id="search-results" style="display:none">');
    var list = $('<ol class="search-results caltech_search_experts-results">');
    _.each(response, function(node, index) {
      var li = $('<li class="search-result">');
      if (index % 2 == 0) {
        // Since JS is 0-indexed, the 'odd' ones are 0, 2, 4, ...
        li.addClass('odd');
      }
      li.append(node);
      list.append(li);
    });

    // The "Resturn to Research Topics" link closes the search results and
    // re-displays the Research Topics list.
    var return_to_topics = $('<a href="javascript:void(0)">Return to Research Topics</a>');
    return_to_topics.click(function() {
      $('#search-results-panel').remove();
      topics.fadeIn();
    });
    search_results_panel.append(return_to_topics);

    if (response.length) {
      search_results.append('<h2>Search Results</h2>');
      search_results.append(list);
    }
    else {
      var no_results = '<div>' +
        '<h2>Your search yielded no results.</h2> ' +
        '<ul>' +
          '<li>Check if your spelling is correct.</li>' +
          '<li>Only searches for complete words or acronyms will return results.</li>' +
          '<li>Search terms must be at least 3 characters.</li>' +
        '</ul></div>';
      search_results.append(no_results);
    }

    // Hide the research topics panel, to make room for the search results.
    topics.hide();

    // Remove any existing #search-results-panel div.
    panel.find('div#search-results-panel').remove();

    $('#ajax-throbber').addClass('hidden');
    search_results_panel.append(search_results);
    panel.append(search_results_panel);
    search_results.fadeIn();
  }

  // Sets up the long description clicks and Google Analytics tracking for Quick Links pages.
  function setup_quick_links() {
    $('.link-farm-long-description-icon').click(function(event) {
      $('.link-farm-long-description').hide();
      $(this).siblings('.link-farm-long-description').show();
      event.stopPropagation();
      return false;
    });

    // This would be $('body').click(), but Mobile Safari is stupid.
    $('#page_content').click(function() {
      $('.link-farm-long-description').hide();
    });

    $('.link-farm-collection a').on('click', function() {
      var page_title = $('.link-farm-page-title').text();
      var collection = $(this).parents('.link-farm-collection-wrapper').find('.link-farm-collection-name').text();
      var link_name = $(this).text();
      ga('send', 'event', page_title, collection, $(this).text());
    });
  }

  ////////////////////////////////////////////////////////
  // Before document.ready();
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  // On document.ready();
  ////////////////////////////////////////////////////////
  function on_ready() {
    // Focuses the username input field when the /user page loads.
    if (window.location.pathname === '/user') {
      $("input#edit-name").focus();
    }

    // On any page except the new style frontpage, shorten the overlaygradients on grid videos, so the play button
    // isn't obscured.
    if (!$('body').hasClass('page-new-style-frontpage')) {
      shorten_video_gradients();
    }
    change_duplicate_news_listing_launchers();

    if ($('body').hasClass('node-type-slideshow')) {
      setup_slideshow_page();
    }

    if ($('body').hasClass('page-experts-guide')) {
      setup_experts_guide();
    }

    if ($('body').hasClass('page-quick-links')) {
      setup_quick_links();
    }

    // The theme owns the footer, so this file handles the GA for that part of the page.
    $('#footer #cb-legalese a').on('click', function() {
      ga('send', 'event', 'Footer', 'Legalese', $(this).text());
    });

    // This is here because in addition to the frontpage slider, Hero Images are also rendered on their node page.
    $('.node-hero-image').on('click', function(event) {
      var destination = $('a.read-more-link', this)[0].href;
      // If this Hero Image has been rendered within a slider, record a GA event for this click.
      if ($(this).parent().is('figure')) {
        ga('send', 'event', 'Slider', destination, $(this).parent().data('counter'));
      }
      // If there isn't a video in this Hero Image node, clicking anywhere inside it leads to the Link.
      if (!$(this).hasClass('video')) {
        return caltech_click_link(destination, event);
      }
    });

    // Set up the play and pause buttons for each milestone's recording. We need to use deligated events because on
    // the milestone map the dialog usually won't be open at page load time.
    $('.milestone-audio').on('click', function() {
      var button = $('img', this);
      // audio_element needs to be the <audio> element itself, not a jquery container, to use the play() function.
      var audio_element = $(this).children('audio')[0];
      if (button.hasClass('play')) {
        audio_element.play();
        button.attr('src', '/sites/all/themes/caltech_mte/img/audio-pause.png');
      }
      else {
        audio_element.pause();
        button.attr('src', '/sites/all/themes/caltech_mte/img/audio-play.png');
      }
      button.toggleClass('play pause');
    });
  }

  $(document).ready(on_ready);

  /////////////////////////////////////////////////////////
  // Set needed Drupal.behaviors variables
  /////////////////////////////////////////////////////////
  Drupal.behaviors.caltech_mte = {
    attach: function(context, settings) {
      trim_news_listing_body();
      add_play_button_to_videos();
      add_link_to_all_teaser_images();

      // Make all Teaser Listings clickable throughout the listing div, rather
      // than just on the title link. This is here because it needs to be run each time a new
      // page of infinite scroller results comes in.

      $('.node.view-mode-teaser_listing, .node.view-mode-teaser_series_listing, ' +
          '.node.view-mode-teaser_headline_story, .view-news-infinite-scroller .view-mode-teaser').each(function() {
        var url = $('div[class*="title"] a', this).attr('href');
        var link = $('<a>').attr('href', url).attr('class', 'clearfix');

        // Only wrap a listing if it isn't already wrapped.
        if (!$(this).children('a').length) {
          $(this).children().wrapAll(link);

          // Remove the Colorbox link that wraps video thumbnails. Allison wants user clicks to lead to the video's
          // full page, instead of playing it directly from the listing page.
          var top = $(this).find('.group-right .field-item');
          var top_wrapper = $(top).children('.file-video');
          var bottom_wrapper = top_wrapper.find('.file-video');
          top_wrapper.detach();
          top.append(bottom_wrapper);
        }
      });

      // Set up automatic elipsis generation on all teaser text.
      $(".view-news-infinite-scroller .group-left").dotdotdot();
      $("body.page-around-campus .group-left").dotdotdot();
      $("body.page-institute-announcements .group-left").dotdotdot();
    },
  };
}(jQuery, Drupal, this, this.document));
