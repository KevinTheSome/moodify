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
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Assumes user is logged in
            $table->unsignedBigInteger('music_id'); // References the music
            $table->timestamp('listened_at')->useCurrent();
            $table->timestamps();
            
        });
        
    }

    /**
     *  $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
     *  $table->foreign('music_id')->references('id')->on('music')->onDelete('cascade');
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};