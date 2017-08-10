<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use nilsenj\Uber\UberContract;

class UberController extends Controller
{
    protected $uber;

    /**
     * UberController constructor.
     * @param UberContract $uber
     */
    public function __construct(UberContract $uber)
    {
        $this->uber = $uber;
    }

    public function getPriceEstimates(Request $request)
    {
        $address = $request->json('address');
        $destination = $request->json('destination');

        $estimates = $this->uber->getPriceEstimates(
            $address["latitude"],
            $address["longitude"],
            $destination["latitude"],
            $destination["longitude"]
        );
        return response()->json($estimates, 200);
    }
}
