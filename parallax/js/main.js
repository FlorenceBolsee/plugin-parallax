var windowHeight = $(window).height();
var parallaxEffect; //niveau de scroll de la page transformé en valeur du top du block

var scrollLevel; //niveau de scroll de la page
var scrollparallax; //niveau de scroll moins l'offset().top de la zone dans laquelle l'effet parallax se produit

var $block1 = $(".block1");
var $block2 = $(".block2");
var $block3 = $(".block3");

//pour adapter les blocks en fonction du data attribute "parallax"
var newHeight;
var newTop;

//Pas besoin d'ajouter la hauteur de fenêtre pour le premier block car son offset().top est 0
var block1Top = $block1.offset().top;
var block1Height = $block1.height();
var block1Bot = block1Top + block1Height;
var block1Parallax = $block1.data("parallax");

var block2Top =  $block2.offset().top - windowHeight;
var block2Height = $block2.height() + windowHeight;
var block2Bot = block2Top + block2Height;
var block2Parallax = $block2.data("parallax");

var block3Top = $block3.offset().top - windowHeight;
var block3Height = $block3.height() + windowHeight;
var block3Bot = block3Top + block3Height;
var block3Parallax = $block3.data("parallax");

//pour transformer le niveau de scroll de la fenêtre en valeur de top
function parallax (scroll, height, target, depth) {
  parallaxEffect = (scroll / height * depth - depth);
  target.css({
    top: parallaxEffect
  });
}

//pour adapter les blocks en fonction de leur data attribute "parallax"
$(document).ready(
  function(){
    $(".parallax").each(
      function(){
        newTop = "-" + $(this).data("parallax") + "px";
        newHeight = $(this).data("parallax") + $(this).height() + "px";
        $(this).css({
          'height': newHeight,
          'top': newTop
        });
      }
    );
  }
);

//déclenchement de l'effet parallax, réduire les répétitions ?
$(document).scroll(
  function (){
    scrollLevel = $(window).scrollTop();

    if(scrollLevel > block1Top && scrollLevel < block1Bot) {
      scrollparallax = scrollLevel - block1Top;
      parallax (scrollparallax, block1Height, $block1, block3Parallax);
    }
    if(scrollLevel > block2Top && scrollLevel < block2Bot){
      scrollparallax = scrollLevel - block2Top;
      parallax (scrollparallax, block2Height, $block2, block3Parallax);
    }
    if(scrollLevel > block3Top && scrollLevel < block3Bot){
      scrollparallax = scrollLevel - block3Top;
      parallax (scrollparallax, block3Height, $block3, block3Parallax);
    }

  }
);
