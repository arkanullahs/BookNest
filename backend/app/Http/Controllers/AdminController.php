<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Book;
use App\Models\Order;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index()
    {
        // Get total users by role
        $usersByRole = User::select('role', DB::raw('count(*) as count'))
            ->groupBy('role')
            ->get();
            
        // Get total books and inventory value
        $booksStats = Book::select(
            DB::raw('count(*) as total_books'),
            DB::raw('SUM(stock_quantity) as total_inventory'),
            DB::raw('SUM(stock_quantity * price) as inventory_value')
        )->first();
        
        // Get total sales
        $salesStats = Order::select(
            DB::raw('count(*) as total_orders'),
            DB::raw('SUM(total_amount) as total_sales')
        )->first();
        
        // Get recent orders
        $recentOrders = Order::with(['user:id,name', 'books:id,title,author'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
            
        return response()->json([
            'users_by_role' => $usersByRole,
            'books_stats' => $booksStats,
            'sales_stats' => $salesStats,
            'recent_orders' => $recentOrders
        ]);
    }
}