<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{
    //
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'qty'        => 'nullable|integer|min:1',
        ]);

        $cart = Cart::firstOrCreate([
            'user_id' => Auth::id()
        ]);

        $item = CartItem::firstOrCreate(
            [
                'cart_id'    => $cart->id,
                'product_id' => $request->product_id,
            ],
            [
                'qty' => 0
            ]
        );

        $item->qty += $request->qty ?? 1;
        $item->save();

        return back()->with('success', 'Produk ditambahkan ke cart');
    }

    // ✏️ update quantity
    public function update(Request $request, CartItem $cartItem)
    {
        
        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'qty' => 'required|integer|min:1'
        ]);

        $cartItem->qty = $request->qty;
        $cartItem->save();

        return back()->with('success', 'Jumlah diperbarui');
    }

    // ❌ hapus item dari cart
    public function destroy(CartItem $cartItem)
    {
        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Item dihapus dari cart');
    }
}
