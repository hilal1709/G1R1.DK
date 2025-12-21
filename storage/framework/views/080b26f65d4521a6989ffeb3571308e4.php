<h2>Edit Artikel</h2>

<form action="/articles/<?php echo e($article->id); ?>" method="POST" enctype="multipart/form-data">
    <?php echo csrf_field(); ?>
    <?php echo method_field('PUT'); ?>

    <label>Judul:</label><br>
    <input type="text" name="judul" value="<?php echo e($article->judul); ?>"><br><br>

    <label>Isi:</label><br>
    <textarea name="isi"><?php echo e($article->isi); ?></textarea><br><br>

    <!-- MEDIA LAMA (Preview) -->
<h3>Media Lama</h3>
<?php $__currentLoopData = $article->articleMedias; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $media): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <div style="margin-bottom:10px;">
        <?php if($media->jenis == 'gambar'): ?>
            <img src="<?php echo e($media->file_path); ?>" style="width:100px;">
        <?php else: ?>
            <video width="150" controls>
                <source src="<?php echo e($media->file_path); ?>">
            </video>
        <?php endif; ?>

        <!-- Pilih file baru untuk mengganti media lama -->
        <input type="file" name="replace_files[<?php echo e($media->id); ?>]">

        <label>
            <input type="checkbox" name="delete_media[]" value="<?php echo e($media->id); ?>">
            Hapus media ini
        </label>
    </div>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>


    <!-- Tambah Media Baru -->
    <h3>Tambah Media Baru</h3>
    <div id="media-container">
        <div class="media-item">
            <input type="file" name="files[]">
            <select name="jenis[]">
                <option value="gambar">Gambar</option>
                <option value="video">Video</option>
            </select>
        </div>
    </div>
    <button type="button" onclick="addMedia()">Tambah Media</button><br><br>

    <button type="submit">Update Artikel</button>
</form>

<script>
function addMedia() {
    const container = document.getElementById('media-container');
    const div = document.createElement('div');
    div.classList.add('media-item');
    div.innerHTML = `
        <input type="file" name="files[]">
        <select name="jenis[]">
            <option value="gambar">Gambar</option>
            <option value="video">Video</option>
        </select>
    `;
    container.appendChild(div);
}
</script>
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/articles/edit.blade.php ENDPATH**/ ?>