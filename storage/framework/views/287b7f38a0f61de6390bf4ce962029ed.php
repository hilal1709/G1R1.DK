<div class="container">
    <h2>Verifikasi Pesanan</h2>

    <p><strong>Order:</strong> <?php echo e($order->order_number); ?></p>
    <p><strong>Penerima:</strong> <?php echo e($order->nama_penerima); ?></p>
    <p><strong>Alamat:</strong> <?php echo e($order->alamat); ?></p>

    <hr>

    <h4>Produk</h4>
    <ul>
        <?php $__currentLoopData = $order->details; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $detail): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <li>
                <?php echo e($detail->product->nama); ?> —
                <?php echo e($detail->qty); ?> x Rp <?php echo e(number_format($detail->harga,0,',','.')); ?>

            </li>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </ul>

    <p><strong>Subtotal:</strong>
        Rp <?php echo e(number_format($order->subtotal,0,',','.')); ?>

    </p>

    <hr>

    
    <form action="/admin/orders/<?php echo e($order->id); ?>/verify" method="POST">
        <?php echo csrf_field(); ?>

        <div class="mb-3">
            <label>Ongkos Kirim</label>
            <input
                type="number"
                name="ongkir"
                class="form-control"
                required
                min="0"
            >
        </div>

        <button type="submit" class="btn btn-primary">
            Konfirmasi & Tentukan Total
        </button>
    </form>
</div><?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/admin/orders/verify.blade.php ENDPATH**/ ?>