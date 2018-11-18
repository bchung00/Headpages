<?php

include "connect.php";
if(isset($_POST["PostID"])) {
    $PostID = $_POST["PostID"];
    switch ($_POST["type"]) {
        case "getInfo":
            $result = $db->query("SELECT * FROM post where PostID='{$PostID}'");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($json);
            break;
    }
}else if(isset($_GET["type"])){
    switch ($_GET["type"]) {
        case "modify":
            $PostID = $_GET["PostID"];
            $location = $_GET["location"];
            $date = $_GET["date"];
            $time = $_GET["time"];
            $text = $_GET["text"];
            if ($location == null) {
                $location = "NULL";
            }
            if ($date == null) {
                $date = "NULL";
            }
            if ($time == null) {
                $time = "NULL";
            }
            if ($text == null) {
                $text = "NULL";
            }
            $result = $db->query("UPDATE post SET Location = '{$location}', Time = '{$time}', Date = '{$date}', Text = '{$text}' WHERE PostID='{$PostID}'");
            echo "success";
            break;
    }
}