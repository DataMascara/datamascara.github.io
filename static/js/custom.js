$(function() {
    $(".links").addClass('animated rubberBand');

    $('.banner').unslider({
      speed: 700,
      delay: 5000,
      complete: function() {},
      keys: true,
      dots: true,
      fluid: true
    });

});
