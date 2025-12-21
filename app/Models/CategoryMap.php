<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryMap extends Model
{
    protected $fillable = ['category_id', 'marketplace', 'mp_category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
