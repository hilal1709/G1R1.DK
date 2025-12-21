<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{

    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    protected $table = 'articles';

    protected $fillable = [
        'judul',
        'isi',
        'user_id',
    ];

    /**
     * Relasi ke Admin (User)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke ArticleMedia
     */
    public function articleMedias()
    {
        return $this->hasMany(ArticleMedia::class, 'article_id');
    }
    
    public function comments()
    {
        return $this->morphMany(Comment::class, 'target');
    }
    


}
