<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{

    protected $user_info_controller;

    function __construct(UserInfoController $user_info_controller){
        $this->user_info_controller = $user_info_controller;
    }

    function redirect(){
        return Socialite::driver("spotify")->scopes(['user-top-read'])->redirect();
    }

    function callback(){
        $user = Socialite::driver("spotify")->stateless()->user();
        $playlists = $this->user_info_controller->synthesize_playlist_data($user);
        $ar = $this->user_info_controller->get_artists($user);

        $artists = array_slice($ar,0,20,true);
        $fav_genres = $this->user_info_controller->get_genres($ar);

        $artist_objs = $this->user_info_controller->create_artists($artists);
        $genre_objs = $this->user_info_controller->create_genres($fav_genres);
        $group_objs = $this->user_info_controller->create_groups($artists);

        if(!User::where('name', $user->name)->exists()){
            User::create([
                'name' => $user->name,
                'token' => $user->token,
                'last_info_update' => now(),
                'last_refresh' => now(),
                'refresh_token' => $user->refreshToken,
                'avatar' => $user->avatar
            ]);
        }

        $this->user_info_controller->create_playlist_objs($playlists, User::where('name', $user->name)->first()->id);

        $tkn = User::where('name', $user->name)->first()->createToken('sanc_token')->plainTextToken;
        
        User::where('name', $user->name)->first()->artists()->sync($artist_objs);
        User::where('name', $user->name)->first()->genres()->sync($genre_objs);
        User::where('name', $user->name)->first()->groups()->sync($group_objs);

        return redirect('http://localhost:5173/authorization?token=' . $tkn);
    }

}
