<?php
namespace App\UberCore;
/**
 * Created by PhpStorm.
 * User: nilse
 * Date: 22.01.2017
 * Time: 13:49
 */
/**
 * Class GoogleMapsCoordinator
 * @package App\UberCore
 */
class GoogleMapsCoordinator
{
    /**
     * @param $address
     * @return array
     */
    public function fromAddressToCoords($address): array
    {
        // We define our address
        $url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($address) . '&sensor=false';
        // We get the JSON results from this request
        $geo = file_get_contents($url);
        // We convert the JSON to an array
        $geo = json_decode($geo, true);
        // If everything is cool
        if ($geo['status'] = 'OK') {
            // We set our values
            $latitude = $geo['results'][0]['geometry']['location']['lat'];
            $longitude = $geo['results'][0]['geometry']['location']['lng'];
        } else {
            $latitude = null;
            $longitude = null;
        }
        return ['latitude' => $latitude, 'longitude' => $longitude];

    }
}