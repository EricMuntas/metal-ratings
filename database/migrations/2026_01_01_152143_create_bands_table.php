<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bands', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            // ID por json
            // $table->json('genres_id')->nullable(); 

            // ID referenciado
            // $table->foreignId('genre_id')->constrained('genre');
            $table->integer('formed_year')->nullable();
            $table->string('country')->nullable();
            $table->float('rating')->nullable();
            $table->string('main_photo')->nullable();
            $table->json('alt_photos')->nullable();
             $table->enum('status',['Split-Up','On Hold', 'Active'])->default('Active');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bands');
    }
};
