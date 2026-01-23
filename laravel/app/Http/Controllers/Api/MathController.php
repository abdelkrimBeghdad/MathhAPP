
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Exercise;
use App\Models\Progress;
use Illuminate\Http\Request;

class MathController extends Controller
{
    /**
     * جلب كافة الوحدات الدراسية مع وصف مختصر.
     */
    public function getChapters()
    {
        $chapters = Chapter::select('id', 'title', 'icon', 'description', 'color')->get();
        return response()->json($chapters);
    }

    /**
     * جلب المحتوى التفصيلي لدرس معين (شرح، أمثلة، مرئيات).
     */
    public function getChapterDetails($id)
    {
        $chapter = Chapter::with('lessons')->findOrFail($id);
        return response()->json($chapter);
    }

    /**
     * جلب التمارين الخاصة بوحدة معينة.
     */
    public function getExercises($chapterId)
    {
        $exercises = Exercise::where('chapter_id', $chapterId)->get();
        return response()->json($exercises);
    }

    /**
     * مزامنة نقاط التلميذ مع الخادم.
     */
    public function syncProgress(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|string',
            'points' => 'required|integer',
            'completed_chapters' => 'array'
        ]);

        $progress = Progress::updateOrCreate(
            ['student_id' => $validated['student_id']],
            [
                'points' => $validated['points'],
                'data' => json_encode($validated['completed_chapters'] ?? [])
            ]
        );

        return response()->json(['status' => 'success', 'current_points' => $progress->points]);
    }
}
