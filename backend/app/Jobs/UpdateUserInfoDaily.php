<?php

namespace App\Jobs;

use App\Http\Controllers\UserInfoController;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateUserInfoDaily implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user_info_controller;
    protected $user;

    /**
     * Create a new job instance.
     */
    public function __construct(int $id)
    {
        $this->user_info_controller = new UserInfoController();
        $this->user = User::find($id);
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $artists = $this->user_info_controller->get_artists($this->user);
        $genres = $this->user_info_controller->get_genres($artists);
        $playlists = $this->user_info_controller->synthesize_playlist_data($this->user);

        $artist_objs = $this->user_info_controller->create_artists(array_slice($artists, 0, 5, true));
        $genre_objs = $this->user_info_controller->create_genres($genres);
        $this->user_info_controller->create_playlist_objs($playlists, $this->user->id);

        $this->user->artists()->sync($artist_objs);
        $this->user->genres()->sync($genre_objs);

        $this->user->update(['last_info_update' => now()]);
    }
}
