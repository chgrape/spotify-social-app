<?php

namespace App\Console;

use App\Http\Controllers\UserInfoController;
use App\Jobs\UpdateUserInfoDaily;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $user_info_controller = new UserInfoController();
        $schedule->job(new UpdateUserInfoDaily($user_info_controller))->everyThirtySeconds();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
