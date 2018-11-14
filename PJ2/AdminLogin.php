<?php

include "connect.php";
$Username = $_GET['username'];
$Password = $_GET['password'];
$result = $db->query("SELECT Username, Password, AID from admins");
$json = mysqli_fetch_all($result, MYSQLI_ASSOC);
for ($i = 0; $i < count($json); $i++) {
    if ($json[$i]["Username"] == $Username && $json[$i]["Password"] == $Password) {
        setcookie("aid", $json[$i]["AID"] , time()+3600);
        echo $json[$i]["AID"];
        break;
    }else{
    }
}