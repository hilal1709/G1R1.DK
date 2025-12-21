<!DOCTYPE html>
<html>
<head>
    <title>Daftar Produk</title>
    <style>
        body { font-family: Arial; margin: 30px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #999; padding: 8px; text-align: left; }
        img { width: 60px; height: 60px; object-fit: cover; }
        a { margin-right: 10px; }
    </style>
</head>
<body>

<h1>Daftar Produk</h1>

<a href="<?php echo e(route('products.create')); ?>">+ Tambah Produk</a>

<a href="<?php echo e(route('carts.index')); ?>">
    🛒 Cart
</a>

<table>
    <thead>
        <tr>
            <th>Nama</th>
            <th>SKU</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Gambar</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>
        <?php $__currentLoopData = $products; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $p): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <tr>
            <td><?php echo e($p->nama); ?></td>
            <td><?php echo e($p->sku); ?></td>
            <td><?php echo e($p->category->nama); ?></td>
            <td><?php echo e(number_format($p->harga)); ?></td>
            <td>
                <?php $__currentLoopData = $p->images; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $img): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <img src="<?php echo e($img->gambar); ?>">
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </td>
            <td>
                <a href="<?php echo e(route('products.show', $p->id)); ?>">Lihat</a>
                <a href="<?php echo e(route('products.edit', $p->id)); ?>">Edit</a>

                <form action="<?php echo e(route('products.destroy', $p->id)); ?>" method="POST" style="display:inline">
                    <?php echo csrf_field(); ?>
                    <?php echo method_field("DELETE"); ?>
                    <button onclick="return confirm('Hapus produk?')">Hapus</button>
                </form>
            </td>
        </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </tbody>
</table>

</body>
</html>
<?php /**PATH D:\laravel\G1R1.dk\resources\views/products/index.blade.php ENDPATH**/ ?>