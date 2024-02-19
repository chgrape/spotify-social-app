<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->group(function () {
    // Пътища към ресурси

    Route::get("/auth/check", [AuthController::class, 'check_auth']);
    Route::get("/logout", [AuthController::class,'logout']);

    Route::get('/user/info', [UserController::class, 'showUserInfo']);
    Route::get('/user/playlists', [UserController::class, 'showPlaylists']);
    Route::get('/user/{id}/playlists', [UserController::class, 'showOthersPlaylists']);
    Route::get('/group/count', [UserController::class,'showGroupCount']);

    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    Route::get('/post/{id}/comments', [PostCommentController::class, 'index']);
    Route::post('/post/{id}/comment', [PostCommentController::class, 'store']);
    Route::get('/post/{id}/comment/{offset}/{limit}', [PostCommentController::class, 'showMultiple']);
    Route::put('/post/{id}/comment/{comment_id}', [PostCommentController::class, 'update']);
    Route::delete('/post/{id}/comment/{comment_id}', [PostCommentController::class, 'delete']);

    Route::post('/post/{id}/like', [PostController::class, 'like']);

    Route::get('/groups', [GroupController::class, 'index']);
    Route::get('/groups/{id}', [GroupController::class, 'show']);
    Route::get('/group/potential', [GroupController::class,'showPotential']);
    Route::patch('/groups/{id}', [GroupController::class,'store']);
});
