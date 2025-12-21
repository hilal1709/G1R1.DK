<h1>Daftar Kategori</h1>

<a href="<?php echo e(route('categories.create')); ?>" class="btn btn-primary">Tambah Kategori</a>

<?php if(session('success')): ?>
    <div class="alert alert-success"><?php echo e(session('success')); ?></div>
<?php endif; ?>

<table class="table table-bordered mt-3">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nama Kategori</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>
        <?php $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $category): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <tr>
            <td><?php echo e($category->id); ?></td>
            <td>
                <a href="<?php echo e(route('categories.show', $category->id)); ?>">
                    <?php echo e($category->nama); ?>

                </a>
            </td>
            <td>
                <a href="<?php echo e(route('categories.edit', $category->id)); ?>" class="btn btn-warning btn-sm">Edit</a>

                <form action="<?php echo e(route('categories.destroy', $category->id)); ?>" 
                    method="POST" style="display:inline">
                    <?php echo csrf_field(); ?>
                    <?php echo method_field('DELETE'); ?>

                    <button onclick="return confirm('Hapus kategori ini?')" 
                            class="btn btn-danger btn-sm">
                        Hapus
                    </button>
                </form>
            </td>
        </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </tbody>
</table><?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/categories/index.blade.php ENDPATH**/ ?>