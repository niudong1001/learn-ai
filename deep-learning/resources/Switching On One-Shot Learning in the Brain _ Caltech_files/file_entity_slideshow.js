/*global Drupal:true */
(function($) {

  // Global var used by resize_slideshow_images() which will get set up in resize_image_slideshow().
  var new_slide_height;

  function resize_slideshow_images(slide) {
    slide = $(slide);
    if (slide.height() > new_slide_height) {
      var img = $('img', slide);
      var img_ratio = img.height()/img.width();
      var caption = $('div.field-name-field-caption', slide);
      var caption_height = caption.length ? (caption.height() + parseInt(caption.css('margin-top'))) : 0;
      var sane_label = $('div.field-name-credit-sane-label', slide);
      var sane_label_height = sane_label.length ? (sane_label.height() + parseInt(sane_label.css('margin-top'))) : 0;

      img.attr('height', new_slide_height - caption_height - sane_label_height);
      img.attr('width', img.height() / img_ratio);
    }
  }

  // News articles which have multiple images with dramatically different dimentions cause large amounts of
  // white-space to appear between the pager and the caption/image. This function inspects the height of the entire
  // slideshow mechanism and the number of images, and resizes thee tall ones so they don't make the short ones look
  // bad.
  function resize_image_slideshow(context) {
    var pager = $('ul.file-entity-slideshow-pager', context);
    var pager_height, image_count;
    if (pager.length) {
      pager_height = pager.height() + parseInt(pager.css('margin-top'));
      image_count = pager.children().length;
    }
    else {
      pager_height = 0;
      image_count = 1;
    }
    var slides = $('li.file-entity-slideshow-slide', context);

    // Determine the median height of the slides.
    var heights = [];
    _.each(slides, function(slide) {
      heights.push($(slide).height());
    });
    heights.sort();
    var median_height = heights[Math.floor(heights.length/2)];
    // If there are only 2, take the shorter one as the median.
    if (heights.length == 2) {
      median_height = heights[0];
    }

    // Set the new maximum slide height to the median height of the slides.
    new_slide_height = median_height;

    // Resize the too-tall images inside the slides.
    // Need to wait a bit on Firefox due to a render anomaly.
    window.setTimeout(250, function() {
      _.each(slides, resize_slideshow_images);
    });
  }

  var resized = false;
  Drupal.behaviors.file_entity_slideshow = {
    attach: function (context) {
      var i;
      for (i in Drupal.settings.file_entity_slideshow) {
        var settings = Drupal.settings.file_entity_slideshow[i];
        var slideshow = $('.' + i);
        if (!slideshow.hasClass('file-entity-slideshow-processed')) {
          slideshow.addClass('file-entity-slideshow-processed');
          var carouselops = {
            buttonNextHTML: null,
            buttonPrevHTML: null,
            visible: 1,
            scroll: 0,
            animation: 'fast',
            itemLoadCallback: function(){
              var slides = $('div.field-name-field-images');
              // If this is a page that uses the "field_images" field, call resize_image_slideshow()
              // exactly once, after the images have finished loading onto the page.
              // This would go in initCallback, but that fires before the images finish loading.
              if (slides.length && !resized) {
                resize_image_slideshow(slides);
                resized = true;
              }
            },
            initCallback: function(carousel) {
              $("#" + i + "-pager a.clicker").unbind('click').bind('click', function() {
                var scrollto = parseInt($(this).attr("data"), 10);
                carousel.scroll(scrollto);
                return false;
              });
            }
          };
          $("#" + i + "-pager .file-video:not(:has(div.play-button)) .content").append('<div class="play-button"></div>');
          $("#" + i + "-pager .file-image img, #" + i + "-pager .file-video .play-button").each(function (index) {
            $(this).wrap(function () {
              return '<a href="#" class="clicker" data="' + (index + 1) + '" />';
            });
          });
          slideshow.jcarousel(carouselops);
        }
      }
    }
  };
}(jQuery));
