<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;

class ProductController extends Controller
{

    private function forbidMember()
    {
        if (auth()->user()->role === 'member') {
            abort(403, 'Member tidak punya akses.');
        }
    }
    // Tampilkan semua produk
    public function index()
    {
        $products = Product::with('category','images')->get();
        return view('products.index', compact('products'));
    }

    // Tampilkan detail produk
    public function show(Product $product)
    {
        // Load relasi category dan images
        $product->load('category', 'images');
        
        return view('products.show', compact('product'));
    }

    // Form tambah produk
    public function create()
    {
        $this->forbidMember();
        $categories = Category::all();
        return view('products.create', compact('categories'));
    }

    // Simpan produk baru
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:200',
            'sku' => 'required|string|max:100|unique:products,sku',
            'category_id' => 'required|exists:categories,id',
            'deskripsi' => 'nullable|string',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $this->forbidMember();

        $product = Product::create([
            'nama' => $request->nama,
            'sku' => $request->sku,
            'category_id' => $request->category_id,
            'deskripsi' => $request->deskripsi,
            'harga' => $request->harga,
            'stok' => $request->stok,
        ]);


        // Upload gambar banyak
        if($request->hasFile('images')) {
            foreach($request->file('images') as $image) {
                $path = $image->store('products','public');
                $product->images()->create([
                    'gambar' => '/storage/'.$path
                ]);
            }
        }

        return redirect()->route('products.index')->with('success', 'Produk berhasil dibuat!');
    }

    // Form edit produk
    public function edit(Product $product)
    {
        $this->forbidMember();
        $categories = Category::all();
        return view('products.edit', compact('product','categories'));
    }

    // Update produk
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'nama' => 'required|string|max:200',
            'sku' => 'required|string|max:100|unique:products,sku,' . $product->id,
            'category_id' => 'required|exists:categories,id',
            'deskripsi' => 'nullable|string',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $this->forbidMember();

        $product->update($request->only('nama','sku','category_id','deskripsi','harga','stok'));
        // Replace gambar lama jika ada file baru
        if($request->has('replace_images')) {
            foreach($request->replace_images as $imageId => $file) {
                $img = ProductImage::find($imageId);
                if($img && $file) {
                    \Storage::disk('public')->delete(str_replace('/storage/','',$img->gambar));
                    $path = $file->store('products','public');
                    $img->update([
                        'gambar' => '/storage/'.$path
                    ]);
                }
            }
        }

        // Hapus gambar yang dicentang
        if($request->has('delete_images')) {
            foreach($request->delete_images as $imageId) {
                $img = ProductImage::find($imageId);
                if($img) {
                    \Storage::disk('public')->delete(str_replace('/storage/','',$img->gambar));
                    $img->delete();
                }
            }
        }

        // Tambah gambar baru
        if($request->hasFile('images')) {
            foreach($request->file('images') as $image) {
                $path = $image->store('products','public');
                $product->images()->create([
                    'gambar' => '/storage/'.$path
                ]);
            }
        }

        return redirect()->route('products.index')->with('success','Produk berhasil diupdate!');
    }

    // Hapus produk beserta semua gambar
    public function destroy(Product $product)
    {
        $this->forbidMember();
        foreach($product->images as $img) {
            \Storage::disk('public')->delete(str_replace('/storage/','',$img->gambar));
            $img->delete();
        }

        $product->delete();

        return redirect()->route('products.index')->with('success','Produk berhasil dihapus!');
    }
}
