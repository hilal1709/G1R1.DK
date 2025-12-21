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

<h1><?php echo e($product->nama); ?></h1>

<p><strong>SKU:</strong> <?php echo e($product->sku); ?></p>
<p><strong>Kategori:</strong> <?php echo e($product->category->nama); ?></p>
<p><strong>Harga:</strong> Rp <?php echo e(number_format($product->harga)); ?></p>
<p><strong>Stok:</strong> <?php echo e($product->stok); ?></p>
<p><strong>Deskripsi:</strong> <?php echo e($product->deskripsi); ?></p>

<h3>Gambar Produk:</h3>
<?php $__currentLoopData = $product->images; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $img): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <img src="<?php echo e($img->gambar); ?>">
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

<br><br>

<a href="<?php echo e(route('products.index')); ?>">Kembali</a>
<a href="<?php echo e(route('products.edit', $product->id)); ?>">Edit Produk</a>

<form action="<?php echo e(route('products.destroy', $product->id)); ?>" method="POST" style="display:inline">
    <?php echo csrf_field(); ?>
    <?php echo method_field("DELETE"); ?>
    <button onclick="return confirm('Hapus produk?')">Hapus</button>
</form>

<form method="POST" action="<?php echo e(route('cartItems.store')); ?>">
    <?php echo csrf_field(); ?>

    <input type="hidden" name="product_id" value="<?php echo e($product->id); ?>">

    <button type="submit">
        Masukkan ke Cart
    </button>
</form>

<hr>





<h2>Reviews:</h2>

<?php $__currentLoopData = $product->reviews; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $review): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <p>
        <strong><?php echo e($review->user->name); ?></strong> — 

        
        <span class="star" id="star-<?php echo e($review->id); ?>">
            <?php for($i = 1; $i <= $review->rating; $i++): ?> ★ <?php endfor; ?>
        </span>
        <br>

        
        <span id="review-<?php echo e($review->id); ?>" data-rating="<?php echo e($review->rating); ?>">
            <?php echo e($review->komentar); ?>

        </span>

        

        
        <?php if(auth()->id() === $review->user_id): ?>
            <button onclick="editReview(<?php echo e($review->id); ?>)">Edit</button>
        
            <form action="<?php echo e(route('reviews.destroy', $review->id)); ?>" 
                method="POST" style="display:inline">
                <?php echo csrf_field(); ?>
                <?php echo method_field('DELETE'); ?>
                <button onclick="return confirm('Hapus review ini?')">Hapus</button>
            </form>
        <?php endif; ?>
    </p>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

<hr>


<?php if(!$product->reviews->where('user_id', auth()->id())->count()): ?>
    <h3>Tulis Review</h3>

    <form action="<?php echo e(route('reviews.store')); ?>" method="POST">
        <?php echo csrf_field(); ?>
        <input type="hidden" name="product_id" value="<?php echo e($product->id); ?>">

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
<?php endif; ?>

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
                'X-CSRF-TOKEN': '<?php echo e(csrf_token()); ?>'
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
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/products/show.blade.php ENDPATH**/ ?>