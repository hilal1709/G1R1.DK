<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    //
    public function index()
    {
        $userId = Auth::id();
        // ambil / buat cart user
        $cart = Cart::with('items.product')
            ->firstOrCreate(['user_id' => $userId]);

        return Inertia::render('Cart/Index', [
            'cartItems' => $cart->items,  // Kirim semua item dalam cart ke Vue component
        ]);
    }
}
