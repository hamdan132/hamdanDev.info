<?php
$fname = $_POST["name"];
$email = $_POST["email"];
$lname = $_POST["subject"];
$headers = "From: $from";
$message = $_POST["message"];

$email_form = 'info@hamdanme.online';
$email_subject = 'New form submission';
$email_body = "User name:$name.\n".
                "User email:$email;.\n".
                  "subject:$subject;.\n".
                     "User message:$message;.\n";


$to ='hamdanmuneer15@gmail.com';

$headers = "From: $email_from\r\n";

$headers = "Reply-To: $email\r\n";


if(mail($to, $subject, $body, $headers)){
  echo '<label class="success">Sent your <b>e-mail.</b></label>';
}else{
  echo '<label class="error">Something went wrong! please try again.</label>';
}

?>