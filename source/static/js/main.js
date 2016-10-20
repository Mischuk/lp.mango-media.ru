$(function() {
    $('a[href="#"]').click(function(e){ e.preventDefault(); });


    /*! Mask for form's input */
    function inputMask() {
      $(".mask-date").mask("99.99.9999",{placeholder:"__.__.____"});
      $(".mask-year").mask("9999",{placeholder:""});
      $(".mask-tel").mask("+7 (999) 999-99-99",{placeholder:"X"});
    };
    inputMask();

    $(document).on('click', '.ripple', function(e) {
      var $rippleElement = $('<span class="ripple-effect" />'),
        $buttonElement = $(this),
        btnOffset = $buttonElement.offset(),
        xPos = e.pageX - btnOffset.left,
        yPos = e.pageY - btnOffset.top,
        size = parseInt(Math.min($buttonElement.height(), $buttonElement.width()) * 0.5),
        animateSize = parseInt(Math.max($buttonElement.width(), $buttonElement.height()) * Math.PI);

      $rippleElement
        .css({
          top: yPos,
          left: xPos,
          width: size,
          height: size,

          backgroundColor: $buttonElement.data("ripple-color")
        })
        .appendTo($buttonElement)
        .animate({
          width: animateSize,
          height: animateSize,
          opacity: 0
        }, 700, function() {
          $(this).remove();
        });
    });

    function servicesCalc() {
      var chosen = '';
      var result = '';
      $('input[name=services]').on('change', function(){
        if ($(this).is(':checked')) {
          var value = $(this).val();
          if (chosen == '') {
            chosen += value;
          } else {
            chosen += ', ' + value;
          }
          result = chosen;
        } else if ( $('input[name=services]:checked').length == 0 ) {
            chosen = '';
            chosenRemoved = '';
            result = '';
          } else {
          var chosenRemoved = '';
          $('input[name=services]').each(function(){
            if ( $(this).is(':checked') ) {
              var value = $(this).val();
              if (chosenRemoved == '') {
                chosenRemoved += value;
              } else {
                chosenRemoved += ', ' + value;
              }
              result = chosenRemoved;
              chosen = chosenRemoved;
            }
          });
        }

        console.log(result);
        $('input[name=types]').val(result);
      });
    };
    servicesCalc();


    function steps() {
      $('.steps-nav li').mouseenter(function() {
        var current = $(this).index();
        console.log(current);
        $('.steps .item').removeClass('current');
        $('.steps .item').eq(current).addClass('current');

        $('.steps-nav li').removeClass('current');
        $(this).addClass('current');
      }).mouseleave(function () {
        // console.log('sd');
      });
    };
    steps();

    $('.popup-with-zoom-anim').magnificPopup({
      type: 'inline',
      modal: true,
      preloader: false,
      removalDelay: 0,
      alignTop: false,
      overflowY: 'hidden',
      mainClass: 'my-mfp-zoom-in',
      closeOnContentClick: false,
      callbacks: {
          open: function() {
            $('html, body').css('overflow', 'hidden');
          },
          close: function(item) {
            $('html, body').removeAttr('style');
            $('.small-container').each(function(){
              var h2 = $(this).find('h2').data('title');
              var p = $(this).find('p').data('title');
              $(this).find('h2').text(h2);
              $(this).find('p').text(p);
            });
            $('.small-container .form').show();
          }
        }

    });
    $(document).on('click', '.popup-modal-dismiss', function (e) {
      e.preventDefault();
      $.magnificPopup.close();
    });
    var $select = $('.js-select');
    $select.on("select2:open", function (e) {
      $('.select2-results__options').perfectScrollbar();
    });

    $select.on("change", function (e) {
      var vs = $select.val();
      $('input[name=project-category]').val(vs);
      $('.select2-selection__rendered').addClass('selected');
    });

    $select.select2({
      minimumResultsForSearch: Infinity
    });


    // Маска для телефона
    $("[name=tel]").mask("+7(999) 999-99-99");
    //

    // Обработка форма на AJAX
    $.validator.addMethod("minlenghtphone", function (value, element) {
      return value.replace(/\D+/g, '').length > 10;
    }, "Введите полный номер.");

    $.validator.addMethod("requiredphone", function (value, element) {
      return value.replace(/\D+/g, '').length > 1;
    }, "Это поле необходимо заполнить.");

    $("form").each(function(){
      if ( $(this).hasClass('tyneed') ) {
        $(this).validate({
          rules: {
            name: {required: true}
          },
          submitHandler: function(form, event){
            event = event || window.event;
            $(form).ajaxSubmit({
              //dataType: 'script',
              error: function(){
                $('.small-container h2').text('Спасибо!');
                $('.small-container p').text('мы получили вашу заявку и скоро с вами свяжемся.');
                $('.small-container .form').hide();
                $('.form-input').val('');
                $('.form-textarea').val('');
                $('#ty').trigger('click');
              },
              success: function(responseText, statusText, xhr){
                $('.small-container h2').text('Спасибо!');
                $('.small-container p').text('мы получили вашу заявку и скоро с вами свяжемся.');
                $('.small-container .form').hide();
                $('.form-input').val('');
                $('.form-textarea').val('');
                $('#ty').trigger('click');
              }
            });
            return false;
          }
        });
      } else {
        $(this).validate({
          rules: {
            name: {required: true}
          },
          submitHandler: function(form, event){
            event = event || window.event;
            $(form).ajaxSubmit({
              //dataType: 'script',
              error: function(){
                $('.small-container h2').text('Спасибо!');
                $('.small-container p').text('мы получили вашу заявку и скоро с вами свяжемся.');
                $('.small-container .form').hide();
                $('.form-input').val('');
                $('.form-textarea').val('');

              },
              success: function(responseText, statusText, xhr){
                $('.small-container h2').text('Спасибо!');
                $('.small-container p').text('мы получили вашу заявку и скоро с вами свяжемся.');
                $('.small-container .form').hide();
                $('.form-input').val('');
                $('.form-textarea').val('');
              }
            });
            return false;
          }
        });
      }

    });


    function menus() {
      $('.mobile-menu-trigger').on('click', function(){
        $(this).toggleClass('open');
        $('.layout-background').toggleClass('active');
        $('.menu-navs nav').toggleClass('open');
      });

      $('nav a[href*="#"]:not([href="#"])').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html, body').animate({
                scrollTop: target.offset().top
              }, 500);
              return false;
            }
          }
        });
      $('.menu-navs nav a, .layout-background').on('click', function () {
        $('.mobile-menu-trigger').removeClass('open');
        $('.layout-background').removeClass('active');
        $('.menu-navs nav').removeClass('open');
      });
    };
    menus();


    //=include modules.js
});