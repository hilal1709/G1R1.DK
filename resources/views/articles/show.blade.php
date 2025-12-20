<h2>{{ $article->judul }}</h2>
<p>{{ $article->isi }}</p>
<p>Penulis: {{ $article->user->name }}</p>

<h3>Media:</h3>
@foreach($article->articleMedias as $media)
    @if($media->jenis == 'gambar')
        <img src="{{ $media->file_path }}" style="width:150px;">
    @else
        <video width="200" controls>
            <source src="{{ $media->file_path }}">
        </video>
    @endif
@endforeach

<h3>Comments:</h3>
@foreach($article->comments as $comment)
    <p>
        <strong>{{ $comment->user->name }}:</strong>
        <span id="comment-{{ $comment->id }}">{{ $comment->komentar }}</span>

        @if(auth()->id() === $comment->user_id)

        {{-- Tombol Edit --}}
        <button onclick="editComment({{ $comment->id }})">Edit</button>

        {{-- Tombol Delete --}}
        <form action="{{ route('comments.destroy', $comment->id) }}" method="POST" style="display:inline">
            @csrf
            @method('DELETE')
            <button type="submit" onclick="return confirm('Hapus komentar ini?')">Hapus</button>
        </form>
        @endif
    </p>
@endforeach

{{-- Form tambah komentar --}}
<form action="{{ route('comments.store') }}" method="POST">
    @csrf
    <input type="hidden" name="article_id" value="{{ $article->id }}">
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
            body: JSON.stringify({ komentar: input.value, article_id: '{{ $article->id }}' })
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
