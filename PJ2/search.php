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
            WHERE post.UID = users.UID and post.Text LIKE '%".$post."%' limit 5");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
}else if(isset($_POST["group"])) {
    $group = $_POST["group"];
    $result = $db->query("SELECT * FROM groups 
            WHERE Name LIKE '%".$group."%' limit 5");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
}else if(isset($_POST["event"])) {
    $event = $_POST["event"];
    $result = $db->query("SELECT c.Name as CName, c.EID, c.Time, c.Date, c.Location, c.Description, u.Name as UName 
                                  FROM creates_event c, users u 
                                  WHERE c.UID = u.UID and c.Name LIKE '%".$event."%' limit 5");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
}else if(isset($_POST["user"])) {
    $user = $_POST["user"];
    $result = $db->query("SELECT * FROM users
            WHERE Name LIKE '%".$user."%' limit 5");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
} else{}