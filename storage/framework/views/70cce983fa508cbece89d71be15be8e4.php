<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Saya</title>
</head>
<body>

    <!-- HEADER -->
    <header>
        <h2>Damar Kurung</h2>

        <nav>
            <a href="/">Beranda</a> |
            <a href="/articles">Artikel</a> |
            <a href="/products">Produk</a> |
            <a href="/events">Event</a> |
            <a href="/games">Games</a> |
            <a href="/about">Tentang</a> |
            <a href="/contact">Kontak</a> |
            <a href="/orders">Pesanan Saya</a> |

            <?php if(auth()->guard()->check()): ?>
                Halo, <?php echo e(auth()->user()->name); ?> |
                <form action="/logout" method="POST" style="display:inline;">
                    <?php echo csrf_field(); ?>
                    <button type="submit">Logout</button>
                </form>
            <?php else: ?>
                <a href="/login">Login</a>
            <?php endif; ?>
        </nav>

        <hr>
    </header>


    <!-- CONTENT -->
    <div class="container">

        <h2>Dashboard Saya</h2>

        <hr>

        <h4>Ringkasan Pesanan</h4>
        <ul>
            <li>Total Pesanan: <?php echo e($totalOrders); ?></li>
            <li>Menunggu Pembayaran: <?php echo e($menungguPembayaran); ?></li>
            <li>Menunggu Verifikasi: <?php echo e($menungguVerifikasi); ?></li>
            <li>Dikirim: <?php echo e($dikirim); ?></li>
            <li>Selesai: <?php echo e($selesai); ?></li>
        </ul>

        <hr>

        <h4>5 Pesanan Terbaru</h4>

        <?php if($recentOrders->count() > 0): ?>
            <table border="1" cellpadding="10">
                <tr>
                    <th>Order</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>

                <?php $__currentLoopData = $recentOrders; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $order): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <tr>
                        <td><?php echo e($order->order_number); ?></td>
                        <td>Rp <?php echo e(number_format($order->total,0,',','.')); ?></td>
                        <td><?php echo e($order->status); ?></td>
                        <td>
                            <a href="<?php echo e(route('user.orders.show', $order->id)); ?>">
                                Detail
                            </a>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </table>
        <?php else: ?>
            <p>Belum ada pesanan.</p>
        <?php endif; ?>

        <br>
        <a href="/orders">Lihat Semua Pesanan</a>

    </div>

</body>
</html><?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/user/dashboard.blade.php ENDPATH**/ ?>