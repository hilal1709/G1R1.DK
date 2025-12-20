<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'lokasi',
        'tanggal',
        'deskripsi',
        'user_id'
    ];

    /**
     * Relasi ke user (penyelenggara/event creator)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke media
     */
    public function eventMedias()
    {
        return $this->hasMany(EventMedia::class, 'event_id');
    }

    /**
     * Relasi komentar (polimorfik)
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'target');
    }
}
