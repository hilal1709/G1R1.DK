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
        Schema::create('game_designs', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('level'); // mudah, sedang, sulit
            $table->text('deskripsi')->nullable();
            $table->longText('path_data'); // JSON data untuk menggambar path
            $table->string('thumbnail')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_designs');
    }
};
