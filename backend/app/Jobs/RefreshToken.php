<?php

namespace App\Jobs;

use App\Http\Controllers\UserInfoController;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RefreshToken implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $user_info_controller;

    /**
     * Create a new job instance.
     */
    public function __construct(int $id)
    {
        $this->user = User::find($id);
        $this->user_info_controller = new UserInfoController();
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {   
        $token = $this->user_info_controller->get_new_token($this->user->refresh_token);
        $this->user->update(['token' => $token, 'last_refresh' => now()]);
    }
}
