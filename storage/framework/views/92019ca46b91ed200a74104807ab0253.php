<h1>Buat Event Baru</h1>

<?php if($errors->any()): ?>
    <div style="color:red;">
        <ul>
            <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li><?php echo e($error); ?></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    </div>
<?php endif; ?>

<form action="<?php echo e(route('events.store')); ?>" method="POST" enctype="multipart/form-data">
    <?php echo csrf_field(); ?>

    <div>
        <label>Nama Event:</label><br>
        <input type="text" name="nama" value="<?php echo e(old('nama')); ?>" required>
    </div>

    <div>
        <label>Lokasi:</label><br>
        <input type="text" name="lokasi" value="<?php echo e(old('lokasi')); ?>">
    </div>

    <div>
        <label>Tanggal Mulai:</label><br>
        <input type="datetime-local" name="tanggal_mulai" value="<?php echo e(old('tanggal_mulai')); ?>">
    </div>

    <div>
        <label>Tanggal Selesai:</label><br>
        <input type="datetime-local" name="tanggal_selesai" value="<?php echo e(old('tanggal_selesai')); ?>">
    </div>

    <div>
        <label>Deskripsi:</label><br>
        <textarea name="deskripsi" rows="4"><?php echo e(old('deskripsi')); ?></textarea>
    </div>

    <h3>Upload Media</h3>
    <div id="media-container">
        <div class="media-item">
            <input type="file" name="files[]">
        </div>
    </div>

    <button type="button" onclick="addMedia()">Tambah Foto / Video</button><br><br>

    <button type="submit">Buat Event</button>
</form>

<script>
function addMedia() {
    const container = document.getElementById('media-container');
    const div = document.createElement('div');
    div.classList.add('media-item');
    div.innerHTML = `<input type="file" name="files[]">`;
    container.appendChild(div);
}
</script>
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/events/create.blade.php ENDPATH**/ ?>