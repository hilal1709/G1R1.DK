<div class="container">
    <h3>Form Checkout</h3>

    <h5>Produk: <?php echo e($product->nama); ?></h5>
    <p>Harga: Rp <?php echo e(number_format($product->harga, 0, ',', '.')); ?></p>

    
    <p>
        Subtotal:
        <strong id="subtotal">
            Rp <?php echo e(number_format($product->harga * $qty, 0, ',', '.')); ?>

        </strong>
    </p>

    <hr>

    <form action="<?php echo e(route('checkout.store')); ?>" method="POST">
        <?php echo csrf_field(); ?>

        <input type="hidden" name="products[0][product_id]" value="<?php echo e($product->id); ?>">

        
        <div class="mb-3">
            <label>Jumlah</label>
            <input
                type="number"
                name="products[0][qty]"
                value="<?php echo e($qty); ?>"
                min="1"
                max="<?php echo e($product->stok); ?>"
                class="form-control"
                required
            >
            <small class="text-muted">
                Stok tersedia: <?php echo e($product->stok); ?>

            </small>
        </div>

        <div class="mb-3">
            <label>Nama Penerima</label>
            <input type="text" name="nama_penerima" class="form-control" required>
        </div>

        <div class="mb-3">
            <label>No WhatsApp</label>
            <input type="text" name="no_wa" class="form-control" required>
        </div>

        <div class="mb-3">
            <label>Alamat Lengkap</label>
            <textarea name="alamat" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label>Ekspedisi</label>
            <select name="ekspedisi" class="form-control" required>
                <option value="">-- Pilih Ekspedisi --</option>
                <option value="JNE">JNE</option>
                <option value="J&T">J&T</option>
                <option value="SiCepat">SiCepat</option>
            </select>
        </div>

        <div class="alert alert-info mt-3">
            <strong>Catatan:</strong><br>
            Ongkos kirim dan total pembayaran akan ditentukan setelah admin mengonfirmasi pesanan.
        </div>

        <button type="submit" class="btn btn-success mt-3">
            Checkout Sekarang
        </button>
    </form>
</div>

<script>
    const qtyInput = document.querySelector('input[name="products[0][qty]"]');
    const maxStock = <?php echo e($product->stok); ?>;
    const price = <?php echo e($product->harga); ?>;
    const subtotalEl = document.getElementById('subtotal');

    qtyInput.addEventListener('input', function () {
        let qty = parseInt(this.value);

        if (isNaN(qty) || qty < 1) {
            qty = 1;
        }

        if (qty > maxStock) {
            qty = maxStock;
        }

        this.value = qty;

        // update subtotal realtime
        subtotalEl.innerText = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price * qty);
    });
</script><?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/transactions/checkout.blade.php ENDPATH**/ ?>