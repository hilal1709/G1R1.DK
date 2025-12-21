
<h1>Tambah Video Baru</h1>

@if ($errors->any())
    <div style="color:red;">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('videos.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <div style="margin-bottom:10px;">
        <label for="judul"><strong>Judul:</strong></label><br>
        <input type="text" name="judul" id="judul" value="{{ old('judul') }}" required style="width:300px;">
    </div>

    <div style="margin-bottom:10px;">
        <label for="deskripsi"><strong>Deskripsi:</strong></label><br>
        <textarea name="deskripsi" id="deskripsi" rows="4" style="width:300px;">{{ old('deskripsi') }}</textarea>
    </div>

    <div style="margin-bottom:10px;">
        <label for="lokasi"><strong>Lokasi:</strong></label><br>
        <input type="text" name="lokasi" id="lokasi" value="{{ old('lokasi') }}" style="width:300px;">
    </div>

    <div style="margin-bottom:10px;">
        <label for="file_path"><strong>File Video:</strong></label><br>
        <input type="file" name="file_path" id="file_path" accept=".mp4,.mov,.avi" required>
    </div>

    <button type="submit">Simpan Video</button>
</form>

<a href="{{ route('videos.index') }}" style="display:block; margin-top:20px;">Kembali ke daftar video</a>

