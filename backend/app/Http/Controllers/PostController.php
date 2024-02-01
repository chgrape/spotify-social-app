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
        return Post::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,int $id)
    {
        Post::create(PostController::get_req_user($request));
        return response()->json(["message"=> "Created successfully"],Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $comment_cnt = count(Post::leftJoin('post_comments', 'post_comments.post_id', '=', 'posts.id')
        ->where('posts.id', '=', $id)
        ->get()->all());
        
        $res = array_merge(Post::find($id)
        ->leftJoin('users', 'posts.user_id', '=', 'users.id')
        ->select('posts.*', 'users.name', 'users.avatar')
        ->get()->first()->getAttributes(), ["comment_cnt"=>$comment_cnt]);

        return $res;
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
