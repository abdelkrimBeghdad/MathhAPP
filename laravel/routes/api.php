
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MathController;

/*
|--------------------------------------------------------------------------
| API Routes - MathDz Platform
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // جلب كافة الوحدات الدراسية
    Route::get('/chapters', [MathController::class, 'getChapters']);
    
    // جلب تفاصيل وحدة معينة
    Route::get('/chapters/{id}', [MathController::class, 'getChapterDetails']);
    
    // جلب تمارين وحدة معينة
    Route::get('/exercises/{chapterId}', [MathController::class, 'getExercises']);
    
    // حفظ تقدم التلميذ ونقاطه
    Route::post('/progress/sync', [MathController::class, 'syncProgress']);
    
    // جلب لوحة المتصدرين (الترتيب)
    Route::get('/leaderboard', [MathController::class, 'getLeaderboard']);
});
