<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Fix the routes by using the fully qualified class name
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', 'logout');
        Route::get('/me', 'me');
    });
});