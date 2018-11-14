<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/24
 * Time: 下午1:29
 */
include 'connect.php';

if(isset($_POST["key"])) {
    $result = $db->query("SELECT travelimage.ImageID,travelimage.Title,travelimage.PATH,count(*) as cnt 
FROM travelimagefavor,travelimage where travelimage.ImageID=travelimagefavor.ImageID group by travelimagefavor.ImageID order by cnt desc limit 3");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);//取最热3个图片
    echo json_encode($json);

}