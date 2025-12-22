<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;

use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{

    private function forbidMember()
    {
        if (Auth::user()->role === 'member') {
            abort(403, 'Member tidak punya akses.');
        }
    }
    // Tampilkan semua produk
    public function index(Request $request)
    {
        $query = Product::query();

        // Search
        if ($request->filled('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%');
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('nama', $request->category);
            });
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('harga', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('harga', '<=', $request->max_price);
        }

        // Sort
        $sortBy = $request->get('sort', 'latest');

        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('harga', 'asc');
                break;
            case 'price_high':
                $query->orderBy('harga', 'desc');
                break;
            default:
                $query->latest();
        }

        $products = $query
            ->with(['category', 'images'])
            ->paginate(12)
            ->withQueryString();

        $categories = Category::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'min_price', 'max_price', 'sort']),
        ]);
    }

    // Tampilkan detail produk
    public function show(Product $product)
    {
        // Load relasi category, images, reviews, dan comments
        $product->load([
            'category',
            'images',
            'reviews' => function ($query) {
                $query->with(['user', 'images'])->latest();
            },
            'comments' => function ($query) {
                $query->with('user')->latest();
            }
        ]);

        // Hitung average rating dan review count
        $product->average_rating = $product->reviews->avg('rating') ?? 0;
        $product->review_count = $product->reviews->count();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'reviews' => $product->reviews,
            'comments' => $product->comments,
        ]);
    }

    // Form tambah produk
    public function create()
    {
        $this->forbidMember();
        $categories = Category::all();
        return Inertia::render('Products/Create', [
            'categories' => $categories
        ]);
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
            'shopee_link' => 'nullable|url',
            'images' => 'required|array|min:3',
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ], [
            'images.required' => 'Gambar produk wajib diupload.',
            'images.min' => 'Minimal 3 gambar produk harus diupload.',
            'images.*.required' => 'Setiap file gambar harus valid.',
            'images.*.image' => 'File harus berupa gambar.',
            'images.*.mimes' => 'Format gambar harus JPEG, PNG, atau JPG.',
            'images.*.max' => 'Ukuran gambar maksimal 2MB.',
        ]);

        $this->forbidMember();

        $product = Product::create([
            'nama' => $request->nama,
            'sku' => $request->sku,
            'category_id' => $request->category_id,
            'deskripsi' => $request->deskripsi,
            'harga' => $request->harga,
            'stok' => $request->stok,
            'shopee_link' => $request->shopee_link,
        ]);


        // Upload gambar banyak (minimal 3)
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
        $product->load('images');
        $categories = Category::all();
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
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
            'shopee_link' => 'nullable|url',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $this->forbidMember();

        $product->update($request->only('nama','sku','category_id','deskripsi','harga','stok','shopee_link'));

        // Replace gambar lama jika ada file baru
        if($request->has('replace_images')) {
            foreach($request->replace_images as $imageId => $file) {
                $img = ProductImage::find($imageId);
                if($img && $file) {
                    Storage::disk('public')->delete(str_replace('/storage/','',$img->gambar));
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
                    Storage::disk('public')->delete(str_replace('/storage/','',$img->gambar));
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
            Storage::disk('public')->delete(str_replace('/storage/','',$img->gambar));
            $img->delete();
        }

        $product->delete();
        return redirect()->route('products.index')->with('success','Produk berhasil dihapus!');

    }

    // API endpoint untuk mendapatkan stok terbaru
    public function getStock(Product $product)
    {
        // Refresh dari database untuk mendapatkan data terbaru
        $product->refresh();

        return response()->json([
            'stok' => $product->stok,
            'updated_at' => $product->updated_at->toISOString(),
            'is_available' => $product->stok > 0,
        ]);
    }
}
