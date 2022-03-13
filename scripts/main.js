const debugMode = true;
const StdLength = 500; //Pretty sure if you change this the website will go on fire.
const screenNames = ['.OuterBoxOne', '.OuterBoxTwo', '.OuterBoxThree', '.OuterBoxFour'];

$(function () {

  //stores direct refrences to all screens in the docment in an array
  storedScreens = StoreScreens(screenNames);

  //sets the document lendth relative to how many screens are used.
  docLen = ( screenNames.length * 1000)
  $(".mainContainer").css("height", docLen+"px");

  //functions called when scrolling happens
  $(window).scroll(function() {
    crossFade(screenNames, StdLength)
    Fade('.murloc', 1200)
    storedScreens.forEach(ShowHide); //-- remove the need for this asap.
  });

  $(".murloc").click(function(){
    $(".murlocHead").animate({top: '11%'}).animate({left: '60%'}, "slow").animate({top: '20%'}, function () { $(this).removeAttr('style'); });
  });

  //Looks up and stores direct refrences to screens. Doing this just once to try improve performance.
  function StoreScreens(classArray){

    elementArray = new Array();

    classArray.forEach(function(item){
      elementArray.push($(item));
    })

    return elementArray;
  }

  //https://i.imgur.com/Lda77tU.jpg
  function ShowHide(item){
      if(item.css("opacity") == 0){
        item.hide();
      }else{
        item.show();
      }
  }

  function crossFade(elements, len) {

    //stores the current page position
    pagePosition = document.documentElement.scrollTop;

    //calculates the index of the currently active pages
    if(pagePosition < StdLength){
      indexPos = 0;
    }else{
      indexPos = Math.floor(pagePosition / 1000)
    }

    //store references to the active pages
    element1 = storedScreens[indexPos];
    element2 = storedScreens[indexPos+1];

    //sets the fade in and out points
    fadeBase = (indexPos * StdLength * 2) + StdLength;
    fadeStart = fadeBase;
    fadeEnd = fadeBase + StdLength;


    //an attempt to make sure pages are fully visable or fully hidden --- REWRITE THIS!!!!!
    if (pagePosition < fadeStart) {
      opacity = 0;
    }else if(pagePosition > fadeEnd){
      opacity = 1;
    }else{ 
      opacity = (pagePosition - fadeStart) / (fadeEnd - fadeStart)
    }
    if(indexPos > 1){
      storedScreens[indexPos-1].css({ opacity: 0 });
    }
  
    if(debugMode){console.log("Element1: " + element1 + " Element2: " + element2 + " Absolute position: " + pagePosition + " Opacity: " + opacity +" FadeBase: " + fadeBase + "Fade Start: " + fadeStart + "Fade End: " + fadeEnd)}
    
    //update opacity while checking if screens are out of bounds (before first screen, after end screen).
    if(indexPos > 1){element1.css({ opacity: 1 - opacity });}
    if(indexPos + 1 < storedScreens.length){element2.css({ opacity: opacity });}
    

  }

  function Fade(element, fadeStart){

    if (document.documentElement.scrollTop  > fadeStart) {
      $(element).fadeIn("slow");
    }else{
      $(element).fadeOut();
    }
  }





});