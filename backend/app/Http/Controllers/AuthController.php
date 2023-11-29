<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    function redirect(){
        return Socialite::driver("spotify")->redirect();
    }

    function callback(){
        $user = Socialite::driver("spotify")->user();
        dd($user);
    }
}
