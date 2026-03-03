<div class="container">

    <h2>Detail Pesanan</h2>

    <p><strong>Order:</strong> <?php echo e($order->order_number); ?></p>
    <p><strong>Penerima:</strong> <?php echo e($order->nama_penerima); ?></p>
    <p><strong>No WA:</strong> <?php echo e($order->no_wa); ?></p>
    <p><strong>Alamat:</strong> <?php echo e($order->alamat); ?></p>
    <p><strong>Status:</strong> <?php echo e($order->status); ?></p>

    
    <?php
        $customerMessage = "Halo {$order->nama_penerima}, saya admin ingin mengabari tentang pesanan #{$order->order_number}";
        $customerWaLink = "https://wa.me/".preg_replace('/\D/', '', $order->no_wa)."?text=".urlencode($customerMessage);
    ?>
    <a href="<?php echo e($customerWaLink); ?>" target="_blank" 
        class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-block my-2">
        Hubungi Customer via WhatsApp
    </a>

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

    <hr>

    
    
    
    <p><strong>Subtotal:</strong> Rp <?php echo e(number_format($order->subtotal,0,',','.')); ?></p>

    
    
    
    <?php if($order->status === 'menunggu_verifikasi'): ?>

        <h4>Verifikasi Pesanan</h4>

        <?php if($errors->any()): ?>
            <div style="color:red;">
                <ul>
                    <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <li><?php echo e($error); ?></li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </ul>
            </div>
        <?php endif; ?>

        <form action="/admin/orders/<?php echo e($order->id); ?>/confirm" method="POST">
            <?php echo csrf_field(); ?>

            <label>Masukkan Ongkir</label><br>
            <input type="number" name="ongkir" required min="0"><br><br>

            <button type="submit">
                Konfirmasi & Hitung Total
            </button>
        </form>

    <?php endif; ?>

    
    
    
    <?php if($order->status === 'diproses'): ?>

        <hr>
        <h4>Kirim Pesanan</h4>

        <p><strong>Ongkir:</strong> Rp <?php echo e(number_format($order->ongkir,0,',','.')); ?></p>
        <p><strong>Total:</strong> Rp <?php echo e(number_format($order->total,0,',','.')); ?></p>

        
        <?php if($order->bukti_transfer): ?>
            <p><strong>Bukti Transfer:</strong></p>
            <img src="<?php echo e(asset('storage/'.$order->bukti_transfer)); ?>" width="300">
        <?php endif; ?>

        <br>

        <form action="<?php echo e(route('admin.orders.kirim', $order->id)); ?>" method="POST">
            <?php echo csrf_field(); ?>

            <label>Nomor Resi</label><br>
            <input type="text" name="resi" required><br><br>

            <button type="submit">
                Konfirmasi & Kirim
            </button>
        </form>

    <?php endif; ?>

    
    
    
    <?php if(!in_array($order->status, ['menunggu_verifikasi','diproses'])): ?>
        <hr>
        <p><strong>Ongkir:</strong> Rp <?php echo e(number_format($order->ongkir ?? 0,0,',','.')); ?></p>
        <p><strong>Total:</strong> Rp <?php echo e(number_format($order->total ?? 0,0,',','.')); ?></p>

        <?php if($order->bukti_transfer): ?>
            <p><strong>Bukti Transfer:</strong></p>
            <img src="<?php echo e(asset('storage/'.$order->bukti_transfer)); ?>" width="300">
        <?php endif; ?>

        <?php if(in_array($order->status, ['dikirim','selesai'])): ?>
            <p><strong>Nomor Resi:</strong> <?php echo e($order->resi); ?></p>
            <p><strong>Dikirim Pada:</strong>
                <?php echo e($order->dikirim_pada ? \Carbon\Carbon::parse($order->dikirim_pada)->format('d M Y H:i') : '-'); ?>

            </p>
        <?php endif; ?>
    <?php endif; ?>

</div><?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/admin/orders/show.blade.php ENDPATH**/ ?>