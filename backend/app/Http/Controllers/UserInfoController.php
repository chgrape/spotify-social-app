<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class UserInfoController extends Controller
{
    function get_artists($user){

        $res = Http::withHeaders(['Authorization' => "Bearer " . $user->token])->get('https://api.spotify.com/v1/me/top/artists');
        if(empty($res->json()["items"])){
            return response()->json(['message'=> 'You havent listened to enough music'],Response::HTTP_OK);
        }

        return $res->json()["items"];
    }

    function get_genres($items){
        $all_genres = [];
        foreach($items as $item){
            $all_genres = array_merge($all_genres, $item["genres"]);
        }
        $all_genres = array_count_values($all_genres);
        uasort($all_genres, function($a, $b){
            return $b - $a;
        });
        return array_keys(array_slice($all_genres,0,5,true));
    }

    function create_artists($artists){
        $artist_objs = [];

        foreach($artists as $artist){
            if(!Artist::where('artist_id',$artist["id"])->exists()){
                Artist::create([
                    'artist_id' => $artist["id"],
                    'name' => $artist["name"],
                ]);
            }
            array_push($artist_objs,$artist["id"]);
        }

        return $artist_objs;
    }

    function create_genres($genres){
        $genre_objs = [];

        foreach($genres as $genre){
            if(!Genre::where('name', $genre)->exists()){
                Genre::create([ 
                    'name' => $genre
                ]);
            }
            array_push($genre_objs, Genre::where('name', $genre)->pluck('id')[0]);
        }

        return $genre_objs;
    }

    function get_new_token($refresh_token){
        $response = Http::asForm()->withHeaders(['Authorization' => 'Basic ' . base64_encode(env('SPOTIFY_CLIENT_ID') . ":" . env('SPOTIFY_SECRET')),])->post('https://accounts.spotify.com/api/token', ['grant_type' => 'refresh_token', 'refresh_token'=>$refresh_token]);
        return $response->json()["access_token"];
    }
}
