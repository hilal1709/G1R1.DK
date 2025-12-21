<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    /** @use HasFactory<\Database\Factories\VideoFactory> */
    use HasFactory;

    protected $fillable = [
        'judul',
        'deskripsi',
        'file_path',
        'lokasi',
        'user_id',
    ];

    /**
     * Relasi ke user (pemilik video)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi komentar (menggunakan polymorphic)
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'target');
    }
}
