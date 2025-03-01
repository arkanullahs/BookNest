<?php
namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use App\Services\JwtService;
use Illuminate\Support\Facades\DB; 

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
        'author' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric|min:0.01',
        'stock_quantity' => 'required|integer|min:0',
        'isbn' => 'required|string|unique:books|max:20',
        'published_year' => 'required|integer|min:1800|max:' . (date('Y') + 1),
        'cover_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);
    
    try {
        if ($request->hasFile('cover_image')) {
            
            $uploadedFileUrl = Cloudinary::upload($request->file('cover_image')->getRealPath(), [
                'folder' => 'books'
            ])->getSecurePath();
        } else {
            return response()->json(['error' => 'Cover image not uploaded properly'], 400);
        }

        $book = Book::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'cover_image' => $uploadedFileUrl,
            'publisher_id' => auth()->id(),
            'stock_quantity' => $request->stock_quantity,
            'isbn' => $request->isbn,
            'author' => $request->author,
            'published_year' => $request->published_year
        ]);

        return response()->json(['message' => 'Book added successfully!', 'book' => $book], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to add book', 'details' => $e->getMessage()], 500);
    }
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
        
        if ($book->cover_image) {
            try {
                
                $parsedUrl = parse_url($book->cover_image);
                $pathParts = explode('/', $parsedUrl['path']);
                
                
                
                $lastPart = end($pathParts);
                $publicIdParts = explode('.', $lastPart);
                array_pop($publicIdParts); 
                
                
                $folderPath = array_slice($pathParts, -2, 1)[0]; 
                $publicId = $folderPath . '/' . implode('.', $publicIdParts);
                
                
                Cloudinary::destroy($publicId);
            } catch (\Exception $e) {
                
                \Log::error('Failed to delete old Cloudinary image: ' . $e->getMessage());
            }
        }
            
        
        $uploadedFileUrl = Cloudinary::upload($request->file('cover_image')->getRealPath(), [
            'folder' => 'books'
        ])->getSecurePath();
        
        $book->cover_image = $uploadedFileUrl;
    }

    $book->update($request->except('cover_image'));
    return response()->json($book);
}


    public function destroy(Book $book)
{
    if ($book->publisher_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    
    if ($book->cover_image) {
        try {
            
            $parsedUrl = parse_url($book->cover_image);
            $pathParts = explode('/', $parsedUrl['path']);
            
            
            
            $lastPart = end($pathParts);
            $publicIdParts = explode('.', $lastPart);
            array_pop($publicIdParts); 
            
            
            $folderPath = array_slice($pathParts, -2, 1)[0]; 
            $publicId = $folderPath . '/' . implode('.', $publicIdParts);
            
            Cloudinary::destroy($publicId);
        } catch (\Exception $e) {
            
            \Log::error('Failed to delete Cloudinary image: ' . $e->getMessage());
        }
    }

    $book->delete();
    return response()->json(['message' => 'Book deleted successfully']);
}
    public function publisherBooks()
    {
        $books = Book::where('publisher_id', auth()->id())
            ->withCount(['orders as total_sold' => function($query) {
                $query->select(DB::raw('sum(order_items.quantity)'));
            }])
            ->withAvg('comments as average_rating', 'rating')
            ->withCount('comments')
            ->paginate(10);

        return response()->json($books);
    }

    public function show(Book $book)
    {
        return response()->json([
            'book' => $book->load(['publisher:id,name', 'comments.user:id,name'])
        ]);
    }
}