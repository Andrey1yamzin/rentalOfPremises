<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Excepction;
// use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
// require 'phpmailer/src/SMTP.php';


// require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
//Enable verbose debug output
// $mail->isSMTP();                                            //Send using SMTP
// $mail->Host       = 'ssl://smtp.mail.ru';                     //Set the SMTP server to send through
$mail->SMTPAuth   = true;
                                  //Enable SMTP authentication
// $mail->Username   = 'searcestate@mail.ru';                     //SMTP username
// $mail->Password   = 'csbkem!11';                               //SMTP password
$mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
// $mail->Port       = 465;

//От кого письмо
$mail->setFrom('searcestate@mail.ru');
//Кому письмо
$mail->addAddress('p.search@csbkem.ru');


$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);




//тема письма
$mail->Subject = 'Заявка на покупку';



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
    $body.='<p><strong>Юридический статус:</strong> '.$_POST['statusPurchase'].'</p>';
}
//район


    $body.='<p><strong>Район:</strong> '.$zavodskyPurchase.' '.$kirovskyPurchase.' '.$leninistPurchase.' '.$minerPurchase.' '.$centralPurchase. '</p>';




// площадь

$body.='<p><strong>Площадь объекта:</strong> '.$squareonePurchase.' '.$squaretwoPurchase.' '.$squarethreePurchase.' '.$squarefourPurchase.' '.$squarefivePurchase.' '.$squaresixPurchase.' '.$squaresevenPurchase. '</p>';



if(trim(!empty($_POST['lineOfBusinessPurchase']))){
    $body.='<p><strong>Направление бизнеса:</strong> '.$_POST['lineOfBusinessPurchase'].'</p>';
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
    $message = 'ОШИБКА';
}else{
    $message = 'Запрос отправлен';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

?>