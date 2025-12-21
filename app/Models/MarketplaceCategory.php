<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketplaceCategory extends Model
{
    //
    protected $fillable = ['marketplace','mp_category_id','name','parent_id'];
}
