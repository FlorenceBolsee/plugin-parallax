var windowHeight = $(window).height();
var parallaxEffect; //niveau de scroll de la page transformé en valeur du top du block

var scrollLevel; //niveau de scroll de la page
var scrollParallax; //niveau de scroll moins l'offset().top de la zone dans laquelle l'effet parallax se produit


//Pas besoin d'ajouter la hauteur de fenêtre pour le premier block car son offset().top est 0
var $parallax = $('.parallax');
var parallaxBlocks = [];
$parallax.each(function() {
  var $this = $(this);
  parallaxBlocks.push({
    target:         $this,
    blockTop:       $this.offset().top,
    blockHeight:    $this.height(),
    blockBot:       $this.offset().top + $this.height(),
    blockParallax:  $this.data("parallax")
  });
});
console.log(parallaxBlocks);

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
    $parallax.each(
      function(){
        var newTop = "-" + $(this).data("parallax");
        var newHeight = $(this).data("parallax") + $(this).height();
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
    parallaxBlocks.forEach(function(element) {
      if(scrollLevel > element.blockTop && scrollLevel < element.blockBot) {
        scrollParallax = scrollLevel - element.blockTop;
        parallax (scrollParallax, element.blockHeight, element.target, element.blockParallax);
      }
    });
  }
);
