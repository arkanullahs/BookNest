<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('jwt.auth')->group(function () {

    Route::get('/profile', function (Request $request) {
        return response()->json([
            'message' => 'Welcome to your profile',
            'user' => $request->user()
        ]);
    });

    // Role-based routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'index']);
    });

    Route::middleware('role:publisher')->group(function () {
        Route::get('/publisher/dashboard', [PublisherController::class, 'index']);
    });

    Route::middleware('role:user')->group(function () {
        Route::get('/user/dashboard', [UserController::class, 'index']);
    });
});
