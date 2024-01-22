<?php

namespace App\Console\Commands;

use App\Jobs\RefreshToken;
use App\Jobs\UpdateUserInfoDaily;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

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
                $users_info[] = $user;
            }

            $carb_timestamp = Carbon::parse($user->last_refresh);

            if($carb_timestamp->addHour() < now()){
                $users_refresh[] = $user;
            }
        }
        

        foreach($users as $user){
            RefreshToken::dispatch($user);
        }

        foreach($users as $user){
            UpdateUserInfoDaily::dispatch($user);
        }
    }
}
