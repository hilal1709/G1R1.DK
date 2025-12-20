<!DOCTYPE html>
<html>
<head>
    <title>Edit Produk</title>
    <style>
        body { font-family: Arial; margin: 30px; }
        input, textarea, select { margin-bottom: 10px; padding: 5px; width: 300px;}
        img { width: 120px; display:block; margin-bottom:5px; }
        .media-item { margin-bottom: 15px; }
    </style>
</head>
<body>

<h1>Edit Produk</h1>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif

<form action="{{ route('products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method("PUT")

    <label>Nama:</label><br>
    <input type="text" name="nama" value="{{ $product->nama }}"><br>

    <label>SKU:</label><br>
    <input type="text" name="sku" value="{{ $product->sku }}"><br>

    <label>Kategori:</label><br>
    <select name="category_id">
        @foreach($categories as $c)
            <option value="{{ $c->id }}" {{ $product->category_id == $c->id ? 'selected' : '' }}>
                {{ $c->nama }}
            </option>
        @endforeach
    </select><br>

    <label>Deskripsi:</label><br>
    <textarea name="deskripsi">{{ $product->deskripsi }}</textarea><br>

    <label>Harga:</label><br>
    <input type="number" name="harga" value="{{ $product->harga }}"><br>

    <label>Stok:</label><br>
    <input type="number" name="stok" value="{{ $product->stok }}"><br>

    <h3>Gambar Produk</h3>

    @foreach($product->images as $img)
        <div class="media-item">
            <img src="{{ $img->gambar }}">

            <label>Ganti Gambar:</label>
            <input type="file" name="replace_images[{{ $img->id }}]"><br>

            <label>
                <input type="checkbox" name="delete_images[]" value="{{ $img->id }}">
                Hapus gambar ini
            </label>
        </div>
    @endforeach

    <h3>Tambah Gambar Baru</h3>

    <div id="media-container">
        <div class="media-item">
            <input type="file" name="images[]">
        </div>
    </div>

    <button type="button" onclick="addMedia()">Tambah Gambar</button><br><br>

    <button type="submit">Simpan Perubahan</button>

</form>

<script>
function addMedia() {
    const div = document.createElement('div');
    div.classList.add('media-item');
    div.innerHTML = `<input type="file" name="images[]">`;
    document.getElementById('media-container').appendChild(div);
}
</script>

</body>
</html>
