"use strict";

var winHeight       = document.documentElement.clientHeight;
var winWidth        = document.documentElement.clientWidth;
var winScroll       = window.pageYOffset || document.documentElement.scrollTop;
var XHR             = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var HOURS_COST      = 350;
var KILOMETERS_COST = 12;


function scrollFade(className, inColor, outColor){
  var elements = document.querySelectorAll(className);
  var i = 0;

  if(winScroll > winHeight - 50){
    for(i = 0; i < elements.length; i++){
      elements[i].style.backgroundColor = inColor;
    }
  }
  else{
    for(i = 0; i < elements.length; i++){
      elements[i].style.backgroundColor = outColor;
    }
  }
}

function changeSection(idArray, winScroll){
  var flag = true;

  // Clear hover class on nav section, but didn't action class.
  for(var i = 0; i < idArray.length; i++){
    var navLink = document.querySelector("a[href='" + idArray[i] + "']");

    removeClass(navLink,"menu__link--hover");
  }

  for(var i = 0; i < idArray.length && flag; i++) {
    var pageSection = document.querySelector(idArray[i]);

    if (winScroll >= pageSection.offsetTop - 101) {
      var navLink = document.querySelector("a[href='" + idArray[i] + "']");

      addClass(navLink,"menu__link--hover");
      idArray.splice(i,1);
      flag = false;
    }
  }
}

function changeNav(){
  winScroll = window.pageYOffset || document.documentElement.scrollTop;
  winWidth  = document.documentElement.clientWidth;

  scrollFade(".menu", "rgba(0,0,0,1)", "rgba(0,0,0,0.5)");
  scrollFade(".telephone", "rgba(0,0,0,1)", "rgba(0,0,0,0.5)");

  if(winWidth <= 750 - 15){
    scrollFade(".menu__element", "rgba(0,0,0,1)", "rgba(0,0,0,0.5)");
  }
  else{
    scrollFade(".menu__element", "transparent", "transparent");
  }

  changeSection(["#contact", "#services","#about"],winScroll);
}

function closeNotificationPoopup(){
  removeClass(document.querySelector(".notification-popup"), "notification-popup--open");
}

function openCloseCalculator(){
  if(hasClass(document.querySelector(".app-menu"),"app-menu--open")){
    removeClass(document.querySelector(".app-menu"),"app-menu--open");
    removeClass(document.querySelector(".blind"), "blind--open");
    removeClass(document.querySelector(".blind__line1"),"blind__line1--open");
    removeClass(document.querySelector(".blind__line2"),"blind__line2--open");
  }
  else{
    addClass(document.querySelector(".app-menu"),"app-menu--open");
    addClass(document.querySelector(".blind"),"blind--open");
    addClass(document.querySelector(".blind__line1"),"blind__line1--open");
    addClass(document.querySelector(".blind__line2"),"blind__line2--open");
  }
}

function addClass(element, strClassesName){
  var arClassesName = strClassesName.split(" ");

  for(var i = 0; i < arClassesName.length; i++){
    element.className += " " + arClassesName[i];
  }

  element.className = element.className.trim();

  return element.className;
}

function removeClass(element, strClassesName){
  var arElementClasses  = element.className.trim().split(" ");
  var arClassesName     = strClassesName.trim().split(" ");
  element.className     = "";

  nextClass:  for(var i = 0; i < arElementClasses.length; i++){
    for(var j = 0; j < arClassesName.length; j++){
      if(arElementClasses[i] === arClassesName[j]){
        continue nextClass;
      }

    }
    element.className += " " + arElementClasses[i];
  }

  element.className = element.className.trim();

  return element.className;
}

function toggleClass(element, strClassesName){
  var arClassesName = strClassesName.trim().split(" ");


  var isSetClasses = arClassesName.every(function(currentValue, item, arr){
    return hasClass(element, currentValue);
  });

  if(isSetClasses){
    removeClass(element, strClassesName);
  }
  else{
    addClass(element, strClassesName);
  }

  return isSetClasses;
}

function hasClass(element, strClassName){
  var strElementClasses = " " + element.className.trim() + " ";
  strClassName          = strClassName.trim();

  if(~strElementClasses.indexOf(" " + strClassName + " ")){
    return true;
  }

  return false;
}

