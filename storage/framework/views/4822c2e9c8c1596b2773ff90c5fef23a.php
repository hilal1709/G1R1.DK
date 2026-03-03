<div class="container">

    <h2>Detail Pesanan</h2>

    <p><strong>Order:</strong> <?php echo e($order->order_number); ?></p>
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

    <?php
        $adminNumber = "085608767693";
        $message = "Halo Admin,%0A%0A"
            . "Saya ingin konfirmasi pesanan:%0A"
            . "Order: " . $order->order_number . "%0A"
            . "Status: " . $order->status . "%0A"
            . "Total: Rp " . number_format($order->total,0,',','.') . "%0A%0A"
            . "Mohon dibantu ya 🙏";
    ?>

    <a href="https://wa.me/<?php echo e($adminNumber); ?>?text=<?php echo e(urlencode($message)); ?>" 
    target="_blank"
    >
        📲 Hubungi Admin via WhatsApp
    </a>

    <hr>

    
    
    
    <?php if($order->bukti_transfer): ?>
        <h4>Bukti Transfer</h4>
        <img src="<?php echo e(asset('storage/'.$order->bukti_transfer)); ?>" 
            width="300">
        <hr>
    <?php endif; ?>

    <?php if(in_array($order->status, ['dikirim','selesai'])): ?>
            <p><strong>Nomor Resi:</strong> <?php echo e($order->resi); ?></p>
            <p><strong>Dikirim Pada:</strong>
                <?php echo e($order->dikirim_pada ? \Carbon\Carbon::parse($order->dikirim_pada)->format('d M Y H:i') : '-'); ?>

            </p>
        <?php endif; ?>


    
    
    
    <?php if($order->status === 'menunggu_pembayaran' && !$order->bukti_transfer): ?>

        <p>Silakan lakukan pembayaran melalui:</p>
        <p><strong>BCA 123131 a.n G1R1 DK</strong></p>

        <h4>Upload Bukti Transfer</h4>

        <?php if($errors->any()): ?>
            <div style="color:red;">
                <ul>
                    <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <li><?php echo e($error); ?></li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </ul>
            </div>
        <?php endif; ?>

        <form action="<?php echo e(route('transactions.upload', $order->id)); ?>" 
              method="POST" 
              enctype="multipart/form-data">
            <?php echo csrf_field(); ?>

            <input type="file" 
                   name="bukti_transfer" 
                   required 
                   accept="image/*">

            <br><br>

            <button type="submit">
                Upload Bukti
            </button>
        </form>

    <?php endif; ?>
    
</div><?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/user/orders/show.blade.php ENDPATH**/ ?>