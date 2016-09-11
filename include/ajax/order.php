<?php
    $name = "ФИО заказчика: " . $_POST["name"] . "\n";
    $tel = "Контактный телефон: " . $_POST["tel"] . "\n";
    $message = "Комментарий: " . $_POST["message"] . "\n";
    $separator = "------------------------------------------------------------------\n";
    $file = fopen("../../logs/orders.txt", "a+");
    fputs($file, $name);
    fputs($file, $tel);
    fputs($file, $message);
    fputs($file, $separator);

    if(mail("info@gazel-traffic.ru","Gazel-Traffic - Заказ", $name . $tel . $message)){
        echo json_encode("OK");
    }
?>
