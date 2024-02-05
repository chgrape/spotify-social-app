<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Like;
use App\Observers\LikeObserver;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Like::observe(LikeObserver::class);
    }
}
