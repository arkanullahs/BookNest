<?php

use App\Http\Controllers\AuthController;

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return response()->json(['message' => 'Welcome, Admin']);
    });
});

Route::middleware(['auth:sanctum', 'role:publisher'])->group(function () {
    Route::get('/publisher/dashboard', function () {
        return response()->json(['message' => 'Welcome, Publisher']);
    });
});

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/user/dashboard', function () {
        return response()->json(['message' => 'Welcome, User']);
    });

});
Route::middleware('auth:sanctum')->get('/protected', function () {
    return response()->json(['success' => true, 'message' => 'Authenticated']);
});


