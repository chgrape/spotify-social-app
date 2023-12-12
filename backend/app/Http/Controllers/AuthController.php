<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Genre;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    function redirect(){
        return Socialite::driver("spotify")->scopes(['user-read-recently-played', 'user-top-read'])->redirect();
    }

    function callback(){
        $user = Socialite::driver("spotify")->user();

        $res = Http::withHeaders(['Authorization' => "Bearer " . $user->token])->get('https://api.spotify.com/v1/me/top/artists');
        $artist = $res->json()["items"][0];

        $all_genres = [];
        foreach($res->json()["items"] as $item){
            $all_genres = array_merge($all_genres, $item["genres"]);
        }
        $all_genres = array_count_values($all_genres);
        $fav_genre = max($all_genres);
        $fav_genre = array_keys($all_genres, $fav_genre)[0];


        if(!User::where('name', $user->name)->exists()){
            if(!Artist::where('artist_id',$artist["id"])->exists()){
                Artist::create([
                    'artist_id' => $artist["id"],
                    'name' => $artist["name"],
                ]);
            }
            if(!Genre::where('name', $fav_genre)->exists()){
                Genre::create([ 
                    'name' => $fav_genre
                ]);
            }

            User::create([
                'name' => $user->name,
                'token' => $user->token,
                'artist' => $artist['id'],
                'genre_id' => Genre::where('name', $fav_genre)->pluck('id')[0]
            ]);

        }else{
            User::where('name', $user->name)->update(['token'=> $user->token]);
        }

        dd($user);
    }

}
