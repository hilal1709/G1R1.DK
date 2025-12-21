<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_marketplace', function (Blueprint $table) {
            $table->id();

            // ID produk lokal
            $table->foreignId('product_id')
                ->constrained('products')
                ->onDelete('cascade');

            // Nama marketplace (shopee, tokopedia, lazada, dll)
            $table->string('marketplace', 50);

            // ID produk di marketplace
            $table->string('mp_product_id')->nullable();

            // SKU marketplace (kadang berbeda dari SKU lokal)
            $table->string('mp_sku')->nullable();

            // Status produk: pending | active | inactive | error
            $table->string('status', 50)->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_marketplace');
    }
};
