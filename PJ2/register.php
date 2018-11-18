<?php

include "connect.php";
error_reporting(0);

$type = $_POST["type"];
$typeInput = $_POST["typeInput"];
$Email = $_POST["email"];
$Password = $_POST["password"];
$Name = $_POST["name"];
$check = $db->query("SELECT count(*) as m from users WHERE Email = '{$Email}'");
$res = mysqli_fetch_object($check);
if($res->m >0){
    echo "Email Already Exist!";
}else{
    if ((($_FILES["file"]["type"] == "image/jpeg")
            || ($_FILES["file"]["type"] == "image/pjpeg"))
        && ($_FILES["file"]["size"] < 20 * 1024 * 1024)
    ) {
        if ($_FILES["file"]["error"] > 0) {
            echo "Error: " . $_FILES["file"]["error"] . "<br/>";
        } else {
            if (is_uploaded_file($_FILES["file"]['tmp_name'])) {
                $relativePath = $_FILES["file"]["name"];
                $path = "photos/" . $_FILES["file"]["name"];
                //Move file

                move_uploaded_file($_FILES['file']['tmp_name'], $path);
                clipImg($path, $_FILES["file"]['name']);

                $num = $db->query("SELECT MAX(UID) as n from users");
                $UID = mysqli_fetch_object($num) -> n + 1;
                $db->query("INSERT INTO users (UID, Name, Password, Email, PhotoPath) VALUES('$UID','$Name','$Password', '$Email', '$path')");
                echo $db->error;
                switch ($type){
                    case "User":
                        $db->query("INSERT INTO common_users (UID) VALUES('$UID')");
                        echo $db->error;
                        echo "success=" . $UID;
                        break;

                    case "Company":
                        $db->query("INSERT INTO company (CID, Type) VALUES('$UID','$typeInput')");
                        echo $db->error;
                        echo "success=" . $UID;
                        break;
                }
            } else
                echo false;
        }
    } else {
        echo "Invalid file!";
    }

}
function clipImg($path, $name){

    $im = imagecreatefromjpeg($path);
    $x = imagesx($im);//Get Width
    $y = imagesy($im);//Get Height

    // After clipping
    $xx = 150;
    $yy = 150;

    if ($x > $y) {//Width > Height
        $sx = abs(($y - $x) / 2);
        $sy = 0;
        $thumbw = $y;
        $thumbh = $y;
    } else {//Height > Width
        $sy = abs(($x - $y) / 2.5);
        $sx = 0;
        $thumbw = $x;
        $thumbh = $x;
    }
    if (function_exists("imagecreatetruecolor")) {
        $dim = imagecreatetruecolor($yy, $xx);
    } else {
        $dim = imagecreate($yy, $xx);
    }
    imageCopyreSampled($dim, $im, 0, 0, $sx, $sy, $yy, $xx, $thumbw, $thumbh);
    header("Content-type: image/jpeg");
    imagejpeg($dim, "photos/" . $name);
}