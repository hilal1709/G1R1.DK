


<h1>Daftar Event</h1>

@foreach($events as $event)
    <div style="border:1px solid #ccc; padding:10px; margin-bottom:20px;">
        <h2>{{ $event->nama }}</h2>
        <p><strong>Lokasi:</strong> {{ $event->lokasi ?? '-' }}</p>
        <p><strong>Tanggal:</strong> {{ $event->tanggal ?? '-' }}</p>
        <p>{{ $event->deskripsi }}</p>

        <h3>Media:</h3>
        @foreach($event->eventmedias as $media)
            @if(preg_match('/\.(jpg|jpeg|png)$/i', $media->file_path))
                <img src="{{ $media->file_path }}" style="width:150px; margin:5px;">
            @else
                <video width="200" controls style="margin:5px;">
                    <source src="{{ $media->file_path }}">
                </video>
            @endif

            <!-- Tombol edit & delete media -->
            <div>
                <a href="{{ route('events.show', $event->id) }}">Lihat</a>
                <a href="{{ route('events.edit', $event->id) }}">Edit</a>

                <form action="{{ route('events.destroy', $event->id) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" onclick="return confirm('Hapus event ini?')">Delete</button>
                </form>
            </div>
        @endforeach

    </div>
@endforeach
