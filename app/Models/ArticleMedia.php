<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleMedia extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleMediaFactory> */
    use HasFactory;

    protected $table = 'article_medias';

    protected $fillable = [
        'article_id',
        'file_path',
        'jenis',
    ];

    /**
     * Relasi ke Article
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

}
