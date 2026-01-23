
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->string('chapter_id');
            $table->string('subtitle');
            $table->text('explanation');
            $table->string('visualization')->nullable(); // THALES, TRIGONOMETRY, etc.
            $table->text('example_problem')->nullable();
            $table->text('example_solution')->nullable();
            $table->timestamps();

            $table->foreign('chapter_id')->references('id')->on('chapters')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
