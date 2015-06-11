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
        color: '#73148b',
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


// Smooth Scrolling
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


function getSomeAsteroids() {

  if ( ! window.ASTEROIDSPLAYERS )
  	window.ASTEROIDSPLAYERS = [];

  if ( window.ActiveXObject && ! document.createElement('canvas').getContext ) {
  	try {
  		var xamlScript = document.createElement('script');
  		xamlScript.setAttribute('type', 'text/xaml');
  		xamlScript.textContent = '<?xml version="1.0"?><Canvas xmlns="http://schemas.microsoft.com/client/2007"></Canvas>';
  		document.getElementsByTagName('head')[0].appendChild(xamlScript);
  	} catch ( e ) {}

  	var script = document.createElement("script");
  	script.setAttribute('type', 'text/javascript');
  	script.onreadystatechange = function() {
  		if ( script.readyState == 'loaded' || script.readyState == 'complete' ) {
  			if ( typeof G_vmlCanvasManager != "undefined" )
  				window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length] = new Asteroids();
  		}
  	};
  	script.src = "http://erkie.github.com/excanvas.js";
  	document.getElementsByTagName('head')[0].appendChild(script);
  }
  else window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length] = new Asteroids();

  var trackingFrame = document.createElement('iframe');
  trackingFrame.src = 'http://erkie.github.com/tracking.html';
  trackingFrame.frameborder = '0';
  trackingFrame.style.position = 'absolute';
  trackingFrame.style.top = "-1000px";
  trackingFrame.style.height = "0px";
  trackingFrame.style.width = "0px";

  document.getElementsByTagName('body')[0].appendChild(trackingFrame);

}


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

    console.log('IT\'S KONAMI TIME!');
    ga('send', 'konami');
    getSomeAsteroids();

  }

});

$(document).ready(function() {

  var headerParticles = setParticles('header-particles');

  var pattern = Trianglify({
    cell_size: 75,
    variance: 1,
    x_colors: ['#000000', '#333333'],
    y_colors: ['#000000', '#AB5FBE'],
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
