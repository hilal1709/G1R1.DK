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
        Schema::create('marketplace_categories', function (Blueprint $table) {
            $table->id();
            $table->string('marketplace', 50);
            $table->string('mp_category_id');
            $table->string('name');
            $table->string('parent_id')->nullable();
            $table->timestamps();

            $table->unique(['marketplace', 'mp_category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketplace_categories');
    }
};
