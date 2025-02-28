<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', auth()->id())
            ->with(['books' => function($query) {
                $query->select('books.id', 'title', 'author', 'cover_image');
            }])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        return response()->json($orders);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.book_id' => 'required|exists:books,id',
            'items.*.quantity' => 'required|integer|min:1'
        ]);

        try {
            DB::beginTransaction();

            $totalAmount = 0;
            $orderItems = [];

            foreach ($request->items as $item) {
                $book = Book::findOrFail($item['book_id']);
                
                if ($book->stock_quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for book: {$book->title}");
                }

                $totalAmount += $book->price * $item['quantity'];
                $book->stock_quantity -= $item['quantity'];
                $book->save();

                $orderItems[$item['book_id']] = [
                    'quantity' => $item['quantity'],
                    'price_at_time_of_purchase' => $book->price
                ];
            }

            $order = Order::create([
                'user_id' => auth()->id(),
                'total_amount' => $totalAmount,
                'status' => 'completed'
            ]);

            $order->books()->attach($orderItems);

            DB::commit();
            return response()->json($order->load('books'), 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function show(Order $order)
    {
        // Check if order belongs to user
        if ($order->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'order' => $order->load(['books' => function($query) {
                $query->with('publisher:id,name');
            }])
        ]);
    }
}