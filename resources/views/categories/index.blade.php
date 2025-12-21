<h1>Daftar Kategori</h1>

<a href="{{ route('categories.create') }}" class="btn btn-primary">Tambah Kategori</a>

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<table class="table table-bordered mt-3">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nama Kategori</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>
        @foreach($categories as $category)
        <tr>
            <td>{{ $category->id }}</td>
            <td>
                <a href="{{ route('categories.show', $category->id) }}">
                    {{ $category->nama }}
                </a>
            </td>
            <td>
                <a href="{{ route('categories.edit', $category->id) }}" class="btn btn-warning btn-sm">Edit</a>

                <form action="{{ route('categories.destroy', $category->id) }}" 
                    method="POST" style="display:inline">
                    @csrf
                    @method('DELETE')

                    <button onclick="return confirm('Hapus kategori ini?')" 
                            class="btn btn-danger btn-sm">
                        Hapus
                    </button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>