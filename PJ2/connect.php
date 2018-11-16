<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/25
 * Time: 上午10:13
 */
$db = mysqli_connect("localhost", "root", "", "Headpages");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit(500);
};
mysqli_query($db,'set names utf8');