jQuery(document).ready(function($){

  function add_searchform_to_access() {
    if($(window).width() < 768 && $('#access div.menu ul li.searchbar').size() < 1){
      $("#access div.menu > ul").prepend('<li class="page_item searchbar"></li>');
      $("#searchform").detach().prependTo("#access div.menu ul li.searchbar");
    } else if($(window).width() >= 768 && $('#access div.menu ul li.searchbar').size() == 1){
      $("#searchform").detach().prependTo("#branding");
      $('#access div.menu ul li.searchbar').remove();
    }
  }

  // #collapse
  $(".collapse").click(function(event){
    var menu = $("#access ul:eq(0)"),
        savedStyle = menu.attr('style');
    event.preventDefault();
    $(this).toggleClass('open');
    menu.animate({'height':'toggle'}, function() {
      $(this).toggleClass('in');
      // Remove any animation style="" attrs added
      // and replace the original pre-animation style attr.
      if ( savedStyle ) {
        $(this).attr('style', savedStyle || '');
      }
      else {
        $(this).removeAttr('style');
      }
    });
  });

  //a little responsiveness
  if($('#access div.menu').size() > 0){

    //On load, if screen is less than 768, move #search form into nav bar
    add_searchform_to_access();

    //On Resize, if screen is less than 768, move #search form into nav bar
    $(window).resize(function() {
      add_searchform_to_access();
    });
  }

  // Add a caret to nav links with children
  $("ul.children, ul.sub-menu").siblings('a').append('<b class="caret"></b>');
});
