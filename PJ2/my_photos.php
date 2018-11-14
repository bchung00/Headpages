<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/25
 * Time: 下午7:24
 */
include "connect.php";
if(isset($_POST["type"])){
    switch ($_POST["type"]){
        case "show":
            $userid = $_POST["uid"];
            $result = $db->query("SELECT * FROM travelimage WHERE UID='{$userid}'");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($json);
            break;
        case "delete":
            $imageid=$_POST["id"];
            $userid = $_POST["uid"];
            $result = $db->query("delete from travelimage where ImageID='{$imageid}' and UID='{$userid}'");
            $result = $db->query("SELECT * FROM travelimage WHERE UID='{$userid}'");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($json);
            break;
    }
}