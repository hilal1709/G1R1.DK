<h2>Pesanan Masuk</h2>

<table border="1" cellpadding="10" cellspacing="0" width="100%">
    <thead>
        <tr>
            <th>Order</th>
            <th>Penerima</th>
            <th>Total</th>
            <th>Status</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>
        <?php $__empty_1 = true; $__currentLoopData = $orders; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $order): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
            <tr>
                <td><?php echo e($order->order_number); ?></td>
                <td><?php echo e($order->nama_penerima); ?></td>
                <td>Rp <?php echo e(number_format($order->total,0,',','.')); ?></td>
                <td><?php echo e($order->status); ?></td>
                <td>
                    <a href="/admin/orders/<?php echo e($order->id); ?>">Detail</a>
                </td>
            </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
            <tr>
                <td colspan="5">Belum ada pesanan</td>
            </tr>
        <?php endif; ?>
    </tbody>
</table><?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/admin/orders/index.blade.php ENDPATH**/ ?>