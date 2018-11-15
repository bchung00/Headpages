<?php

include "connect.php";


if(isset($_POST["type"])){
    switch ($_POST["type"]) {
        case "all":
            $result = $db->query("SELECT * FROM post, users 
            WHERE post.PostID >= (SELECT floor(RAND() * (SELECT MAX(PostID) FROM post))-3) and post.UID = users.UID  
            ORDER BY post.PostID LIMIT 3");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
            echo json_encode($json);
            break;

        case "friend":
            $userid = $_POST["uid"];
            $result = $db->query("SELECT * FROM post, users 
            WHERE (users.UID in (SELECT UID2 from befriend WHERE UID1 ='{$userid}') or users.UID in (SELECT UID1 from befriend WHERE UID2 ='{$userid}')) and post.UID = users.UID
            LIMIT 3");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
            echo json_encode($json);
            break;

        case "mine":
            $userid = $_POST["uid"];
            $result = $db->query("SELECT * FROM post, users 
            WHERE users.UID = '{$userid}' and post.UID = users.UID LIMIT 3");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
            echo json_encode($json);
            break;
    }
}