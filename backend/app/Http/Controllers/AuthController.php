<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    function redirect(){
        return Socialite::driver("spotify")->redirect();
    }

    function callback(){
        $user = Socialite::driver("spotify")->user();
        DB::insert("insert into users(name, token) values(?,?)", [$user->name, $user->token]);
        
        
        dd($user);
    }
}
