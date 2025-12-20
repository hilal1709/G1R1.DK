<h1>{{ $video->judul }}</h1>

<p><strong>Uploader:</strong> {{ $video->user->name ?? 'Unknown' }}</p>
<p><strong>Lokasi:</strong> {{ $video->lokasi ?? '-' }}</p>
<p>{{ $video->deskripsi }}</p>

{{-- Video player --}}
<video id="videoPlayer" width="500" controls style="margin-bottom:10px;">
    <source src="{{ $video->file_path }}" type="video/mp4">
    Browser Anda tidak mendukung video tag.
</video>

<hr>

{{-- Komentar --}}
<h3>Comments:</h3>
@foreach($video->comments as $comment)
    <p>
        <strong>{{ $comment->user->name }}:</strong>
        <span id="comment-{{ $comment->id }}">{{ $comment->komentar }}</span>

        @if(auth()->id() === $comment->user_id)
        {{-- Tombol Edit --}}
            <button onclick="editComment({{ $comment->id }})">Edit</button>

            {{-- Tombol Delete --}}
            <form action="{{ route('comments.destroy', $comment->id) }}" 
                method="POST" 
                style="display:inline">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('Hapus komentar ini?')">
                    Hapus
                </button>
            </form>
        @endif
    </p>
@endforeach


<form action="{{ route('comments.store') }}" method="POST">
    @csrf
    <input type="hidden" name="video_id" value="{{ $video->id }}">
    <textarea name="komentar" rows="3" placeholder="Tulis komentar..." required></textarea><br>
    <button type="submit">Kirim</button>
</form>

<script>
function editComment(id) {
    const span = document.getElementById('comment-' + id);
    const currentText = span.innerText;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = '70%';

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Simpan';
    saveButton.onclick = function() {
        fetch(`/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify({ 
                komentar: input.value,
                video_id: '{{ $video->id }}'
            })
        }).then(() => {
            span.innerText = input.value;
            span.style.display = 'inline';
            input.remove();
            saveButton.remove();
        });
    };

    span.style.display = 'none';
    span.parentNode.insertBefore(input, span);
    span.parentNode.insertBefore(saveButton, span.nextSibling);
}
</script>

