<?php

include "connect.php";
error_reporting(0);

if(isset($_POST["key"])) {
    $createView = $db->query("CREATE VIEW group_popularity AS
    SELECT G.name, COUNT(*)
    FROM groups G
    JOIN group_contains_user GCU ON G.GID = GCU.GID
    GROUP BY G.GID
    ORDER BY COUNT(*) DESC");

    $result = $db->query("SELECT * FROM group_popularity");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
    echo json_encode($json);
}