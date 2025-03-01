<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\DB;

class PublisherController extends Controller
{
    public function index()
    {
        $publisherId = auth()->id();
        
        
        $totalBooks = Book::where('publisher_id', $publisherId)->count();
        
        
        $salesSummary = DB::table('order_items')
            ->join('books', 'order_items.book_id', '=', 'books.id')
            ->where('books.publisher_id', $publisherId)
            ->select(
                DB::raw('SUM(order_items.quantity) as total_sold'),
                DB::raw('SUM(order_items.quantity * order_items.price_at_time_of_purchase) as total_revenue')
            )
            ->first();
            
        
        $topBooks = Book::where('publisher_id', $publisherId)
            ->withCount(['orders as total_sold' => function($query) {
                $query->select(DB::raw('SUM(order_items.quantity)'));
            }])
            ->orderBy('total_sold', 'desc')
            ->limit(5)
            ->get();
            
        return response()->json([
            'total_books' => $totalBooks,
            'total_sold' => $salesSummary->total_sold ?? 0,
            'total_revenue' => $salesSummary->total_revenue ?? 0,
            'top_books' => $topBooks
        ]);
    }
}