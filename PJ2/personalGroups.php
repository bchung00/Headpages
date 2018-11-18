<?php

include "connect.php";

if(isset($_POST["uid"])){
    $uid = $_POST["uid"];
    $result = $db->query("SELECT * FROM groups, group_contains_user
            WHERE groups.GID = group_contains_user.GID AND UID = '" . $uid . "' LIMIT 6");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
    echo json_encode($json);
}