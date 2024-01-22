<?php

namespace App\Jobs;

use App\Http\Controllers\UserInfoController;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class UpdateUserInfoDaily implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user_info_controller;
    protected $user;

    /**
     * Create a new job instance.
     */
    public function __construct(User $user)
    {
        $this->user_info_controller = new UserInfoController();
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $artists = $this->user_info_controller->get_artists($this->user);
        $genres = $this->user_info_controller->get_genres($artists);

        $artist_objs = $this->user_info_controller->create_artists(array_slice($artists, 0, 5, true));
        $genre_objs = $this->user_info_controller->create_genres($genres);

        $this->user->artists()->sync($artist_objs);
        $this->user->genres()->sync($genre_objs);

        $this->user->update(['last_info_update' => now()]);
    }
}
