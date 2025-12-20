<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    //
    public function index()
    {
        // pastikan user login
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // ambil / buat cart user
        $cart = Cart::with('items.product')
            ->firstOrCreate(['user_id' => Auth::id()]);

        return view('carts.index', compact('cart'));
    }
}
