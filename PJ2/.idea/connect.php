<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/24
 * Time: 下午11:53
 */
$database = mysqli_connect("localhost", "carrie", "carrie", "travel");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit(500);
};