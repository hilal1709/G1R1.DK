<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    protected $fillable = [
        'category_id',
        'nama',
        'sku',
        'deskripsi',
        'harga',
        'shopee_link',
        'stok'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function marketplaceLinks()
    {
        return $this->hasMany(ProductMarketplace::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'target');
    }

    public function averageRating()
    {
        return $this->reviews()->avg('rating');
    }

    public function reviewCount()
    {
        return $this->reviews()->count();
    }

}
