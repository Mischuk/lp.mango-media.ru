function stepsCarousel() {
  $('.steps').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    console.log(nextSlide);
    $('.steps-nav li').removeClass('current');
    $('.steps-nav li').eq(nextSlide).addClass('current');
  });

  $('.steps').slick({
    arrows: false,
    dots: false,
    infinite: false,
    speed: 0,
    fade: true
  });
  $('.steps-nav li').on('mouseenter', function () {
    $(this).trigger('click');
  });
  $('.steps-nav li').on('click', function () {
    var slider = $( '.steps' );
    slideIndex = $(this).index();
    slider[0].slick.slickGoTo(parseInt(slideIndex));
    $('.steps-nav li').removeClass('current');
    $(this).addClass('current');
  });


};
stepsCarousel();