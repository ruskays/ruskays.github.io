<?

if (isset ($_POST['metkaFF'])){
	
    $mail1 = 'podberemavto78@yandex.ru'; // Укажите почту для заявок sspecov@yandex.ru
    /*$mail2 = 'ruslan.kayskas@yandex.ru'; */
	$subject = 'Заявка с Подберемавто.онлайн'; // Тема письма
	$subject = "=?utf-8?b?". base64_encode($subject) ."?=";
	$message = "Заявка с сайта Подберемавто.онлайн
			\nИмя: ".$_POST['nameFF'].
			"\nТелефон: ".$_POST['telFF'].
			"\nEmail: ".$_POST['emailFF'].
			"\nИмя: ".$_POST['nameFF'].
			"\nФамилия: ".$_POST['surenameFF'].
			"\nАдрес: ".$_POST['streetFF'].
			"\nГород: ".$_POST['cityFF'].
			"\n\nМетка: ".$_POST['metkaFF'].
			"\n\nКомментарий: ".$_POST['kommentFF'].
			"\n\nКвиз: ".$_POST['descrFF'].
			"\n\nСтраница: ".$_SERVER['HTTP_REFERER'].
			"\nIP: ".$_SERVER['REMOTE_ADDR'].
			"\n\nUSER_AGENT: ".$_SERVER['HTTP_USER_AGENT'].
			"\n\n--\nС уважением, Подберемавто.онлайн";
  
	$boundary = md5(date('r', time())); // для файлов
	$filesize = ''; // для файлов

	$headers = "MIME-Version: 1.0\r\n";
	//$headers  = "Content-type: text/html; charset=utf-8 \r\n"; // просто письма
	$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n"; // для файлов
	$headers .= "From: Подберемавто.онлайн <info@podberemavto.online>\r\n";
	
	
	// Отправка файла начало
  $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"

--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit

$message";



  for($i=0;$i<count($_FILES['fileFF']['name']);$i++){
     if(is_uploaded_file($_FILES['fileFF']['tmp_name'][$i])) {
         $attachment = chunk_split(base64_encode(file_get_contents($_FILES['fileFF']['tmp_name'][$i])));
         $filename = $_FILES['fileFF']['name'][$i];
         $filetype = $_FILES['fileFF']['type'][$i];
         $filesize += $_FILES['fileFF']['size'][$i];
         $message.="

--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"

$attachment";
     }
   }
  for($i=0;$i<count($_FILES['fileFF_2']['name']);$i++){
     if(is_uploaded_file($_FILES['fileFF_2']['tmp_name'][$i])) {
         $attachment = chunk_split(base64_encode(file_get_contents($_FILES['fileFF_2']['tmp_name'][$i])));
         $filename = $_FILES['fileFF_2']['name'][$i];
         $filetype = $_FILES['fileFF_2']['type'][$i];
         $filesize += $_FILES['fileFF_2']['size'][$i];
         $message.="

--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"

$attachment";
     }
   }
   
   
   
   $message.="
--$boundary--";

	if ($filesize < 15000000) { // Не больше 15 МБ
		
		mail($mail1, $subject, $message, $headers);
		mail($mail2, $subject, $message, $headers);
		echo 'Ваше сообщение получено, спасибо!';
	} else {
		echo 'Извините, письмо не отправлено. Размер всех файлов превышает 15 МБ.';
	}
	// Отправка файла конец
  
}


// Запись данных в CSV
	$f = fopen($_SERVER['DOCUMENT_ROOT'].'/upload/base_clients.csv', 'a');
	fwrite($f, 
		date("d.m.Y H:i:s").";".
		$_POST['nameFF'].";".
		$_POST['telFF'].";".
		$_POST['cityFF'].";".
		$_POST['metkaFF'].";".
		$_SERVER['HTTP_REFERER'].";".
		$_SERVER['REMOTE_ADDR'].";".
		PHP_EOL);
	fclose($f);



?>