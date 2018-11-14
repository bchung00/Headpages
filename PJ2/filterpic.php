<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanyeol
 * Date: 2017/6/25
 * Time: 下午12:32
 */
include "connect.php";

if(isset($_POST["city"])) {
    $continent = $_POST["continent"];
    $country = $_POST["country"];
    $city = $_POST["city"];
    switch ($continent) {
        case 'Asia':
            $continent = "AS";
            break;
        case 'Africa':
            $continent = "AF";
            break;
        case 'Europe':
            $continent = "EU";
            break;
        case 'South America':
            $continent = "SA";
            break;
        case 'North America':
            $continent = "NA";
            break;
        case 'Oceania':
            $continent = "OC";
            break;
    }
    if ($city != "0") {
        $result = $db->query("SELECT * from travelimage WHERE CityCode = '" . $city . "'");
    } else {
        if ($country != "0" ) {
            $result = $db->query("SELECT * from travelimage WHERE CountryCodeISO = '" . $country . "'");
        } else {
            if($continent!="Filter by continent") {
                $result = $db->query("SELECT travelimage.ImageID, travelimage.PATH from travelimage, geocountries WHERE geocountries.Continent ='" . $continent . "' and travelimage.CountryCodeISO = geocountries.ISO");
            }else{
                $result = $db->query("SELECT PATH, ImageID FROM travelimage");
            }
        }
    }
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
    echo $db->error;

}