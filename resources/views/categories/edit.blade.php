
<h1>Edit Kategori</h1>

<a href="{{ route('categories.index') }}" class="btn btn-secondary">Kembali</a>

<form action="{{ route('categories.update', $category->id) }}" method="POST" class="mt-3">
    @csrf
    @method('PUT')

    <div class="mb-3">
        <label>Nama Kategori</label>
        <input type="text" name="nama" 
               value="{{ $category->nama }}" 
               class="form-control" required>

        @error('nama')
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>

    <button class="btn btn-primary">Update</button>
</form>
