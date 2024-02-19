<?php

namespace App\Console\Commands;

use App\Jobs\RefreshToken;
use App\Jobs\UpdateUserInfoDaily;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CheckUpdate extends Command
{

    protected $signature = 'check:update';

    protected $description = 'Check if any user needs updating';

    public function handle()
    {

        $users = User::all();
        $users_info = [];
        $users_refresh = [];

        foreach($users as $user){
            $carb_timestamp = Carbon::parse($user->last_info_update);

            if($carb_timestamp->addDay() < now()){
                $users_info[] = $user->id;
            }

            $carb_timestamp = Carbon::parse($user->last_refresh);

            $users_refresh[] = $user->id;
        }


        foreach($users_refresh as $user){
            RefreshToken::dispatch($user);
        }

        foreach($users_info as $user){
            UpdateUserInfoDaily::dispatch($user);
        }
    }
}
