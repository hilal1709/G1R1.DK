
<h1>Daftar Video</h1>
<a class="dropdown-item" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                        <form id="logout-form" action="<?php echo e(route('logout')); ?>" method="POST" class="d-none">
                            <?php echo csrf_field(); ?>
                        </form>
<?php $__currentLoopData = $videos; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $video): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <div style="border:1px solid #ccc; padding:10px; margin-bottom:20px;">
        <h2><?php echo e($video->judul); ?></h2>
        <p><strong>Lokasi:</strong> <?php echo e($video->lokasi ?? '-'); ?></p>
        <p><strong>Uploader:</strong> <?php echo e($video->user->name ?? 'Unknown'); ?></p>
        <p><?php echo e($video->deskripsi); ?></p>

        <h3>Video File:</h3>
        <video width="300" controls style="margin:5px;">
            <source src="<?php echo e($video->file_path); ?>">
        </video>

        <!-- Tombol edit & delete video -->
        <div style="margin-top:10px;">
            <a href="<?php echo e(route('videos.show', $video->id)); ?>">Lihat</a> |
            <a href="<?php echo e(route('videos.edit', $video->id)); ?>">Edit</a>

            <form action="<?php echo e(route('videos.destroy', $video->id)); ?>" method="POST" style="display:inline;">
                <?php echo csrf_field(); ?>
                <?php echo method_field('DELETE'); ?>
                <button type="submit" onclick="return confirm('Hapus video ini?')" style="color:red">Delete</button>
            </form>
        </div>
    </div>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/videos/index.blade.php ENDPATH**/ ?>