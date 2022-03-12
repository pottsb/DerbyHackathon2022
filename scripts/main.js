debugMode = true;
StdLength = 500;
elements =  document.getElementsByClassName("StaticOuterBox");//['.OuterBoxOne', '.OuterBoxTwo', '.OuterBoxThree', '.OuterBoxFour'];
 test = jQuery.makeArray( elements );
 screens = ['.OuterBoxOne', '.OuterBoxTwo', '.OuterBoxThree', '.OuterBoxFour'];

$(function () {


  //sets the document lendth relative to how many screens are used.
  docLen = ( screens.length * 1000)
  $(".mainContainer").css("height", docLen+"px");


  //functions called when scrolling happens
  $(window).scroll(function() {
    crossFade(screens, StdLength)
    Fade('.murloc', 1200)
    screens.forEach(ShowHide);
  });

  $(".murloc").click(function(){
    console.log("asdasd");
    $(".murlocHead").animate({top: '11%'}).animate({left: '60%'}, "slow").animate({top: '20%'}, function () { $(this).removeAttr('style'); });
  });


  //Don't ask - https://i.imgur.com/Lda77tU.jpg
  function ShowHide(item){
      if($(item).css("opacity") == 0){
        $(item).hide();
      }else{
        $(item).show();
      }
  }

  function crossFade(elements, len) {

    //stores the current page position
    PagePosition = document.documentElement.scrollTop;

    //sets which sceens are active based on page position
    if(PagePosition < 500){
      indexPos = 0;
    }else{
      indexPos = Math.floor(PagePosition / 1000)
    }
    element1 = elements[indexPos];
    element2 = elements[indexPos+1];
    
    //sets the fade in and out points
    fadeBase = (indexPos * StdLength * 2) + 500;
    fadeStart = fadeBase;
    fadeEnd = fadeBase + 500;



    //an attempt to make sure pages are fully visable or fully hidden
    if (PagePosition < fadeStart) {
      position = 0;
    }else if(PagePosition > fadeEnd){
      position = 1;
    }else{ 
        position = (PagePosition - fadeStart) / (fadeEnd - fadeStart)
    }
    if(indexPos => 1){
      $(elements[indexPos-1]).css({ opacity: 0 });
    }

  
      
    if(false){console.log("Element1: " + element1 + " Element2: " + element2 + " Absolute position: " + PagePosition + " Opacity: " + position +" FadeBase: " + fadeBase + "Fade Start: " + fadeStart + "Fade End: " + fadeEnd)}
    
    //update opacity
    $(element1).css({ opacity: 1 - position });
    $(element2).css({ opacity: position });

  }

  function Fade(element, fadeStart){

    if (document.documentElement.scrollTop  > fadeStart) {
      $(element).fadeIn("slow");
    }else{
      $(element).fadeOut();
    }
  }





});