<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller {
    
    // User: Leave a review on a book
    public function store(Request $request, $book_id) {
        $request->validate([
            'comment' => 'required|string',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        $book = Book::find($book_id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $review = Review::create([
            'book_id' => $book_id,
            'user_id' => Auth::id(),
            'comment' => $request->comment,
            'rating' => $request->rating
        ]);

        return response()->json($review, 201);
    }
}
