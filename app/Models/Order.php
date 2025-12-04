<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_number',
        'user_id',
        'total_amount',
        'status',
        'payment_method',
        'customer_notes',
        'items',
        'customer_name',
        'customer_phone',
        'customer_address',
    ];

    protected $casts = [
        'items' => 'array',
        'total_amount' => 'decimal:2',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    // Static method untuk generate order number
    public static function generateOrderNumber()
    {
        $prefix = 'DK-';
        $date = date('Ymd');
        $lastOrder = self::whereDate('created_at', today())->latest()->first();

        if ($lastOrder) {
            $lastNumber = intval(substr($lastOrder->order_number, -4));
            $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '0001';
        }

        return $prefix . $date . '-' . $newNumber;
    }
}
