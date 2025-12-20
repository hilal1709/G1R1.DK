<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductMarketplace extends Model
{
    //
    // Kolom yang boleh diisi massal
    protected $fillable = [
        'product_id',
        'marketplace',
        'mp_product_id',
        'mp_sku',
        'status'
    ];

    /**
     * Relasi ke produk lokal
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
