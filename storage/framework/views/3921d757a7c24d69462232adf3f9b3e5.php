<div class="container">

    <h2>Detail Pesanan</h2>

    <p><strong>Order:</strong> <?php echo e($order->order_number); ?></p>
    <p><strong>Penerima:</strong> <?php echo e($order->nama_penerima); ?></p>
    <p><strong>No WA:</strong> <?php echo e($order->no_wa); ?></p>
    <p><strong>Alamat:</strong> <?php echo e($order->alamat); ?></p>
    <p><strong>Status:</strong> <?php echo e($order->status); ?></p>

    <hr>

    
    
    
    <h4>Produk</h4>
    <ul>
        <?php $__currentLoopData = $order->details; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $detail): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <li>
                <?php echo e($detail->product->nama); ?> —
                <?php echo e($detail->qty); ?> x 
                Rp <?php echo e(number_format($detail->harga,0,',','.')); ?>

            </li>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </ul>

    <hr>

    
    
    
    <p><strong>Subtotal:</strong> 
        Rp <?php echo e(number_format($order->subtotal,0,',','.')); ?>

    </p>

    <p><strong>Ongkir:</strong> 
        Rp <?php echo e(number_format($order->ongkir,0,',','.')); ?>

    </p>

    <p><strong>Total:</strong> 
        Rp <?php echo e(number_format($order->total,0,',','.')); ?>

    </p>

    <hr>

    
    
    
    <?php if($order->bukti_transfer): ?>
        <h4>Bukti Transfer</h4>
        <img src="<?php echo e(asset('storage/'.$order->bukti_transfer)); ?>" width="300">
        <hr>
    <?php endif; ?>


    
    
    
    <?php if($order->status === 'menunggu_verifikasi'): ?>

        <h4>Verifikasi & Kirim Pesanan</h4>

        <?php if($errors->any()): ?>
            <div style="color:red;">
                <ul>
                    <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <li><?php echo e($error); ?></li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </ul>
            </div>
        <?php endif; ?>

        <form action="<?php echo e(route('admin.orders.kirim', $order->id)); ?>" method="POST">
            <?php echo csrf_field(); ?>

            <label>Nomor Resi</label><br>
            <input type="text" name="resi" required><br><br>

            <button type="submit">
                Konfirmasi & Kirim
            </button>
        </form>

        <hr>
    <?php endif; ?>


    
    
    
    <?php if($order->status === 'dikirim' || $order->status === 'selesai'): ?>

        <h4>Informasi Pengiriman</h4>

        <p><strong>Nomor Resi:</strong> <?php echo e($order->resi); ?></p>

        <p><strong>Dikirim Pada:</strong>
            <?php echo e($order->dikirim_pada 
                ? \Carbon\Carbon::parse($order->dikirim_pada)->format('d M Y H:i') 
                : '-'); ?>

        </p>

        <hr>
    <?php endif; ?>

</div><?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/admin/orders/show.blade.php ENDPATH**/ ?>