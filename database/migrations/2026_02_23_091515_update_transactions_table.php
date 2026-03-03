<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {

            // Tambahan kolom baru
            $table->string('order_number')->unique()->after('id');

            $table->string('nama_penerima')->after('order_number');
            $table->string('no_wa')->after('nama_penerima');
            $table->text('alamat')->after('no_wa');

            $table->string('ekspedisi')->nullable()->after('alamat');

            $table->integer('subtotal')->after('ekspedisi');
            $table->integer('ongkir')->default(0)->after('subtotal');

            // Ubah total jadi integer kalau sebelumnya decimal
            $table->integer('total')->nullable()->change();

            // Update enum status
            $table->enum('status', [
                'pending',
                'menunggu_pembayaran',
                'menunggu_verifikasi',
                'diproses',
                'dikirim',
                'selesai',
                'dibatalkan'
            ])->default('pending')->change();

            // Pembayaran
            $table->string('bukti_transfer')->nullable()->after('status');
            $table->timestamp('dibayar_pada')->nullable()->after('bukti_transfer');

            // Pengiriman
            $table->string('resi')->nullable()->after('dibayar_pada');
            $table->timestamp('dikirim_pada')->nullable()->after('resi');
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {

            $table->dropColumn([
                'order_number',
                'nama_penerima',
                'no_wa',
                'alamat',
                'ekspedisi',
                'subtotal',
                'ongkir',
                'bukti_transfer',
                'dibayar_pada',
                'resi',
                'dikirim_pada'
            ]);
        });
    }
};