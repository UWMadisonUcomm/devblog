// Highlight.js
hljs.tabReplace = '    ';
hljs.initHighlightingOnLoad();

$(function() {
  var loc = window.location.pathname;

  $('.navbar-nav > li > a').each(function() {
    $(this).parent().toggleClass('active', $(this).attr('href') == loc);
  });
});
