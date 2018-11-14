<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/25
 * Time: 下午12:30
 */
include "connect.php";
if(isset($_GET["key"])) {
    $result = $db->query("SELECT PATH, ImageID FROM travelimage");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
}