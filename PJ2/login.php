<?php

include "connect.php";
$Email = $_GET['email'];
$Password = $_GET['password'];
$result = $db->query("SELECT Email, Password, UID from users");
$json = mysqli_fetch_all($result, MYSQLI_ASSOC);
for ($i = 0; $i < count($json); $i++) {
    if ($json[$i]["Email"] == $Email && $json[$i]["Password"] == $Password) {
        setcookie("uid", $json[$i]["UID"] , time()+3600);
        echo $json[$i]["UID"];
        break;
    }else{
    }
}
