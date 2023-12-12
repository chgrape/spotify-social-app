<?php

namespace App\Http\Controllers;

use App\Models\Artist;
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

        if(!User::where('name', $user->name)){
            if(!Artist::where('artist_id',$artist["id"])->exists()){
                Artist::create([
                    'artist_id' => $artist["id"],
                    'name' => $artist["name"],
                ]);
            }
            User::create([
                'name' => $user->name,
                'token' => $user->token,
                'most_pop_artist' => $artist['id']
            ]);

        }else{
            User::where('name', $user->name)->update(['token'=> $user->token]);
        }

        dd($user);
    }

}
