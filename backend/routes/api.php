<?php
// routes/api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PublisherDashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public book routes
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{book}', [BookController::class, 'show']);

// Protected routes
Route::middleware('jwt.auth')->group(function () {
    // Profile route
    Route::get('/profile', function (Request $request) {
        return response()->json([
            'message' => 'Welcome to your profile',
            'user' => $request->user()
        ]);
    });

    // Admin routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'index']);
    });

    // Publisher routes
    Route::middleware('role:publisher')->group(function () {
        // Original publisher dashboard
        Route::get('/publisher/dashboard', [PublisherController::class, 'index']);
        
        // Book marketplace publisher features
        Route::post('/books', [BookController::class, 'store']);
        Route::put('/books/{book}', [BookController::class, 'update']);
        Route::delete('/books/{book}', [BookController::class, 'destroy']);
        Route::get('/publisher/dashboard/stats', [PublisherDashboardController::class, 'getStats']);
        Route::get('/publisher/books', [BookController::class, 'publisherBooks']);
        Route::get('/publisher/earnings', [PublisherDashboardController::class, 'getEarnings']);
        Route::get('/publisher/comments', [PublisherDashboardController::class, 'getComments']);
    });

    // User routes
    Route::middleware('role:user')->group(function () {
        // Original user dashboard
        Route::get('/user/dashboard', [UserController::class, 'index']);
        
        // Book marketplace user features
        Route::post('/books/{book}/comments', [CommentController::class, 'store']);
        Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::get('/orders', [OrderController::class, 'index']);
    });
});