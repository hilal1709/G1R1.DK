
<h1>Daftar Video</h1>
<a class="dropdown-item" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
@foreach($videos as $video)
    <div style="border:1px solid #ccc; padding:10px; margin-bottom:20px;">
        <h2>{{ $video->judul }}</h2>
        <p><strong>Lokasi:</strong> {{ $video->lokasi ?? '-' }}</p>
        <p><strong>Uploader:</strong> {{ $video->user->name ?? 'Unknown' }}</p>
        <p>{{ $video->deskripsi }}</p>

        <h3>Video File:</h3>
        <video width="300" controls style="margin:5px;">
            <source src="{{ $video->file_path }}">
        </video>

        <!-- Tombol edit & delete video -->
        <div style="margin-top:10px;">
            <a href="{{ route('videos.show', $video->id) }}">Lihat</a> |
            <a href="{{ route('videos.edit', $video->id) }}">Edit</a>

            <form action="{{ route('videos.destroy', $video->id) }}" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('Hapus video ini?')" style="color:red">Delete</button>
            </form>
        </div>
    </div>
@endforeach

