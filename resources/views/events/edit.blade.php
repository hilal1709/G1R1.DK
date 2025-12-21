<h2>Edit Event</h2>

<form action="/events/{{ $event->id }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')

    <label>Nama Event:</label><br>
    <input type="text" name="nama" value="{{ old('nama', $event->nama) }}"><br><br>

    <label>Lokasi:</label><br>
    <input type="text" name="lokasi" value="{{ old('lokasi', $event->lokasi) }}"><br><br>

    <label>Tanggal:</label><br>
    <input type="datetime-local" name="tanggal" 
           value="{{ old('tanggal', $event->tanggal ? date('Y-m-d\TH:i', strtotime($event->tanggal)) : '') }}"><br><br>

    <label>Deskripsi:</label><br>
    <textarea name="deskripsi">{{ old('deskripsi', $event->deskripsi) }}</textarea><br><br>

    <!-- MEDIA LAMA (Preview) -->
    <h3>Media Lama</h3>
    @foreach($event->eventMedias as $media)
        <div style="margin-bottom:10px;">
            @if(preg_match('/\.(jpg|jpeg|png)$/i', $media->file_path))
                <img src="{{ $media->file_path }}" style="width:100px;">
            @else
                <video width="150" controls>
                    <source src="{{ $media->file_path }}">
                </video>
            @endif

            <!-- Pilih file baru untuk mengganti media lama -->
            <input type="file" name="replace_files[{{ $media->id }}]">

            <label>
                <input type="checkbox" name="delete_media[]" value="{{ $media->id }}">
                Hapus media ini
            </label>
        </div>
    @endforeach

    <!-- Tambah Media Baru -->
    <h3>Tambah Media Baru</h3>
    <div id="media-container">
        <div class="media-item">
            <input type="file" name="files[]">
        </div>
    </div>
    <button type="button" onclick="addMedia()">Tambah Media</button><br><br>

    <button type="submit">Update Event</button>
</form>

<script>
function addMedia() {
    const container = document.getElementById('media-container');
    const div = document.createElement('div');
    div.classList.add('media-item');
    div.innerHTML = `<input type="file" name="files[]">`;
    container.appendChild(div);
}
</script>
