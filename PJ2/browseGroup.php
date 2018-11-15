<?php

include "connect.php";


if(isset($_POST["key"])){
    $result = $db->query("SELECT * FROM groups 
            WHERE GID >= (SELECT floor(RAND() * (SELECT MAX(GID) FROM groups))-6)
            ORDER BY GID LIMIT 6");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
    echo json_encode($json);
}