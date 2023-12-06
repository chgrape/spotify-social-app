<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Laravel\Socialite\Facades\Socialite;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/get-most-pop', function() {
    $token = DB::select('select users.token from users where users.id=1');
    $res = Http::withHeaders(['Authorization' => "Bearer " . $token[0]->token])->get('https://api.spotify.com/v1/me/player/recently-played');
    $res = $res->object();
    $arr = [];
    foreach($res->items as $item){
        $arr[] = $item->track->artists[0]->name;
    }
    $vals = array_count_values($arr);
    arsort($vals);
    DB::update("UPDATE users SET users.most_pop_artist='?' ON users.id=1", [array_keys($vals)[0]]);
    //return array_keys($vals)[0];
    return $arr;
});

Route::get('/cmp-pop', function(){
    $users = DB::select('select users.id,');
});