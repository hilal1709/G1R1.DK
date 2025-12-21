<h2>Edit Artikel</h2>

<form action="/articles/{{ $article->id }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')

    <label>Judul:</label><br>
    <input type="text" name="judul" value="{{ $article->judul }}"><br><br>

    <label>Isi:</label><br>
    <textarea name="isi">{{ $article->isi }}</textarea><br><br>

    <!-- MEDIA LAMA (Preview) -->
<h3>Media Lama</h3>
@foreach($article->articleMedias as $media)
    <div style="margin-bottom:10px;">
        @if($media->jenis == 'gambar')
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
            <select name="jenis[]">
                <option value="gambar">Gambar</option>
                <option value="video">Video</option>
            </select>
        </div>
    </div>
    <button type="button" onclick="addMedia()">Tambah Media</button><br><br>

    <button type="submit">Update Artikel</button>
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
