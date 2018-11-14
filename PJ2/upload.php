<?php

include "connect.php";
error_reporting(0);

$uid = $_POST["uid"];
$title = $_POST["name"];
$description = $_POST["description"];
$city = $_POST["city"];
$country = $_POST["country"];
$continent = $_POST["continent"];
$latitude = $_POST["latitude"];
$longitude = $_POST["longitude"];

if ((($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/pjpeg"))
    && ($_FILES["file"]["size"] < 20 * 1024 * 1024)
) {
    if ($_FILES["file"]["error"] > 0) {
        echo "Error: " . $_FILES["file"]["error"] . "<br/>";
    } else {
        if (is_uploaded_file($_FILES["file"]['tmp_name'])) {
            $relativePath = $_FILES["file"]["name"];
            $path = "travel-images/medium/" . $_FILES["file"]["name"];
            //移动文件

            $maxID = $db->query("SELECT MAX(ImageID) from travelimage");
            $json = mysqli_fetch_all($maxID, MYSQLI_ASSOC);
            $imageID = $json[0]["MAX(ImageID)"] + 1;
            //这里完成了imageID

            $cityid = $db->query("SELECT GeoNameID from geocities where AsciiName='" . $city . "'");
            if (!$cityid->fetch_assoc()) {echo "请输入正确的城市";}
            else {
                $json = mysqli_fetch_all($cityid, MYSQLI_ASSOC);
                $citycode = $json[0]["GeoNameID"]+"";
                //这里找到了城市的ID

                $countryid = $db->query("SELECT ISO from geocountries where CountryName='" . $country . "'");
                if (!$countryid->fetch_assoc()) {echo "Wrong Country2";}
                else {
                    $json = mysqli_fetch_all($countryid, MYSQLI_ASSOC);
                    $countrycode = $json[0]["ISO"];

                    if($title==null){
                        echo "请输入标题";
                    }else{
                        //核实
                        if (move_uploaded_file($_FILES['file']['tmp_name'], $path)) {
                            $result = $db->query("SELECT * from travelimage WHERE PATH='" . $relativePath . "' and UID='" . $uid . "'");
                            if (!mysqli_fetch_assoc($result)) {
                                move_uploaded_file($_FILES['file']['tmp_name'], $path);
                                clipImg($path, $_FILES["file"]['name']);
                                clipImgSmall($path, $_FILES["file"]['name']);
                                $db->query("INSERT INTO travelimage 
VALUES ('$imageID','$title','$description','$latitude','$longitude','$citycode','$countrycode','$uid','$relativePath')");
                                echo $db->error;
                                echo "success";
                            } else echo "It has already been uploaded.";
                        } else echo "Fail";
                    }
                }
            }
        } else
            echo "fail4";
    }
} else {
    echo "Invalid file";
}
function clipImg($path, $name){

    $im = imagecreatefromjpeg($path);
    $x = imagesx($im);//获取图片的宽
    $y = imagesy($im);//获取图片的高

    // 缩略后的大小
    $xx = 150;
    $yy = 150;

    if ($x > $y) {//图片宽大于高
        $sx = abs(($y - $x) / 2);
        $sy = 0;
        $thumbw = $y;
        $thumbh = $y;
    } else {//图片高大于等于宽
        $sy = abs(($x - $y) / 2.5);
        $sx = 0;
        $thumbw = $x;
        $thumbh = $x;
    }
    if (function_exists("imagecreatetruecolor")) {
        $dim = imagecreatetruecolor($yy, $xx); // 创建目标图gd2
    } else {
        $dim = imagecreate($yy, $xx); // 创建目标图gd1
    }
    imageCopyreSampled($dim, $im, 0, 0, $sx, $sy, $yy, $xx, $thumbw, $thumbh);
    header("Content-type: image/jpeg");
    imagejpeg($dim, "travel-images/square-medium/" . $name);
}

function clipImgSmall($path, $name){

    $im = imagecreatefromjpeg($path);
    $x = imagesx($im);//获取图片的宽
    $y = imagesy($im);//获取图片的高

    // 缩略后的大小
    $xx = 75;
    $yy = 75;

    if ($x > $y) {//图片宽大于高
        $sx = abs(($y - $x) / 2);
        $sy = 0;
        $thumbw = $y;
        $thumbh = $y;
    } else {//图片高大于等于宽
        $sy = abs(($x - $y) / 2.5);
        $sx = 0;
        $thumbw = $x;
        $thumbh = $x;
    }
    if (function_exists("imagecreatetruecolor")) {
        $dim = imagecreatetruecolor($yy, $xx); // 创建目标图gd2
    } else {
        $dim = imagecreate($yy, $xx); // 创建目标图gd1
    }
    imageCopyreSampled($dim, $im, 0, 0, $sx, $sy, $yy, $xx, $thumbw, $thumbh);
    header("Content-type: image/jpeg");
    imagejpeg($dim, "travel-images/square-small/" . $name);
}

?>