<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/25
 * Time: 下午2:48
 */

include 'connect.php';

if(isset($_POST["post"])) {
    $post = $_POST["post"];
    $result = $db->query("SELECT * FROM post, users 
            WHERE post.UID = users.UID and post.Text LIKE '%".$post."%' limit 20");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
    echo json_encode($json);
}else if(isset($_POST["group"])) {
    $group = $_POST["group"];
    $result = $db->query("SELECT * FROM groups 
            WHERE Name LIKE '%".$group."%' limit 20");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
    echo json_encode($json);
}else if(isset($_POST["event"])) {
    $group = $_POST["group"];
    $result = $db->query("SELECT * FROM groups 
            WHERE Name LIKE '%".$group."%' limit 20");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);// Show random 3 posts
    echo json_encode($json);
}else{}