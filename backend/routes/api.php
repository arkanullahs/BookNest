<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PurchaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('jwt.auth')->group(function () {

    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/{id}', [BookController::class, 'show']);
    Route::get('/profile', function (Request $request) {
        return response()->json([
            'message' => 'Welcome to your profile',
            'user' => $request->user()
        ]);
    });
        // User routes
        Route::middleware(['role:user'])->group(function () {
            Route::post('/books/{id}/buy', [PurchaseController::class, 'store']);
            Route::get('/user/purchases', [PurchaseController::class, 'index']);
            Route::post('/books/{id}/review', [ReviewController::class, 'store']);
        });
    
        // Publisher routes
        Route::middleware(['role:publisher'])->group(function () {
            Route::post('/books', [BookController::class, 'store']);
            Route::put('/books/{id}', [BookController::class, 'update']);
            Route::delete('/books/{id}', [BookController::class, 'destroy']);
        });});

