
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('chapter_id');
            $table->text('question');
            $table->json('options'); // تخزين الخيارات كصفوف JSON
            $table->integer('correct_answer');
            $table->text('explanation');
            $table->timestamps();

            $table->foreign('chapter_id')->references('id')->on('chapters')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};
