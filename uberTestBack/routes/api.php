<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//
//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:api');



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
if (\App::environment('local', 'staging')) {
// cors not working from middleware
    header('Access-Control-Allow-Origin:  *');
    header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PATCH, PUT, DELETE');
    header('Access-Control-Allow-Headers:  Content-Type, X-Auth_old-Token, X-CSRF-Token, Origin, Authorization');

}

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('jwt.auth');

Route::get('/users', 'Api\AuthController@getUsers')->middleware('jwt.auth');
Route::group(['prefix' => 'uber', 'as' => 'uber::','middleware' => 'jwt.auth'], function (){
    Route::post('/priceEstimates', 'Api\UberController@getPriceEstimates');
});
Route::resource('authenticate', 'Api\AuthController', ['only' => ['index']]);
Route::post('authenticate', 'Api\AuthController@authenticate');
Route::post('/coordinates', 'Api\CoordinateController@coordinates')->middleware('jwt.auth');
Route::post('register', 'Api\AuthController@register');
Route::post('getUser', 'Api\AuthController@getAuthenticatedUser');
