<?php
// app/Models/Book.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'cover_image',
        'publisher_id',
        'stock_quantity',
        'isbn',
        'author',
        'published_year'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'published_year' => 'integer'
    ];

    public function publisher()
    {
        return $this->belongsTo(User::class, 'publisher_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items')
            ->withPivot('quantity', 'price_at_time_of_purchase');
    }
}
