var winHeight = $(window).height();
var winWidth = $(window).width();
var winScroll = $(this).scrollTop();
var hoursCost = 350;
var kilometersCost = 12;


var scrollFade = function(className, inColor, outColor){
  if(winScroll > winHeight - 50){
      $(className).css({"backgroundColor": inColor});
  }
  else{
      $(className).css({"backgroundColor": outColor});
  }
}

function changeSection(classArray, winScroll){
    var flag = true;

    for(var i = 0; i < classArray.length && flag; i++) {
        if ($(classArray[i]).length > 0 && winScroll >= $(classArray[i]).offset().top - 101) {
            $("a[href='" + classArray[i] + "']").addClass("menu__link--hover");
            classArray.splice(i,1);
            flag = false;
        }
    }

    for(var i = 0; i < classArray.length; i++){
        $("a[href='" + classArray[i] + "']").removeClass("menu__link--hover");
    }
}


$(document).ready(function() {

    $(".header").css({"height": winHeight});
    $(".app-menu").css({"height":winHeight});

    //fade menu
    $(window).on("scroll resize", function(){
        winScroll = $(this).scrollTop();
        winWidth = $(this).width();

        $(".app-menu").css({"height":"100%"});

        scrollFade(".menu", "rgba(0,0,0,1)", "rgba(0,0,0,0.5)");
        scrollFade(".telephone", "rgba(0,0,0,1)", "rgba(0,0,0,0.5)");
        if(winWidth <= 750 - 15){
          scrollFade(".menu__element", "rgba(0,0,0,1)", "rgba(0,0,0,0.5)");
        }
        else{
          scrollFade(".menu__element", "transparent", "transparent");
        }
        changeSection(["#contact", "#services","#about"],winScroll);
    });

    // application menu
    var delayPopup = setTimeout(function(){
      $(".notification-popup").addClass("notification-popup--open");
    },3000);

    $(".notification-popup, .blind, .calculator").on("mouseleave", function(){
      $(".notification-popup").removeClass("notification-popup--open");
    });

    $(".blind, .notification-popup").on("click", function(){
        if($(".app-menu").hasClass("app-menu--open")){
            $(".app-menu").removeClass("app-menu--open");
            $(".blind").removeClass("blind--open");
            $(".blind__line1").removeClass("blind__line1--open");
            $(".blind__line2").removeClass("blind__line2--open");
        }
        else{
            $(".app-menu").addClass("app-menu--open");
            $(".blind").addClass("blind--open");
            $(".blind__line1").addClass("blind__line1--open");
            $(".blind__line2").addClass("blind__line2--open");
        }
    });

    $("#btn-cost").on("click", function(){
        var hours = $("#city").val();
        var kilometers = $("#track").val();
        var cost = hoursCost * hours + kilometersCost * kilometers;
        if(isNaN(cost) || cost == 0){
            $(".calculator__cost").text("Необходимо вводить только цифры");
        }
        else {
            if(cost < 700){
                $(".calculator__cost").text("Цена: " + hoursCost * 2 + " руб.");
            }
            else {
                $(".calculator__cost").text("Цена: " + cost + " руб.");
            }
        }
    });

    $(".menu__link").on("mouseenter focus", function () {
        $(this).addClass("menu__link--hover");
    });
    $(".menu__link").on("mouseleave blur", function () {
        $(this).toggleClass("menu__link--hover");
    });

    $(".hamburger").on("click", function(){
      $(".menu").toggleClass("menu--open");
      $(".hamburger__line").toggleClass("hamburger__line--open");
    });

    //smooth scroll
    $("a[href*='#']").on("click", function(e){
        var anchor = $(this);

        $(".menu__link").removeClass("menu__link--active menu__link--hover");
        if(winWidth <= 750 - 15){
          $(".menu").removeClass("menu--open");
          $(".hamburger__line").removeClass("hamburger__line--open");
        }

        if($(this).hasClass("menu__link")){
          $(this).addClass("menu__link--active");
        }

        $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 100
            },
            Math.abs($(anchor.attr('href')).offset().top - 100 - winScroll),
            "swing"
        );
        e.preventDefault();
    });

    $("#order_sub").on("click",function(e){
      var name = $("#name").val();
      var tel = $("#tel").val();
      var message = $("#message").val();
      var obj = {
        "name": name,
        "tel": tel,
        "message": message
      };

      if(name != "" && message != "" && tel != "") {
          e.preventDefault();
          $.ajax({
              type: "POST",
              url: "../include/ajax/order.php",
              data: obj,
              dataType: "json",
              success: function () {
                $(".ajax-alert-popup").addClass("ajax-alert-popup--open");
                $(".window").addClass("window--done");
                $(".window__text--done").css({"display":"block"});
              },
              error: function () {
                $(".ajax-alert-popup").addClass("ajax-alert-popup--open");
                $(".window").addClass("window--error");
                $(".window__text--error").css({"display":"block"});
              }
          });
      }
    });

    $(".window__button--close").on("click",function(){
        $(".ajax-alert-popup").fadeOut(400);
        $(".window__text").removeClass("window__text--done window__text--error");
    });
});
