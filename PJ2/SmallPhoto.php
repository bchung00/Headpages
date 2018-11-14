<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/24
 * Time: 下午9:19
 */
include 'connect.php';

if(isset($_POST["key"])) {
    $result = $db->query("SELECT * FROM travelimage 
WHERE ImageID >= (SELECT floor(RAND() * (SELECT MAX(travelimage.ImageID) FROM travelimage))-20)  
ORDER BY ImageID LIMIT 20");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);//随机取20个图片
    echo json_encode($json);
}
