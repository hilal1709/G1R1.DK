<!DOCTYPE html>
<html>
<head>
    <title>Buat Artikel</title>
    <style>
        body { font-family: Arial; margin: 30px; }
        input, textarea, select { margin-bottom: 10px; padding: 5px; width: 300px; }
        .media-item { margin-bottom: 10px; }
        button { padding: 5px 10px; margin-top: 10px; }
    </style>
</head>
<body>

<h1>Buat Artikel Baru</h1>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif

@if($errors->any())
    <div style="color:red">
        <ul>
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('articles.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <label>Judul:</label><br>
    <input type="text" name="judul" value="{{ old('judul') }}"><br>

    <label>Isi:</label><br>
    <textarea name="isi">{{ old('isi') }}</textarea><br>

    <input type="hidden" name="user_id" value="1"><br>

    <h3>Media</h3>
    <div id="media-container">
        <div class="media-item">
            <input type="file" name="files[]">
            <select name="jenis[]">
                <option value="gambar">Gambar</option>
                <option value="video">Video</option>
            </select>
        </div>
    </div>
    <button type="button" onclick="addMedia()">Tambah Media</button><br><br>

    <button type="submit">Simpan Artikel</button>
</form>

<script>
function addMedia() {
    const container = document.getElementById('media-container');
    const div = document.createElement('div');
    div.classList.add('media-item');
    div.innerHTML = `
        <input type="file" name="files[]">
        <select name="jenis[]">
            <option value="gambar">Gambar</option>
            <option value="video">Video</option>
        </select>
    `;
    container.appendChild(div);
}
</script>

</body>
</html>
