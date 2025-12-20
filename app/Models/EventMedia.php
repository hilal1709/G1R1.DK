<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventMedia extends Model
{
    /** @use HasFactory<\Database\Factories\EventMediaFactory> */
    use HasFactory;

    protected $fillable = [
        'event_id',
        'file_path'
    ];

    protected $table = 'event_medias';

    /**
     * Relasi ke event
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
