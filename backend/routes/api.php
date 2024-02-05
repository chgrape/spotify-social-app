<?php

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
    Route::get('/user/info', [UserController::class, 'showUserInfo']);

    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    Route::post('/post/{id}/comment', [PostCommentController::class, 'store']);
    Route::get('/post/{id}/comment/{offset}/{limit}', [PostCommentController::class, 'showMultiple']);
    Route::get('/post/{id}/comments', [PostCommentController::class, 'index']);

    Route::post('/post/{id}/like', [PostController::class, 'like']);

    Route::get('/groups', [GroupController::class, 'index']);
});
