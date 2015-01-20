function setParticles(id) {

  return particlesJS(id, {
    canvas: {
      height: 800
    },
    particles: {
      color: '#fff',
      shape: 'circle', // "circle", "edge" or "triangle"
      opacity: 0.5,
      size: 4,
      size_random: true,
      nb: 250,
      line_linked: {
        enable_auto: true,
        distance: 100,
        color: '#fff',
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
      detect_on: 'canvas', // "canvas" or "window"
      mode: 'grab',
      line_linked: {
        opacity: 0.5
      },
      events: {
        onclick: {
          enable: true,
          mode: 'push', // "push" or "remove" (particles)
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


$(document).ready(function() {

  var headerParticles = setParticles('header-particles');

})