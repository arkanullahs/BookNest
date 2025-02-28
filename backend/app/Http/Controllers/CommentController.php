<?php
namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Book;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Book $book)
    {
        $request->validate([
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        $comment = $book->comments()->create([
            'user_id' => auth()->id(),
            'content' => $request->content,
            'rating' => $request->rating
        ]);

        return response()->json($comment, 201);
    }

    public function destroy(Comment $comment)
    {
        if ($comment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();
        return response()->json(['message' => 'Comment deleted successfully']);
    }
}