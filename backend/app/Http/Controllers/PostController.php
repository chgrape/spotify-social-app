<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController extends Controller
{

    private function get_req_user(Request $request){
        return array_merge($request->all(), ['user_id' => auth()->user()->id]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return Post::leftJoin('users', 'posts.user_id', '=', 'users.id')
        ->where('users.id', '=', auth()->user()->id)
        ->select('posts.*', 'users.name', 'users.avatar')
        ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Post::create(PostController::get_req_user($request));
        return response()->json(["message"=> "Created successfully"],Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        if($id > count(PostController::index()) || $id <= 0){
            return response()->json(["message" => "Post doesn't exist"], Response::HTTP_BAD_REQUEST);
        }
        return Post::leftJoin('users', 'posts.user_id', '=', 'users.id')
        ->where('users.id', '=', auth()->user()->id)
        ->select('posts.*', 'users.name as username', 'users.avatar as avatar')
        ->get()[$id-1];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        Post::leftJoin('users', 'posts.user_id', '=', 'users.id')
        ->where('users.id', '=', auth()->user()->id)
        ->get()[$id-1]
        ->update(PostController::get_req_user($request));
        return response()->json(["message"=> "Updated successfully"],Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        Post::leftJoin('users', 'posts.user_id', '=', 'users.id')
        ->where('users.id', '=', auth()->user()->id)
        ->get()[$id-1]
        ->delete();
        return response()->json(["message"=> "Deleted successfully"],Response::HTTP_CREATED);
    }
}
