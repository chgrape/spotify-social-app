<?php

namespace App\Jobs;

use App\Http\Controllers\UserInfoController;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RefreshToken implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $user_info_controller;

    /**
     * Create a new job instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
        $this->user_info_controller = new UserInfoController();
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {   
        $tokens = $this->user_info_controller->get_new_token($this->user->refresh_token);
        dd($tokens);
        $this->user->update(['token' => $tokens[0], 'refresh_token' => $tokens[1], 'last_refresh' => now()]);
    }
}
