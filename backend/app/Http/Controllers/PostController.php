<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostComment;
use App\Models\Group;
use App\Models\Like;
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
        return Post::where('user_id', auth()->user()->id)->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $group = Group::where('theme', $request->group)->first();

        Post::create(array_merge($request->except(['group']), ['group_id' => $group->id, 'user_id' => auth()->user()->id]));
        return response()->json(["message"=> "Created successfully"],Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $comment_cnt = count(PostComment::leftJoin('posts', 'post_comments.post_id', '=', 'posts.id')
        ->where('posts.id', $id)
        ->get());

        $res = array_merge(Post::leftJoin('users', 'posts.user_id', '=', 'users.id')
        ->select('posts.*', 'users.name', 'users.avatar')->find($id)->getAttributes(), ["comment_cnt"=>$comment_cnt]);

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

    public function like(int $id)
    {
        $user_id = auth()->user()->id;

        $params = [
            "post_id" => $id,
            "user_id" => $user_id
        ];

        if(!Like::where($params)->exists()){
            Like::create($params);
        }else{
            $model = Like::where($params)->first();
            $model->liked = !$model->liked;
            $model->save();
        }

        return Post::find($params["post_id"])->like_count;
    }
}
