<h2><?php echo e($article->judul); ?></h2>
<p><?php echo e($article->isi); ?></p>
<p>Penulis: <?php echo e($article->user->name); ?></p>

<h3>Media:</h3>
<?php $__currentLoopData = $article->articleMedias; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $media): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <?php if($media->jenis == 'gambar'): ?>
        <img src="<?php echo e($media->file_path); ?>" style="width:150px;">
    <?php else: ?>
        <video width="200" controls>
            <source src="<?php echo e($media->file_path); ?>">
        </video>
    <?php endif; ?>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

<h3>Comments:</h3>
<?php $__currentLoopData = $article->comments; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $comment): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <p>
        <strong><?php echo e($comment->user->name); ?>:</strong>
        <span id="comment-<?php echo e($comment->id); ?>"><?php echo e($comment->komentar); ?></span>

        <?php if(auth()->id() === $comment->user_id): ?>

        
        <button onclick="editComment(<?php echo e($comment->id); ?>)">Edit</button>

        
        <form action="<?php echo e(route('comments.destroy', $comment->id)); ?>" method="POST" style="display:inline">
            <?php echo csrf_field(); ?>
            <?php echo method_field('DELETE'); ?>
            <button type="submit" onclick="return confirm('Hapus komentar ini?')">Hapus</button>
        </form>
        <?php endif; ?>
    </p>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>


<form action="<?php echo e(route('comments.store')); ?>" method="POST">
    <?php echo csrf_field(); ?>
    <input type="hidden" name="article_id" value="<?php echo e($article->id); ?>">
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
            body: JSON.stringify({ komentar: input.value, article_id: '<?php echo e($article->id); ?>' })
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
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/articles/show.blade.php ENDPATH**/ ?>