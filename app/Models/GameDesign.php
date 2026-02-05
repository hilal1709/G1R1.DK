<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameDesign extends Model
{
    protected $fillable = [
        'nama',
        'level',
        'deskripsi',
        'path_data',
        'thumbnail',
        'is_active',
    ];

    protected $casts = [
        'path_data' => 'array',
        'is_active' => 'boolean',
    ];
}
