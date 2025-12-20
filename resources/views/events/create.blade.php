
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
        <label>Tanggal:</label><br>
        <input type="datetime-local" name="tanggal" value="{{ old('tanggal') }}">
    </div>

    <div>
        <label>Deskripsi:</label><br>
        <textarea name="deskripsi" rows="4">{{ old('deskripsi') }}</textarea>
    </div>

    <div>
        <label>Upload Media:</label><br>
        <input type="file" name="files[]" multiple>
        <p>File: jpg, jpeg, png, mp4, mov</p>
    </div>

    <button type="submit">Buat Event</button>
</form>