document.addEventListener("DOMContentLoaded",function(){
  var header            = document.querySelector(".header");
  var appMenu           = document.querySelector(".app-menu");
  var menu              = document.querySelector(".menu");
  var hamburgerLines    = document.querySelectorAll(".hamburger__line");
  var btnCost           = document.querySelector("#btn-cost");
  var orderSub          = document.querySelector("#order_sub");
  var notificationPopup = document.querySelector(".notification-popup");
  var blind             = document.querySelector(".blind");
  var calculator        = document.querySelector(".calculator");
  var menuLinks         = document.querySelectorAll(".menu__link");
  var windowButtonClose = document.querySelector(".window__button--close");
  var windowPopup       = document.querySelector(".window");
  var windowPopupText   = document.querySelector(".window__text");
  var hamburger         = document.querySelector(".hamburger");
  var ajaxAlertPopup    = document.querySelector(".ajax-alert-popup");
  var allAnchorLinks    = document.querySelectorAll("a[href*='#']");

  header.style.height   = winHeight + "px";
  appMenu.style.height  = "100%";

  //Events
  window.addEventListener("scroll", changeNav);
  window.addEventListener("resize", changeNav);

  notificationPopup.addEventListener("mouseleave", closeNotificationPoopup);
  blind.addEventListener("mouseleave", closeNotificationPoopup);
  calculator.addEventListener("mouseleave", closeNotificationPoopup);

  btnCost.addEventListener("click", function(){
    var hours       = document.querySelector("#city").value;
    var kilometers  = document.querySelector("#track").value;
    var cost        = HOURS_COST * hours + KILOMETERS_COST * kilometers;

    if(isNaN(cost) || cost == 0){
      document.querySelector(".calculator__cost").innerHTML = "Необходимо вводить только цифры";
    }
    else {
      if(cost < 700){
        document.querySelector(".calculator__cost").innerHTML = "Цена: " + HOURS_COST * 2 + " руб.";
      }
      else {
        document.querySelector(".calculator__cost").innerHTML = "Цена: " + cost + " руб.";
      }
    }
  });

  var delayPopup = setTimeout(function(){
    addClass(notificationPopup, "notification-popup--open");
  },3000);

  blind.addEventListener("click", openCloseCalculator);
  notificationPopup.addEventListener("click", openCloseCalculator);

  for(var i = 0; i < menuLinks.length; i++){
    menuLinks[i].addEventListener("mouseenter", function(){
      addClass(this, "menu__link--hover");
    });

    menuLinks[i].addEventListener("focus", function(){
      addClass(this, "menu__link--hover");
    });

    menuLinks[i].addEventListener("mouseleave", function(){
      removeClass(this, "menu__link--hover");
    });

    menuLinks[i].addEventListener("blur", function(){
      removeClass(this, "menu__link--hover");
    });
  }

  hamburger.addEventListener("click", function(){
    toggleClass(menu, "menu--open");

    for(var i = 0; i < hamburgerLines.length; i++){
      toggleClass(hamburgerLines[i], "hamburger__line--open");
    }
  });

  //smooth scroll
  for(var i = 0; i < allAnchorLinks.length; i++){
    allAnchorLinks[i].addEventListener("click",function(e){
      var anchor                    = this;
      var currentPositionToTop      = window.pageYOffset;
      var currentPositionToElement  = Math.round(document.querySelector(anchor.hash).getBoundingClientRect().top,0);
      var start                     = null;
      var speed                     = 0.75;

      for(var j = 0; j < menuLinks.length; j++){
        removeClass(menuLinks[j], "menu__link--active menu__link--hover");
      }

      if(winWidth <= 750 - 15){
        removeClass(menu, "menu--open");

        for(var j = 0; j < hamburgerLines.length; j++){
          removeClass(hamburgerLines[j], "hamburger__line--open");
        }
      }

      if(hasClass(anchor, "menu__link")){
        addClass(anchor, "menu__link--active");
      }

      window.requestAnimationFrame(step);
      function step(time){
        var progress;
        var finalDestination;

        if(start === null){
          start = time;
        }

        progress = time - start;

        if(currentPositionToElement < 0){
          finalDestination = Math.max(
            currentPositionToTop - progress/speed,
            currentPositionToTop + currentPositionToElement
          );
        }
        else{
          finalDestination = Math.min(
            currentPositionToTop + progress/speed,
            currentPositionToTop + currentPositionToElement
          );
        }

        window.scrollTo(0, finalDestination);

        if(finalDestination != currentPositionToTop + currentPositionToElement){
          window.requestAnimationFrame(step);
        }
        else{
          location.hash = anchor.hash;
        }
      }

      e.preventDefault();
    });
  }

  orderSub.addEventListener("click", function(e){
    var name    = document.querySelector("#name").value;
    var tel     = document.querySelector("#tel").value;
    var message = document.querySelector("#message").value;

    if(name != "" && message != "" && tel != "") {
      e.preventDefault();
      var xhr = new XHR();
      var parameters = "name=" + encodeURIComponent(name) + "&" + "tel=" + encodeURIComponent(tel) + "&" + "message=" + encodeURIComponent(message);

      xhr.open("POST", "../include/ajax/order.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(parameters);

      xhr.onreadystatechange = function(){
        if(xhr.readyState != 4) return;

        if(xhr.status == 200){
          //success
          addClass(ajaxAlertPopup, "ajax-alert-popup--open");
          addClass(windowPopup, "window--done");
          document.querySelector(".window__text--done").style.display = "block";
        }
        else{
          //error
          addClass(ajaxAlertPopup, "ajax-alert-popup--open");
          addClass(windowPopup, "window--error");
          document.querySelector(".window__text--error").style.display = "block";
        }
      }
    }
  });

  windowButtonClose.addEventListener("click", function(){
    removeClass(ajaxAlertPopup, "ajax-alert-popup--open");
    removeClass(windowPopup, "window--done window--error");
    document.querySelector(".window__text--done").style.display = "none";
    document.querySelector(".window__text--error").style.display = "none";
  });
});
