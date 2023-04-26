<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$check = $_POST['check'];

	if (!$check == 'goawaybot') {
		echo 'ERROR';
		return false;
	} else {

		$project_name = "Мегаполис";
		$admin_email  = "tvsapunova@yandex.ru";
		$form_subject = "Заявка с сайта";


		foreach ( $_POST as $key => $value ) {
			if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "check") {
				if ($key == "name") $key = "Имя";
				if ($key == "phone") $key = "Телефон";
				if ($key == "email") $key = "Почта";
				if ($key == "date") $key = "Дата мероприятия";
				if ($key == "count") $key = "Кол-во гостей";
				if ($key == "subject") $key = "Форма";
				if ($key == "message") $key = "Сообщение";

				$message .= "<table>";
				$message .= "
				" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
					<td style='padding: 10px; border: #e9e9e9 1px solid; white-space: nowrap;'><b>$key</b></td>
					<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
				</tr>";
				$message .= "</table>";
			}
		}

		require_once('phpmailer/PHPMailerAutoload.php');
		$mail = new PHPMailer;
		$mail->CharSet = 'utf-8';

		//$mail->SMTPDebug = 3;                               // Enable verbose debug output

		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = 'ssl://smtp.yandex.ru';  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = 'tvsapunova@yandex.ru';                 // Наш логин
		$mail->Password = 'qlfwvpjizwtvxabz';                           // Наш пароль от ящика
		$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 465;                                    // TCP port to connect to

		$mail->setFrom('tvsapunova@yandex.ru', 'Мегаполис');   // От кого письмо
		$mail->addAddress('tvsapunova@yandex.ru');     // Add a recipient
		//$mail->addAddress('ellen@example.com');               // Name is optional
		//$mail->addReplyTo('info@example.com', 'Information');
		//$mail->addCC('cc@example.com');
		//$mail->addBCC('bcc@example.com');
		//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
		$mail->isHTML(true);                                  // Set email format to HTML

		$mail->Subject = 'Новая заявка с сайта';
		$mail->Body = $message;

			if (!$mail->send()) {
				echo 'ERROR';
				return false;
			}else{
				echo 'OK';
				return true;
			}
	}
}
?>