(function($) {
  $.fn.menumaker = function(options) {
      var cssmenu = $(this),
          settings = $.extend({
              format: "dropdown",
              sticky: false
          }, options);
      return this.each(function() {
          $(this).find(".button").on('click', function() {
              $(this).toggleClass('menu-opened');
              var mainmenu = $(this).next('ul');
              if (mainmenu.hasClass('open')) {
                  mainmenu.slideToggle().removeClass('open');
              } else {
                  mainmenu.slideToggle().addClass('open');
                  if (settings.format === "dropdown") {
                      mainmenu.find('ul').show();
                  }
              }
          });
          cssmenu.find('li ul').parent().addClass('has-sub');
          multiTg = function() {
              cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
              cssmenu.find('.submenu-button').on('click', function() {
                  $(this).toggleClass('submenu-opened');
                  if ($(this).siblings('ul').hasClass('open')) {
                      $(this).siblings('ul').removeClass('open').slideToggle();
                  } else {
                      $(this).siblings('ul').addClass('open').slideToggle();
                  }
              });
          };
          if (settings.format === 'multitoggle') multiTg();
          else cssmenu.addClass('dropdown');
          if (settings.sticky === true) cssmenu.css('position', 'fixed');
          resizeFix = function() {
              var mediasize = 1000;
              if ($(window).width() > mediasize) {
                  cssmenu.find('ul').show();
              }
              if ($(window).width() <= mediasize) {
                  cssmenu.find('ul').hide().removeClass('open');
              }
          };
          resizeFix();
          return $(window).on('resize', resizeFix);
      });
  };
})(jQuery);

(function($) {
  $(document).ready(function() {
      $("#cssmenu").menumaker({
          format: "multitoggle"
      });
  });
})(jQuery);


// -- ***  signIn and signUp tab in modal box *** -- 

 // Show Tab 1 by default
 showTab('tab1');
 function showTab(tabId) {
   // Hide all tab contents
   var tabContents = document.getElementsByClassName('tab-content');
   for (var i = 0; i < tabContents.length; i++) {
     tabContents[i].classList.remove('active-tab');
   }
   // Show the selected tab content
   var selectedTab = document.getElementById(tabId);
   selectedTab.classList.add('active-tab');
   // Remove active class from all tab buttons
   var tabButtons = document.querySelectorAll('.tab-button');
   tabButtons.forEach(function(button) {
     button.classList.remove('active-tab-button');
   });
   // Add active class to the clicked tab button
   var clickedButton = document.getElementById('tabButton' + tabId.charAt(tabId.length - 1));
   clickedButton.classList.add('active-tab-button');
 }