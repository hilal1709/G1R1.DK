<!DOCTYPE html>
<html>
<head>
    <title>Edit Produk</title>
    <style>
        body { font-family: Arial; margin: 30px; }
        input, textarea, select { margin-bottom: 10px; padding: 5px; width: 300px;}
        img { width: 120px; display:block; margin-bottom:5px; }
        .media-item { margin-bottom: 15px; }
    </style>
</head>
<body>

<h1>Edit Produk</h1>

<?php if(session('success')): ?>
    <p style="color:green"><?php echo e(session('success')); ?></p>
<?php endif; ?>

<form action="<?php echo e(route('products.update', $product->id)); ?>" method="POST" enctype="multipart/form-data">
    <?php echo csrf_field(); ?>
    <?php echo method_field("PUT"); ?>

    <label>Nama:</label><br>
    <input type="text" name="nama" value="<?php echo e($product->nama); ?>"><br>

    <label>SKU:</label><br>
    <input type="text" name="sku" value="<?php echo e($product->sku); ?>"><br>

    <label>Kategori:</label><br>
    <select name="category_id">
        <?php $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $c): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <option value="<?php echo e($c->id); ?>" <?php echo e($product->category_id == $c->id ? 'selected' : ''); ?>>
                <?php echo e($c->nama); ?>

            </option>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </select><br>

    <label>Deskripsi:</label><br>
    <textarea name="deskripsi"><?php echo e($product->deskripsi); ?></textarea><br>

    <label>Harga:</label><br>
    <input type="number" name="harga" value="<?php echo e($product->harga); ?>"><br>

    <label>Stok:</label><br>
    <input type="number" name="stok" value="<?php echo e($product->stok); ?>"><br>

    <h3>Gambar Produk</h3>

    <?php $__currentLoopData = $product->images; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $img): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div class="media-item">
            <img src="<?php echo e($img->gambar); ?>">

            <label>Ganti Gambar:</label>
            <input type="file" name="replace_images[<?php echo e($img->id); ?>]"><br>

            <label>
                <input type="checkbox" name="delete_images[]" value="<?php echo e($img->id); ?>">
                Hapus gambar ini
            </label>
        </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

    <h3>Tambah Gambar Baru</h3>

    <div id="media-container">
        <div class="media-item">
            <input type="file" name="images[]">
        </div>
    </div>

    <button type="button" onclick="addMedia()">Tambah Gambar</button><br><br>

    <button type="submit">Simpan Perubahan</button>

</form>

<script>
function addMedia() {
    const div = document.createElement('div');
    div.classList.add('media-item');
    div.innerHTML = `<input type="file" name="images[]">`;
    document.getElementById('media-container').appendChild(div);
}
</script>

</body>
</html>
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/products/edit.blade.php ENDPATH**/ ?>