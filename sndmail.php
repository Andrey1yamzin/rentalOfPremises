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
$mail->setFrom('mail@.ru', 'СайтАренды');
//Кому письмо
$mail->addAddress('mail@csbkem.ru');

//тема письма
$mail->Subject = 'Заявка на арунду или покупку';


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

$body.='<h1>Запрос</h1>';

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


//ДОДЕЛАТЬ ДАЛЬШЕ!!!!!
