<?php
namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::with('publisher');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $books = $query->paginate(12);
        return response()->json($books);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'cover_image' => 'required|image|max:2048',
            'stock_quantity' => 'required|integer|min:0',
            'isbn' => 'required|string|unique:books',
            'author' => 'required|string|max:255',
            'published_year' => 'required|integer|min:1800|max:' . (date('Y') + 1)
        ]);

        // Upload image to Cloudinary
        $uploadedFile = $request->file('cover_image');
        $result = Cloudinary::upload($uploadedFile->getRealPath(), [
            'folder' => 'books',
            'transformation' => [
                'width' => 800,
                'height' => 1200,
                'crop' => 'limit'
            ]
        ]);

        $book = Book::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'cover_image' => $result->getSecurePath(),
            'publisher_id' => auth()->id(),
            'stock_quantity' => $request->stock_quantity,
            'isbn' => $request->isbn,
            'author' => $request->author,
            'published_year' => $request->published_year
        ]);

        return response()->json($book, 201);
    }

    public function update(Request $request, Book $book)
    {
        if ($book->publisher_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric|min:0',
            'cover_image' => 'sometimes|image|max:2048',
            'stock_quantity' => 'integer|min:0',
            'isbn' => 'string|unique:books,isbn,' . $book->id,
            'author' => 'string|max:255',
            'published_year' => 'integer|min:1800|max:' . (date('Y') + 1)
        ]);

        if ($request->hasFile('cover_image')) {
            // Delete old image from Cloudinary
            $oldImagePath = $book->cover_image;
            if ($oldImagePath) {
                $publicId = Cloudinary::getPublicId($oldImagePath);
                Cloudinary::destroy($publicId);
            }

            // Upload new image
            $uploadedFile = $request->file('cover_image');
            $result = Cloudinary::upload($uploadedFile->getRealPath(), [
                'folder' => 'books',
                'transformation' => [
                    'width' => 800,
                    'height' => 1200,
                    'crop' => 'limit'
                ]
            ]);
            $book->cover_image = $result->getSecurePath();
        }

        $book->update($request->except('cover_image'));
        return response()->json($book);
    }

    public function destroy(Book $book)
    {
        if ($book->publisher_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete image from Cloudinary
        if ($book->cover_image) {
            $publicId = Cloudinary::getPublicId($book->cover_image);
            Cloudinary::destroy($publicId);
        }

        $book->delete();
        return response()->json(['message' => 'Book deleted successfully']);
    }
}