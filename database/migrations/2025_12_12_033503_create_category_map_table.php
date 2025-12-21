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
        Schema::create('category_map', function (Blueprint $table) {
            $table->id();

            // Relasi kategori lokal
            $table->foreignId('category_id')
                    ->constrained('categories')
                    ->onDelete('cascade');

            // Nama marketplace (shopee, tokopedia, lazada)
            $table->string('marketplace', 50);

            // ID kategori marketplace
            $table->string('mp_category_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_map');
    }
};
