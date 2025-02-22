<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PurchaseController extends Controller {
    
    // User: Purchase a book
    public function store(Request $request, $book_id) {
        $request->validate(['quantity' => 'required|integer|min:1']);

        $book = Book::find($book_id);
        if (!$book || $book->stock < $request->quantity) {
            return response()->json(['message' => 'Book not available'], 400);
        }

        // Reduce stock
        $book->stock -= $request->quantity;
        $book->save();

        // Create purchase record
        $purchase = Purchase::create([
            'book_id' => $book_id,
            'user_id' => Auth::id(),
            'quantity' => $request->quantity,
            'total_price' => $book->price * $request->quantity
        ]);

        return response()->json(['message' => 'Purchase successful', 'purchase' => $purchase], 201);
    }

    // User: View purchase history
    public function index() {
        $purchases = Purchase::where('user_id', Auth::id())->with('book')->get();
        return response()->json($purchases);
    }
}
