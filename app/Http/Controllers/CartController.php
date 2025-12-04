<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $cartItems = Cart::with(['product'])
            ->where('user_id', $userId)
            ->latest()
            ->get();

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check stock
        if ($request->quantity > $product->stock) {
            return back()->with('error', 'Stok produk tidak mencukupi');
        }

        // Check if item already exists in cart
        $userId = Auth::id();
        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            // Update quantity
            $newQuantity = $cartItem->quantity + $request->quantity;

            if ($newQuantity > $product->stock) {
                return back()->with('error', 'Stok produk tidak mencukupi');
            }

            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            // Create new cart item
            Cart::create([
                'user_id' => $userId,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return back()->with('success', 'Produk berhasil ditambahkan ke keranjang');
    }

    public function update(Request $request, Cart $cart)
    {
        // Check ownership
        $userId = Auth::id();
        if ($cart->user_id !== $userId) {
            abort(403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Check stock
        if ($request->quantity > $cart->product->stock) {
            return back()->with('error', 'Stok produk tidak mencukupi');
        }

        $cart->update(['quantity' => $request->quantity]);

        return back()->with('success', 'Keranjang berhasil diupdate');
    }

    public function destroy(Cart $cart)
    {
        // Check ownership
        $userId = Auth::id();
        if ($cart->user_id !== $userId) {
            abort(403);
        }

        $cart->delete();

        return back()->with('success', 'Produk berhasil dihapus dari keranjang');
    }

    public function clear()
    {
        $userId = Auth::id();
        Cart::where('user_id', $userId)->delete();

        return back()->with('success', 'Keranjang berhasil dikosongkan');
    }

    public function count()
    {
        $userId = Auth::id();
        $count = Cart::where('user_id', $userId)->sum('quantity');

        return response()->json(['count' => $count]);
    }
}
