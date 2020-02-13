<?php
use PHPMailer\PHPMailer\PHPMailer;
    if(isset($_POST['submit'])){

    $email = $_POST['email'];
    $body = $_POST['emailContent'];
    
    require_once('PHPMailer/PHPMailer.php');
    require_once('PHPMailer/Exception.php');
    require_once('PHPMailer/SMTP.php'); 
            
    $mail = new PHPMailer(true);
    
try {
    //Server settings


    $mail->isSMTP();                                            
    
    $mail->Host       = 'ssl0.ovh.net';                    
    $mail->SMTPAuth   = true;                            
    
    $mail->Username   = 'admin@lightcyclefight.com';             

    $mail->Password   = '6699874aazdv';                       
    
    $mail->SMTPSecure = 'ssl';   
  
    $mail->Port= 465;                              
    
    //Recipients
    $mail->setFrom($email);
    $mail->addAddress('admin@lightcyclefight.com');     
    /*$mail->addAddress('ellen@example.com');
    $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com');*/


    /*$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments */

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'light cycle fight user contact form';
    $mail->Body    = $body;
    $mail->AltBody = $body;

    $mail->send();
    echo 'Message has been sent';
   
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}


$mail = new PHPMailer(true);
    
try {
    //Server settings


    $mail->isSMTP();                                            
    
    $mail->Host       = 'ssl0.ovh.net';                    
    $mail->SMTPAuth   = true;                            
    
    $mail->Username   = 'admin@lightcyclefight.com';             

    $mail->Password   = '6699874aazdv';                       
    
    $mail->SMTPSecure = 'ssl';   
  
    $mail->Port= 465;                              
    
    //Recipients
    $mail->setFrom('admin@lightcyclefight.com');
    $mail->addAddress($email);     
    /*$mail->addAddress('ellen@example.com');
    $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com');*/


    /*$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments */

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'light cycle fight user contact form';
    $mail->Body    = "Nous Vous informons que nous avons bien reçu votre email, votre demande sera traité dans les
    meilleures délais,
    Cordialement. l'équipe de LCF.";
    $mail->AltBody = "Nous Vous informons que nous avons bien reçu votre email, votre demande sera traité dans les
    meilleures délais,
    Cordialement. l'équipe de LCF.";

    $mail->send();
    echo 'Message has been sent';
    if(isset($_SESSION))
    header('Location:dashboardUser.php');
   else
   header('Location:../PHP/index.php');

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}


    }
?>
