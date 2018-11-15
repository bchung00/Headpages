<?php

include "connect.php";


if(isset($_POST["key"])){
    $result = $db->query("SELECT * FROM creates_event 
            WHERE EID >= (SELECT floor(RAND() * (SELECT MAX(EID) FROM creates_event))-6)
            ORDER BY EID LIMIT 6");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
    echo json_encode($json);
}