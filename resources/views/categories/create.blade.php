
<h1>Tambah Kategori</h1>

<a href="{{ route('categories.index') }}" class="btn btn-secondary">Kembali</a>

<form action="{{ route('categories.store') }}" method="POST" class="mt-3">
    @csrf

    <div class="mb-3">
        <label>Nama Kategori</label>
        <input type="text" name="nama" class="form-control" required>
        @error('nama')
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>

    <button class="btn btn-primary">Simpan</button>
</form>

