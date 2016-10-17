function calcHeight() {
  var $item = $('.m_works .item');
  var width = $item.width();
  $item.height(width);
};
calcHeight();

$(window).resize(calcHeight);

function hoverState() {
  var $itemState = $('.m_works .item');
  $itemState.on('click', function () {
    $itemState.removeClass('show');
    $(this).addClass('show');
  });
};
hoverState();