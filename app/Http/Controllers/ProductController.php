<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query()->active();

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->byCategory($request->category);
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sort
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'popular':
                $query->orderBy('views', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            default:
                $query->latest();
        }

        $products = $query->with('reviews')->paginate(12);

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'category', 'min_price', 'max_price', 'sort']),
            'categories' => ['Klasik', 'Modern', 'Premium', 'Mini', 'Jumbo', 'Custom']
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/Create', [
            'categories' => ['Klasik', 'Modern', 'Premium', 'Mini', 'Jumbo', 'Custom']
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'short_description' => 'nullable|string|max:500',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0|lt:price',
            'stock' => 'required|integer|min:0',
            'sku' => 'required|string|unique:products,sku',
            'category' => 'required|string',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'shopee_link' => 'nullable|url',
            'is_featured' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        // Handle multiple image uploads
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = $path;
            }
        }
        $validated['images'] = $imagePaths;

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Produk berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        // Increment views
        $product->increment('views');

        $product->load(['reviews' => function ($query) {
            $query->approved()->with('user')->latest();
        }]);

        $relatedProducts = Product::active()
            ->where('category', $product->category)
            ->where('id', '!=', $product->id)
            ->inStock()
            ->limit(4)
            ->get();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => ['Klasik', 'Modern', 'Premium', 'Mini', 'Jumbo', 'Custom']
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'short_description' => 'nullable|string|max:500',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0|lt:price',
            'stock' => 'required|integer|min:0',
            'sku' => 'required|string|unique:products,sku,' . $product->id,
            'category' => 'required|string',
            'shopee_link' => 'nullable|url',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'new_images' => 'nullable|array',
            'new_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'existing_images' => 'nullable|array',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        // Handle images
        $imagePaths = $request->get('existing_images', []);

        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = $path;
            }
        }

        // Delete removed images
        $oldImages = $product->images;
        $removedImages = array_diff($oldImages, $imagePaths);
        foreach ($removedImages as $removed) {
            Storage::disk('public')->delete($removed);
        }

        $validated['images'] = $imagePaths;

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Produk berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete images
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image);
        }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus!');
    }
}
