<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function store(Request $request)
    {  
        $validated = $request->validate([
            'title' => 'required|string',
            'artist' => 'nullable|string',
            'listened_at' => 'nullable|date',
        ]);

        $history = History::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'artist' => $validated['artist'] ?? null,
            'listened_at' => $validated['listened_at'] ?? now(),
        ]);

        return response()->json($history, 201);
    }

    // Method to retrieve a user's listening history
    public function index()  // Keep the method name as index or change the route accordingly
    {
        $history = History::where('user_id', Auth::id())
            ->orderBy('listened_at', 'desc')
            ->get();

        return response()->json($history);
    }
}



