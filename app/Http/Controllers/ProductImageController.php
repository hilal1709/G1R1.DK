<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;

class ProductImageController extends Controller
{
    /**
     * Tampilkan semua gambar untuk produk tertentu
     */
    public function index(Product $product)
    {
        return $product->images()->with('product')->get();
    }

    /**
     * Tampilkan satu gambar
     */
    public function show(ProductImage $productImage)
    {
        return $productImage->load('product');
    }

    /**
     * Simpan gambar baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'gambar' => 'required|string', // sesuai kolom di tabel
        ]);

        $image = ProductImage::create($request->only(['product_id','gambar']));

        return $image->load('product');
    }

    /**
     * Update gambar
     */
    public function update(Request $request, ProductImage $productImage)
    {
        $request->validate([
            'gambar' => 'sometimes|required|string',
        ]);

        $productImage->update($request->only(['gambar']));

        return $productImage->load('product');
    }

    /**
     * Hapus gambar
     */
    public function destroy(ProductImage $productImage)
    {
        $productImage->delete();
        return response()->json(['message' => 'Gambar berhasil dihapus']);
    }
}
