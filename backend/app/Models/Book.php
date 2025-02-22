<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model {
    use HasFactory;

    protected $fillable = ['title', 'author', 'description', 'price', 'cover_image', 'stock', 'publisher_id'];

    public function publisher() {
        return $this->belongsTo(User::class, 'publisher_id');
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function purchases() {
        return $this->hasMany(Purchase::class);
    }
}
