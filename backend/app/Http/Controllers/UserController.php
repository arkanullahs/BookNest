<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Book;
use App\Models\Comment;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        
        // Get order summary
        $orderCount = Order::where('user_id', $userId)->count();
        $totalSpent = Order::where('user_id', $userId)->sum('total_amount');
        
        // Get latest orders
        $latestOrders = Order::where('user_id', $userId)
            ->with(['books:id,title,author,cover_image'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
            
        // Get comment count
        $commentCount = Comment::where('user_id', $userId)->count();
        
        // Get recommended books based on previous purchases
        $recommendedBooks = $this->getRecommendedBooks($userId);
        
        return response()->json([
            'order_count' => $orderCount,
            'total_spent' => $totalSpent,
            'latest_orders' => $latestOrders,
            'comment_count' => $commentCount,
            'recommended_books' => $recommendedBooks
        ]);
    }
    
    private function getRecommendedBooks($userId)
    {
        // Get genres/authors the user has purchased or rated highly
        $purchasedBookIds = Order::where('user_id', $userId)
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->pluck('order_items.book_id')
            ->toArray();
            
        $highlyRatedBookIds = Comment::where('user_id', $userId)
            ->where('rating', '>=', 4)
            ->pluck('book_id')
            ->toArray();
            
        $userBookIds = array_merge($purchasedBookIds, $highlyRatedBookIds);
        
        if (empty($userBookIds)) {
            // If no purchase history, return popular books
            return Book::withCount(['orders as popularity' => function($query) {
                $query->select(DB::raw('SUM(order_items.quantity)'));
            }])
            ->orderBy('popularity', 'desc')
            ->limit(5)
            ->get();
        }
        
        // Get authors and similar books
        $userBooks = Book::whereIn('id', $userBookIds)->get();
        $authors = $userBooks->pluck('author')->toArray();
        
        return Book::whereIn('author', $authors)
            ->whereNotIn('id', $userBookIds)
            ->withAvg('comments as rating', 'rating')
            ->orderBy('rating', 'desc')
            ->limit(5)
            ->get();
    }
}