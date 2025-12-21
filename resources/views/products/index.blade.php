<!DOCTYPE html>
<html>
<head>
    <title>Daftar Produk</title>
    <style>
        body { font-family: Arial; margin: 30px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #999; padding: 8px; text-align: left; }
        img { width: 60px; height: 60px; object-fit: cover; }
        a { margin-right: 10px; }
    </style>
</head>
<body>

<h1>Daftar Produk</h1>

<a href="{{ route('products.create') }}">+ Tambah Produk</a>

<a href="{{ route('carts.index') }}">
    🛒 Cart
</a>

<table>
    <thead>
        <tr>
            <th>Nama</th>
            <th>SKU</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Gambar</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>
        @foreach($products as $p)
        <tr>
            <td>{{ $p->nama }}</td>
            <td>{{ $p->sku }}</td>
            <td>{{ $p->category->nama }}</td>
            <td>{{ number_format($p->harga) }}</td>
            <td>
                @foreach($p->images as $img)
                    <img src="{{ $img->gambar }}">
                @endforeach
            </td>
            <td>
                <a href="{{ route('products.show', $p->id) }}">Lihat</a>
                <a href="{{ route('products.edit', $p->id) }}">Edit</a>

                <form action="{{ route('products.destroy', $p->id) }}" method="POST" style="display:inline">
                    @csrf
                    @method("DELETE")
                    <button onclick="return confirm('Hapus produk?')">Hapus</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

</body>
</html>
