<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Cart Saya</title>
</head>
<body>

<h2>Keranjang Belanja</h2>

<?php if(session('success')): ?>
    <p style="color:green"><?php echo e(session('success')); ?></p>
<?php endif; ?>

<?php
    $total = 0;
?>

<?php if($cart->items->count() == 0): ?>
    <p>Cart masih kosong.</p>
<?php else: ?>
<table border="1" cellpadding="8" cellspacing="0">
    <thead>
        <tr>
            <th>Produk</th>
            <th>Harga</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>

        <?php $__currentLoopData = $cart->items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php
                $subtotal = $item->product->harga * $item->qty;
                $total += $subtotal;
            ?>
            <tr>
                <td><?php echo e($item->product->nama); ?></td>
                <td>Rp <?php echo e(number_format($item->product->harga)); ?></td>
                <td>
                    <form method="POST" action="<?php echo e(route('cartItems.update', $item)); ?>">
                        <?php echo csrf_field(); ?>
                        <?php echo method_field('PATCH'); ?>
                        <input type="number" name="qty" value="<?php echo e($item->qty); ?>" min="1" style="width:60px">
                        <button type="submit">Update</button>
                    </form>
                </td>
                <td>Rp <?php echo e(number_format($subtotal)); ?></td>
                <td>
                    <form method="POST" action="<?php echo e(route('cartItems.destroy', $item)); ?>">
                        <?php echo csrf_field(); ?>
                        <?php echo method_field('DELETE'); ?>
                        <button type="submit" onclick="return confirm('Hapus item ini?')">
                            Hapus
                        </button>
                    </form>
                </td>
            </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

    </tbody>
</table>

<h3>Total: Rp <?php echo e(number_format($total)); ?></h3>
<?php endif; ?>

<hr>

<h3>Order</h3>

<!-- ORDER VIA WHATSAPP -->
<?php
    $waText = "*Halo Admin*\n\n";
    $waText .= "Saya ingin melakukan pemesanan dengan detail berikut:\n\n";

    foreach ($cart->items as $item) {
        $subtotal = $item->product->harga * $item->qty;
        
        $waText .= "- {$item->product->nama}\n";
        $waText .= "  SKU: {$item->product->sku}\n";
        $waText .= "  Qty: {$item->qty}\n";
        $waText .= "  Harga: Rp " . number_format($item->product->harga, 0, ',', '.') . "\n";
        $waText .= "  SubTotal: Rp " . number_format($subtotal, 0, ',', '.') . "\n\n";
    }

    $waText .= "*Total: Rp " . number_format($total, 0, ',', '.') . "*\n\n";
    $waText .= "Terima kasih";

    $waUrl = "https://wa.me/6285608767693?text=" . urlencode($waText);
?>

<a href="<?php echo e($waUrl); ?>" target="_blank">
    <button>Order via WhatsApp</button>
</a>

</body>
</html>
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/carts/index.blade.php ENDPATH**/ ?>