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
$mail->Subject = 'Заявка на аренду';


//Тип собственности
$statenameone = "";
$municipalnameone = "";
$privatenameone = "";


if($_POST['statenameone'] == "statenameone"){
    $statenameone = "Государственная";
}
if($_POST['municipalnameone'] == "municipalnameone"){
    $municipalnameone = "Муниципальная";
}
if($_POST['privatenameone'] == "privatenameone"){
    $privatenameone = "Частная";
}






//тип помещения 

$tradenameone = "";
$officenameone = "";
$warehousenameone = "";
$productionnameone = "";
$landnameone = "";

if($_POST['tradenameone'] == "tradenameone"){
    $tradenameone = "Торговое";
}
if($_POST['officenameone'] == "officenameone"){
    $officenameone = "Офисное";
}
if($_POST['warehousenameone'] == "warehousenameone"){
    $warehousenameone = "Складское";
}
if($_POST['productionnameone'] == "productionnameone"){
    $productionnameone = "Производственное";
}
if($_POST['landnameone'] == "landnameone"){
    $landnameone = "Земельный участок";
}









//Районы
$zavodsky = "";
$kirovsky = "";
$leninist = "";
$miner = "";
$central = "";

if($_POST['zavodsky'] == "zavodsky"){
    $zavodsky = "Заводский район";
}
if($_POST['kirovsky'] == "kirovsky"){
    $kirovsky = "Кировский район";
}
if($_POST['leninist'] == "leninist"){
    $leninist = "Ленинский район";
}
if($_POST['miner'] == "miner"){
    $miner = "Рудничный район";
}
if($_POST['central'] == "central"){
    $central = "Центральный район";
}


//Площадь объекта
$squareone = "";
$squaretwo = "";
$squarethree = "";
$squarefour = "";
$squarefive = "";
$squaresix = "";
$squareseven = "";


if($_POST['squareone'] == "one"){
    $squareone = "5-15 кв.м.";
}
if($_POST['squaretwo'] == "two"){
    $squaretwo = "15-30 кв.м.";
}
if($_POST['squarethree'] == "three"){
    $squarethree = "30-50 кв.м.";
}
if($_POST['squarefour'] == "four"){
    $squarefour = "50-70 кв.м.";
}
if($_POST['squarefive'] == "five"){
    $squarefive = "70-100 кв.м.";
}
if($_POST['squaresix'] == "six"){
    $squaresix = "100-250 кв.м.";
}
if($_POST['squareseven'] == "seven"){
    $squareseven = "свыше 250 кв.м.";
}




//Тело письма

$body.='<h1>Запрос на Аренду</h1>';

$body.='<p><strong>Тип собственности:</strong> '.$statenameone.' '.$municipalnameone.' '.$privatenameone.'</p>';
$body.='<p><strong>Тип помещения:</strong> '.$tradenameone.' ' .$officenameone. ' ' .$warehousenameone. ' ' .$productionnameone. ' ' .$landnameone. '</p>';



if(trim(!empty($_POST['statusRent']))){
    $body.='<p><strong>Юридический статус:</strong> '.$_POST['statusRent'].'</p>';
}
//район

$body.='<p><strong>Район:</strong> '.$zavodsky.' ' .$kirovsky.' ' .$leninist.' ' .$miner.' ' .$central.'</p>';




// площадь



$body.='<p><strong>Площадь объекта:</strong> '.$squareone.' ' .$squaretwo. ' ' .$squarethree. ' ' .$squarefour. ' ' .$squarefive. ' ' .$squaresix. ' ' .$squareseven.'</p>';


if(trim(!empty($_POST['lineOfBusiness']))){
    $body.='<p><strong>Направление бизнеса:</strong> '.$_POST['lineOfBusiness'].'</p>';
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
    $message = 'ОШИБКА';
}else{
    $message = 'Запрос отправлен';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

?>