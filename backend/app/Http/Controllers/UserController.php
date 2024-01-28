<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        User::create($request->all());
        return response()->json(["status"=> "success"], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        User::find($id)->update($request->all());
        return response()->json(["status"=> "success"], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        User::find($id)->delete();
        return response()->json(["status"=> "success"], Response::HTTP_OK);
    }

    public function showUserInfo()
    {
        $artists =User::leftJoin("user_artist","user_artist.user_id","=","users.id")
        ->leftJoin("artists", "user_artist.artist_id", "=", "artists.artist_id")
        ->where('users.id', '=', auth()->user()->id)
        ->select('artists.name as artist')
        ->pluck('artist')->all();

        $genres = User::leftJoin("user_genre","user_genre.user_id","=","users.id")
        ->leftJoin("genres", "user_genre.genre_id", "=", "genres.id")
        ->where('users.id', '=', auth()->user()->id)
        ->select('genres.name as genre')
        ->pluck('genre')->all();

        return ['username'=> auth()->user()->name,'artists' => $artists, 'genres' => $genres];
    }
}
