<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/24
 * Time: 下午6:52
 */
include 'connect.php';

if(isset($_POST["key"])) {
    $result = $db->query("SELECT * FROM travelimage 
WHERE ImageID >= (SELECT floor(RAND() * (SELECT MAX(travelimage.ImageID) FROM travelimage))-6)  
ORDER BY ImageID LIMIT 6");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);//随机取6个图片
    echo json_encode($json);
}