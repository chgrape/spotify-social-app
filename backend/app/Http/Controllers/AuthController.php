<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    function redirect(){
        return Socialite::driver("spotify")->scopes(['user-read-recently-played'])->redirect();
    }

    function callback(){
        $user = Socialite::driver("spotify")->user();
        $ex = DB::select("SELECT users.name FROM users WHERE users.name=?",[$user->name]);
        
        if(empty($ex)){
            DB::insert("insert into users(name, token) values(?,?)", [$user->name, $user->token]);
        }else{
            DB::update('UPDATE users SET users.token=? WHERE users.name=?', [$user->token, $user->name]);
        }

        dd($user);
    }

}
