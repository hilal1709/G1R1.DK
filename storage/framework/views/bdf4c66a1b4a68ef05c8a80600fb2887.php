<h1><?php echo e($video->judul); ?></h1>

<p><strong>Uploader:</strong> <?php echo e($video->user->name ?? 'Unknown'); ?></p>
<p><strong>Lokasi:</strong> <?php echo e($video->lokasi ?? '-'); ?></p>
<p><?php echo e($video->deskripsi); ?></p>


<video id="videoPlayer" width="500" controls style="margin-bottom:10px;">
    <source src="<?php echo e($video->file_path); ?>" type="video/mp4">
    Browser Anda tidak mendukung video tag.
</video>

<hr>


<h3>Comments:</h3>
<?php $__currentLoopData = $video->comments; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $comment): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <p>
        <strong><?php echo e($comment->user->name); ?>:</strong>
        <span id="comment-<?php echo e($comment->id); ?>"><?php echo e($comment->komentar); ?></span>

        
            <button onclick="editComment(<?php echo e($comment->id); ?>)">Edit</button>

            
            <form action="<?php echo e(route('comments.destroy', $comment->id)); ?>" 
                method="POST" 
                style="display:inline">
                <?php echo csrf_field(); ?>
                <?php echo method_field('DELETE'); ?>
                <button type="submit" onclick="return confirm('Hapus komentar ini?')">
                    Hapus
                </button>
            </form>
    </p>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>


<form action="<?php echo e(route('comments.store')); ?>" method="POST">
    <?php echo csrf_field(); ?>
    <input type="hidden" name="video_id" value="<?php echo e($video->id); ?>">
    <textarea name="komentar" rows="3" placeholder="Tulis komentar..." required></textarea><br>
    <button type="submit">Kirim</button>
</form>

<script>
function editComment(id) {
    const span = document.getElementById('comment-' + id);
    const currentText = span.innerText;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = '70%';

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Simpan';
    saveButton.onclick = function() {
        fetch(`/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '<?php echo e(csrf_token()); ?>'
            },
            body: JSON.stringify({ 
                komentar: input.value,
                video_id: '<?php echo e($video->id); ?>'
            })
        }).then(() => {
            span.innerText = input.value;
            span.style.display = 'inline';
            input.remove();
            saveButton.remove();
        });
    };

    span.style.display = 'none';
    span.parentNode.insertBefore(input, span);
    span.parentNode.insertBefore(saveButton, span.nextSibling);
}
</script>

<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/videos/show.blade.php ENDPATH**/ ?>