<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class PublisherDashboardController extends Controller
{
    public function getStats()
    {
        $publisherId = auth()->id();

        // Get total earnings and books sold
        $stats = DB::table('order_items')
            ->join('books', 'order_items.book_id', '=', 'books.id')
            ->where('books.publisher_id', $publisherId)
            ->select(
                DB::raw('SUM(order_items.quantity * order_items.price_at_time_of_purchase) as total_earnings'),
                DB::raw('SUM(order_items.quantity) as total_books_sold')
            )
            ->first();

        // Get latest comments
        $latestComments = Book::where('publisher_id', $publisherId)
            ->with(['comments' => function($query) {
                $query->latest()->with('user:id,name');
            }])
            ->get()
            ->pluck('comments')
            ->flatten()
            ->take(10);

        // Get books performance
        $booksPerformance = Book::where('publisher_id', $publisherId)
            ->withCount('orders as total_sales')
            ->withAvg('comments as average_rating', 'rating')
            ->get();

        return response()->json([
            'total_earnings' => $stats->total_earnings ?? 0,
            'total_books_sold' => $stats->total_books_sold ?? 0,
            'latest_comments' => $latestComments,
            'books_performance' => $booksPerformance
        ]);
    }
}