<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'komentar'];

    public function target()
    {
        return $this->morphTo(); // komentar bisa ke article, video, atau event
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
