<h1>Buat Event Baru</h1>

@if ($errors->any())
    <div style="color:red;">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('events.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <div>
        <label>Nama Event:</label><br>
        <input type="text" name="nama" value="{{ old('nama') }}" required>
    </div>

    <div>
        <label>Lokasi:</label><br>
        <input type="text" name="lokasi" value="{{ old('lokasi') }}">
    </div>

    <div>
        <label>Tanggal Mulai:</label><br>
        <input type="datetime-local" name="tanggal_mulai" value="{{ old('tanggal_mulai') }}">
    </div>

    <div>
        <label>Tanggal Selesai:</label><br>
        <input type="datetime-local" name="tanggal_selesai" value="{{ old('tanggal_selesai') }}">
    </div>

    <div>
        <label>Deskripsi:</label><br>
        <textarea name="deskripsi" rows="4">{{ old('deskripsi') }}</textarea>
    </div>

    <h3>Upload Media</h3>
    <div id="media-container">
        <div class="media-item">
            <input type="file" name="files[]">
        </div>
    </div>

    <button type="button" onclick="addMedia()">Tambah Foto / Video</button><br><br>

    <button type="submit">Buat Event</button>
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
