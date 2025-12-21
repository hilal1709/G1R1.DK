
<h1>Detail Kategori</h1>

<a href="{{ route('categories.index') }}" class="btn btn-secondary">Kembali</a>

<div class="mt-3">
    <h3>Nama Kategori:</h3>
    <p>{{ $category->nama }}</p>
</div>

<a href="{{ route('categories.edit', $category->id) }}" class="btn btn-warning">Edit</a>

<form action="{{ route('categories.destroy', $category->id) }}" 
      method="POST" 
      style="display:inline">
    @csrf
    @method('DELETE')

    <button class="btn btn-danger"
            onclick="return confirm('Yakin hapus kategori?')">
        Hapus
    </button>
</form>
