<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewFactory> */

    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'rating',
        'komentar',
    ];

    /**
     * Relasi ke produk
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Relasi ke user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke review media/images
     */
    public function reviewMedias()
    {
        return $this->hasMany(ReviewMedia::class);
    }

    /**
     * Alias untuk images (untuk kemudahan akses frontend)
     */
    public function images()
    {
        return $this->hasMany(ReviewMedia::class);
    }
}
