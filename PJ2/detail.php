<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/25
 * Time: 下午5:37
 */
error_reporting(0);
include "connect.php";
if(isset($_POST["type"])) {
    switch ($_POST["type"]) {
        case "getInfo":
            $id = $_POST["id"];
            $result = $db->query("SELECT * FROM travelimage where ImageID='" . $id . "'");
            $imgInfo = mysqli_fetch_all($result, MYSQLI_ASSOC);//图片表里的信息

            $information = array();
            $username = $imgInfo[0]["UID"];
            $city = $imgInfo[0]["CityCode"];
            $country = $imgInfo[0]["CountryCodeISO"];
            if ($city != null && $country != null) {
                $result = $db->query("SELECT geocountries.CountryName, geocities.AsciiName, traveluser.UserName FROM geocities, geocountries, traveluser 
where geocities.GeoNameID ='" . $city . "' and geocountries.ISO = '" . $country . "' and traveluser.UID='" . $username . "'");
                $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
                $information["city"] = $json[0]["AsciiName"];
            } else {
                $result = $db->query("SELECT geocountries.CountryName, geocities.AsciiName, traveluser.UserName FROM geocities, geocountries, traveluser 
where geocountries.ISO = '" . $country . "' and traveluser.UID='" . $username . "'");
                $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
                $information["city"] = "IDK";
            }

            $information["username"] = $json[0]["UserName"];
            $information["longitude"] = $imgInfo[0]["Longitude"];
            $information["latitude"] = $imgInfo[0]["Latitude"];
            $information["country"] = $json[0]["CountryName"];
            $information["description"] = $imgInfo[0]["Description"];
            $information["title"] = $imgInfo[0]["Title"];
            $information["path"] = $imgInfo[0]["PATH"];
            echo json_encode($information);
            break;

        case "check":
            $user = $_POST["uid"];
            $id = $_POST["id"];
            $result = $db->query("SELECT count(*) as m FROM travelimagefavor where ImageID='{$id}' and UID='{$user}'");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);//图片表里的信息
            $a = $json[0]["m"];
            echo json_encode($a);
            break;

        case "number":
            $id = $_POST["id"];
            $result = $db->query("SELECT count(*) as m FROM travelimagefavor where ImageID='{$id}'");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);//被赞次数
            $b = $json[0]["m"];
            echo json_encode($b);
            break;

        case "add":
            $user = $_POST["uid"];
            $id = $_POST["id"];
            $result = $db->query("SELECT * FROM travelimagefavor ORDER BY FavorID desc");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
            $a = $json[0]["FavorID"]+1;
            $add = $db->query("insert into travelimagefavor(FavorID, UID, ImageID) values('$a', '$user', '$id')");
            echo $a;
            break;

        case "added":
            $user = $_POST["uid"];
            $id = $_POST["id"];
            $result = $db->query("delete from travelimagefavor where ImageID='{$id}' and UID='{$user}'");
            echo "success";
            break;
    }
}