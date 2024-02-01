<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $id)
    {
        return count(PostComment::leftJoin('posts', 'post_comments.user_id', '=', 'posts.id')
        ->where('posts.id', '=', $id)
        ->get()->all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,int $id)
    {
        $request->merge(['user_id' => auth()->user()->id, 'post_id' => $id]);
        PostComment::create($request->all());
        return response()->json(["message"=> "Created successfully"],Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return PostComment::find($id)->first();
    }

    public function showMultiple(int $id, int $offset, int $limit){
        $comment_data = PostComment::where('post_id', $id)
        ->leftJoin('users', 'users.id', '=', 'post_comments.user_id')
        ->select('post_comments.*', 'users.name', 'users.avatar')
        ->skip($offset-1)
        ->take($limit)
        ->get()->all();

        return $comment_data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        PostComment::find($id)->update($request->all());
        return response()->json(["message"=> "Updated successfully"],Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        PostComment::find($id)->delete();
        return response()->json(["message"=> "Deleted successfully"],Response::HTTP_CREATED);
    }
}
