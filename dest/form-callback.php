<?
// Адрес почты на который придет сообщение
if( clean($_POST["name"]) == 'q' || clean($_POST["name"]) == 'й'  ) :
    // Отправляем только разработчику
    $mailto  = 'mischuk.alexander@gmail.com';
elseif( clean($_POST["name"]) == 'test' || clean($_POST["name"]) == 'тест' ) :
    // Отправляем только нам
    $mailto  = 'marat@lmg-media.com'.',';
    $mailto  .= 'mb@lmg-media.com';
else :
    // Отправляем всем
    $mailto  = 'marat@lmg-media.com'.',';
    $mailto  .= 'mb@lmg-media.com';
    // Скрытые копии
    $mailto_hiden = "bcc: marat@lmg-media.com".',';
    $mailto_hiden .= 'bcc: mb@lmg-media.com';
endif;

$title = 'Заявка';
$mailFrom = "zakaz@".$_SERVER['HTTP_HOST'];
$mess = '';
$headers = "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=utf-8\n";
$headers .= "Content-Transfer-Encoding: quoted-printable\n";
$headers .= "From:LP <$mailFrom>\n";
$headers .= $mailto_hiden;


// Валидация формы
if ( !empty($_POST["name"]) && !empty($_POST["email"]) ) {
    $mess .= 'Имя клиента: '.clean( $_POST['name'] ).' <br>';
    $mess .= 'Email: '.clean( $_POST['email'] ).' <br>';
    $mess .= 'Телефон: '.clean( $_POST['tel'] ).' <br>';
    mail($mailto, $title, $mess, $headers);

    echo "Сообщение отправлено успешно!\n","Включите JavaScript в браузере!";
} else {
    echo "Заполните поля имя или телефон!\n","Включите JavaScript в браузере!";
}

// Очистка GET и POST запросов
function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);

    return $value;
}
?>