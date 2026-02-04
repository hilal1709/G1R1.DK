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
        Schema::table('events', function (Blueprint $table) {
            // Menambah kolom 'max_pendaftar'
            $table->integer('max_pendaftar')->default(0)->after('deskripsi');

            // Menambah kolom 'status'
            $table->string('status', 50)->default('upcoming')->after('max_pendaftar');

            // Mengubah kolom 'tanggal' menjadi 'tanggal_mulai'
            $table->renameColumn('tanggal', 'tanggal_mulai');
            
            // Menambah kolom 'tanggal_selesai'
            $table->dateTime('tanggal_selesai')->nullable()->after('tanggal_mulai');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // Menghapus kolom 'max_pendaftar' dan 'status'
            $table->dropColumn(['max_pendaftar', 'status']);

            // Mengubah kembali kolom 'tanggal_mulai' ke 'tanggal'
            $table->renameColumn('tanggal_mulai', 'tanggal');
            $table->dropColumn('tanggal_selesai');
        });
    }
};
