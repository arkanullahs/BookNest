<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller {
    
    // Public: Get all books
    public function index() {
        return response()->json(Book::all());
    }

    // Public: Get a single book by ID
    public function show($id) {
        $book = Book::with('reviews')->find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        return response()->json($book);
    }

    // Publisher: Create a book
    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'cover_image' => 'required|string', // Cloudinary URL
            'stock' => 'required|integer|min:0'
        ]);

        if (Auth::user()->role !== 'publisher') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'description' => $request->description,
            'price' => $request->price,
            'cover_image' => $request->cover_image,
            'stock' => $request->stock,
            'publisher_id' => Auth::id()
        ]);

        return response()->json($book, 201);
    }

    // Publisher: Update a book
    public function update(Request $request, $id) {
        $book = Book::find($id);
        if (!$book || $book->publisher_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized or Book Not Found'], 403);
        }

        $book->update($request->only(['title', 'author', 'description', 'price', 'cover_image', 'stock']));
        return response()->json($book);
    }

    // Publisher: Delete a book
    public function destroy($id) {
        $book = Book::find($id);
        if (!$book || $book->publisher_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized or Book Not Found'], 403);
        }

        $book->delete();
        return response()->json(['message' => 'Book deleted']);
    }
}
