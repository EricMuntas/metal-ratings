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
        Schema::create('releases', function (Blueprint $table) {
            $table->id();
            // $table->json('band_id')->nullable();
            $table->string('name');
            $table->float('rating')->nullable();
            $table->date('release_date')->nullable();
            $table->enum('type', ['LP', 'EP', 'Single', 'Split', 'Compilation', 'Demo']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('release');
    }
};
