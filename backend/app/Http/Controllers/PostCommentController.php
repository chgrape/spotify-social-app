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
    public function index()
    {
        return PostComment::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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
