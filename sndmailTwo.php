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
$statusPurchase = "Физическое лицо";
if($_POST['statusPurchase'] == "legal"){
    $statusPurchase = "Юридическое лицо/ИП";
}



//Районы
$zavodskyPurchase = "";
$kirovskyPurchase = "";
$leninistPurchase = "";
$minerPurchase = "";
$centralPurchase = "";

if($_POST['zavodskyPurchase'] == "zavodsky"){
    $zavodskyPurchase = "Заводский район";
}
if($_POST['kirovskyPurchase'] == "kirovsky"){
    $kirovskyPurchase = "Кировский район";
}
if($_POST['leninistPurchase'] == "leninist"){
    $leninistPurchase = "Ленинский район";
}
if($_POST['minerPurchase'] == "miner"){
    $minerPurchase = "Рудничный район";
}
if($_POST['centralPurchase'] == "central"){
    $centralPurchase = "Центральный район";
}


//Площадь объекта
$squareonePurchase = "";
$squaretwoPurchase = "";
$squarethreePurchase = "";
$squarefourPurchase = "";
$squarefivePurchase = "";
$squaresixPurchase = "";
$squaresevenPurchase = "";


if($_POST['squareonePurchase'] == "one"){
    $squareonePurchase = "5-15 кв.м.";
}
if($_POST['squaretwoPurchase'] == "two"){
    $squaretwoPurchase = "15-30 кв.м.";
}
if($_POST['squarethreePurchase'] == "three"){
    $squarethreePurchase = "30-50 кв.м.";
}
if($_POST['squarefourPurchase'] == "four"){
    $squarefourPurchase = "50-70 кв.м.";
}
if($_POST['squarefivePurchase'] == "five"){
    $squarefivePurchase = "70-100 кв.м.";
}
if($_POST['squaresixPurchase'] == "six"){
    $squaresixPurchase = "100-250 кв.м.";
}
if($_POST['squaresevenPurchase'] == "seven"){
    $squaresevenPurchase = "свыше 250 кв.м.";
}




//Тело письма

$body.='<h1>Запрос на Аренду</h1>';

if(trim(!empty($_POST['propertyTypePurchase']))){
    $body.='<p><strong>Тип собственности:</strong> '.$_POST['propertyTypePurchase'].'</p>';
}

if(trim(!empty($_POST['RoomTypePurchase']))){
    $body.='<p><strong>Тип помещения:</strong> '.$_POST['RoomTypePurchase'].'</p>';
}

if(trim(!empty($_POST['statusPurchase']))){
    $body.='<p><strong>Юридический статус:</strong> '.$statusPurchase.'</p>';
}
//район


    $body.='<p><strong>Район:</strong> '.$zavodskyPurchase.' '.$kirovskyPurchase.' '.$leninistPurchase.' '.$minerPurchase.' '.$centralPurchase. '</p>';




// площадь

$body.='<p><strong>Площадь объекта:</strong> '.$squareonePurchase.' '.$squaretwoPurchase.' '.$squarethreePurchase.' '.$squarefourPurchase.' '.$squarefivePurchase.' '.$squaresixPurchase.' '.$squaresevenPurchase. '</p>';



if(trim(!empty($_POST['lineOfBusinessPurchase']))){
    $body.='<p><strong>Направление бизнеса:</strong> '.$_POST['lineOfBusinessPurchase'].'</p>';
}


if(trim(!empty($_POST['PurchaingAnObject']))){
    $body.='<p><strong>Стоимость покупки объекта:</strong> '.$_POST['PurchaingAnObject'].'</p>';
}


if(trim(!empty($_POST['namePurchase']))){
    $body.='<p><strong>ФИО:</strong> '.$_POST['namePurchase'].'</p>';
}

if(trim(!empty($_POST['phonePurchase']))){
    $body.='<p><strong>Номер телефона:</strong> '.$_POST['phonePurchase'].'</p>';
}

if(trim(!empty($_POST['emailPurchase']))){
    $body.='<p><strong>Email:</strong> '.$_POST['emailPurchase'].'</p>';
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