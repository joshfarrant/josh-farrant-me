function setParticles(id) {

  return particlesJS(id, {
    canvas: {
      height: 800
    },
    particles: {
      color: '#fff',
      shape: 'circle', // 'circle', 'edge' or 'triangle'
      opacity: 0.5,
      size: 4,
      size_random: true,
      nb: 250,
      line_linked: {
        enable_auto: true,
        distance: 100,
        color: '#19B5FE',
        opacity: 0.7,
        width: 1,
        condensed_mode: {
          enable: false,
          rotateX: 600,
          rotateY: 600
        }
      },
      anim: {
        enable: true,
        speed: 1
      }
    },
    interactivity: {
      enable: true,
      mouse: {
        distance: 250
      },
      detect_on: 'canvas', // 'canvas' or 'window'
      mode: 'grab',
      line_linked: {
        opacity: 0.5
      },
      events: {
        onclick: {
          enable: true,
          mode: 'push', // 'push' or 'remove' (particles)
          nb: 4
        }
      }
    },
    /* Retina Display Support */
    retina_detect: true
  });

}

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 30
        }, 1000);
        return false;
      }
    }
  });
});

$('#footer-submit').click(function() {

  var contact = {
    name: $('input#name').val(),
    email: $('input#email').val(),
    message: $('textarea#message').val()
  };

  var jsonContact = JSON.stringify(contact);

  console.log(jsonContact);

});

// Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-59013775-1', 'auto');
ga('send', 'pageview');


// Konami Code

var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";

$(document).keydown(function(e) {

  kkeys.push( e.keyCode );

  if ( kkeys.toString().indexOf( konami ) >= 0 ) {

    $(document).unbind('keydown',arguments.callee);

    // do something awesome
    alert('KONAMI!');

  }

});

$(document).ready(function() {

  var headerParticles = setParticles('header-particles');

  var pattern = Trianglify({
    cell_size: 75,
    variance: 1,
    x_colors: ['#000000', '#333333'],
    y_colors: ['#000000', '#018fd0'],
    palette: Trianglify.colorbrewer,
    color_space: 'lab',
    color_function: false,
    stroke_width: 1.51,
    width: 1920,
    height: 560,
    seed: null
  }).png();

  var dataUrl = 'url('+pattern+')';

  $('footer').css('background-image', dataUrl);



});
