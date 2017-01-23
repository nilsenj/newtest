<?php

namespace App\Providers;

use App\UberCore\GoogleMapsCoordinator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $googleCoordinator = new GoogleMapsCoordinator();

        $this->app->instance('GoogleMapsCoordinator', $googleCoordinator);
    }
}
