<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services, such as custom services you want to provide, like EmailService, UsersService etc.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Configure Cloudinary
  
    }
}
