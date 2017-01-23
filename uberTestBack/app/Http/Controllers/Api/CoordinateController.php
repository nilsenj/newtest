<?php

namespace App\Http\Controllers\Api;

use App\UberCore\GoogleMapsCoordinator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 * Class CoordinateController
 * @package App\Http\Controllers\Api
 */
class CoordinateController extends Controller
{
    /**
     * @var GoogleMapsCoordinator
     */
    protected $coordinator;

    /**
     * CoordinateController constructor.
     * @param $coordinator
     */
    public function __construct(GoogleMapsCoordinator $coordinator)
    {
        $this->coordinator = $coordinator;
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function coordinates(Request $request) {
        $address = $request->json('address');
        $destination = $request->json('destination');

        $addressCoordinates = $this->coordinator->fromAddressToCoords($address);
        $destinationCoordinates = $this->coordinator->fromAddressToCoords($destination);
        $data = ["address" => $addressCoordinates, "destination" => $destinationCoordinates];

        return response()->json($data, 200);

    }
}
