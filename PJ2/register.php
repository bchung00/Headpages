<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/20
 * Time: 下午5:01
 */
date_default_timezone_set('prc');
$db = mysqli_connect("localhost", "carrie", "carrie", "travel");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit(500);
}
$Email = $_GET['email'];
$Password = $_GET['password'];
$Name = $_GET['name'];
$check = $db->query("SELECT count(*) as m from users WHERE Email = '{$Email}'");
$res = mysqli_fetch_object($check);
if($res->m >0){
    echo false;
}else{
    $register = $db->query("INSERT INTO users (UID, Name, Password, Email, PhotoPath) VALUES('$res->m +1', '$Password', 1, '$time', '$time')");
    echo true;
}