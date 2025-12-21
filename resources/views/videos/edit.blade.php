<h1>Edit Video</h1>



<form action="{{ route('videos.update', $video->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')

    <div>
        <label>Judul:</label><br>
        <input type="text" name="judul" value="{{ old('judul', $video->judul) }}" required>
    </div>

    <div>
        <label>Deskripsi:</label><br>
        <textarea name="deskripsi" rows="4">{{ old('deskripsi', $video->deskripsi) }}</textarea>
    </div>

    <div>
        <label>Lokasi:</label><br>
        <input type="text" name="lokasi" value="{{ old('lokasi', $video->lokasi) }}">
    </div>

    <div>
        {{-- Tampilkan video saat ini --}}
        @if($video->file_path)
            <video width="500" controls style="margin-bottom:15px;">
                <source src="{{ $video->file_path }}" type="video/mp4">
                Browser Anda tidak mendukung video tag.
            </video>
        @endif
        <label>Ganti File Video:</label><br>
        <input type="file" name="file_path">
        @if($video->file_path)
            <p>File saat ini: <a href="{{ $video->file_path }}" target="_blank">Lihat Video</a></p>
        @endif
    </div>

    <button type="submit">Simpan Perubahan</button>
    <a href="{{ route('videos.index') }}">Batal</a>
</form>

