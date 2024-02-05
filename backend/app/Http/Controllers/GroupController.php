<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
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

    public function store(Request $request)
    {
        //
    }

    public function show(Group $group)
    {
        //
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
