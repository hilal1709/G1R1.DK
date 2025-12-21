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
        Schema::create('review_medias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('review_id') // Relasi ke review
                ->constrained('reviews') // Kaitan ke tabel reviews
                ->onDelete('cascade'); // Jika review dihapus, media ini juga dihapus
            $table->string('media_url'); // URL atau path ke media (gambar, video, dll)
            $table->string('media_type'); // Jenis media (image, video, dll)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('review_medias');
    }
};
