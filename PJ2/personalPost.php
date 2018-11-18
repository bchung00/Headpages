<?php

include "connect.php";


if(isset($_POST["type"])){
    switch ($_POST["type"]) {
        case "personal":
            $userid = $_POST["uid"];
            $result = $db->query("SELECT * FROM post, users 
            WHERE users.UID = '{$userid}' and post.UID = users.UID LIMIT 3");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
            echo json_encode($json);
            break;
    }
}