<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GameDesign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GameDesignController extends Controller
{
    public function index()
    {
        $designs = GameDesign::latest()->get();

        return Inertia::render('GameDesigns/Index', [
            'designs' => $designs,
        ]);
    }

    public function create()
    {
        return Inertia::render('GameDesigns/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'level' => 'required|in:mudah,sedang,sulit',
            'deskripsi' => 'nullable|string',
            'path_data' => 'required|json',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('game-designs', $imageName, 'public');
            $validated['thumbnail'] = $imagePath;
        }

        GameDesign::create($validated);

        return redirect()->route('games.mewarnai')
            ->with('success', 'Desain berhasil ditambahkan');
    }

    public function edit(GameDesign $gameDesign)
    {
        return Inertia::render('GameDesigns/Edit', [
            'design' => $gameDesign,
        ]);
    }

    public function update(Request $request, GameDesign $gameDesign)
    {
        // Handle toggle active dari Index page
        if ($request->has('toggle_active')) {
            $gameDesign->update(['is_active' => !$gameDesign->is_active]);
            return back()->with('success', 'Status desain berhasil diubah');
        }

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'level' => 'required|in:mudah,sedang,sulit',
            'deskripsi' => 'nullable|string',
            'path_data' => 'required|json',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($gameDesign->thumbnail) {
                Storage::disk('public')->delete($gameDesign->thumbnail);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('game-designs', $imageName, 'public');
            $validated['thumbnail'] = $imagePath;
        }

        $gameDesign->update($validated);

        return redirect()->route('games.mewarnai')
            ->with('success', 'Desain berhasil diupdate');
    }

    public function destroy(GameDesign $gameDesign)
    {
        // Delete image if exists
        if ($gameDesign->thumbnail) {
            Storage::disk('public')->delete($gameDesign->thumbnail);
        }

        $gameDesign->delete();

        return redirect()->route('games.mewarnai')
            ->with('success', 'Desain berhasil dihapus');
    }
}
