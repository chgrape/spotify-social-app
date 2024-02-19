<?php

namespace App\Console\Commands;

use App\Jobs\UpdateUserInfoDaily;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class Dispatch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dispatch {job} {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Dispatch job';

    /**
     */
    public function handle()
    {
        $id = $this->argument('id');
        $job = $this->argument('job');
        $jobClass = 'App\Jobs\\' . Str::studly($job);

        dispatch_sync(new $jobClass($id));

    }
}
