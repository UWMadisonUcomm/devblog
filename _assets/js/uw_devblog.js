// Highlight.js
hljs.tabReplace = '    ';
hljs.initHighlightingOnLoad();

$(function() {
  // Bootstrap all div.carousel
  $('.carousel').carousel();

  var loc = window.location.pathname;

  $('.navbar-nav > li > a').each(function() {
    $(this).parent().toggleClass('active', $(this).attr('href') == loc);
  });
});
