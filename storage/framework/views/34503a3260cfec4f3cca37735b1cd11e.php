<h1>Daftar Artikel</h1>

<?php if(session('success')): ?>
    <p style="color:green"><?php echo e(session('success')); ?></p>
<?php endif; ?>
<a class="dropdown-item" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                        <form id="logout-form" action="<?php echo e(route('logout')); ?>" method="POST" class="d-none">
                            <?php echo csrf_field(); ?>
                        </form>
<?php $__currentLoopData = $articles; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $article): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <div style="border:1px solid #ccc; padding:15px; margin-bottom:25px;">

        <h2><?php echo e($article->judul); ?></h2>

        <p><strong>Penulis:</strong> <?php echo e($article->user->name ?? '-'); ?></p>

        <p><?php echo e($article->isi); ?></p>

        <h3>Media:</h3>

        <?php $__currentLoopData = $article->articleMedias ?? []; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $media): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php if(preg_match('/\.(jpg|jpeg|png)$/i', $media->file_path)): ?>
                <img src="<?php echo e($media->file_path); ?>" style="width:150px; margin:5px;">
            <?php else: ?>
                <video width="200" controls style="margin:5px;">
                    <source src="<?php echo e($media->file_path); ?>">
                </video>
            <?php endif; ?>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

        <div style="margin-top:10px;">
            <a href="<?php echo e(route('articles.show', $article->id)); ?>">Lihat</a> |
            <a href="<?php echo e(route('articles.edit', $article->id)); ?>">Edit</a> |

            <form action="<?php echo e(route('articles.destroy', $article->id)); ?>"
                  method="POST"
                  style="display:inline;">
                <?php echo csrf_field(); ?>
                <?php echo method_field('DELETE'); ?>
                <button onclick="return confirm('Yakin ingin hapus artikel ini?')">
                    Hapus
                </button>
            </form>
        </div>

    </div>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/articles/index.blade.php ENDPATH**/ ?>