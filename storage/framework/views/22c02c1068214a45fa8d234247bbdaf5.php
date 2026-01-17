


<h1>Daftar Event</h1>

<?php $__currentLoopData = $events; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $event): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <div style="border:1px solid #ccc; padding:10px; margin-bottom:20px;">
        <h2><?php echo e($event->nama); ?></h2>
        <p><strong>Lokasi:</strong> <?php echo e($event->lokasi ?? '-'); ?></p>
        <p><strong>Tanggal:</strong> <?php echo e($event->tanggal ?? '-'); ?></p>
        <p><?php echo e($event->deskripsi); ?></p>

        <h3>Media:</h3>
        <?php $__currentLoopData = $event->eventmedias; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $media): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php if(preg_match('/\.(jpg|jpeg|png)$/i', $media->file_path)): ?>
                <img src="<?php echo e($media->file_path); ?>" style="width:150px; margin:5px;">
            <?php else: ?>
                <video width="200" controls style="margin:5px;">
                    <source src="<?php echo e($media->file_path); ?>">
                </video>
            <?php endif; ?>
         <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

            <!-- Tombol edit & delete media -->
            <div>
                <a href="<?php echo e(route('events.show', $event->id)); ?>">Lihat</a>
                <a href="<?php echo e(route('events.edit', $event->id)); ?>">Edit</a>

                <form action="<?php echo e(route('events.destroy', $event->id)); ?>" method="POST" style="display:inline;">
                    <?php echo csrf_field(); ?>
                    <?php echo method_field('DELETE'); ?>
                    <button type="submit" onclick="return confirm('Hapus event ini?')">Delete</button>
                </form>
            </div>
       
    </div>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/events/index.blade.php ENDPATH**/ ?>