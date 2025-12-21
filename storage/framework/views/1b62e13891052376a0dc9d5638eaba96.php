<!DOCTYPE html>
<html>
<head>
    <title>Tambah Produk</title>
    <style>
        body { font-family: Arial; margin: 30px; }
        input, textarea, select { margin-bottom: 10px; padding: 5px; width: 300px; }
        .media-item { margin-bottom: 10px; }
        button { padding: 5px 10px; margin-top: 10px; }
    </style>
</head>
<body>

<h1>Tambah Produk Baru</h1>

<?php if(session('success')): ?>
    <p style="color:green"><?php echo e(session('success')); ?></p>
<?php endif; ?>

<?php if($errors->any()): ?>
    <div style="color:red">
        <ul>
            <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li><?php echo e($error); ?></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    </div>
<?php endif; ?>

<form action="<?php echo e(route('products.store')); ?>" method="POST" enctype="multipart/form-data">
    <?php echo csrf_field(); ?>

    <label>Nama Produk:</label><br>
    <input type="text" name="nama" value="<?php echo e(old('nama')); ?>"><br>

    <label>SKU:</label><br>
    <input type="text" name="sku" value="<?php echo e(old('sku')); ?>"><br>

    <label>Kategori:</label><br>
    <select name="category_id">
        <option value="">-- pilih kategori --</option>
        <?php $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $c): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <option value="<?php echo e($c->id); ?>"><?php echo e($c->nama); ?></option>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </select><br>

    <label>Deskripsi:</label><br>
    <textarea name="deskripsi"><?php echo e(old('deskripsi')); ?></textarea><br>

    <label>Harga:</label><br>
    <input type="number" name="harga" value="<?php echo e(old('harga')); ?>"><br>

    <label>Stok:</label><br>
    <input type="number" name="stok" value="<?php echo e(old('stok')); ?>"><br>

    <h3>Gambar Produk</h3>

    <div id="media-container">
        <div class="media-item">
            <input type="file" name="images[]">
        </div>
    </div>

    <button type="button" onclick="addMedia()">Tambah Gambar</button><br><br>

    <button type="submit">Simpan Produk</button>

</form>

<script>
function addMedia() {
    const container = document.getElementById('media-container');
    const div = document.createElement('div');
    div.classList.add('media-item');
    div.innerHTML = `
        <input type="file" name="images[]">
    `;
    container.appendChild(div);
}
</script>

</body>
</html>
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/products/create.blade.php ENDPATH**/ ?>