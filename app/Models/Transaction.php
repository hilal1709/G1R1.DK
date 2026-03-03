<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'admin_id',

        'nama_penerima',
        'no_wa',
        'alamat',
        'ekspedisi',

        'subtotal',
        'ongkir',
        'total',

        'status',

        'bukti_transfer',
        'dibayar_pada',

        'resi',
        'dikirim_pada',
    ];

    protected $casts = [
        'dibayar_pada' => 'datetime',
        'dikirim_pada' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function details()
    {
        return $this->hasMany(TransactionDetail::class);
    }
}
