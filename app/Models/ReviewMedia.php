<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ReviewMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        'review_id', // relasi ke review
        'media_url',
        'media_type', // image, video, dll
    ];

    /**
     * Relasi dengan model Review (Many-to-One)
     */
    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}
