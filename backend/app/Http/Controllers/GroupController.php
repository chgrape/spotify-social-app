<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use App\Models\Post;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index()
    {
        $user = User::find(auth()->user()->id);
        $group_arr = [];
        foreach($user->groups as $group){
            $group_arr[] = [
                "id" => $group->id,
                "theme" => $group->theme,
                "description" => $group->description
            ];
        }
        return $group_arr;
    }

    public function showPotential(){
        $genres = User::leftJoin("user_genre","user_genre.user_id","=","users.id")
        ->leftJoin("genres", "user_genre.genre_id", "=", "genres.id")
        ->where('users.id', '=', auth()->user()->id)
        ->select('genres.name as genre')
        ->pluck('genre')->all();

        $groups = [];

        $user = User::find(auth()->user()->id);

        foreach($genres as $genre){
            $flag = false;
            foreach($user->groups as $group){
                if($group->theme == ucwords($genre)){
                    $flag = true;
                    break;
                }
            }
            if($flag == false){
                $groups[] = Group::where('theme', ucwords($genre))->get()->first();
            }
            
        }

        return $groups;
    }

    public function store(int $id)
    {
        User::find(auth()->user()->id)->groups()->syncWithoutDetaching($id);
    }

    public function show(int $id)
    {
        return Post::where('group_id', $id)->get();
    }

    public function update(Request $request, Group $group)
    {
        //
    }

    public function destroy(Group $group)
    {
        //
    }
}
