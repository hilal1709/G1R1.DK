<h1>Daftar Artikel</h1>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif
<a class="dropdown-item" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
@foreach($articles as $article)
    <div style="border:1px solid #ccc; padding:15px; margin-bottom:25px;">

        <h2>{{ $article->judul }}</h2>

        <p><strong>Penulis:</strong> {{ $article->user->name ?? '-' }}</p>

        <p>{{ $article->isi }}</p>

        <h3>Media:</h3>

        @foreach($article->articleMedias ?? [] as $media)
            @if(preg_match('/\.(jpg|jpeg|png)$/i', $media->file_path))
                <img src="{{ $media->file_path }}" style="width:150px; margin:5px;">
            @else
                <video width="200" controls style="margin:5px;">
                    <source src="{{ $media->file_path }}">
                </video>
            @endif
        @endforeach

        <div style="margin-top:10px;">
            <a href="{{ route('articles.show', $article->id) }}">Lihat</a> |
            <a href="{{ route('articles.edit', $article->id) }}">Edit</a> |

            <form action="{{ route('articles.destroy', $article->id) }}"
                  method="POST"
                  style="display:inline;">
                @csrf
                @method('DELETE')
                <button onclick="return confirm('Yakin ingin hapus artikel ini?')">
                    Hapus
                </button>
            </form>
        </div>

    </div>
@endforeach
