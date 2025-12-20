<!DOCTYPE html>
<html>
<head>
    <title>Detail Produk</title>
    <style>
        body { font-family: Arial; margin: 30px; }
        img { width: 200px; margin-right: 10px; }
        .star { color: gold; }
    </style>
</head>
<body>

<h1>{{ $product->nama }}</h1>

<p><strong>SKU:</strong> {{ $product->sku }}</p>
<p><strong>Kategori:</strong> {{ $product->category->nama }}</p>
<p><strong>Harga:</strong> Rp {{ number_format($product->harga) }}</p>
<p><strong>Stok:</strong> {{ $product->stok }}</p>
<p><strong>Deskripsi:</strong> {{ $product->deskripsi }}</p>

<h3>Gambar Produk:</h3>
@foreach($product->images as $img)
    <img src="{{ $img->gambar }}">
@endforeach

<br><br>

<a href="{{ route('products.index') }}">Kembali</a>
<a href="{{ route('products.edit', $product->id) }}">Edit Produk</a>

<form action="{{ route('products.destroy', $product->id) }}" method="POST" style="display:inline">
    @csrf
    @method("DELETE")
    <button onclick="return confirm('Hapus produk?')">Hapus</button>
</form>

<form method="POST" action="{{ route('cartItems.store') }}">
    @csrf

    <input type="hidden" name="product_id" value="{{ $product->id }}">

    <button type="submit">
        Masukkan ke Cart
    </button>
</form>

<hr>

{{-- ============================= --}}
{{--   BAGIAN REVIEW PRODUK         --}}
{{-- ============================= --}}

<h2>Reviews:</h2>

@foreach($product->reviews as $review)
    <p>
        <strong>{{ $review->user->name }}</strong> — 

        {{-- STAR RATING --}}
        <span class="star" id="star-{{ $review->id }}">
            @for($i = 1; $i <= $review->rating; $i++) ★ @endfor
        </span>
        <br>

        {{-- TEXT REVIEW --}}
        <span id="review-{{ $review->id }}" data-rating="{{ $review->rating }}">
            {{ $review->komentar }}
        </span>

        

        {{-- EDIT + DELETE UNTUK PEMILIK REVIEW --}}
        @if(auth()->id() === $review->user_id)
            <button onclick="editReview({{ $review->id }})">Edit</button>
        
            <form action="{{ route('reviews.destroy', $review->id) }}" 
                method="POST" style="display:inline">
                @csrf
                @method('DELETE')
                <button onclick="return confirm('Hapus review ini?')">Hapus</button>
            </form>
        @endif
    </p>
@endforeach

<hr>

{{-- FORM TAMBAH REVIEW (jika user belum review) --}}
@if(!$product->reviews->where('user_id', auth()->id())->count())
    <h3>Tulis Review</h3>

    <form action="{{ route('reviews.store') }}" method="POST">
        @csrf
        <input type="hidden" name="product_id" value="{{ $product->id }}">

        <label>Rating:</label>
        <select name="rating" required>
            <option value="">-- Pilih --</option>
            <option value="1">1 </option>
            <option value="2">2</option>
            <option value="3">3 </option>
            <option value="4">4</option>
            <option value="5">5 </option>
        </select>

        <br><br>

        <textarea name="komentar" rows="3" placeholder="Tulis pengalamanmu..." required></textarea>
        <br>

        <button type="submit">Kirim</button>
    </form>
@endif

<script>
function editReview(id) {
    const span = document.getElementById('review-' + id);
    const starSpan = document.getElementById('star-' + id);
    const currentText = span.innerText;
    const currentRating = span.getAttribute('data-rating');

    // input komentar
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = '60%';

    // select rating
    const ratingSelect = document.createElement('select');
    for (let i = 1; i <= 5; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = i;
        if (i == currentRating) opt.selected = true;
        ratingSelect.appendChild(opt);
    }

    // tombol simpan
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Simpan';

    saveButton.onclick = function() {
        fetch(`/reviews/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify({
                komentar: input.value,
                rating: ratingSelect.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // update komentar
                span.innerText = input.value;
                span.style.display = 'inline';
                span.setAttribute('data-rating', ratingSelect.value);

                // update star
                let stars = '';
                for (let i = 1; i <= ratingSelect.value; i++) stars += '★';
                starSpan.innerText = stars;
                starSpan.style.display = 'inline';

                // hapus elemen input dan select
                input.remove();
                ratingSelect.remove();
                saveButton.remove();
            }
        });
    };

    // sembunyikan span dan star
    span.style.display = 'none';
    starSpan.style.display = 'none';

    // tampilkan input, select, button
    span.parentNode.insertBefore(input, span);
    span.parentNode.insertBefore(ratingSelect, input.nextSibling);
    span.parentNode.insertBefore(saveButton, ratingSelect.nextSibling);
}

</script>


</body>
</html>
