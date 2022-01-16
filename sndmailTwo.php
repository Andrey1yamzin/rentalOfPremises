<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Excepction;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);


//От кого письмо
$mail->setFrom('admin@csbkem.ru', 'СайтАренды');
//Кому письмо
$mail->addAddress('admin@csbkem.ru');

//тема письма
$mail->Subject = 'Заявка на покупку';


//Юридический статус
$status = "Физическое лицо";
if($_POST['status'] == "legal"){
    $status = "Юридическое лицо/ИП";
}



//Районы
$district = "Не имеет значения";
if($_POST['district'] == "zavodsky"){
    $district = "Заводский район";
}
if($_POST['district'] == "kirovsky"){
    $district = "Кировский район";
}
if($_POST['district'] == "leninist"){
    $district = "Ленинский район";
}
if($_POST['district'] == "miner"){
    $district = "Рудничный район";
}
if($_POST['district'] == "central"){
    $district = "Центральный район";
}


//Площадь объекта
$square = "Не имеет значения";
if($_POST['square'] == "one"){
    $square = "5-15 кв.м.";
}
if($_POST['square'] == "two"){
    $square = "15-30 кв.м.";
}
if($_POST['square'] == "three"){
    $square = "30-50 кв.м.";
}
if($_POST['square'] == "four"){
    $square = "50-70 кв.м.";
}
if($_POST['square'] == "five"){
    $square = "70-100 кв.м.";
}
if($_POST['square'] == "six"){
    $square = "100-250 кв.м.";
}
if($_POST['square'] == "seven"){
    $square = "свыше 250 кв.м.";
}




//Тело письма

$body.='<h1>Запрос на Аренду</h1>';

if(trim(!empty($_POST['propertyType']))){
    $body.='<p><strong>Тип собственности:</strong> '.$_POST['propertyType'].'</p>';
}

if(trim(!empty($_POST['RoomType']))){
    $body.='<p><strong>Тип помещения:</strong> '.$_POST['RoomType'].'</p>';
}

if(trim(!empty($_POST['status']))){
    $body.='<p><strong>Юридический статус:</strong> '.$status.'</p>';
}

if(trim(!empty($_POST['district']))){
    $body.='<p><strong>Район:</strong> '.$district.'</p>';
}

if(trim(!empty($_POST['square']))){
    $body.='<p><strong>Площадь объекта:</strong> '.$square.'</p>';
}

if(trim(!empty($_POST['lineOfBusiness']))){
    $body.='<p><strong>Направление бизнеса:</strong> '.$_POST['lineOfBusiness'].'</p>';
}


if(trim(!empty($_POST['rentingAnObject']))){
    $body.='<p><strong>Стоимость аренды объекта:</strong> '.$_POST['rentingAnObject'].'</p>';
}


if(trim(!empty($_POST['name']))){
    $body.='<p><strong>ФИО:</strong> '.$_POST['name'].'</p>';
}

if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Номер телефона:</strong> '.$_POST['phone'].'</p>';
}

if(trim(!empty($_POST['email']))){
    $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
}

$mail->Body=$body;

if(!$mail->send()){
    $message = 'ОШИБКА!';
}else{
    $message = 'Запрос отравлен!';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

?>

//доделать этот отправщик и подумать что можно сделать чтобы отправлялось несколько параметров 