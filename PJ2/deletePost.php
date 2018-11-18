<?php

include "connect.php";
if(isset($_POST["PostID"])) {
    $PostID = $_POST["PostID"];
    $result = $db->query("delete from post where PostID='{$PostID}'");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo "success";
}