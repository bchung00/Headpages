<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/25
 * Time: 下午2:48
 */

include 'connect.php';

if(isset($_POST["title"])) {
    $title = $_POST["title"];
    $result = $db->query("
SELECT Description,Title,PATH,ImageID FROM travelimage WHERE Title LIKE '%".$title."%' limit 20");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
}else if(isset($_POST["description"])) {
    $description = $_POST["description"];
    $result = $db->query("
SELECT Description,Title,PATH,ImageID FROM travelimage WHERE Description like '%".$description."%' limit 20");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
}else{}