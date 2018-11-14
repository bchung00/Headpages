<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/25
 * Time: 下午10:07
 */
include "connect.php";
if(isset($_POST["type"])) {
    switch ($_POST["type"]) {
        case "getInfo":
            $id = $_POST["id"];
            $result = $db->query("SELECT * FROM travelimage where ImageID='{$id}'");
            $json = mysqli_fetch_all($result, MYSQLI_ASSOC);//图片表里的信息
            $city = $json[0]["CityCode"];
            $country = $json[0]["CountryCodeISO"];

            $information = array();
            $information["title"] = $json[0]["Title"];
            $information["path"] = $json[0]["PATH"];
            $information["latitude"] = $json[0]["Latitude"];
            $information["longitude"] = $json[0]["Longitude"];
            $information["description"] = $json[0]["Description"];

            if ($city != null && $country != null) {
                $result1 = $db->query("SELECT * FROM geocities, geocountries where geocities.GeoNameID ='{$city}' and geocountries.ISO = '{$country}'");
                $json1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
                $continent = $json1[0]["Continent"];
                $information["city"] = $json1[0]["AsciiName"];
                $information["country"] = $json1[0]["CountryName"];
                if ($continent != null) {
                    $result2 = $db->query("SELECT * FROM geocontinents where ContinentCode = '{$continent}'");
                    $json2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
                    $information["continent"] = $json2[0]["ContinentName"];
                } else {
                    $information["continent"] = " ";
                }
            } else {
                $information["city"] = " ";
                $information["country"] = " ";
            }

            echo json_encode($information);
            break;

        case "change":
            $city = $_POST["city"];
            $information1 = array();
            if($city == null){
                $information1["continent"] = " ";
                $information1["country"] = " ";

            }else {
                $result = $db->query("SELECT * FROM geocities where AsciiName ='{$city}'");

                if (mysqli_num_rows($result) !== 0) {
                    $json1 = mysqli_fetch_all($result, MYSQLI_ASSOC);
                    $country = $json1[0]["CountryCodeISO"];

                    if ($country != null) {
                        $result2 = $db->query("SELECT * FROM geocountries where ISO = '{$country}'");
                        $json2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
                        $continent = $json2[0]["Continent"];
                        $information1["country"] = $json2[0]["CountryName"];
                        $result3 = $db->query("SELECT * FROM geocontinents where ContinentCode = '{$continent}'");
                        $json3 = mysqli_fetch_all($result3, MYSQLI_ASSOC);
                        $information1["continent"] = $json3[0]["ContinentName"];
                    } else {
                        $information1["continent"] = " ";
                        $information1["country"] = " ";
                    }
                } else {
                    $information1["continent"] = " ";
                    $information1["country"] = " ";
                }
            }
            echo json_encode($information1);
            break;
    }
}else if(isset($_GET["type"])){
    switch ($_GET["type"]) {
        case "modify":
            $imageId = $_GET["id"];
            $title = $_GET["title"];
            $description = $_GET["description"];
            $city = $_GET["city"];
            $country = $_GET["country"];
            $latitude = $_GET["latitude"];
            $longitude = $_GET["longitude"];
            if ($city == " ") {
                $city = "NULL";
            } else {
                $result = $db->query("SELECT * FROM geocities where AsciiName ='{$city}'");
                $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
                $city = $json[0]["GeoNameID"];
            }
            if ($country == " ") {
                $country = "NULL";
            } else {
                $result1 = $db->query("SELECT * FROM geocountries where CountryName ='{$country}'");
                $json1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
                $country = $json1[0]["ISO"];
            }
            if ($title == null) {
                $title = "NULL";
            } else {
            }
            if ($description == null) {
                $description = "NULL";
            } else {
            }
            if ($latitude == null) {
                $latitude = "NULL";
            } else {
            }
            if ($longitude == null) {
                $longitude = "NULL";
            } else {
            }
            $result2 = $db->query("UPDATE travelimage SET Title = '{$title}',Description = \"{$description}\", Latitude = '{$latitude}', Longitude = '{$longitude}', CityCode = '{$city}', CountryCodeISO = '{$country}' WHERE ImageID='{$imageId}'");
            echo "success";
            break;
    }
}
