<?php
include 'connect.php';

$type = $_GET['type'];
$conti =  $_GET['conti'];
$country =  $_GET['country'];


$continent = "";

switch ($conti){
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
switch ($type) {
    case 'get_continent_list':
        $result = $db->query("SELECT GeoNameId, ContinentName from geocontinents");
        $json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
        echo json_encode($json);
        break;

    case 'get_country_list':
        $result = $db->query("SELECT GeoNameId, CountryName, ISO from geocountries WHERE Continent ='$continent'");
        $json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
        echo json_encode($json);
        break;

    case 'get_city_list':
        $result = $db->query("SELECT GeoNameId, AsciiName from geocities WHERE CountryCodeISO ='$country'");
        $json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
        echo json_encode($json);
        break;

}

